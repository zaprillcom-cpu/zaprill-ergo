import { NextRequest, NextResponse } from 'next/server';
import { searchWeb, WebSearchResult } from '@/lib/ai/web-search';

interface ChatMessage {
  sender: 'user' | 'coach';
  text: string;
}

interface UserProfileContext {
  name?: string;
  role?: string;
  targetRole?: string;
  location?: string;
  experienceYears?: number;
  currentSalary?: string;
  estimatedMarketValue?: string;
  top10Percentile?: string;
  overallScore?: number;
  skills?: string[];
  missingSkills?: string[];
  atsScore?: number;
  workExperience?: string[];
  jobMatches?: string[];
  completedAssessments?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const body = await req.json();
    const {
      messages,
      profile,
      enableWebSearch = true,
    }: {
      messages: ChatMessage[];
      profile?: UserProfileContext;
      enableWebSearch?: boolean;
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.text) {
      return NextResponse.json(
        { error: 'Last message must have valid text.' },
        { status: 400 }
      );
    }

    // Default rich context for Aarav Mehta if profile is partially provided
    const userProfile: UserProfileContext = {
      name: profile?.name || 'Aarav Mehta',
      role: profile?.role || 'Frontend Developer',
      targetRole: profile?.targetRole || 'Full-Stack Engineer',
      location: profile?.location || 'Mumbai & Bengaluru',
      experienceYears: profile?.experienceYears ?? 2,
      currentSalary: profile?.currentSalary || '₹6.5L/year',
      estimatedMarketValue: profile?.estimatedMarketValue || '₹8.2L/year',
      top10Percentile: profile?.top10Percentile || '₹11.5L/year',
      overallScore: profile?.overallScore ?? 76,
      skills: profile?.skills || [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Redux',
        'REST APIs',
        'JavaScript (ES6+)',
      ],
      missingSkills: profile?.missingSkills || [
        'System Design',
        'Distributed Caching (Redis)',
        'Containerization (Docker)',
        'PostgreSQL Optimization',
      ],
      atsScore: profile?.atsScore ?? 84,
      workExperience: profile?.workExperience || [
        'Frontend Developer at FinEdge Tech (2023 - Present): Engineered customer-facing React & Next.js dashboard modules, reduced checkout latency by 35%, and scaled state with Redux Toolkit.',
        'Junior Web Developer at DevSprint Studio (2022 - 2023): Built client marketing pages, implemented Tailwind design systems, and integrated GraphQL & REST endpoints.',
      ],
      jobMatches: profile?.jobMatches || [
        'Senior Frontend Engineer (Next.js) at Razorpay Technologies (Bengaluru/Remote) · ₹12.0L – ₹16.0L · 89% Match',
        'Full-Stack Developer (React & Node.js) at CRED Financial (Bengaluru) · ₹14.0L – ₹18.0L · 83% Match',
        'Frontend Specialist at Groww (Bengaluru/Mumbai) · ₹11.0L – ₹15.0L · 81% Match',
        'UI Engineer at Swiggy (Bengaluru) · ₹10.5L – ₹13.5L · 79% Match',
      ],
      completedAssessments: profile?.completedAssessments || [
        'React Core & Performance Architecture: 78% (Completed - Strong)',
        'System Design Fundamentals: Incomplete (High upside opportunity)',
      ],
    };

    // Live Web Search: search the internet for up-to-date market information
    let webSources: WebSearchResult[] = [];
    if (enableWebSearch) {
      // Formulate a smart search query based on user's query and candidate context
      const userQuery = lastMessage.text;
      let searchQuery = userQuery;

      const lower = userQuery.toLowerCase();
      if (lower.includes('underpaid') || lower.includes('salary') || lower.includes('worth') || lower.includes('market')) {
        searchQuery = `frontend developer salary 2 years experience mumbai bangalore 2025`;
      } else if (lower.includes('skill') || lower.includes('learn') || lower.includes('11l')) {
        searchQuery = `highest paying frontend full stack developer skills india 2025`;
      } else if (lower.includes('razorpay') || lower.includes('cred') || lower.includes('groww') || lower.includes('swiggy')) {
        const company = ['razorpay', 'cred', 'groww', 'swiggy'].find((c) => lower.includes(c)) || 'tech';
        searchQuery = `${company} frontend software engineer salary glassdoor ambitionbox`;
      } else if (lower.includes('roadmap') || lower.includes('30-day') || lower.includes('plan')) {
        searchQuery = `full stack developer 30 day learning roadmap system design redis`;
      }

      try {
        webSources = await searchWeb(searchQuery, 3);
      } catch {
        webSources = [];
      }
    }

    // If no OpenAI API key is present, fallback gracefully to intelligent simulation
    if (!apiKey || !apiKey.startsWith('sk-')) {
      return NextResponse.json({
        success: true,
        isLiveAI: false,
        model: 'simulation-engine',
        text: `Based on your profile as a ${userProfile.role} with ${userProfile.experienceYears} years of experience and a current Career Health Score of ${userProfile.overallScore}/100, focusing on closing your ${userProfile.missingSkills?.join(' and ')} gaps will yield the strongest salary uplift toward ${userProfile.top10Percentile}.`,
        suggestedPrompts: [
          'How can I negotiate my next offer with Razorpay or CRED?',
          'What is the highest-paying skill in my stack according to current market data?',
          'How can I get my resume to a 95+ score?',
        ],
        webSources,
      });
    }

