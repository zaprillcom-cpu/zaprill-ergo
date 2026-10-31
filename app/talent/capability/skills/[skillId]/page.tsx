'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function SkillBenchmarkDetailPage() {
  const params = useParams();
  const skillId = params?.skillId as string;
  const { state } = useZaprillStore();
  const talent = state.talent[0];

  const skillDef = state.skills.find((s) => s.id === skillId) || state.skills[0];
  const talentSkill = talent.skills.find((s) => s.skillId === skillDef.id);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/talent/capability" className="hover:text-indigo-600 transition-colors">
            ← Back to Capability Inventory
          </Link>
          <span className="font-mono text-indigo-700 font-semibold">{skillDef.category}</span>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Capability Benchmark Spec
              </span>
              <h1 className="text-xl font-bold text-slate-900 mt-0.5">{skillDef.name}</h1>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{skillDef.description}</p>
            </div>
            {talentSkill && <CapabilityBadge level={talentSkill.level} />}
          </div>

          {/* Subskills */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 block mb-2">Evaluated Competency Subskills:</span>
            <div className="flex flex-wrap gap-2">
              {skillDef.subskills.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  ✓ {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Benchmarks Matrix */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-900 block">Market Benchmark Thresholds:</span>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 font-sans block text-[10px]">Junior Analyst</span>
                <span className="text-base font-bold text-slate-700">{skillDef.benchmarks.junior}+ Pts</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-indigo-200 ring-2 ring-indigo-500/20">
                <span className="text-indigo-600 font-sans font-bold block text-[10px]">Mid Specialist</span>
                <span className="text-base font-black text-indigo-700">{skillDef.benchmarks.mid}+ Pts</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 font-sans block text-[10px]">Senior / Lead</span>
                <span className="text-base font-bold text-slate-700">{skillDef.benchmarks.senior}+ Pts</span>
              </div>
            </div>
            {talentSkill && (
              <p className="text-[11px] text-teal-800 font-medium">
                Your Demonstrated Score of <strong>{talentSkill.score}/100</strong> places you above the Mid Specialist
                benchmark threshold for Indian commercial real estate and corporate finance.
              </p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
