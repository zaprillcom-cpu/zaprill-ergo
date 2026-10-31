'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function TalentCapabilityPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Capability Inventory & Benchmarks</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Deep-dive into your demonstrated skill levels, benchmark comparisons, and diagnostic dimension scores.
            </p>
          </div>
          <Link href="/talent/passport">
            <Button variant="primary" size="sm">
              <Award className="w-4 h-4 mr-1" />
              Open Passport View
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {talent.skills.map((skill) => (
            <Card key={skill.skillId} className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {skill.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{skill.name}</h3>
                </div>
                <CapabilityBadge level={skill.level} />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Demonstrated Score:</span>
                  <span className="text-lg font-black font-mono text-indigo-700">{skill.score}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Evidence Artifacts:</span>
                  <span className="text-sm font-bold text-teal-700 font-mono">{skill.evidenceCount} Files</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Last Tested:</span>
                  <span className="text-xs text-slate-700 font-mono">{skill.lastDemonstrated}</span>
                </div>
              </div>

              {skill.dimensions && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Dimensional Mastery:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-mono">
                    <div className="p-1.5 bg-slate-100/80 rounded border border-slate-200">
                      <span className="text-[9px] font-sans text-slate-500 block">Und.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.understanding}%</span>
                    </div>
                    <div className="p-1.5 bg-slate-100/80 rounded border border-slate-200">
                      <span className="text-[9px] font-sans text-slate-500 block">App.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.application}%</span>
                    </div>
                    <div className="p-1.5 bg-slate-100/80 rounded border border-slate-200">
                      <span className="text-[9px] font-sans text-slate-500 block">Reas.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.reasoning}%</span>
                    </div>
                    <div className="p-1.5 bg-slate-100/80 rounded border border-slate-200">
                      <span className="text-[9px] font-sans text-slate-500 block">Error</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.errorDetection}%</span>
                    </div>
                    <div className="p-1.5 bg-slate-100/80 rounded border border-slate-200">
                      <span className="text-[9px] font-sans text-slate-500 block">Trans.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.transfer}%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {skill.verifiedBy ? (
                  <span className="text-[11px] text-teal-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Verified by {skill.verifiedBy}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Self-Declared Assessment</span>
                )}

                <Link href={`/talent/capability/skills/${skill.skillId}`}>
                  <Button variant="outline" size="sm">
                    Inspect Benchmark
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
