'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Building2,
  Award,
  Layers,
  Network,
  CreditCard,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';

export default function AdminDashboardPage() {
  const { state, verifyBusiness, approveExpert } = useZaprillStore();

  const totalUsers = state.talent.length + state.businesses.length + state.experts.length + state.institutions.length;
  const pendingBusinesses = state.businesses.filter((b) => !b.isVerified);
  const pendingExperts = state.experts.filter((e) => !e.isApproved);
  const totalAttempts = state.attempts.length;
  const totalApplications = state.applications.length;

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Admin Command Header */}
        <div className="rounded-2xl bg-[#0B1329] text-white p-6 sm:p-8 border border-[#1E293B] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                Platform Operations & Integrity
              </span>
              <span className="text-xs text-slate-400">Environment: Production (Demo Mode)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Zaprill Global Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Super Admin telemetry across 5 workspaces: managing talent verifications, enterprise authenticity, evaluator accreditations, and capability graph integrity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/graph">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                <Network className="w-4 h-4" />
                Inspect Capability Graph
              </Button>
            </Link>
          </div>
        </div>

        {/* Global KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Ecosystem Entities</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{totalUsers}</span>
              <span className="text-xs text-slate-500">Profiles</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">24 Talent • 8 Biz • 6 Experts • 2 Inst</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Diagnostic Submissions</span>
              <FileCheck2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{totalAttempts}</span>
              <span className="text-xs text-teal-600 font-semibold">100% Evaluated</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Mean Score: 81.6 / 100</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Opportunity Pipeline</span>
              <Building2 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{state.opportunities.length}</span>
              <span className="text-xs text-slate-500">Jobs & Tasks</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{totalApplications} live candidate applications</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Monthly Platform GMV</span>
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{formatINR(1240000)}</span>
              <span className="text-xs text-emerald-600 font-semibold">+24%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Reviews + Subscriptions</p>
          </Card>
        </div>

        {/* Verification Action Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Verification Queue */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base text-slate-900">Enterprise Verification Queue</CardTitle>
                <p className="text-xs text-slate-500">Businesses requesting authenticity badges to post jobs.</p>
              </div>
              <Link href="/admin/businesses" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View all ({state.businesses.length})
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.businesses.slice(0, 3).map((biz) => (
                <div
                  key={biz.id}
                  className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">
                      {biz.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{biz.name}</span>
                        {biz.isVerified && <Badge variant="teal" className="text-[9px]">Verified</Badge>}
                      </div>
                      <p className="text-[11px] text-slate-500">{biz.industry} • {biz.location}</p>
                    </div>
                  </div>

                  <div>
                    {!biz.isVerified ? (
                      <Button
                        size="sm"
                        onClick={() => verifyBusiness(biz.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-7 px-2.5"
                      >
                        Verify Now
                      </Button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expert Accreditation Queue */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base text-slate-900">Expert Accreditation Queue</CardTitle>
                <p className="text-xs text-slate-500">Senior practitioners vetted for evaluation authority.</p>
              </div>
              <Link href="/admin/experts" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View all ({state.experts.length})
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.experts.slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center font-bold text-teal-700 text-xs">
                      {exp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{exp.name}</span>
                        {exp.isApproved && <Badge variant="teal" className="text-[9px]">Accredited</Badge>}
                      </div>
                      <p className="text-[11px] text-slate-500">{exp.domain} • {exp.accreditationNumber}</p>
                    </div>
                  </div>

                  <div>
                    {!exp.isApproved ? (
                      <Button
                        size="sm"
                        onClick={() => approveExpert(exp.id)}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-7 px-2.5"
                      >
                        Approve
                      </Button>
                    ) : (
                      <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accredited
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Operations Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/taxonomy" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Skill Taxonomy</h4>
                <p className="text-[11px] text-slate-500">{state.skills.length} competencies across 5 domains</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
          </Link>

          <Link href="/admin/graph" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Capability Graph</h4>
                <p className="text-[11px] text-slate-500">Interactive SVG network map</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
          </Link>

          <Link href="/admin/assessments" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Assessments Manager</h4>
                <p className="text-[11px] text-slate-500">{state.assessments.length} standardized tests</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
