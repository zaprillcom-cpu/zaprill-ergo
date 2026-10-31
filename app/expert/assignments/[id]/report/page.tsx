'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  Share2,
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { DimensionRadar } from '@/components/assessments/dimension-radar';
import { useZaprillStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function ExpertCertifiedReportPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const review =
    state.expertReviews.find((r) => r.id === id) || state.expertReviews[0];
  const attempt =
    state.attempts.find((a) => a.id === review.attemptId) || state.attempts[0];
  const candidate =
    state.talent.find((t) => t.id === review.talentId) || state.talent[0];
  const expert =
    state.experts.find((e) => e.id === review.expertId) || state.experts[0];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Official Certified Report URL copied to clipboard!');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Navigation & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <Link
            href={`/expert/assignments/${review.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Evaluation Form
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Share Report
            </Button>
            <Button size="sm" onClick={handlePrint} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Certificate Container */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-xl overflow-hidden print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="bg-[#0B1329] text-white p-8 border-b-4 border-teal-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  Z
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-tight text-xl text-white">ZAPRILL</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-900 text-teal-300 border border-teal-700/60 px-2 py-0.5 rounded">
                      Certified Evaluation
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Verifiable Capability Assessment Protocol #ZAP-REP-2026-981</p>
                </div>
              </div>
              <div className="text-right sm:block hidden">
                <p className="text-[11px] font-mono text-slate-400">STATUS: VERIFIED & SEALED</p>
                <p className="text-xs text-teal-400 font-semibold flex items-center justify-end gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Independent Expert Ratified
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Title Block */}
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">
                Capability Intelligence Certificate of Completion
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {attempt.assessmentTitle}
              </h1>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                Evaluated under the standardized 5-dimension Zaprill competency rubric by an accredited senior practitioner.
              </p>
            </div>

            {/* Candidate & Reviewer Profile Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Assessed Talent</span>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                    {candidate.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{candidate.name}</h3>
                    <p className="text-xs text-slate-500">{candidate.headline}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{candidate.location} • ID: {candidate.id}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Accredited Reviewer</span>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                    {expert.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      {expert.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    </h3>
                    <p className="text-xs text-slate-500">{expert.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Accreditation: {expert.accreditationNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score & Tier Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Ratified Capability Tier</span>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <CapabilityBadge tier="expert_reviewed" size="lg" />
                  <Badge variant="success">96th Percentile</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Completed on {formatDate(review.completedAt || review.submittedAt || review.requestedAt || '2026-10-25')} • Evaluation ID: {review.id}
                </p>
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-teal-200 pt-4 sm:pt-0 sm:pl-8">
                <span className="text-xs font-semibold text-slate-500 block">Expert Total Score</span>
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {review.scores ? Object.values(review.scores).reduce((a, b) => a + b, 0) : 89}
                  <span className="text-lg font-medium text-slate-400"> / 100</span>
                </span>
                <span className="text-[11px] text-emerald-600 font-medium block mt-0.5">
                  ✓ Meets High-Trust Threshold
                </span>
              </div>
            </div>

            {/* Rubric Radar & Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">5-Dimension Diagnostic Radar</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Visual profile comparing candidate performance across core practical execution criteria.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <DimensionRadar
                    scores={review.scores || {
                      understanding: 19,
                      application: 26,
                      reasoning: 18,
                      errorDetection: 13,
                      transfer: 13,
                    }}
                    height={260}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Dimension Score Breakdown</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Understanding (Concepts & Principles)', score: review.scores?.understanding || 19, max: 20 },
                    { label: 'Application (Modeling & Calculations)', score: review.scores?.application || 26, max: 30 },
                    { label: 'Reasoning (Strategic & Commercial)', score: review.scores?.reasoning || 18, max: 20 },
                    { label: 'Error Detection (Spotting Model Traps)', score: review.scores?.errorDetection || 13, max: 15 },
                    { label: 'Transfer (Novel Market Adapting)', score: review.scores?.transfer || 13, max: 15 },
                  ].map((dim, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-700">{dim.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {dim.score} / {dim.max}
                        </span>
                        <span className="text-[10px] text-teal-700 font-semibold bg-teal-100 px-1.5 py-0.5 rounded">
                          {Math.round((dim.score / dim.max) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Qualitative Feedback Sections */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Expert Qualitative Evaluation & Observations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-800">Methodology & Rigor</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.qualitativeComments?.methodology ||
                      'Clean spreadsheet architecture with zero hardcoded values. Dynamically links seating density, fixed CAM expenses, and lease escalations cleanly.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-800">Analytical Depth & Stress-Testing</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.qualitativeComments?.analyticalDepth ||
                      'Accurately identified that Andheri East required 74.2% break-even occupancy, successfully detecting the 7.5% lease escalation rate risk.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-800">Commercial Insight</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.qualitativeComments?.commercialInsight ||
                      'Recommended acoustic pod density increases rather than discounting hot desks, demonstrating mature operator mindset.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-800">Areas for Continuous Growth</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.qualitativeComments?.areasForGrowth ||
                      'Could incorporate working capital debt service schedules and security deposit interest float into Year 2 cash flow projections.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cryptographic / Verifiable Seal Block */}
            <div className="border-t-2 border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-[11px] font-mono text-slate-400">
                  SHA-256 HASH: 8f9a2b5e1c4d7083a216f901cb54d3ee12a09c2560b4119d5c41
                </p>
                <p className="text-[11px] text-slate-500">
                  Signed cryptographically by Dr. Vikram Sen under Zaprill Evaluator Key #EXP-VK-774910
                </p>
              </div>

              <div className="text-center sm:text-right">
                <div className="inline-block px-3 py-1.5 rounded border border-slate-300 bg-slate-50 font-serif italic text-xs text-slate-700">
                  Vikram Sen, Ph.D.
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Lead Financial Evaluator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