    // Format web search context
    const webContextString =
      webSources.length > 0
        ? `\n[LIVE INTERNET / WEB SEARCH DATA (Real-Time Current Results)]:\n` +
          webSources
            .map((s, i) => `Source ${i + 1}: "${s.title}" (${s.url})\nSnippet: ${s.snippet}`)
            .join('\n\n')
        : '';

    // Build exhaustive system message with full candidate profile and live internet context
    const systemPrompt = `You are the ERGO AI Career Coach, a senior career intelligence strategist and executive talent advisor powered by Zaprill (https://ergo.zaprill.com).

AUTHENTICATED CANDIDATE PROFILE & CONTEXT:
- Full Name: ${userProfile.name}
- Current Role: ${userProfile.role} (2 commercial years)
- Target Role: ${userProfile.targetRole}
- Locations of Interest: ${userProfile.location}
- Current Compensation: ${userProfile.currentSalary}
- Calculated Fair Market Value: ${userProfile.estimatedMarketValue}
- 90th Percentile Market Ceiling: ${userProfile.top10Percentile}
- Career Health Index: ${userProfile.overallScore}/100 (Competitive Tier)
- Verified Tech Stack: ${userProfile.skills?.join(', ')}
- Critical Market Skill Gaps: ${userProfile.missingSkills?.join(', ')}
- ATS Resume Score: ${userProfile.atsScore}/100

WORK EXPERIENCE HISTORY:
${userProfile.workExperience?.map((exp) => `- ${exp}`).join('\n')}

ACTIVE OPPORTUNITIES MATCHED IN ERGO PORTAL:
${userProfile.jobMatches?.map((j) => `- ${j}`).join('\n')}

SKILL ASSESSMENTS:
${userProfile.completedAssessments?.map((a) => `- ${a}`).join('\n')}
${webContextString}

STRICT INSTRUCTIONS:
1. DEEP CONTEXT AWARENESS: You are not a generic bot. You have access to Aarav's exact salary (₹6.5L), his top matched companies (Razorpay ₹12-16L, CRED ₹14-18L, Groww, Swiggy), his previous jobs at FinEdge Tech & DevSprint, and his exact missing skills (System Design, Redis, Docker). Reference these specifically when advising!
2. LIVE INTERNET DATA: If live internet search data is provided above, synthesize it into your answer to provide authoritative, up-to-date 2025/2026 market numbers (e.g. citing AmbitionBox, Indeed, Glassdoor, or tech compensation benchmarks).
3. ACTION-ORIENTED & CONCISE: Provide crisp, high-impact advice formatted in clean markdown (bold numbers, bullet points, exact counter-offer scripts). Keep it under 240 words so it is enjoyable to read in chat.
4. CONCLUDE WITH 3 PROMPTS: End your output with 3 sharp, contextual follow-up prompts on separate lines prefixed with [SUGGESTION]:
[SUGGESTION] Prompt 1
[SUGGESTION] Prompt 2
[SUGGESTION] Prompt 3`;

    // Map conversation history (last 6 messages max for low latency)
    const recentMessages = messages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...recentMessages],
        temperature: 0.7,
        max_tokens: 550,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI responded with status ${response.status}`);
    }

    const data = await response.json();
    const rawContent: string = data.choices?.[0]?.message?.content || '';

    // Extract suggestions if present
    const suggestions: string[] = [];
    const cleanedLines: string[] = [];

    const lines = rawContent.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('[SUGGESTION]')) {
        const cleaned = line.replace('[SUGGESTION]', '').trim();
        if (cleaned) suggestions.push(cleaned);
      } else {
        cleanedLines.push(line);
      }
    }

    const responseText = cleanedLines.join('\n').trim();

    return NextResponse.json({
      success: true,
      isLiveAI: true,
      model: 'gpt-4o-mini',
      text: responseText,
      suggestedPrompts:
        suggestions.length > 0
          ? suggestions.slice(0, 3)
          : [
              'How can I negotiate my next offer with Razorpay or CRED?',
              'What specific System Design topics are tested for 2-4 years experience?',
              'How do I rewrite my FinEdge Tech experience bullets for higher ATS score?',
            ],
      webSources: webSources.slice(0, 3),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown AI error';
    console.error('Error in /api/ai/coach:', errorMsg);

    return NextResponse.json(
      {
        success: true,
        isLiveAI: false,
        model: 'fallback-heuristics',
        text: `**Career Intelligence Advisory**:
Based on your verified profile (Frontend Developer, 2 yrs exp at FinEdge Tech), your highest ROI action is demonstrating **System Design & Redis Caching** to qualify for your top matched roles like **Razorpay (₹12L–₹16L)** and **CRED (₹14L–₹18L)**.`,
        suggestedPrompts: [
          'What are the key System Design topics for 2-4 years experience?',
          'How do I negotiate from ₹6.5L to ₹12L+?',
          'Review my resume action verbs for Razorpay',
        ],
        webSources: [],
      },
      { status: 200 }
    );
  }
}
