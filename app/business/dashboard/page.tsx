'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Briefcase,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';

export default function BusinessDashboardPage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces
  const bizOpportunities = state.opportunities.filter((o) => o.businessId === biz.id);
  const bizApplications = state.applications.filter((a) => a.businessId === biz.id);
  const primaryApplication = bizApplications.find((a) => a.talentId === 'talent-aarav-mehta');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0B1329] rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
              {biz.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{biz.name}</h1>
                {biz.isVerified && (
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    Verified Enterprise
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{biz.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>{biz.location}</span>
                <span>•</span>
                <span>Plan: <strong>{biz.billingPlan}</strong></span>
                <span>•</span>
                <span>Contact: {biz.contactPerson.name} ({biz.contactPerson.role})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/business/opportunities/create">
              <Button variant="primary" size="sm" className="shadow-sm shadow-indigo-600/30">
                <PlusCircle className="w-4 h-4 mr-1" />
                Post Opportunity
              </Button>
            </Link>
            <Link href="/business/talent">
              <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Search Talent (24)
              </Button>
            </Link>
          </div>
        </div>

        {/* Narrative Step Helper Notice */}
        <div className="p-4 bg-teal-50/80 rounded-xl border border-teal-200 text-xs text-teal-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Hiring Pipeline Inspection:</span> Aarav Mehta (94% Match) has applied for Financial Analyst. Inspect his spreadsheet model, review his Coworking Profitability submission, and update his stage to <em>Interview Scheduled</em>.
            </div>
          </div>
          <Link href="/business/talent/talent-aarav-mehta">
            <Button variant="teal" size="sm" className="whitespace-nowrap">
              Inspect Aarav Mehta
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Active Opportunities</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700 font-mono">
                {bizOpportunities.length}
              </span>
              <span className="text-[10px] text-teal-600 font-bold">1 In Screening</span>
            </div>
            <span className="text-[10px] text-slate-400">Published locally</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Total Applicants</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {bizApplications.length}
              </span>
              <span className="text-[10px] text-teal-600 font-semibold">1 Verified Top Match</span>
            </div>
            <span className="text-[10px] text-slate-400">Across 3 opportunities</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Verified Talent Pool</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-teal-700 font-mono">24</span>
              <span className="text-[10px] text-slate-400">Indian Market</span>
            </div>
            <span className="text-[10px] text-slate-400">Searchable by evidence</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs font-semibold text-slate-500">Hours Saved / Hire</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600 font-mono">32 hrs</span>
            </div>
            <span className="text-[10px] text-slate-400">Zero resume keyword bias</span>
          </Card>
        </div>

        {/* Candidate Pipeline Spotlight: Aarav Mehta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                Active Candidate Pipeline Spotlight
              </h2>
              <Link href="/business/talent" className="text-xs text-indigo-600 hover:underline font-semibold">
                Browse Talent Directory →
              </Link>
            </div>

            {primaryApplication && (
              <Card className="p-6 bg-white border-indigo-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={primaryApplication.talentAvatar}
                      alt={primaryApplication.talentName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/business/talent/${primaryApplication.talentId}`}
                          className="font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors"
                        >
                          {primaryApplication.talentName}
                        </Link>
                        <Badge variant="teal" size="sm">
                          94% Capability Match
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        Applied for: <strong>{primaryApplication.opportunityTitle}</strong>
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Status: <strong className="text-indigo-700 capitalize">{primaryApplication.currentStage.replace(/_/g, ' ')}</strong>
                      </span>
                    </div>
                  </div>

                  <Link href={`/business/talent/${primaryApplication.talentId}`}>
                    <Button variant="primary" size="sm">
                      Inspect Submission & Advance Stage
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block">Candidate Practical Demonstration Highlights:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Coworking Assessment: <strong>82/100 Pts</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Excel Modeling: <strong>88/100 (Expert-Reviewed)</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Discovered 7.5% lease escalation risk in Mumbai hub</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Self-Taught Analyst (No degree gatekeeping applied)</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Active Opportunities Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Active Roles
              </h2>
              <Link href="/business/opportunities" className="text-xs text-indigo-600 hover:underline font-semibold">
                Manage →
              </Link>
            </div>

            <div className="space-y-3">
              {bizOpportunities.map((opp) => (
                <Card key={opp.id} className="p-4 bg-white space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{opp.title}</h4>
                    <Badge variant="indigo" size="sm" className="capitalize text-[10px]">
                      {opp.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{opp.compensationText}</span>
                    <span className="font-bold text-indigo-700">{opp.applicantsCount} Applicants</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
