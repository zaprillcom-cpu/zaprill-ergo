'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Award,
  AlertCircle,
  HelpCircle,
  BarChart2,
  TrendingUp,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DimensionScores } from '@/lib/types';

export default function ExpertCalibrationPage() {
  const [activeTab, setActiveTab] = useState<'exercise' | 'history' | 'standards'>('exercise');

  // Interactive Calibration Exercise state
  const [exerciseScores, setExerciseScores] = useState<DimensionScores>({
    understanding: 18,
    application: 25,
    reasoning: 17,
    errorDetection: 12,
    transfer: 13,
  });
  const [tested, setTested] = useState(false);

  // Gold standard benchmark for the exercise
  const benchmarkScores: DimensionScores = {
    understanding: 18,
    application: 24,
    reasoning: 17,
    errorDetection: 13,
    transfer: 12,
  };

  const handleTestCalibration = () => {
    setTested(true);
  };

  const userSum = Object.values(exerciseScores).reduce((a, b) => a + b, 0);
  const benchmarkSum = Object.values(benchmarkScores).reduce((a, b) => a + b, 0);
  const variance = Math.abs(userSum - benchmarkSum);

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rubric Calibration & Inter-Rater Reliability</h1>
              <Badge variant="teal">Accredited Tier-1</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Blind standardization exercises to ensure consistent, unbiased scoring across the Zaprill Evaluator Network.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Next Mandatory Calibration:</span>
            <Badge variant="outline" className="font-mono text-xs">Nov 15, 2026</Badge>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Inter-Rater Consensus</span>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">96.4%</span>
              <span className="text-xs text-teal-600 font-semibold">Top 3% of Evaluators</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Standard target: ≥ 90.0%</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Mean Score Variance</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">±1.4 pts</span>
              <span className="text-xs text-indigo-600 font-semibold">Tight Cluster</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Tolerance threshold: ±3.0 pts</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Calibrations Completed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">12 / 12</span>
              <span className="text-xs text-emerald-600 font-semibold">100% Up to Date</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Annual cadence requirement met</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Evaluator Status</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">Lead Senior Fellow</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Domain: Corporate Finance & Valuation</p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('exercise')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'exercise'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Interactive Benchmark Drill
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Calibration History (Audit Trail)
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'standards'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            5-Dimension Anchor Guidelines
          </button>
        </div>

        {/* Tab 1: Interactive Drill */}
        {activeTab === 'exercise' && (
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50/60 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base text-slate-900">
                      Standard Practice Exercise: Q4 2026 Blind Benchmark #FN-402
                    </CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Prompt: Candidate submitted a 3-year DCF model for an omni-channel logistics aggregator.
                    </p>
                  </div>
                  <Badge variant="outline">Simulated Talent Submission</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Submission Excerpt */}
                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
                  <p className="text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    // Candidate Submission Abstract
                  </p>
                  <p className="leading-relaxed">
                    &quot;Identified fuel surcharge pass-through inefficiency: Fleet contracts lock carrier costs at ₹78/L, while billing clients with a 15-day lagged floating formula. When diesel rose to ₹94/L in Month 4, working capital gap expanded by ₹42 Lakhs. Solution: Implement dynamic index-linked surcharge formula updated on 1st & 16th of each month.&quot;
                  </p>
                </div>

                {/* Interactive Rubric Sliders */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Your Independent Evaluator Scores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'understanding', label: '1. Understanding (Conceptual Integrity)', max: 20 },
                      { key: 'application', label: '2. Application (Formula & Math Accuracy)', max: 30 },
                      { key: 'reasoning', label: '3. Reasoning (Strategic Commercial Logic)', max: 20 },
                      { key: 'errorDetection', label: '4. Error Detection (Spotting Hidden Pitfalls)', max: 15 },
                      { key: 'transfer', label: '5. Transfer (Applying to Edge Scenarios)', max: 15 },
                    ].map((dim) => {
                      const val = exerciseScores[dim.key as keyof DimensionScores];
                      return (
                        <div key={dim.key} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-slate-800">{dim.label}</span>
                            <span className="text-xs font-mono font-bold text-indigo-600">
                              {val} / {dim.max}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={dim.max}
                            value={val}
                            onChange={(e) =>
                              setExerciseScores({
                                ...exerciseScores,
                                [dim.key]: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full accent-indigo-600 cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm">
                    <span className="text-slate-500 font-medium">Your Total Score: </span>
                    <span className="text-base font-extrabold text-slate-900">{userSum} / 100</span>
                  </div>
                  <Button
                    onClick={handleTestCalibration}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Compare with Network Gold Benchmark
                  </Button>
                </div>

                {/* Tested Results Comparison */}
                {tested && (
                  <div className="mt-6 p-5 rounded-xl bg-teal-50 border border-teal-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                        Calibration Test Result: {variance <= 2 ? 'EXCELLENT ALIGNMENT' : 'ACCEPTABLE'}
                      </div>
                      <Badge variant="teal">Variance: ±{variance} pts</Badge>
                    </div>

                    <p className="text-xs text-teal-800 leading-relaxed">
                      Gold-standard consensus across 15 Senior Master Evaluators is <strong>{benchmarkSum} / 100</strong> (Understanding: 18, Application: 24, Reasoning: 17, Error Detection: 13, Transfer: 12).
                      Your score was <strong>{userSum} / 100</strong>, reflecting a high-precision concordance index of 97.6%.
                    </p>

                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      {Object.keys(benchmarkScores).map((k) => (
                        <div key={k} className="p-2 rounded bg-white/70 border border-teal-200">
                          <span className="text-[10px] text-slate-500 uppercase block truncate">{k}</span>
                          <span className="font-bold text-slate-900 text-xs">
                            {exerciseScores[k as keyof DimensionScores]} vs {benchmarkScores[k as keyof DimensionScores]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: Calibration History */}
        {activeTab === 'history' && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Historical Calibration Rounds</CardTitle>
              <p className="text-xs text-slate-500">Past audited quarterly blind sessions and peer concordance records.</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="py-3 px-4">Cycle</th>
                      <th className="py-3 px-4">Subject Area</th>
                      <th className="py-3 px-4">Your Score</th>
                      <th className="py-3 px-4">Gold Standard</th>
                      <th className="py-3 px-4">Delta</th>
                      <th className="py-3 px-4">Result</th>
                      <th className="py-3 px-4">Auditor Stamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {[
                      { cycle: 'Q3 2026', subject: 'Coworking Unit Economics', user: 89, gold: 88, delta: '+1', status: 'Passed', cert: 'VER-Q3-991' },
                      { cycle: 'Q2 2026', subject: 'SaaS DCF & Churn Cohorts', user: 92, gold: 91, delta: '+1', status: 'Passed', cert: 'VER-Q2-841' },
                      { cycle: 'Q1 2026', subject: 'Merchant Credit Lending', user: 85, gold: 87, delta: '-2', status: 'Passed', cert: 'VER-Q1-712' },
                      { cycle: 'Q4 2025', subject: 'Supply Chain Working Capital', user: 90, gold: 90, delta: '0', status: 'Passed (Perfect)', cert: 'VER-Q4-601' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-900">{row.cycle}</td>
                        <td className="py-3 px-4">{row.subject}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.user}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{row.gold}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-indigo-600">{row.delta}</td>
                        <td className="py-3 px-4">
                          <Badge variant="success">{row.status}</Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{row.cert}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Anchor Guidelines */}
        {activeTab === 'standards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                dimension: 'Understanding (0-20 pts)',
                desc: 'Assesses whether the candidate understands the foundational unit economics principles without superficial buzzwords.',
                anchors: [
                  '18-20 pts: Flawless grasp of fixed vs variable cost structure, operating leverage, and capital cycles.',
                  '14-17 pts: Solid grasp of key financial terms; minor omissions in balance sheet float.',
                  '< 13 pts: Confuses EBITDA with operating cash flow or misattributes lease liability.',
                ],
              },
              {
                dimension: 'Application (0-30 pts)',
                desc: 'Evaluates spreadsheet engineering, clean dynamic formulas, zero hardcoding, and mathematical precision.',
                anchors: [
                  '26-30 pts: Clean dynamic index-match, no circular references, modular formulas, clean formatting.',
                  '20-25 pts: Correct output with minor hardcoded assumptions or messy formatting.',
                  '< 20 pts: Broken formula logic, unreferenced cells, arithmetic mistakes.',
                ],
              },
              {
                dimension: 'Reasoning (0-20 pts)',
                desc: 'Evaluates strategic and commercial judgment. Can they synthesize numbers into actionable business recommendations?',
                anchors: [
                  '18-20 pts: Executive-ready memo with risk mitigation, cost-benefit trade-offs, and pricing decisions.',
                  '14-17 pts: Sound recommendations but lacks competitive pricing nuance.',
                  '< 13 pts: Merely recites calculated numbers without contextual executive guidance.',
                ],
              },
              {
                dimension: 'Error Detection (0-15 pts)',
                desc: 'Assesses whether candidate can identify planted modeling bugs, sneaky lease escalation traps, or hidden anomalies.',
                anchors: [
                  '13-15 pts: Instantly spots subtle escalations and unallocated central SG&A overhead.',
                  '10-12 pts: Identifies direct arithmetic errors but misses contractual lease escalation timing.',
                  '< 10 pts: Fails to detect obvious break-even inflation traps.',
                ],
              },
            ].map((guide, idx) => (
              <Card key={idx} className="p-5 border-slate-200 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{guide.dimension}</h4>
                  <p className="text-xs text-slate-500 mt-1">{guide.desc}</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {guide.anchors.map((anchor, aIdx) => (
                    <div key={aIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{anchor}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
