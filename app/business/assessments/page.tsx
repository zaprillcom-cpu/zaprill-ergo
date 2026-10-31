'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2, Clock, Award, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function BusinessAssessmentsPage() {
  const { state } = useZaprillStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hiring Assessment Benchmarks</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic rubrics used to benchmark candidate problem-solving maturity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.assessments.map((a) => (
            <Card key={a.id} className="p-5 bg-white border-slate-200 shadow-xs flex flex-col justify-between hoverEffect">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="indigo" size="sm">
                    {a.category}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">{a.difficulty}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{a.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{a.description}</p>
                <div className="text-xs text-indigo-700 font-mono font-semibold">
                  Skill: {a.skillName}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">{a.durationMinutes} mins • 5 Stages</span>
                <Link href={`/talent/assessments/${a.id}`}>
                  <Button variant="outline" size="sm">
                    Inspect Rubric
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
