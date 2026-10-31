'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function AssessmentsPage() {
  const { assessments, completeAssessment } = useAuth();
  const [activeAssessmentId, setActiveAssessmentId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [scorePercentage, setScorePercentage] = useState<number | null>(null);

  const activeAssessment = assessments.find((a) => a.id === activeAssessmentId);

  const handleStart = (id: string) => {
    setActiveAssessmentId(id);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScorePercentage(null);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleFinish = () => {
    if (!activeAssessment) return;
    let correctCount = 0;
    activeAssessment.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / activeAssessment.questions.length) * 100);
    setScorePercentage(calculatedScore);
    setShowResults(true);
    completeAssessment(activeAssessment.id, calculatedScore);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Active Assessment Runner Modal/View */}
      {activeAssessment && !showResults && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#0F2B5D] tracking-wider">
                Active Assessment · Question {currentQuestionIdx + 1} of {activeAssessment.questions.length}
              </span>
              <h2 className="text-lg font-black text-[#0F2B5D] tracking-tight mt-0.5">
                {activeAssessment.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveAssessmentId(null)}
              className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
            >
              Exit Assessment
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0F2B5D] to-[#16C5A6] transition-all duration-300"
              style={{
                width: `${((currentQuestionIdx + 1) / activeAssessment.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Current Question */}
          {activeAssessment.questions[currentQuestionIdx] && (
            <div className="space-y-4 py-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {activeAssessment.questions[currentQuestionIdx].question}
              </h3>

              <div className="space-y-2.5 pt-2">
                {activeAssessment.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                  const qId = activeAssessment.questions[currentQuestionIdx].id;
                  const isSelected = selectedAnswers[qId] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(qId, optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#16C5A6] bg-[#16C5A6]/10 text-slate-900 font-semibold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#16C5A6] text-[#091B3A]'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestionIdx < activeAssessment.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#0F2B5D] text-white text-xs font-bold hover:bg-[#133672]"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-md shadow-[#16C5A6]/25 hover:bg-[#12A88E]"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      )}

      {/* Result Breakdown Card if submitted */}
      {showResults && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Evaluation Complete
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Assessment Score: {scorePercentage}%
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
              Congratulations! Your score has been verified and factored into your overall{' '}
              <strong className="text-slate-900">Career Health Index</strong>.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setShowResults(false);
                setActiveAssessmentId(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Back to Assessments Hub
            </button>

            <Link
              href="/dashboard/career-health"
              className="px-5 py-2.5 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-md hover:bg-[#12A88E]"
            >
              View Updated Health Score →
            </Link>
          </div>
        </div>
      )}

      {/* Assessments Catalog Header */}
      {!activeAssessmentId && (
        <>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16C5A6]/15 text-[#0F766E] text-xs font-bold mb-3 border border-[#16C5A6]/30">
                <FileCheck2 className="w-3.5 h-3.5 text-[#16C5A6]" />
                <span>Verified Career Benchmarks</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F2B5D] tracking-tight">
                Career & Technical Assessments
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Objective evaluations designed to prove your problem-solving capabilities, elevate your ATS ranking, and unlock premium salary bands.
              </p>
            </div>
          </div>

          {/* Assessments Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-[#16C5A6]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {mod.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        mod.difficulty === 'Advanced'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {mod.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{mod.questionsCount} Qs</span> · {mod.durationMinutes} mins
                    {mod.lastScore && (
                      <span className="block text-emerald-600 font-bold mt-0.5">
                        Last Score: {mod.lastScore}%
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleStart(mod.id)}
                    className="px-4 py-2 rounded-xl bg-[#0F2B5D] text-white hover:bg-[#133672] text-xs font-bold transition-colors"
                  >
                    {mod.isCompleted ? 'Retake' : 'Start Assessment'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
