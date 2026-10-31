'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  TrendingUp,
  FileText,
  Compass,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Send,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function DashboardPage() {
  const { user, careerHealth, marketValue, resumeData, jobs, skillGaps, toggleSaveJob, applyToJob } = useAuth();

  const highMatchJobs = jobs.slice(0, 3);
  const urgentSkills = skillGaps.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Welcome & Command Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#091B3A] via-[#0F2B5D] to-[#0A1C3E] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#1D3B6F]/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#16C5A6]/15 text-[#5EEAD4] text-[11px] font-bold uppercase tracking-wider mb-3 border border-[#16C5A6]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
              <span>ERGO Career Intelligence · Active Profile</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {user?.name || 'Aarav'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-light">
              Your overall <strong className="text-white font-semibold">Career Health Score is 76/100</strong>. We identified a{' '}
              <strong className="text-[#16C5A6] font-semibold">+₹5.0 Lakhs/yr</strong> compensation ceiling gap based on active Bangalore and Mumbai tech benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/coach"
              className="px-5 py-2.5 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-lg shadow-[#16C5A6]/25 hover:bg-[#12A88E] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask ERGO Coach</span>
            </Link>
            <Link
              href="/dashboard/resume"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>ATS Check</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Primary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Career Health Score */}
        <Link
          href="/dashboard/career-health"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#0F2B5D]/40 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Career Health</span>
            <div className="p-1.5 rounded-lg bg-[#0F2B5D]/10 text-[#0F2B5D] group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{careerHealth.overallScore}</span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
            <span>+{careerHealth.overallScore - careerHealth.previousScore}%</span>
            <span className="font-normal text-slate-400">vs last month</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            {careerHealth.scoreCategory}
          </p>
        </Link>

        {/* Metric 2: Market Value */}
        <Link
          href="/dashboard/market-value"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Market Value</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">₹11.5L</span>
            <span className="text-xs text-slate-400 font-medium">/yr</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-[#0B6756]">
            <span>+₹5.0L Gap</span>
            <span className="font-normal text-slate-400">over ₹6.5L</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Top 10% potential in Mumbai
          </p>
        </Link>

        {/* Metric 3: Resume Quality */}
        <Link
          href="/dashboard/resume"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Resume Quality</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{resumeData.overallAtsScore}</span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
            <span>90% Readability</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Passes 9 of 10 automated ATS
          </p>
        </Link>

        {/* Metric 4: Skill Relevance */}
        <Link
          href="/dashboard/skill-gap"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Skill Relevance</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">78%</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-amber-600">
            <span>2 Critical Gaps</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            System Design & Redis
          </p>
        </Link>

        {/* Metric 5: Career Momentum */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Momentum</span>
            <div className="p-1.5 rounded-lg bg-[#16C5A6]/15 text-[#16C5A6]">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">+12%</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
            <span>3 Milestones Completed</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Strong hiring trajectory
          </p>
        </div>
      </div>

      {/* Two-Column Middle Section: Career Health Breakdown & High-Impact Recommendations */}
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (7 cols): Historical Trend & Health Factor Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Career Health Breakdown</h3>
                <p className="text-xs text-slate-500">6 core dimensions driving your readiness score</p>
              </div>
              <Link
                href="/dashboard/career-health"
                className="text-xs font-bold text-[#0F2B5D] hover:underline flex items-center gap-1"
              >
                <span>Full Diagnosis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Factor Bars */}
            <div className="space-y-4">
              {careerHealth.factors.slice(0, 4).map((f, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{f.label}</span>
                    <span className="text-xs font-bold text-[#0F2B5D]">{f.score}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0F2B5D] to-[#16C5A6]"
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{f.feedback}</p>
                </div>
              ))}
            </div>

            {/* Historical Score Progress Mini Chart */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block mb-3">6-Month Score Trajectory</span>
              <div className="flex items-end justify-between gap-2 h-24 px-2">
                {careerHealth.historicalTrends.map((t, i) => {
                  const heightPercent = ((t.score - 50) / 50) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#16C5A6] transition-colors">
                        {t.score}
                      </span>
                      <div
                        className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#0F2B5D] to-[#16C5A6] opacity-80 group-hover:opacity-100 transition-all shadow-sm"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[10px] font-semibold text-slate-400">{t.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* High Priority Actions from Coach */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#16C5A6]" />
                <h3 className="text-base font-bold text-slate-900">Priority Next Steps</h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#0B6756] bg-[#16C5A6]/15 px-2.5 py-1 rounded-full border border-[#16C5A6]/30">
                AI Powered
              </span>
            </div>

            <div className="space-y-3">
              {careerHealth.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#16C5A6]/40 transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">{rec.title}</span>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">{rec.description}</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-[#0B6756]">
                      Impact: {rec.impact}
                    </span>
                  </div>

                  {rec.actionUrl && (
                    <Link
                      href={rec.actionUrl}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#0F2B5D] hover:text-[#0F2B5D] text-slate-800 text-xs font-bold transition-all shrink-0 text-center"
                    >
                      {rec.actionLabel || 'Take Action'}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Matched Opportunities & Urgent Skill Gaps */}
        <div className="lg:col-span-5 space-y-6">
          {/* Curated High-Match Jobs */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top Job Matches</h3>
                <p className="text-xs text-slate-500">Based on your verified skills & salary</p>
              </div>
              <Link
                href="/dashboard/jobs"
                className="text-xs font-bold text-[#0F2B5D] hover:underline flex items-center gap-1"
              >
                <span>View all ({jobs.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {highMatchJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#16C5A6]/40 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{job.companyLogo || '💼'}</span>
                      <div>
                        <Link
                          href={`/dashboard/jobs/${job.id}`}
                          className="text-xs font-bold text-slate-900 group-hover:text-[#0F2B5D] transition-colors block"
                        >
                          {job.title}
                        </Link>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {job.company} · {job.location}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-extrabold text-[#0B6756] bg-[#16C5A6]/15 px-2 py-0.5 rounded-full border border-[#16C5A6]/30 shrink-0">
                      {job.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-700 font-semibold pt-2 border-t border-slate-200/60 mt-2">
                    <span className="text-[#0B6756] font-bold">{job.salaryRange}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          job.isSaved
                            ? 'bg-[#16C5A6]/15 text-[#0F766E] border-[#16C5A6]/30'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title="Save Job"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => applyToJob(job.id)}
                        disabled={job.isApplied}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          job.isApplied
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-[#0F2B5D] text-white hover:bg-[#133672]'
                        }`}
                      >
                        {job.isApplied ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Skill Gaps */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Highest-Yield Skills</h3>
                <p className="text-xs text-slate-500">Skills blocking your next salary tier</p>
              </div>
              <Link
                href="/dashboard/skill-gap"
                className="text-xs font-bold text-[#0F2B5D] hover:underline flex items-center gap-1"
              >
                <span>Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {urgentSkills.map((s) => (
                <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {s.salaryImpact}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>Effort: {s.learningEffort}</span>
                    <span className="font-semibold text-[#0F2B5D]">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
