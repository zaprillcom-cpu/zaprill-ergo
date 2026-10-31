'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR, formatDate } from '@/lib/utils';

export default function TalentDashboardPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const attempts = state.attempts.filter((a) => a.talentId === talent.id);
  const applications = state.applications.filter((a) => a.talentId === talent.id);
  const evidence = state.evidence.filter((e) => e.talentId === talent.id);
  const featuredOpp = state.opportunities[0]; // HarbourDesk Spaces Analyst

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-[#0B1329] rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{talent.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Self-Taught Financial Modeler
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{talent.headline}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>{talent.location}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Seeking: Finance Internship or Paid Project</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/talent/passport">
              <Button variant="teal" size="sm">
                <Award className="w-4 h-4 mr-1" />
                View Passport
              </Button>
            </Link>
            <Link href="/p/aarav-mehta">
              <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Public Share Link
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Narrative Step Helper Notice */}
        <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs text-indigo-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Core Demo Workflow Guide:</span> Aarav completed the Coworking Profitability Assessment (Score: 82/100). Review is pending with Dr. Vikram Sen, and he has applied to HarbourDesk Spaces.
            </div>
          </div>
          <Link href="/talent/assessments/assess-coworking-profitability/results">
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              Inspect 82/100 Results
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Overall Capability Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700 font-mono">
                {talent.overallCapabilityScore}/100
              </span>
              <span className="text-[10px] text-teal-600 font-bold">+4 this month</span>
            </div>
            <span className="text-[10px] text-slate-400">Verifiable weighted index</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Applied Capability</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-teal-700 font-mono">
                {talent.appliedCapability}%
              </span>
              <span className="text-[10px] text-slate-400">Benchmarked</span>
            </div>
            <span className="text-[10px] text-slate-400">Spreadsheet calculations</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Active Applications</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800 font-mono">
                {applications.length}
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold">1 Verified</span>
            </div>
            <span className="text-[10px] text-slate-400">HarbourDesk Spaces pipeline</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Verified Evidence Files</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600 font-mono">
                {evidence.length}
              </span>
              <span className="text-[10px] text-slate-400">Artifacts</span>
            </div>
            <span className="text-[10px] text-slate-400">Financial model spreadsheets</span>
          </Card>
        </div>

        {/* Main Content Split: Primary Opportunity & Assessment History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Top Matched Opportunity */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Top Matched Hiring Demand
              </h2>
              <Link href="/talent/opportunities" className="text-xs text-indigo-600 hover:underline font-semibold">
                View all 15 opportunities →
              </Link>
            </div>

            {featuredOpp && (
              <Card className="p-5 bg-white border-indigo-100 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl flex-shrink-0">
                      {featuredOpp.businessLogo}
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold">{featuredOpp.businessName}</span>
                      <h3 className="text-sm font-bold text-slate-900">{featuredOpp.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{featuredOpp.location}</span>
                        <span>•</span>
                        <span className="font-bold text-indigo-700 font-mono">
                          {featuredOpp.compensationText}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="teal" size="md">
                    94% Capability Match
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {featuredOpp.description}
                </p>

                {/* Match Criteria Badges */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verified Match Breakdown:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      Excel Modeling (Demonstrated: 88)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      Financial Analysis (Demonstrated: 82)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      Coworking Model Artifact Attached
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Stage: <strong>Assessment Verified</strong> in HarbourDesk pipeline
                  </span>
                  <Link href={`/talent/opportunities/${featuredOpp.id}`}>
                    <Button variant="primary" size="sm">
                      Inspect Pipeline Stage
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Assessment History & Review Status */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                Assessment History
              </h2>
              <Link href="/talent/assessments" className="text-xs text-indigo-600 hover:underline font-semibold">
                Browse catalog →
              </Link>
            </div>

            <div className="space-y-3">
              {attempts.map((att) => (
                <Card key={att.id} className="p-4 bg-white space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{att.assessmentTitle}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Attempted on {formatDate(att.startedAt)}
                      </span>
                    </div>
                    <span className="text-sm font-black font-mono text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                      {att.totalScore}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Status:</span>
                    {att.status === 'pending_expert_review' ? (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending Review (Dr. Sen)
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        AI Evaluated (Illustrative)
                      </span>
                    )}
                  </div>

                  <Link href={`/talent/assessments/${att.assessmentId}/results`}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View 5-Dimension Radar Breakdown
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
