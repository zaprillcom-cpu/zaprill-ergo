'use client';

import React from 'react';
import Link from 'next/link';
import { FolderGit2, CheckCircle2, Calendar, Star, Users } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function BusinessProjectsPage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces
  const projects = state.projects.filter((p) => p.businessId === biz.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Contract & Milestone Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage contract deliverables, review milestones, and endorse candidate capabilities upon completion.
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
                  <span className="text-xs text-slate-500 font-medium">Contractor: Aarav Mehta</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{proj.duration}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

              {/* Milestones */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800 block">Deliverable Milestones:</span>
                <div className="space-y-1.5">
                  {proj.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${m.completed ? 'text-teal-600' : 'text-slate-300'}`}
                        />
                        <span className={m.completed ? 'font-medium' : 'text-slate-500'}>{m.title}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
