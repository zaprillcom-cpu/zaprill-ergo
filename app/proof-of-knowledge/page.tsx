'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileCheck2,
  Award,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function ProofOfKnowledgePage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="teal" size="md">
              Evaluation Methodology
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Proof of Knowledge (PoK): The 5-Dimension Diagnostic Architecture
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Why high aggregate scores alone never prove workplace readiness, and how Zaprill’s multi-dimensional
              rubrics dissect practical problem-solving capability.
            </p>
          </div>

          {/* Principle Alert Box */}
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Core Epistemological Principle:
            </div>
            <p className="leading-relaxed">
              Zaprill does <strong>not</strong> label someone competent solely because of an aggregate number. A candidate
              who scores 95% on theoretical multiple-choice but scores 30% on <em>Error Detection</em> or <em>Transfer</em> is
              a severe operational liability in a production company. Every Capability Passport breaks down all 5
              dimensions independently.
            </p>
          </div>

          {/* 5 Dimensions In-Depth Breakdown */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">The Five Evaluation Dimensions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dim 1 */}
              <Card className="p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-600 uppercase">Dimension 01</span>
                  <Badge variant="indigo" size="sm">
                    Max: 20 Points (20%)
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">Understanding & Theoretical Architecture</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Can the candidate accurately define core concepts and mathematical equations? In the finance domain,
                  this tests the derivation of contribution margin, operating leverage, and the behavioral difference
                  between fixed occupancy overhead and variable member costs.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                  <strong>Example Check:</strong> Explaining why 65% occupancy produces negative net cash flow despite positive gross unit margin.
                </div>
              </Card>

              {/* Dim 2 */}
              <Card className="p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-600 uppercase">Dimension 02</span>
                  <Badge variant="teal" size="sm">
                    Max: 30 Points (30%)
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">Application & Live Modeling Precision</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Can the candidate manipulate a messy real-world dataset to calculate exact outputs? Tests arithmetic
                  reconciliation, formula logic, spreadsheet construction, and handling live parameter surges (e.g. utility
                  tariffs or currency fluctuations).
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                  <strong>Example Check:</strong> Calculating monthly EBITDA and break-even desks across Mumbai, Bengaluru, and Gurugram hubs.
                </div>
              </Card>

              {/* Dim 3 */}
              <Card className="p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-600 uppercase">Dimension 03</span>
                  <Badge variant="indigo" size="sm">
                    Max: 20 Points (20%)
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">Reasoning & Sensitivity Analysis</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When assumptions break or market competitors slash rates, does the candidate make prudent decisions?
                  Tests commercial intuition, trade-off evaluation, and sensitivity modeling under uncertainty.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                  <strong>Example Check:</strong> Proving why price-matching a competitor collapses Mumbai EBITDA from 21.5% to 3.6%.
                </div>
              </Card>

              {/* Dim 4 */}
              <Card className="p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-600 uppercase">Dimension 04</span>
                  <Badge variant="amber" size="sm">
                    Max: 15 Points (15%)
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">Error Detection & Quality Auditing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real jobs involve auditing work done by others. Candidates are presented with junior models containing
                  subtle formula bugs, omitted overheads, or circularity traps, and must diagnose the hazard.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                  <strong>Example Check:</strong> Spotting the omission of ₹2 Lakh fixed utility bills from a breakeven calculation.
                </div>
              </Card>

              {/* Dim 5 */}
              <Card className="p-6 space-y-3 bg-white md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-600 uppercase">Dimension 05</span>
                  <Badge variant="teal" size="sm">
                    Max: 15 Points (15%)
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">Transfer to Unfamiliar Contexts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Can the candidate take a proven solution and adapt it to a completely different market structure? In
                  coworking, this tests how unit economics frameworks adjust when expanding from Mumbai into Tier-2 cities
                  with lower rents but extended absorption cycles.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                  <strong>Example Check:</strong> Adapting from rent-intensity optimization to working capital absorption velocity in Tier-2 hubs.
                </div>
              </Card>
            </div>
          </div>

          {/* AI vs Human Expert Separation */}
          <Card className="p-8 bg-white border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Separation of Simulated AI vs. Accredited Human Evaluation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 mt-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Simulated AI Diagnostic:
                </div>
                <p>
                  Instant initial evaluation. Benchmarks quantitative formulas and semantic reasoning against standard
                  rubrics. Always clearly badged: <em>“Simulated AI evaluation — illustrative result.”</em>
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-900">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Accredited Expert Review:
                </div>
                <p>
                  Conducted by seasoned CFOs, Senior Modelers, or Principal Engineers. Evaluators do not see automated AI
                  scores until they record their own independent score, eliminating confirmation bias.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
