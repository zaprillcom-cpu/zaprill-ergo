'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  FileCheck2,
  Clock,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR, formatDate } from '@/lib/utils';

export default function ExpertDashboardPage() {
  const { state } = useZaprillStore();
  const expert = state.experts[0]; // Dr. Vikram Sen
  const assignments = state.expertReviews.filter((r) => r.expertId === expert.id);
  const pendingAssignment = assignments.find((r) => r.status === 'pending');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0B1329] rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{expert.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Accredited Lead Evaluator
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{expert.title} — {expert.organization}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>{expert.domain}</span>
                <span>•</span>
                <span>Accreditation: <strong className="font-mono text-teal-300">{expert.accreditationNumber}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/expert/assignments">
              <Button variant="primary" size="sm">
                <FileCheck2 className="w-4 h-4 mr-1" />
                Review Queue ({assignments.filter((a) => a.status === 'pending').length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Narrative Helper Callout */}
        {pendingAssignment && (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Pending Evaluation Assignment:</span> {pendingAssignment.talentName} has submitted his Coworking Profitability Assessment. Sign the conflict-of-interest declaration, score the submission, and certify his Capability Passport.
              </div>
            </div>
            <Link href={`/expert/assignments/${pendingAssignment.id}`}>
              <Button variant="amber" size="sm" className="whitespace-nowrap">
                Review Aarav Mehta’s Attempt
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        )}

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Rubric Calibration Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700 font-mono">
                {expert.calibrationScore}%
              </span>
              <span className="text-[10px] text-teal-600 font-bold">Top 2%</span>
            </div>
            <span className="text-[10px] text-slate-400">Inter-rater consistency</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Reviews Certified</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {expert.reviewsCompleted}
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold">1 Pending</span>
            </div>
            <span className="text-[10px] text-slate-400">Financial models audited</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Total Honorarium Earned</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-teal-700 font-mono">
                {formatINR(expert.totalEarnedINR)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Paid out via direct bank transfer</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Honorarium per Review</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600 font-mono">
                {formatINR(expert.hourlyRateINR)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Standard institutional fee</span>
          </Card>
        </div>

        {/* Assignments Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              Active Review Assignments Queue
            </h2>
          </div>

          <div className="space-y-3">
            {assignments.map((rev) => (
              <Card key={rev.id} className="p-5 bg-white border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{rev.assessmentTitle}</h3>
                      <Badge variant={rev.status === 'completed' ? 'teal' : 'amber'} size="sm" className="capitalize text-[10px]">
                        {rev.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-600 font-medium block mt-0.5">
                      Candidate: <strong>{rev.talentName}</strong> • Honorarium: <strong className="font-mono text-indigo-700">{formatINR(rev.feeINR)}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Requested on {formatDate(rev.requestedAt)}
                    </span>
                  </div>
                </div>

                <Link href={`/expert/assignments/${rev.id}`}>
                  <Button variant={rev.status === 'pending' ? 'amber' : 'outline'} size="sm">
                    {rev.status === 'pending' ? 'Conduct Blind Review' : 'View Certified Report'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
