'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Plus, Users, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function BusinessOpportunitiesPage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces
  const opportunities = state.opportunities.filter((o) => o.businessId === biz.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Manage Hiring Opportunities</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Active jobs, internships, freelance projects, and paid tasks with verified capability matching.
            </p>
          </div>

          <Link href="/business/opportunities/create">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Opportunity
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {opportunities.map((opp) => {
            const applicants = state.applications.filter((a) => a.opportunityId === opp.id);

            return (
              <Card key={opp.id} className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900">{opp.title}</h3>
                      <Badge variant="indigo" size="sm" className="capitalize text-[10px]">
                        {opp.type}
                      </Badge>
                      <Badge variant="teal" size="sm">
                        {opp.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{opp.location} ({opp.workMode})</span>
                      <span>•</span>
                      <span className="font-mono font-bold text-indigo-700">{opp.compensationText}</span>
                      <span>•</span>
                      <span>Deadline: {formatDate(opp.deadline)}</span>
                    </div>
                  </div>

                  <Link href={`/business/opportunities/${opp.id}`}>
                    <Button variant="primary" size="sm">
                      Inspect Pipeline ({applicants.length} Candidates)
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Pipeline Stats Summary */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Applicants</span>
                      <span className="font-bold text-slate-900 font-mono text-sm">{applicants.length}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Assessment Verified</span>
                      <span className="font-bold text-teal-700 font-mono text-sm">
                        {applicants.filter((a) => a.currentStage === 'assessment_verified').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Shortlisted</span>
                      <span className="font-bold text-indigo-700 font-mono text-sm">
                        {applicants.filter((a) => a.currentStage === 'shortlisted').length}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Required Skills:</span>
                    {opp.requiredSkills.map((req) => (
                      <span
                        key={req.skillId}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                      >
                        {req.skillName}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
