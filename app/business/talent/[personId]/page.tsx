'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Award,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DimensionRadar } from '@/components/assessments/dimension-radar';
import { useZaprillStore } from '@/lib/store';
import { ApplicationStage } from '@/lib/types';
import { formatDate, normalizeDimensionPercentages, formatINR } from '@/lib/utils';

export default function CandidateInspectionPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params?.personId as string;
  const { state, updateApplicationStage } = useZaprillStore();

  const talent =
    state.talent.find((t) => t.id === personId) || state.talent[0]; // Aarav Mehta

  const application = state.applications.find(
    (a) => a.talentId === talent.id && a.businessId === 'biz-harbourdesk'
  );

  const attempt = state.attempts.find((a) => a.talentId === talent.id) || state.attempts[0];
  const evidence = state.evidence.filter((e) => e.talentId === talent.id);

  const [currentStage, setCurrentStage] = useState<ApplicationStage>(
    application?.currentStage || 'assessment_verified'
  );
  const [stageChangeSuccess, setStageChangeSuccess] = useState(false);

  const stagesList: Array<{ id: ApplicationStage; label: string }> = [
    { id: 'applied', label: '1. Applied' },
    { id: 'screening', label: '2. Screening' },
    { id: 'assessment_verified', label: '3. Assessment Verified' },
    { id: 'shortlisted', label: '4. Shortlisted' },
    { id: 'interview', label: '5. Interview Scheduled' },
    { id: 'offered', label: '6. Offer Extended' },
  ];

  const handleStageChange = (newStage: ApplicationStage) => {
    setCurrentStage(newStage);
    if (application) {
      updateApplicationStage(
        application.id,
        newStage,
        `Stage advanced to ${newStage.replace(/_/g, ' ')} by HarbourDesk Operations.`
      );
      setStageChangeSuccess(true);
      setTimeout(() => setStageChangeSuccess(false), 2500);
    }
  };

  const percentages = normalizeDimensionPercentages(attempt.dimensionScores);

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/business/talent" className="hover:text-indigo-600 transition-colors">
            ← Back to Talent Directory
          </Link>
          <span className="font-mono text-teal-700 font-semibold">Candidate ID: {talent.id}</span>
        </div>

        {/* Candidate Profile Header Card */}
        <Card className="p-6 bg-white border-indigo-100 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">{talent.name}</h1>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Verified Candidate
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">{talent.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span>{talent.location}</span>
                  <span>•</span>
                  <span>{talent.availability}</span>
                  <span>•</span>
                  <span>
                    Education: <strong>{talent.education.isSelfTaught ? 'Self-Taught' : talent.education.degree}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/business/messages">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-3.5 h-3.5 mr-1" />
                  Message Candidate
                </Button>
              </Link>
              <Link href={`/p/${talent.publicSlug}`}>
                <Button variant="primary" size="sm">
                  View Public Passport
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Live Stage Transition Controls */}
          {application && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-950 block">
                  Candidate Pipeline Stage (Synchronized Live with Talent):
                </span>
                <span className="text-[11px] text-slate-600">
                  Role applied: <strong>{application.opportunityTitle}</strong> (Match: {application.matchScore}%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={currentStage}
                  onChange={(e) => handleStageChange(e.target.value as ApplicationStage)}
                  className="p-2 text-xs font-semibold rounded-lg border border-indigo-300 bg-white text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {stagesList.map((stg) => (
                    <option key={stg.id} value={stg.id}>
                      {stg.label}
                    </option>
                  ))}
                </select>
                {stageChangeSuccess && (
                  <span className="text-xs text-teal-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Updated!
                  </span>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Practical Assessment Submission Inspection (82/100) */}
        <Card className="p-6 bg-white space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Primary Assessment Submission
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{attempt.assessmentTitle}</h2>
              <span className="text-xs text-slate-500 font-mono">
                Completed on {formatDate(attempt.completedAt || '')}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold block">Evaluated Score</span>
              <span className="text-2xl font-black font-mono text-indigo-700">{attempt.totalScore}/100</span>
            </div>
          </div>

          {/* Dimension Radar */}
          <DimensionRadar scores={attempt.dimensionScores} percentages={percentages} />

          {/* Candidate Written Responses */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Inspect Candidate Written Answers & Model Outputs:</h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-indigo-900 block">Stage 1: Understanding Response</span>
              <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                "{attempt.answers.stage1Understanding}"
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-indigo-900 block">Stage 3: Reasoning & Sensitivity Strategy</span>
              <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                "{attempt.answers.stage3Reasoning}"
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-indigo-900 block">Stage 4: Error Detection Diagnosis</span>
              <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                "{attempt.answers.stage4ErrorDetection}"
              </p>
            </div>
          </div>
        </Card>

        {/* Supporting Evidence Artifacts */}
        <Card className="p-6 bg-white space-y-4">
          <CardTitle className="text-sm">Verified Artifacts in Evidence Vault</CardTitle>
          <div className="space-y-3">
            {evidence.map((evi) => (
              <div
                key={evi.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{evi.title}</h4>
                  <p className="text-slate-600 mt-0.5">{evi.description}</p>
                  <span className="text-teal-700 font-semibold block mt-1">⚡ {evi.metricsHighlighted}</span>
                </div>
                <Button variant="outline" size="sm">
                  Download Spreadsheet
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
