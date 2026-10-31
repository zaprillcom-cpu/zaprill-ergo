'use client';

import React from 'react';
import { Network, Sparkles, ShieldCheck, Share2, Info } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CapabilityGraph } from '@/components/graph/capability-graph';
import { useZaprillStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

export default function AdminGraphPage() {
  const { state } = useZaprillStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interactive Capability Graph</h1>
              <Badge variant="teal">Ontology Engine v2.4</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Live multi-relational graph connecting verified talent, skills, practical diagnostic assessments, submitted evidence, and employer opportunities.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
          <div className="text-xs text-indigo-950 space-y-1">
            <span className="font-bold block">How the Capability Graph works:</span>
            <p className="leading-relaxed text-indigo-900">
              Unlike keyword-matching job boards, Zaprill computes matchmaking based on direct evidence-backed graph edges. Click any node below to inspect relationships, validation provenance, and transparent match scores (e.g. Aarav Mehta ➔ HarbourDesk Coworking Analyst).
            </p>
          </div>
        </div>

        {/* Capability Graph Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <CapabilityGraph nodes={state.graphNodes} edges={state.graphEdges} />
        </div>
      </div>
    </AppShell>
  );
}
