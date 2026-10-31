'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FolderGit2,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Star,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function TalentProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const project =
    state.projects.find((p) => p.id === id) || state.projects[0];

  const evidence = state.evidence.filter((e) =>
    project.evidenceIds?.includes(e.id)
  );

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Navigation */}
        <Link
          href="/talent/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects & Milestones
        </Link>

        {/* Project Header Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="teal" className="text-[10px]">Active Contract Milestone</Badge>
                <span className="text-xs text-slate-400 font-mono">ID: {project.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {project.title}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold text-slate-700">{project.businessName}</span> • Role: {project.role} • {project.duration}
              </p>
            </div>

            {project.clientFeedback && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-right">
                <div className="flex items-center justify-end text-amber-500 text-sm">
                  {'★'.repeat(project.clientFeedback.rating)}
                </div>
                <span className="text-[10px] text-amber-900 font-semibold block mt-0.5">
                  Verified Client Rating
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Deliverables & Milestones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Milestones Stepper */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Project Execution Milestones</CardTitle>
                <p className="text-xs text-slate-500">Verified progress against agreed client contract deliverables.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-3 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${m.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                          {m.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">{m.date}</span>
                      </div>
                      <span className={`text-[10px] font-medium ${m.completed ? 'text-teal-700' : 'text-slate-400'}`}>
                        {m.completed ? '✓ Verified Complete' : 'In Progress (Target Delivery)'}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Client Testimonial */}
            {project.clientFeedback && (
              <Card className="border-slate-200 bg-slate-50/50">
                <CardHeader>
                  <CardTitle className="text-base text-slate-900">Client Endorsement & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &quot;{project.clientFeedback.quote}&quot;
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{project.clientFeedback.reviewer}</span>
                    <span>{project.clientFeedback.date}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Linked Evidence & Deliverables */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Contract Deliverables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {project.deliverables.map((del, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-800">{del}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Evidence Artifacts */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Attached Evidence Artifacts</CardTitle>
                <p className="text-xs text-slate-500">Publicly demonstrable work products attached to Passport.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {evidence.map((evi) => (
                  <div key={evi.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[170px]">
                        {evi.title}
                      </span>
                      <Badge variant="teal" className="text-[9px]">Verified</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{evi.fileName}</p>
                    <Link
                      href="/talent/evidence"
                      className="text-[11px] text-indigo-600 hover:underline font-semibold block pt-1"
                    >
                      View in Vault →
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
