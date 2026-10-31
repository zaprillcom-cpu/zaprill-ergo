'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  XCircle,
  Building2,
  Share2,
  Check,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, toggleSaveJob, applyToJob } = useAuth();

  const jobId = params?.id as string;
  const job = jobs.find((j) => j.id === jobId) || jobs[0]; // fallback to first job

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all opportunities</span>
        </Link>
      </div>

      {/* Job Header Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              {job.companyLogo || '💼'}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {job.title}
                </h1>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {job.workMode}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-900">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span>•</span>
                <span>Experience: {job.experienceRequired}</span>
                <span>•</span>
                <span>Posted {job.postedAgo}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-2xl border transition-all ${
                job.isSaved
                  ? 'bg-[#16C5A6]/15 text-[#0F766E] border-[#16C5A6]/30'
                  : 'border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Save Job"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={() => applyToJob(job.id)}
              disabled={job.isApplied}
              className={`px-6 py-3 rounded-2xl text-xs font-bold shadow-md transition-all ${
                job.isApplied
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#16C5A6] text-[#091B3A] hover:bg-[#12A88E] shadow-[#16C5A6]/25'
              }`}
            >
              {job.isApplied ? 'Application Submitted ✓' : 'Submit Application via ERGO'}
            </button>
          </div>
        </div>
      </div>

      {/* Why This Job Matches Your Profile (Mandatory Core Section) */}
      <div className="bg-gradient-to-br from-[#091B3A] to-[#0F2B5D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1D3B6F]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#16C5A6]" />
              <h2 className="text-lg font-black tracking-tight text-white">
                Why this job matches your profile
              </h2>
            </div>
            <span className="text-sm font-black text-[#5EEAD4] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {job.matchScore}% Overall Match
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {job.whyYouMatch}
          </p>

          {/* Match Score Breakdown Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0F2B5D] border border-[#133672]">
              <span className="text-[10px] uppercase font-bold text-slate-300">Technical Skill Fit</span>
              <p className="text-2xl font-black text-white mt-1">{job.matchBreakdown.technicalSkills}%</p>
              <span className="text-[11px] text-[#16C5A6] font-medium">Core React & Next.js mapped</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F2B5D] border border-[#133672]">
              <span className="text-[10px] uppercase font-bold text-slate-300">Experience Alignment</span>
              <p className="text-2xl font-black text-white mt-1">{job.matchBreakdown.experience}%</p>
              <span className="text-[11px] text-[#16C5A6] font-medium">Matches 2–4 year requirement</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F2B5D] border border-[#133672]">
              <span className="text-[10px] uppercase font-bold text-slate-300">Role & Seniority Relevance</span>
              <p className="text-2xl font-black text-white mt-1">{job.matchBreakdown.roleRelevance}%</p>
              <span className="text-[11px] text-slate-300 font-medium">High career advancement index</span>
            </div>
          </div>

          {/* Matched & Missing Skills comparison */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-emerald-400 block mb-2">
                ✓ Verified Matching Skills ({job.skillsMatched.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {job.skillsMatched.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-emerald-200 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-amber-400 block mb-2">
                ⚠ Skills to Highlight or Bridge ({job.skillsMissing.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {job.skillsMissing.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">No missing critical skills!</span>
                ) : (
                  job.skillsMissing.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-amber-200 bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description & Responsibilities */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Role Overview</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            {job.description}
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">Key Responsibilities</h3>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16C5A6] mt-1.5 shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">Compensation & Perks</h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">Stated Salary Range</span>
              <p className="text-lg font-black text-slate-900">{job.salaryRange}</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Mandatory Disclosure Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
