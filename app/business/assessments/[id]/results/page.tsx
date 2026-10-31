'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileCheck2,
  ArrowLeft,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Download,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { DimensionRadar } from '@/components/assessments/dimension-radar';
import { useZaprillStore } from '@/lib/store';
import { formatDate, exportToCSV } from '@/lib/utils';

export default function BusinessAssessmentResultsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const assessment =
    state.assessments.find((a) => a.id === id) || state.assessments[0];

  const attempts = state.attempts.filter((att) => att.assessmentId === assessment.id);

  const [selectedAttemptId, setSelectedAttemptId] = useState<string>(
    attempts[0]?.id || state.attempts[0]?.id
  );

  const activeAttempt =
    attempts.find((a) => a.id === selectedAttemptId) || attempts[0] || state.attempts[0];

  const candidate = state.talent.find((t) => t.id === activeAttempt?.talentId) || state.talent[0];

  const handleExportCSV = () => {
    exportToCSV(
      attempts.map((att) => ({
        AttemptId: att.id,
        CandidateId: att.talentId,
        Assessment: assessment.title,
        Score: att.totalScore,
        EvaluatedBy: att.status,
        CompletedAt: att.completedAt,
      })),
      `${assessment.title.slice(0, 20)}_Candidate_Scores`
    );
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Navigation */}
        <Link
          href="/business/assessments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments & Benchmarks
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{assessment.title}</h1>
              <Badge variant="teal">{assessment.category}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Candidate diagnostic submissions, 5-dimension rubric scores, and expert evaluation reports.
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            Export Benchmark CSV
          </Button>
        </div>

        {/* Content Split: Candidate Attempt List & Deep Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Candidate List */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Evaluated Candidates ({attempts.length || 1})
            </h2>

            {(attempts.length > 0 ? attempts : [state.attempts[0]]).map((att) => {
              const talent = state.talent.find((t) => t.id === att.talentId) || state.talent[0];
              const isSelected = att.id === selectedAttemptId;
              return (
                <div
                  key={att.id}
                  onClick={() => setSelectedAttemptId(att.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{talent.name}</h3>
                      <p className="text-xs text-slate-500">{talent.headline}</p>
                    </div>
                    <span className="text-xs font-extrabold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {att.totalScore} / 100
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatDate(att.completedAt || att.startedAt || '2026-10-25')}</span>
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Expert-Ratified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Rubric Inspector for Selected Candidate */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50/70 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600">
                      Detailed Submission Appraisal
                    </span>
                    <CardTitle className="text-lg text-slate-900">{candidate.name}</CardTitle>
                    <p className="text-xs text-slate-500">{candidate.headline} • {candidate.location}</p>
                  </div>

                  <Link href={`/business/talent/${candidate.id}`}>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1">
                      Full Capability Passport <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Score Summary Banner */}
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                      Ratified Diagnostic Score
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <CapabilityBadge tier="expert_reviewed" size="md" />
                      <Badge variant="teal">Top 5% Cohort</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 font-mono">
                      {activeAttempt?.totalScore || 82}
                      <span className="text-base text-slate-400 font-normal"> / 100</span>
                    </span>
                  </div>
                </div>

                {/* Radar Chart & Dimension Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <DimensionRadar
                      scores={activeAttempt?.dimensionScores || {
                        understanding: 18,
                        application: 24,
                        reasoning: 16,
                        errorDetection: 12,
                        transfer: 12,
                      }}
                      height={220}
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { label: 'Understanding', score: activeAttempt?.dimensionScores?.understanding || 18, max: 20 },
                      { label: 'Application', score: activeAttempt?.dimensionScores?.application || 24, max: 30 },
                      { label: 'Reasoning', score: activeAttempt?.dimensionScores?.reasoning || 16, max: 20 },
                      { label: 'Error Detection', score: activeAttempt?.dimensionScores?.errorDetection || 12, max: 15 },
                      { label: 'Transfer', score: activeAttempt?.dimensionScores?.transfer || 12, max: 15 },
                    ].map((d, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <span className="text-slate-700 font-medium">{d.label}</span>
                        <span className="font-mono font-bold text-slate-900">{d.score} / {d.max}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated AI vs Expert Evaluation Notes */}
                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <h4 className="font-bold text-slate-900">Expert Evaluator Ratification</h4>
                  <p className="text-slate-600 leading-relaxed p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    &quot;Candidate demonstrated exemplary command of fixed vs variable operational leverage. Spot-on identification of the 7.5% lease escalation trap in Andheri East, calculating the correct EBITDA margin cushion.&quot; — <strong>Dr. Vikram Sen</strong> (Accreditation #ZAP-EXP-774910)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
