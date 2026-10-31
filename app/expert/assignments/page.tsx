'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';
import { formatDate, formatINR } from '@/lib/utils';

export default function ExpertAssignmentsQueuePage() {
  const { state } = useZaprillStore();
  const expert = state.experts[0]; // Dr. Vikram Sen
  const assignments = state.expertReviews.filter((r) => r.expertId === expert.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Accredited Review Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic submissions assigned to your domain accreditation. Conduct blind rubric evaluations.
          </p>
        </div>

        <div className="space-y-3">
          {assignments.map((rev) => (
            <Card key={rev.id} className="p-6 bg-white border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{rev.assessmentTitle}</h3>
                    <Badge variant={rev.status === 'completed' ? 'teal' : 'amber'} size="sm" className="capitalize text-[10px]">
                      {rev.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-600 font-medium block mt-0.5">
                    Candidate: <strong>{rev.talentName}</strong> • Honorarium: <strong className="font-mono text-indigo-700">{formatINR(rev.feeINR)}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Assigned on {formatDate(rev.requestedAt)}
                  </span>
                </div>
              </div>

              <Link href={`/expert/assignments/${rev.id}`}>
                <Button variant={rev.status === 'pending' ? 'amber' : 'outline'} size="sm">
                  {rev.status === 'pending' ? 'Conduct Evaluation' : 'Inspect Report'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
