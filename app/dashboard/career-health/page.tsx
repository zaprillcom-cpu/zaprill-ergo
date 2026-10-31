'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Award,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function CareerHealthPage() {
  const { careerHealth } = useAuth();
  const [recalculating, setRecalculating] = useState(false);
  const [recalcSuccess, setRecalcSuccess] = useState(false);

  const handleSimulateRecalc = () => {
    setRecalculating(true);
    setTimeout(() => {
      setRecalculating(false);
      setRecalcSuccess(true);
      setTimeout(() => setRecalcSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Hero Gauge Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16C5A6]/15 text-[#0F766E] text-xs font-bold mb-3 border border-[#16C5A6]/30">
              <Activity className="w-3.5 h-3.5 text-[#16C5A6]" />
              <span>Unified Career Health Index</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F2B5D] tracking-tight">
              Overall Health: {careerHealth.overallScore}/100
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Your profile ranks in the <strong className="text-slate-900 font-semibold">top 35%</strong> of frontend engineers in Mumbai and Bengaluru with 2 years of experience. You have strong framework mastery with significant upside in distributed system architecture.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-500">
              <span>{careerHealth.lastUpdated}</span>
              <span>•</span>
              <span className="text-[#0B6756] font-bold">+{careerHealth.overallScore - careerHealth.previousScore} pts since last check</span>
            </div>
          </div>

          {/* Circular Score Highlight */}
          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#16C5A6] transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * careerHealth.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-[#0F2B5D]">{careerHealth.overallScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Index</span>
              </div>
            </div>

            <button
              onClick={handleSimulateRecalc}
              disabled={recalculating}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#16C5A6] ${recalculating ? 'animate-spin' : ''}`} />
              <span>{recalculating ? 'Analyzing...' : recalcSuccess ? 'Updated ✓' : 'Refresh Index'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Factor Breakdown Cards */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
          6 Dimensional Scoring Breakdown
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerHealth.factors.map((factor, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#16C5A6]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {factor.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    factor.status === 'good'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : factor.status === 'average'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {factor.status === 'good' ? 'Strong' : factor.status === 'average' ? 'Moderate' : 'Needs Focus'}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">{factor.label}</h3>
                <span className="text-base font-extrabold text-[#0F2B5D]">{factor.score}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0F2B5D] to-[#16C5A6]"
                  style={{ width: `${factor.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-light">{factor.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Verified Competitive Strengths</h3>
              <p className="text-[11px] text-slate-500">Factors giving you leverage in applications</p>
            </div>
          </div>

          <ul className="space-y-3">
            {careerHealth.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Gaps */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Areas Blocking Higher Salary Tiers</h3>
              <p className="text-[11px] text-slate-500">Critical items flagged by hiring filters</p>
            </div>
          </div>

          <ul className="space-y-3">
            {careerHealth.weaknesses.map((weak, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Improvement Roadmap */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Actionable Improvement Roadmap</h3>
            <p className="text-xs text-slate-500">Ranked by estimated compensation and callback impact</p>
          </div>
          <Link
            href="/dashboard/coach"
            className="text-xs font-bold text-[#0F2B5D] hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
            <span>Consult Coach</span>
          </Link>
        </div>

        <div className="space-y-4">
          {careerHealth.recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#16C5A6]/40 transition-all"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-sm font-bold text-slate-900">{rec.title}</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {rec.priority} Priority
                  </span>
                  <span className="text-[10px] font-bold text-[#0B6756] bg-[#16C5A6]/15 px-2 py-0.5 rounded-full border border-[#16C5A6]/30">
                    {rec.effort}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{rec.description}</p>
                <div className="mt-2 text-xs font-bold text-emerald-700">
                  Expected Impact: {rec.impact}
                </div>
              </div>

              {rec.actionUrl && (
                <Link
                  href={rec.actionUrl}
                  className="px-5 py-2.5 rounded-xl bg-[#16C5A6] text-[#091B3A] font-bold text-xs shadow-md shadow-[#16C5A6]/20 hover:bg-[#12A88E] transition-all text-center shrink-0"
                >
                  {rec.actionLabel || 'Begin Task'}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
