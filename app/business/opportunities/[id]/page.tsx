'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';
import { ApplicationStage } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BusinessOpportunityPipelinePage() {
  const params = useParams();
  const id = params?.id as string;
  const { state, updateApplicationStage } = useZaprillStore();

  const opportunity =
    state.opportunities.find((o) => o.id === id) || state.opportunities[0];

  const applicants = state.applications.filter((a) => a.opportunityId === opportunity.id);

  const stages: Array<{ id: ApplicationStage; label: string }> = [
    { id: 'applied', label: 'Applied' },
    { id: 'screening', label: 'Screening' },
    { id: 'assessment_verified', label: 'Assessment Verified' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'interview', label: 'Interview Scheduled' },
    { id: 'offered', label: 'Offer Extended' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/business/opportunities" className="hover:text-indigo-600 transition-colors">
            ← Back to Opportunities List
          </Link>
          <span className="font-semibold text-slate-700">Applicant Tracking Pipeline</span>
        </div>

        {/* Opportunity Summary Header */}
        <Card className="p-6 bg-white border-indigo-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0">
                {opportunity.businessLogo}
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500">{opportunity.businessName}</span>
                <h1 className="text-lg font-bold text-slate-900">{opportunity.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>{opportunity.location} ({opportunity.workMode})</span>
                  <span>•</span>
                  <span className="font-mono font-bold text-indigo-700">{opportunity.compensationText}</span>
                  <span>•</span>
                  <span>Deadline: {formatDate(opportunity.deadline)}</span>
                </div>
              </div>
            </div>

            <Badge variant="teal" size="md">
              {applicants.length} Total Applicants
            </Badge>
          </div>
        </Card>

        {/* Pipeline Columns View */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stg) => {
            const stageApplicants = applicants.filter((a) => a.currentStage === stg.id);

            return (
              <div key={stg.id} className="bg-slate-100/90 rounded-xl p-3 border border-slate-200/80 flex flex-col min-h-[420px]">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">{stg.label}</span>
                  <span className="font-mono text-[10px] font-bold text-slate-500 px-1.5 py-0.2 rounded-full bg-slate-200">
                    {stageApplicants.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageApplicants.length === 0 ? (
                    <div className="text-[11px] text-slate-400 text-center py-8">No candidates</div>
                  ) : (
                    stageApplicants.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-indigo-400 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={app.talentAvatar}
                            alt={app.talentName}
                            className="w-8 h-8 rounded-lg object-cover border"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              <Link href={`/business/talent/${app.talentId}`} className="hover:text-indigo-600">
                                {app.talentName}
                              </Link>
                            </h4>
                            <span className="text-[10px] font-bold font-mono text-teal-700 block">
                              {app.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        {/* Stage Mover Selector */}
                        <div className="pt-2 border-t border-slate-100">
                          <label className="text-[9px] text-slate-400 uppercase font-bold block mb-1">
                            Move Stage:
                          </label>
                          <select
                            value={app.currentStage}
                            onChange={(e) =>
                              updateApplicationStage(
                                app.id,
                                e.target.value as ApplicationStage,
                                `Advanced to ${e.target.value.replace(/_/g, ' ')} from pipeline board.`
                              )
                            }
                            className="w-full text-[10px] p-1 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium"
                          >
                            {stages.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Link href={`/business/talent/${app.talentId}`}>
                          <Button variant="outline" size="sm" className="w-full text-[10px] py-1 h-auto mt-1">
                            Inspect
                          </Button>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
