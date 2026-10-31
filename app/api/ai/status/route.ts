import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-'));
  return NextResponse.json({
    active: hasKey,
    model: 'gpt-4o-mini',
    provider: 'OpenAI',
    engine: 'ERGO Intelligence Engine v2.4',
  });
}
