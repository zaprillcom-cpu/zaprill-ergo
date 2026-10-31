'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';
import { formatDate, formatINR } from '@/lib/utils';

export default function TalentValidationPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const reviews = state.expertReviews.filter((r) => r.talentId === talent.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Expert Validation & Trust Ledger</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Independent audit records conducted by accredited senior practitioners.
            </p>
          </div>
          <Badge variant="indigo" size="md">
            Accredited Verification Protocol
          </Badge>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <Card className="p-8 text-center text-xs text-slate-500">
              No validation reviews requested yet.
            </Card>
          ) : (
            reviews.map((rev) => (
              <Card key={rev.id} className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{rev.assessmentTitle}</h3>
                        <Badge
                          variant={rev.status === 'completed' ? 'teal' : 'amber'}
                          size="sm"
                          className="capitalize text-[10px]"
                        >
                          {rev.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Assigned Reviewer: <strong>{rev.expertName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Honorarium Fee</span>
                    <span className="text-xs font-mono font-bold text-slate-700">{formatINR(rev.feeINR)}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Requested Date:</span>
                    <span className="font-mono text-slate-700">{formatDate(rev.requestedAt)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Conflict-of-Interest Declaration:</span>
                    <span className={rev.coiDeclared ? 'text-teal-700 font-bold' : 'text-amber-700 font-semibold'}>
                      {rev.coiDeclared ? '✓ Declared & Verified' : 'Pending Declaration by Reviewer'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Passport Status:</span>
                    <span className="font-bold text-indigo-700">
                      {rev.status === 'completed' ? 'Expert-Reviewed' : 'Pending Review'}
                    </span>
                  </div>
                </div>

                {rev.qualitativeComments && (
                  <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 space-y-2 text-xs">
                    <span className="font-bold text-teal-900 block">Evaluator Remarks:</span>
                    <p className="italic text-slate-700 leading-relaxed">
                      "{rev.qualitativeComments.methodology}"
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-teal-800">
                      <span>Evaluated Score: {rev.totalScore}/100</span>
                      <span>Certified on {formatDate(rev.completedAt || '')}</span>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
