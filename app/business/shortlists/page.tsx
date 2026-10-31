'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Users, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function BusinessShortlistsPage() {
  const { state } = useZaprillStore();
  const bizApplications = state.applications.filter((a) => a.businessId === 'biz-harbourdesk');
  const shortlisted = bizApplications.filter(
    (a) => a.currentStage === 'shortlisted' || a.currentStage === 'interview' || a.currentStage === 'assessment_verified'
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Candidate Shortlists</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-qualified candidates who passed benchmark rubrics and advanced in the hiring pipeline.
          </p>
        </div>

        <div className="space-y-3">
          {shortlisted.map((app) => (
            <Card key={app.id} className="p-5 bg-white border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={app.talentAvatar} alt={app.talentName} className="w-12 h-12 rounded-xl object-cover border" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{app.talentName}</h3>
                    <Badge variant="teal" size="sm">
                      {app.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">Role: {app.opportunityTitle}</p>
                  <span className="text-[11px] text-indigo-700 font-semibold block capitalize mt-0.5">
                    Pipeline Stage: {app.currentStage.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <Link href={`/business/talent/${app.talentId}`}>
                <Button variant="primary" size="sm">
                  Inspect Candidate
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
