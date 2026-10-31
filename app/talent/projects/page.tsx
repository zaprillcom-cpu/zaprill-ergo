'use client';

import React from 'react';
import Link from 'next/link';
import { FolderGit2, CheckCircle2, Star, Calendar, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function TalentProjectsPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0];
  const projects = state.projects.filter((p) => p.talentId === talent.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Verified Commercial Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliverable records, milestone checklists, and client verified feedback.
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((proj) => (
            <Card key={proj.id} className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                    <Badge variant="indigo" size="sm">
                      {proj.role}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Client: {proj.businessName}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {proj.duration}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

              {/* Milestones Checklist */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Project Milestones:
                </span>
                <div className="space-y-1.5 text-xs">
                  {proj.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${m.completed ? 'text-teal-600' : 'text-slate-300'}`}
                        />
                        <span className={m.completed ? 'font-medium' : 'text-slate-500'}>{m.title}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Feedback Quote */}
              {proj.clientFeedback && (
                <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 text-xs space-y-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: proj.clientFeedback.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[11px] font-bold text-slate-700 ml-1.5">5.0 / 5.0 Rating</span>
                  </div>
                  <p className="italic text-slate-800">"{proj.clientFeedback.quote}"</p>
                  <span className="text-[10px] text-teal-800 font-semibold block pt-1">
                    — {proj.clientFeedback.reviewer} ({proj.clientFeedback.date})
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
