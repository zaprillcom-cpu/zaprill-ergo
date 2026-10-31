import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let bullet = '';
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const body = await req.json();
    bullet = body.bullet || '';
    const { targetRole = 'Frontend / Full-Stack Engineer' } = body;

    if (!bullet || typeof bullet !== 'string' || !bullet.trim()) {
      return NextResponse.json(
        { error: 'Bullet text is required.' },
        { status: 400 }
      );
    }

    if (!apiKey || !apiKey.startsWith('sk-')) {
      return NextResponse.json({
        success: true,
        isLiveAI: false,
        model: 'simulation-engine',
        originalBullet: bullet,
        optimizedBullet: `Architected and deployed responsive UI components, improving page responsiveness by 24% and reducing bundle size by 180KB across 15,000+ monthly active users.`,
        impactMetric: '24% page speed + 180KB bundle reduction',
        formulaUsed: 'Google XYZ (Accomplished [X] measured by [Y] by doing [Z])',
        keywordsIncluded: ['Performance Optimization', 'Component Architecture', 'Bundle Size'],
        explanation: 'Added quantified metrics and modern engineering terminology to beat ATS filters.',
      });
    }

    const systemPrompt = `You are the ERGO Resume Intelligence Engine powered by Zaprill.
Your task is to transform ordinary software engineering resume bullets into executive-grade, ATS-optimized accomplishment statements using the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".

Target Role: ${targetRole}

Return ONLY a valid JSON object with the following structure, without any markdown formatting or backticks:
{
  "optimizedBullet": "Strong single-sentence action statement starting with a punchy verb, quantified metric, and technology",
  "impactMetric": "The key quantified metric (e.g. 35% latency drop, 14% conversion lift)",
  "formulaUsed": "Accomplished [X] as measured by [Y], by doing [Z]",
  "keywordsIncluded": ["Keyword 1", "Keyword 2", "Keyword 3"],
  "explanation": "1-2 concise sentences explaining why this version scores 90+ on ATS filters"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Optimize this bullet: "${bullet}"` },
        ],
        temperature: 0.6,
        max_tokens: 300,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI responded with status ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices?.[0]?.message?.content || '{}');

    return NextResponse.json({
      success: true,
      isLiveAI: true,
      model: 'gpt-4o-mini',
      originalBullet: bullet,
      optimizedBullet: content.optimizedBullet || bullet,
      impactMetric: content.impactMetric || 'Quantified business impact',
      formulaUsed: content.formulaUsed || 'Google XYZ Formula',
      keywordsIncluded: content.keywordsIncluded || ['React', 'Next.js', 'Performance'],
      explanation: content.explanation || 'Optimized for high-signal recruitment parsing.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown AI error';
    console.error('Error in /api/ai/resume-optimize:', errorMsg);

    return NextResponse.json({
      success: true,
      isLiveAI: false,
      model: 'fallback-engine',
      originalBullet: bullet,
      optimizedBullet: `Architected and launched core interface modules with TypeScript and React, cutting client-side render cycles by 28% and supporting 10,000+ daily sessions.`,
      impactMetric: '28% render cycle reduction',
      formulaUsed: 'Google XYZ Formula',
      keywordsIncluded: ['TypeScript', 'React Architecture', 'Rendering Optimization'],
      explanation: 'Quantified performance gains and added production scale benchmarks.',
    });
  }
}
