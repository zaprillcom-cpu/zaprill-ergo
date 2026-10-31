'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Building2,
  Clock,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useZaprillStore } from '@/lib/store';
import { ApplicationStage } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function TalentApplicationsPage() {
  const { state, withdrawApplication } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const applications = state.applications.filter((a) => a.talentId === talent.id);
  const [withdrawTargetId, setWithdrawTargetId] = useState<string | null>(null);

  const stagesOrder: ApplicationStage[] = [
    'applied',
    'screening',
    'assessment_verified',
    'shortlisted',
    'interview',
    'offered',
  ];

  const handleConfirmWithdraw = () => {
    if (withdrawTargetId) {
      withdrawApplication(withdrawTargetId);
      setWithdrawTargetId(null);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Opportunity Applications</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking of your candidate pipeline status. When businesses update stages, your timeline synchronizes immediately.
            </p>
          </div>
          <Link href="/talent/opportunities">
            <Button variant="outline" size="sm">
              Explore More Opportunities
            </Button>
          </Link>
        </div>

        {applications.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p>You have not submitted any applications yet.</p>
            <Link href="/talent/opportunities">
              <Button variant="primary" size="sm">
                Browse Opportunities Feed
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => {
              const currentStageIdx = stagesOrder.indexOf(app.currentStage);
              const isWithdrawn = app.currentStage === 'withdrawn';

              return (
                <Card key={app.id} className="p-6 bg-white border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0">
                        🏢
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500">{app.businessName}</span>
                        <h3 className="text-base font-bold text-slate-900">{app.opportunityTitle}</h3>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          Applied on {formatDate(app.appliedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold font-mono">
                        {app.matchScore}% Capability Match
                      </span>
                      {!isWithdrawn && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-500 hover:text-rose-600 text-xs"
                          onClick={() => setWithdrawTargetId(app.id)}
                        >
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Visual Stage Progression Bar */}
                  {!isWithdrawn ? (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Live Business Hiring Pipeline:
                      </span>
                      <div className="grid grid-cols-6 gap-2">
                        {stagesOrder.map((stageName, idx) => {
                          const isDone = idx <= currentStageIdx;
                          const isCurrent = idx === currentStageIdx;

                          return (
                            <div key={stageName} className="text-center">
                              <div
                                className={`h-2 rounded-full mb-1.5 transition-all ${
                                  isCurrent
                                    ? 'bg-indigo-600 ring-2 ring-indigo-300'
                                    : isDone
                                    ? 'bg-teal-500'
                                    : 'bg-slate-200'
                                }`}
                              />
                              <span
                                className={`text-[10px] block truncate font-medium capitalize ${
                                  isCurrent
                                    ? 'text-indigo-700 font-bold'
                                    : isDone
                                    ? 'text-slate-700 font-semibold'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stageName.replace(/_/g, ' ')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-100 rounded-xl text-slate-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                      <span>This application was withdrawn by the candidate.</span>
                    </div>
                  )}

                  {/* Timeline Events Log */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                    <span className="font-bold text-slate-800 block">Status Timeline Updates:</span>
                    <div className="space-y-2">
                      {app.timeline.map((event, eIdx) => (
                        <div key={eIdx} className="flex items-start gap-2.5 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-semibold text-slate-900 capitalize">
                              {event.stage.replace(/_/g, ' ')}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-2">
                              {formatDate(event.timestamp)}
                            </span>
                            {event.note && <p className="text-[11px] text-slate-600 mt-0.5">{event.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {app.businessNotes && (
                    <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-950">
                      <strong>Hiring Team Internal Status:</strong> {app.businessNotes}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Withdrawal */}
      <Modal
        isOpen={Boolean(withdrawTargetId)}
        onClose={() => setWithdrawTargetId(null)}
        title="Withdraw Application?"
        description="Are you sure you want to withdraw your application from HarbourDesk Spaces?"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setWithdrawTargetId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleConfirmWithdraw}>
              Yes, Withdraw
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600">
          Your status will be updated to withdrawn and the employer will be notified.
        </p>
      </Modal>
    </AppShell>
  );
}
