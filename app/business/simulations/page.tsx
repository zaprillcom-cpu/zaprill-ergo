'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Building2, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function BusinessSimulationsPage() {
  const { state } = useZaprillStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Business Case Simulations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational scenarios modeled after real commercial dilemmas across Indian commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.simulations.map((sim) => (
            <Card key={sim.id} className="p-5 bg-white border-slate-200 shadow-xs flex flex-col justify-between hoverEffect">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="indigo" size="sm">
                    {sim.domain}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">{sim.companyName}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{sim.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{sim.brief}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-teal-700 font-semibold">Interactive Sandbox</span>
                <Link href={`/talent/simulations/${sim.id}`}>
                  <Button variant="outline" size="sm">
                    Open Case
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
