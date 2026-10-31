'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  User,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DimensionRadar } from '@/components/assessments/dimension-radar';
import { useZaprillStore } from '@/lib/store';
import { normalizeDimensionPercentages, formatDate } from '@/lib/utils';

export default function AssessmentResultsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { state, requestExpertReview } = useZaprillStore();
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [requestedSuccess, setRequestedSuccess] = useState(false);

  const attempt =
    state.attempts.find((a) => a.assessmentId === id) || state.attempts[0];

  const assessment =
    state.assessments.find((a) => a.id === (attempt?.assessmentId || id)) || state.assessments[0];

  const expert = state.experts[0]; // Dr. Vikram Sen

  // Normalised dimension percentages
  const percentages = normalizeDimensionPercentages(attempt.dimensionScores);

  const handleRequestReview = () => {
    requestExpertReview(attempt.id);
    setExpertModalOpen(false);
    setRequestedSuccess(true);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/talent/assessments" className="hover:text-indigo-600 transition-colors">
            ← Back to Assessments Catalog
          </Link>
          <span className="font-mono text-slate-400">Version: {attempt.version}</span>
        </div>

        {/* Results Banner Card */}
        <Card className="border-indigo-200 shadow-md overflow-hidden bg-white">
          <div className="p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-[#0B1329] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Diagnostic Result
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-300 font-mono">Attempt Date: {formatDate(attempt.completedAt || attempt.startedAt)}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{assessment.title}</h1>
              <p className="text-xs text-slate-300 mt-1">
                Evaluated across 5 diagnostic problem dimensions for <strong>Aarav Mehta</strong>.
              </p>
            </div>

            {/* Total Points Callout */}
            <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md min-w-[130px]">
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Total Score</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-4xl font-black font-mono text-white">{attempt.totalScore}</span>
                <span className="text-sm font-bold text-slate-300 font-mono">/100</span>
              </div>
              <span className="text-[10px] text-teal-300 font-medium">Earned Points Sum</span>
            </div>
          </div>

          {/* Mandatory AI Evaluation Disclaimer Badge */}
          <div className="p-4 bg-amber-50 border-b border-amber-200/80 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Evaluation Source:</strong> Simulated AI evaluation — illustrative result. Designed to model multi-stage commercial reasoning.
              </span>
            </div>
            <Badge variant="amber" size="sm">
              Illustrative Evaluation
            </Badge>
          </div>

          <CardContent className="p-6 space-y-8">
            {/* 5-Dimension Radar Chart Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Five Dimensional Performance Radar</h3>
                  <p className="text-xs text-slate-500">
                    Calculated from earned points: Understanding (18/20), Application (24/30), Reasoning (16/20), Error Detection (12/15), Transfer (12/15).
                  </p>
                </div>
                <Badge variant="teal" size="sm">
                  Normalised Percentages
                </Badge>
              </div>

              <DimensionRadar
                scores={attempt.dimensionScores}
                percentages={percentages}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200"
              />
            </div>

            {/* Strengths and Improvement Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-200 space-y-3">
                <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Demonstrated Strengths
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {attempt.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0 mt-1.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvement Areas */}
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Growth & Refinement Areas
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {attempt.improvementAreas.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0 mt-1.5" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Linked Evidence and Next Challenge */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block font-medium">Supporting Evidence Attached:</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  HarbourDesk Coworking Unit Economics Model v2.xlsx
                </span>
                <Link href="/talent/evidence" className="text-indigo-600 hover:underline text-[11px] font-semibold mt-1 inline-block">
                  Inspect in Evidence Vault →
                </Link>
              </div>

              <div>
                <span className="text-slate-500 block font-medium">Suggested Next Challenge:</span>
                <span className="font-bold text-indigo-700 text-sm mt-0.5 block">
                  {attempt.suggestedNextChallenge}
                </span>
                <Link href="/talent/simulations/sim-coworking-profitability" className="text-teal-700 hover:underline text-[11px] font-semibold mt-1 inline-block">
                  Open Multi-Hub Simulation →
                </Link>
              </div>
            </div>

            {/* Request Expert Review Callout Section */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 via-white to-teal-50/60 rounded-2xl border border-indigo-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Upgrade to Independent Expert Review
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                    Request an accredited review from <strong>Dr. Vikram Sen</strong> (Ex-KPMG Mumbai, Senior Financial Modeler).
                    Independent peer verification certifies your Capability Passport with enterprise credibility.
                  </p>
                </div>

                {attempt.status === 'pending_expert_review' || requestedSuccess ? (
                  <Badge variant="amber" size="md">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Review Pending with Dr. Sen
                  </Badge>
                ) : (
                  <Button variant="primary" size="md" onClick={() => setExpertModalOpen(true)}>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Request Expert Review
                  </Button>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between text-xs text-slate-500">
            <span>Result ID: {attempt.id}</span>
            <div className="flex items-center gap-3">
              <Link href="/talent/passport">
                <Button variant="outline" size="sm">
                  View Capability Passport
                </Button>
              </Link>
              <Link href="/talent/opportunities">
                <Button variant="primary" size="sm">
                  Browse Matched Opportunities
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Expert Review Dispatch Confirmation Modal */}
      <Modal
        isOpen={expertModalOpen}
        onClose={() => setExpertModalOpen(false)}
        title="Dispatch Assessment for Accredited Review?"
        description="Your financial calculations and written commentary will be queued for Dr. Vikram Sen."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setExpertModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleRequestReview}>
              Confirm & Request Review
            </Button>
          </>
        }
      >
        <div className="text-xs text-slate-600 space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900">Reviewer Assignment:</span>
            <p>Dr. Vikram Sen — Senior Financial Modeler & CFO Advisory</p>
            <span className="text-[10px] text-teal-700 font-semibold block">
              Accreditation: ZAP-EXP-FIN-2024-0019 (Calibration: 97.2%)
            </span>
          </div>
          <p>
            Dr. Sen will perform a blind rubric evaluation. Once approved, your Capability Passport status for
            <em> Financial Analysis</em> will update to <strong>Expert-Reviewed</strong>.
          </p>
        </div>
      </Modal>
    </AppShell>
  );
}
