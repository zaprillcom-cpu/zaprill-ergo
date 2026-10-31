'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  User,
  Bot,
  HelpCircle,
  TrendingUp,
  FileText,
  Compass,
  ArrowRight,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function CareerCoachPage() {
  const { user, coachMessages, sendCoachMessage } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ active: boolean; model: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultPrompts = [
    'Am I underpaid for my 2 years of experience?',
    'What do Razorpay and CRED pay for Frontend Engineers?',
    'What skills should I learn next to reach ₹11L+?',
    'How can I optimize my resume for ATS filters?',
    'Create a 30-day career roadmap for me.',
  ];

  useEffect(() => {
    fetch('/api/ai/status')
      .then((r) => r.json())
      .then(setAiStatus)
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [coachMessages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setIsTyping(true);
    setInputValue('');
    try {
      await sendCoachMessage(text);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Coach Header Banner */}
      <div className="bg-gradient-to-r from-[#091B3A] via-[#0F2B5D] to-[#0A1C3E] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#1D3B6F]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16C5A6]/15 text-[#5EEAD4] text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#16C5A6]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
              <span>ERGO AI Career Coach</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Personalized Career Intelligence Assistant
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-light">
              Full context loaded: <strong>{user?.name}</strong> ({user?.role}, 2 yrs exp at FinEdge Tech, ₹6.5L current, ₹11.5L target). Connected to live web market benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="text-[10px] font-bold text-[#16C5A6] bg-[#16C5A6]/15 border border-[#16C5A6]/30 px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16C5A6] animate-pulse" />
              <span>Full Profile Synced</span>
            </span>
            <span className="text-[10px] font-bold text-sky-300 bg-sky-500/15 border border-sky-500/30 px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-sky-400" />
              <span>Live Web Search: Active</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#16C5A6]" />
              <span>OpenAI {aiStatus?.model || 'gpt-4o-mini'} Live</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chat Workspace Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#FAFBFD]">
          {coachMessages.map((msg) => {
            const isCoach = msg.sender === 'coach';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 ${isCoach ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                    isCoach
                      ? 'bg-[#0F2B5D] text-[#16C5A6]'
                      : 'bg-[#16C5A6] text-[#091B3A] font-black'
                  }`}
                >
                  {isCoach ? <Sparkles className="w-4 h-4" /> : user?.name?.charAt(0) || 'A'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-xl p-4 sm:p-5 rounded-2xl text-xs leading-relaxed ${
                    isCoach
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-[#0F2B5D] text-white font-medium shadow-md shadow-[#0F2B5D]/20'
                  }`}
                >
                  {isCoach && (
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#0F2B5D] uppercase tracking-wider">
                        ERGO Coach
                      </span>
                      {msg.isLiveAI === true ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#16C5A6]" />
                          <span>Live GPT-4o-mini</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 inline-flex items-center gap-1">
                          <span>Platform Diagnostic</span>
                        </span>
                      )}

                      {msg.webSources && msg.webSources.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-200 inline-flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5 text-sky-600" />
                          <span>{msg.webSources.length} Web Sources Consulted</span>
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                  {/* Render Cited Web Sources if present */}
                  {isCoach && msg.webSources && msg.webSources.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mb-1">
                        <Globe className="w-3 h-3 text-sky-500" />
                        Live Internet Sources Cited
                      </span>
                      <div className="space-y-1">
                        {msg.webSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 rounded-lg bg-slate-50 hover:bg-sky-50/50 border border-slate-200/60 text-[10px] transition-colors group"
                          >
                            <div className="font-semibold text-sky-700 group-hover:underline flex items-center gap-1">
                              <ExternalLink className="w-2.5 h-2.5" />
                              <span className="truncate">{source.title}</span>
                            </div>
                            {source.snippet && (
                              <p className="text-slate-500 line-clamp-1 text-[9px] mt-0.5">
                                {source.snippet}
                              </p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Quick Prompts inside coach bubble */}
                  {isCoach && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Suggested Follow-ups
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedPrompts.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSend(p)}
                            className="text-left px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#16C5A6]/10 hover:text-[#0F766E] border border-slate-200 text-[11px] font-semibold text-slate-700 transition-colors"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-2 font-medium ${
                      isCoach ? 'text-slate-400' : 'text-slate-300'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-slate-500 italic pl-12">
              <span className="w-2 h-2 rounded-full bg-[#16C5A6] animate-pulse" />
              <span>ERGO Coach is searching live web benchmarks and generating tailored advice via OpenAI...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Prompts Banner */}
        <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Prompts:</span>
          {defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#16C5A6]/10 hover:text-[#0F766E] border border-slate-200 text-slate-700 font-medium text-[11px] transition-colors shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about salary negotiation, resume bullets, or interview strategies..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-2xl bg-[#16C5A6] text-[#091B3A] font-bold shadow-md shadow-[#16C5A6]/25 hover:bg-[#12A88E] disabled:opacity-40 transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
