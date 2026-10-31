'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Building2, ChevronRight, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function TalentSimulationsPage() {
  const { state } = useZaprillStore();
  const simulations = state.simulations;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Real-World Business Simulations</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive sandbox environments modeled after real operational challenges across Indian commerce.
            </p>
          </div>
          <Badge variant="teal" size="md">
            6 Commercial Simulations
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim) => {
            const isCoworking = sim.id === 'sim-coworking-profitability';

            return (
              <Card
                key={sim.id}
                className={`hoverEffect flex flex-col justify-between ${
                  isCoworking ? 'border-indigo-300 ring-2 ring-indigo-500/10 shadow-md' : 'bg-white'
                }`}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={isCoworking ? 'indigo' : 'slate'} size="sm">
                      {sim.domain}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-semibold">{sim.companyName}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                      <Link href={`/talent/simulations/${sim.id}`}>{sim.title}</Link>
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {sim.brief}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-teal-700">Live Sensitivity Model</span>
                    <span className="text-slate-400">Interactive</span>
                  </div>
                </CardContent>

                <div className="p-3 px-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {isCoworking ? 'Primary Demo Case' : 'Sandbox Ready'}
                  </span>
                  <Link href={`/talent/simulations/${sim.id}`}>
                    <Button variant={isCoworking ? 'primary' : 'outline'} size="sm">
                      Launch Simulation
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
