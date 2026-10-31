'use client';

import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Clock } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function BusinessValidationPage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Verification & Trust Status</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Zaprill platform verification status and compliance records.
          </p>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Platform Verified Business Badge</h3>
                <span className="text-xs text-slate-500">
                  Issued on {biz.verificationBadgeDate || '2026-08-15'} by Zaprill Platform Trust & Safety
                </span>
              </div>
            </div>
            <Badge variant="teal" size="md">
              Verified Status: Active
            </Badge>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
            <span className="font-bold text-slate-900 block">Verification Protocol Checklist:</span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>MCA Corporate Registration & GSTIN (Maharashtra & Karnataka) verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Commercial lease contracts audited for physical coworking hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Authorized signatory verification for Aditi Sharma (Head of Operations)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
