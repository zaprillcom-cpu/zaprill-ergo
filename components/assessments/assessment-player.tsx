'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  FileCheck2,
  HelpCircle,
  Calculator,
} from 'lucide-react';
import { Assessment, DimensionScores } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { FinancialModelSheet } from './financial-model-sheet';
import { useZaprillStore } from '@/lib/store';

export function AssessmentPlayer({ assessment }: { assessment: Assessment }) {
  const router = useRouter();
  const { submitAssessmentAttempt } = useZaprillStore();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.durationMinutes * 60);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('Just now');

  // Form answer state
  const [answers, setAnswers] = useState({
    stage1Understanding: '',
    stage2ApplicationModel: null as any,
    stage3Reasoning: '',
    stage4ErrorDetection: '',
    stage5Transfer: '',
  });

  // Simulated countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFillSampleAnswers = () => {
    if (!assessment.stages || assessment.stages.length < 5) return;
    setAnswers({
      stage1Understanding: assessment.stages[0].sampleAnswer || '',
      stage2ApplicationModel: {
        mumbaiRevenue: 3567000,
        mumbaiOpEx: 2800000,
        mumbaiEBITDA: 767000,
        blrRevenue: 2816000,
        blrOpEx: 2080000,
        blrEBITDA: 736000,
        gurugramRevenue: 4480000,
        gurugramOpEx: 3938000,
        gurugramEBITDA: 542000,
      },
      stage3Reasoning: assessment.stages[2].sampleAnswer || '',
      stage4ErrorDetection: assessment.stages[3].sampleAnswer || '',
      stage5Transfer: assessment.stages[4].sampleAnswer || '',
    });
    setLastSaved('Autosaved with sample answers');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Seeded dimension scores yielding exactly 82 points:
    // 18/20 (90%), 24/30 (80%), 16/20 (80%), 12/15 (80%), 12/15 (80%) = 82/100
    const scores: DimensionScores = {
      understanding: 18,
      application: 24,
      reasoning: 16,
      errorDetection: 12,
      transfer: 12,
    };

    submitAssessmentAttempt(assessment.id, answers, scores);

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmModalOpen(false);
      router.push(`/talent/assessments/${assessment.id}/results`);
    }, 600);
  };

  const stages = assessment.stages || [];
  const currentStage = stages[currentStageIndex];

  return (
    <div className="space-y-6">
      {/* Top Floating Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4 sticky top-14 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">{assessment.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>5 Practical Diagnostic Stages</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">100 Total Points</span>
              <span>•</span>
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {lastSaved}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Fill Sample Answers Button for Presentations */}
          <Button
            variant="amber"
            size="sm"
            onClick={handleFillSampleAnswers}
            title="Pre-populate rigorous answers for seamless presentation testing"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Fill Sample Answers
          </Button>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs font-semibold text-slate-700">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <Button variant="primary" size="sm" onClick={() => setConfirmModalOpen(true)}>
            Finish & Submit
          </Button>
        </div>
      </div>

      {/* 5-Stage Stepper Bar */}
      <div className="grid grid-cols-5 gap-2">
        {stages.map((stg, idx) => {
          const isActive = idx === currentStageIndex;
          const isFilled =
            (idx === 0 && answers.stage1Understanding) ||
            (idx === 1 && answers.stage2ApplicationModel) ||
            (idx === 2 && answers.stage3Reasoning) ||
            (idx === 3 && answers.stage4ErrorDetection) ||
            (idx === 4 && answers.stage5Transfer);

          return (
            <button
              key={stg.id}
              onClick={() => setCurrentStageIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                <span>Stage {idx + 1}</span>
                <span className="font-mono text-indigo-700">{stg.maxPoints} pts</span>
              </div>
              <p
                className={`text-xs font-medium truncate ${
                  isActive ? 'text-indigo-950 font-bold' : 'text-slate-700'
                }`}
              >
                {stg.stageName}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div
                  className={`w-full h-1 rounded-full ${
                    isFilled ? 'bg-teal-500' : 'bg-slate-200'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Card */}
      {currentStage && (
        <Card className="shadow-sm">
          <CardHeader>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Stage {currentStageIndex + 1} of 5
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {currentStage.stageName} Dimension
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-bold text-teal-700">
                  Maximum: {currentStage.maxPoints} Points
                </span>
              </div>
              <CardTitle className="text-lg mt-1">{currentStage.title}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Instruction Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed">
              <p className="font-medium">{currentStage.instruction}</p>

              {currentStage.rubricHints && (
                <div className="mt-3 pt-3 border-t border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-600 block mb-1">
                    Diagnostic Rubric Highlights (How you will be evaluated):
                  </span>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-slate-600">
                    {currentStage.rubricHints.map((hint, hIdx) => (
                      <li key={hIdx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Stage 2 Special: Interactive Financial Table */}
            {currentStageIndex === 1 && (
              <div className="space-y-4">
                <FinancialModelSheet
                  onChange={(computed) => {
                    setAnswers((prev) => ({ ...prev, stage2ApplicationModel: computed }));
                    setLastSaved('Autosaved model updates');
                  }}
                />
              </div>
            )}

            {/* Written Input Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {currentStageIndex === 1
                  ? 'Executive Commentary & Summary Outputs (Paste or summarize your calculated numbers):'
                  : 'Your Written Analytical Response:'}
              </label>

              {currentStageIndex === 0 && (
                <textarea
                  rows={8}
                  value={answers.stage1Understanding}
                  onChange={(e) => setAnswers({ ...answers, stage1Understanding: e.target.value })}
                  placeholder={currentStage.inputPlaceholder}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              )}

              {currentStageIndex === 1 && (
                <textarea
                  rows={5}
                  value={
                    typeof answers.stage2ApplicationModel === 'string'
                      ? answers.stage2ApplicationModel
                      : answers.stage2ApplicationModel
                      ? JSON.stringify(answers.stage2ApplicationModel, null, 2)
                      : ''
                  }
                  onChange={(e) => setAnswers({ ...answers, stage2ApplicationModel: e.target.value })}
                  placeholder="Summarize your final EBITDA margins and break-even occupancies across Mumbai, Bengaluru, and Gurugram..."
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              )}

              {currentStageIndex === 2 && (
                <textarea
                  rows={8}
                  value={answers.stage3Reasoning}
                  onChange={(e) => setAnswers({ ...answers, stage3Reasoning: e.target.value })}
                  placeholder={currentStage.inputPlaceholder}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              )}

              {currentStageIndex === 3 && (
                <textarea
                  rows={8}
                  value={answers.stage4ErrorDetection}
                  onChange={(e) => setAnswers({ ...answers, stage4ErrorDetection: e.target.value })}
                  placeholder={currentStage.inputPlaceholder}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              )}

              {currentStageIndex === 4 && (
                <textarea
                  rows={8}
                  value={answers.stage5Transfer}
                  onChange={(e) => setAnswers({ ...answers, stage5Transfer: e.target.value })}
                  placeholder={currentStage.inputPlaceholder}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              )}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStageIndex === 0}
              onClick={() => setCurrentStageIndex(currentStageIndex - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Stage
            </Button>

            <div className="flex items-center gap-2">
              {currentStageIndex < stages.length - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentStageIndex(currentStageIndex + 1)}
                >
                  Next: Stage {currentStageIndex + 2}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="teal" size="sm" onClick={() => setConfirmModalOpen(true)}>
                  Submit Final Assessment
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Submit Assessment Attempt for Evaluation?"
        description="Your responses and operational calculations will be evaluated across the 5 diagnostic dimensions."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setConfirmModalOpen(false)}>
              Keep Editing
            </Button>
            <Button variant="primary" size="sm" loading={isSubmitting} onClick={handleSubmit}>
              Confirm Submission
            </Button>
          </>
        }
      >
        <div className="text-xs text-slate-600 space-y-3">
          <p>
            Upon submission, you will immediately receive an <strong>illustrative simulated AI evaluation</strong> with
            normalized dimension percentages, strengths, and improvement suggestions.
          </p>
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-800">
            🎯 <strong>Next Step in Story:</strong> From the results screen, you can request an accredited peer review
            from <strong>Dr. Vikram Sen</strong> to upgrade your Capability Passport to <em>Expert-Reviewed</em>.
          </div>
        </div>
      </Modal>
    </div>
  );
}
