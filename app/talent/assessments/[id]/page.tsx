'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileCheck2,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function AssessmentBriefPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const assessment =
    state.assessments.find((a) => a.id === id) || state.assessments[0];

  const hasAttempted = state.attempts.some((att) => att.assessmentId === assessment.id);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/talent/assessments" className="hover:text-indigo-600 transition-colors">
            ← Back to Assessments Catalog
          </Link>
          <span className="font-mono text-indigo-700 font-semibold">{assessment.category}</span>
        </div>

        {/* Title Card */}
        <Card className="p-6 bg-white border-indigo-100 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="indigo" size="md">
              {assessment.difficulty} Level
            </Badge>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {assessment.durationMinutes} Minutes Duration
              </span>
              <span>•</span>
              <span className="font-bold text-teal-700">100 Total Points (5 Stages)</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{assessment.title}</h1>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              Demonstrated Skill: <strong>{assessment.skillName}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {assessment.description}
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2 text-xs text-slate-700">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Scenario Context:
            </h3>
            <p className="leading-relaxed">{assessment.scenario}</p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href={`/talent/assessments/${assessment.id}/attempt`}>
              <Button variant="primary" size="lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Begin Diagnostic Attempt
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            {hasAttempted && (
              <Link href={`/talent/assessments/${assessment.id}/results`}>
                <Button variant="outline" size="lg">
                  View Previous Attempt Results (82 Pts)
                </Button>
              </Link>
            )}
          </div>
        </Card>

        {/* 5 Stages Preview */}
        <Card className="p-6 bg-white space-y-4">
          <CardTitle className="text-sm">Structure of this 5-Stage Assessment</CardTitle>
          <div className="space-y-3">
            {[
              { stage: 'Stage 1: Understanding', pts: '20 Points', desc: 'Define mathematical equations and cost allocation theories.' },
              { stage: 'Stage 2: Application', pts: '30 Points', desc: 'Calculate monthly revenues, OpEx, and EBITDA in the interactive model sheet.' },
              { stage: 'Stage 3: Reasoning', pts: '20 Points', desc: 'Formulate an economic defense against landlord rent escalation and price cuts.' },
              { stage: 'Stage 4: Error Detection', pts: '15 Points', desc: 'Diagnose formula flaws in junior analyst breakeven calculations.' },
              { stage: 'Stage 5: Transfer', pts: '15 Points', desc: 'Adapt financial frameworks to expansion into Tier-2 Indian hubs.' },
            ].map((stg) => (
              <div key={stg.stage} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900">{stg.stage}</h4>
                  <p className="text-slate-500 mt-0.5">{stg.desc}</p>
                </div>
                <span className="font-mono font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 flex-shrink-0">
                  {stg.pts}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
