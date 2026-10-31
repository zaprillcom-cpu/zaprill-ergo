import https from 'https';
import querystring from 'querystring';

export interface WebSearchResult {
  title: string;
  snippet: string;
  url: string;
}

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export async function searchWeb(query: string, maxResults = 4): Promise<WebSearchResult[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  try {
    const postData = querystring.stringify({ q: cleanQuery });

    const options = {
      hostname: 'lite.duckduckgo.com',
      port: 443,
      path: '/lite/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 5000,
    };

    return await new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const linkMatches = [
              ...data.matchAll(
                /<a[^>]+href=['"]([^'"]+)['"][^>]+class=['"]result-link['"][^>]*>([\s\S]*?)<\/a>/g
              ),
            ];
            const snippetMatches = [
              ...data.matchAll(/<td[^>]+class=['"]result-snippet['"][^>]*>([\s\S]*?)<\/td>/g),
            ];

            const count = Math.min(linkMatches.length, snippetMatches.length, maxResults);
            const results: WebSearchResult[] = [];

            for (let i = 0; i < count; i++) {
              let url = linkMatches[i][1];
              // Unescape duckduckgo redirect url if present
              if (url.includes('duckduckgo.com/l/?uddg=')) {
                try {
                  const parsed = new URL(url, 'https://duckduckgo.com');
                  const target = parsed.searchParams.get('uddg');
                  if (target) url = decodeURIComponent(target);
                } catch {
                  // Keep original url
                }
              }

              const title = decodeHtml(linkMatches[i][2]);
              const snippet = decodeHtml(snippetMatches[i][1]);

              if (title && snippet) {
                results.push({ title, snippet, url });
              }
            }

            resolve(results);
          } catch {
            resolve([]);
          }
        });
      });

      req.on('error', () => resolve([]));
      req.on('timeout', () => {
        req.destroy();
        resolve([]);
      });

      req.write(postData);
      req.end();
    });
  } catch {
    return [];
  }
}
