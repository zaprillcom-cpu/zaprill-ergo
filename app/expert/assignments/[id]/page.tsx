'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye,
  EyeOff,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { DimensionScores } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';

export default function ExpertReviewAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { state, submitExpertReview } = useZaprillStore();

  const review =
    state.expertReviews.find((r) => r.id === id) || state.expertReviews[0];

  const attempt =
    state.attempts.find((a) => a.id === review.attemptId) || state.attempts[0];

  const candidate =
    state.talent.find((t) => t.id === review.talentId) || state.talent[0];

  // Conflict of Interest state
  const [coiAccepted, setCoiAccepted] = useState(review.coiDeclared);

  // Hidden AI scores state (Simulated AI scores stay hidden until expert reveals or saves evaluation)
  const [aiScoresRevealed, setAiScoresRevealed] = useState(review.status === 'completed');

  // Independent Rubric Scores
  const [scores, setScores] = useState<DimensionScores>(
    review.scores || {
      understanding: 19, // 19 / 20
      application: 26,   // 26 / 30
      reasoning: 18,     // 18 / 20
      errorDetection: 13,// 13 / 15
      transfer: 13,      // 13 / 15
    }
  );

  const [methodologyComment, setMethodologyComment] = useState(
    review.qualitativeComments?.methodology ||
      'Candidate demonstrated exemplary command of fixed vs variable real estate operational leverage. Formulas are clean with zero hardcoded values.'
  );
  const [analyticalComment, setAnalyticalComment] = useState(
    review.qualitativeComments?.analyticalDepth ||
      'Spotted the subtle 7.5% lease escalation trap in Mumbai and correctly calculated the resulting 17.9% EBITDA collapse.'
  );
  const [growthComment, setGrowthComment] = useState(
    review.qualitativeComments?.areasForGrowth ||
      'Could incorporate working capital cash conversion cycles into Tier-2 lease agreements.'
  );

  const [submitting, setSubmitting] = useState(false);
  const [completedSuccess, setCompletedSuccess] = useState(review.status === 'completed');

  const totalScore =
    Number(scores.understanding) +
    Number(scores.application) +
    Number(scores.reasoning) +
    Number(scores.errorDetection) +
    Number(scores.transfer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coiAccepted) return;
    setSubmitting(true);

    submitExpertReview(review.id, scores, {
      methodology: methodologyComment,
      analyticalDepth: analyticalComment,
      commercialInsight: 'Prudently rejects price-matching competitors in favor of higher-density private acoustic suites.',
      areasForGrowth: growthComment,
    });

    setTimeout(() => {
      setSubmitting(false);
      setCompletedSuccess(true);
      setAiScoresRevealed(true);
    }, 600);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/expert/assignments" className="hover:text-indigo-600 transition-colors">
            ← Back to Review Queue
          </Link>
          <span className="font-mono text-indigo-700 font-semibold">Assignment ID: {review.id}</span>
        </div>

        {/* Header Card */}
        <Card className="p-6 bg-white border-indigo-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={completedSuccess ? 'teal' : 'amber'} size="sm" className="capitalize">
                  {completedSuccess ? 'Review Certified' : 'Evaluation Pending'}
                </Badge>
                <span className="text-xs text-slate-500 font-mono">Honorarium: {formatINR(review.feeINR)}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 mt-1">{review.assessmentTitle}</h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Candidate: <strong>{candidate.name}</strong> ({candidate.location}) • Self-Taught Financial Modeler
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold block">Requested Date</span>
              <span className="text-xs font-mono text-slate-700">{formatDate(review.requestedAt)}</span>
            </div>
          </div>
        </Card>

        {/* Step 1: Conflict of Interest Sign-off */}
        <Card className={`p-5 transition-all ${coiAccepted ? 'bg-white border-slate-200' : 'bg-amber-50/50 border-amber-300'}`}>
          <div className="flex items-start gap-3">
            <ShieldCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${coiAccepted ? 'text-teal-600' : 'text-amber-600'}`} />
            <div className="space-y-2 flex-1 text-xs">
              <span className="font-bold text-slate-900 block text-sm">
                Accredited Conflict-of-Interest Declaration (COI)
              </span>
              <p className="text-slate-600 leading-relaxed">
                By evaluating this candidate, you affirm that you have no personal, financial, familial, or direct managerial
                conflict of interest with <strong>{candidate.name}</strong> or any hiring entity involved. Evaluations must be
                conducted objectively under the Zaprill Code of Evaluator Conduct.
              </p>
              <label className="flex items-center gap-2 pt-1 font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coiAccepted}
                  disabled={completedSuccess}
                  onChange={(e) => setCoiAccepted(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>I declare that I have no conflict of interest with this candidate or assignment.</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Step 2: Inspect Candidate's Submission */}
        {coiAccepted ? (
          <div className="space-y-6">
            <Card className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <CardTitle className="text-sm">Candidate Written Submissions & Model Outputs</CardTitle>
                <span className="text-xs text-indigo-600 font-mono">Attempt ID: {attempt.id}</span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Stage 1: Understanding (Formula & Cost Behavior Definition)
                  </span>
                  <p className="text-slate-700 font-mono text-[11px] leading-relaxed">
                    "{attempt.answers.stage1Understanding}"
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Stage 2: Application (Operational Model Outputs)
                  </span>
                  <div className="font-mono text-[11px] text-slate-700 p-2.5 bg-white rounded-lg border border-slate-200">
                    Location 1 (Mumbai): EBITDA ₹7,67,000 (21.5% margin) • BE: 193.1 desks (64.4%)<br />
                    Location 2 (Bengaluru): EBITDA ₹7,36,000 (26.1% margin) • BE: 162.5 desks (65.0%)<br />
                    Location 3 (Gurugram +10% utility): EBITDA ₹5,42,000 (12.1% margin) • BE: 246.1 desks (61.5%)
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Stage 3: Reasoning (Lease Escalation Defense Thesis)
                  </span>
                  <p className="text-slate-700 font-mono text-[11px] leading-relaxed">
                    "{attempt.answers.stage3Reasoning}"
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Stage 4: Error Detection (Junior Analyst Audit)
                  </span>
                  <p className="text-slate-700 font-mono text-[11px] leading-relaxed">
                    "{attempt.answers.stage4ErrorDetection}"
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Stage 5: Strategic Transfer (Tier-2 Hub Expansion Framework)
                  </span>
                  <p className="text-slate-700 font-mono text-[11px] leading-relaxed">
                    "{attempt.answers.stage5Transfer}"
                  </p>
                </div>
              </div>
            </Card>

            {/* Blind Scoring Notice regarding AI score */}
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                {aiScoresRevealed ? <Eye className="w-4 h-4 text-indigo-600" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                <span className="text-slate-700">
                  {aiScoresRevealed
                    ? `Simulated AI Baseline Score: ${attempt.totalScore}/100 (Revealed for calibration review).`
                    : 'Simulated AI scores are hidden to prevent evaluator anchoring bias. Complete your independent scores below.'}
                </span>
              </div>
              {!aiScoresRevealed && (
                <button
                  type="button"
                  onClick={() => setAiScoresRevealed(true)}
                  className="text-indigo-600 hover:underline font-semibold text-[11px]"
                >
                  Reveal AI Score
                </button>
              )}
            </div>

            {/* Step 3: Independent Evaluator Scoring Form */}
            <form onSubmit={handleSubmit}>
              <Card className="p-6 bg-white space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <CardTitle className="text-base">Bounded Evaluator Rubric Scoring</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter your independent marks across the 5 dimensions. Points must satisfy stage boundaries.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Certified Total</span>
                    <span className="text-2xl font-black font-mono text-indigo-700">{totalScore}/100</span>
                  </div>
                </div>

                {/* 5 Bounded Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="font-bold text-slate-800 block">Stage 1: Understanding</label>
                    <span className="text-[10px] text-slate-400 block">Max 20 Pts</span>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      disabled={completedSuccess}
                      value={scores.understanding}
                      onChange={(e) => setScores({ ...scores, understanding: Number(e.target.value) })}
                      className="w-full text-center font-mono font-bold text-base p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="font-bold text-slate-800 block">Stage 2: Application</label>
                    <span className="text-[10px] text-slate-400 block">Max 30 Pts</span>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      disabled={completedSuccess}
                      value={scores.application}
                      onChange={(e) => setScores({ ...scores, application: Number(e.target.value) })}
                      className="w-full text-center font-mono font-bold text-base p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="font-bold text-slate-800 block">Stage 3: Reasoning</label>
                    <span className="text-[10px] text-slate-400 block">Max 20 Pts</span>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      disabled={completedSuccess}
                      value={scores.reasoning}
                      onChange={(e) => setScores({ ...scores, reasoning: Number(e.target.value) })}
                      className="w-full text-center font-mono font-bold text-base p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="font-bold text-slate-800 block">Stage 4: Error Detect</label>
                    <span className="text-[10px] text-slate-400 block">Max 15 Pts</span>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      disabled={completedSuccess}
                      value={scores.errorDetection}
                      onChange={(e) => setScores({ ...scores, errorDetection: Number(e.target.value) })}
                      className="w-full text-center font-mono font-bold text-base p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <label className="font-bold text-slate-800 block">Stage 5: Transfer</label>
                    <span className="text-[10px] text-slate-400 block">Max 15 Pts</span>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      disabled={completedSuccess}
                      value={scores.transfer}
                      onChange={(e) => setScores({ ...scores, transfer: Number(e.target.value) })}
                      className="w-full text-center font-mono font-bold text-base p-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                {/* Qualitative Remarks */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Evaluator Methodology & Formula Remarks:
                    </label>
                    <textarea
                      rows={2}
                      disabled={completedSuccess}
                      value={methodologyComment}
                      onChange={(e) => setMethodologyComment(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Analytical Depth & Strategic Instinct:
                    </label>
                    <textarea
                      rows={2}
                      disabled={completedSuccess}
                      value={analyticalComment}
                      onChange={(e) => setAnalyticalComment(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Areas for Professional Growth:
                    </label>
                    <textarea
                      rows={2}
                      disabled={completedSuccess}
                      value={growthComment}
                      onChange={(e) => setGrowthComment(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {completedSuccess ? (
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-sm block">Independent Evaluation Submitted!</span>
                        <span>Aarav Mehta’s Capability Passport is now verified at the Expert-Reviewed tier.</span>
                      </div>
                    </div>
                    <Link href="/talent/passport">
                      <Button variant="outline" size="sm">
                        View Updated Passport
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button variant="primary" size="lg" className="w-full" loading={submitting}>
                    <Sparkles className="w-4 h-4 text-amber-300 mr-1" />
                    Submit Certified Report ({totalScore}/100 Pts)
                  </Button>
                )}
              </Card>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
            Please sign the Conflict-of-Interest declaration above to unlock candidate submissions and rubric inputs.
          </div>
        )}
      </div>
    </AppShell>
  );
}
