'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function BusinessAnalyticsPage() {
  const { state } = useZaprillStore();

  const funnelData = [
    { stage: 'Applied', candidates: 20 },
    { stage: 'Screening', candidates: 12 },
    { stage: 'Assessment Verified', candidates: 8 },
    { stage: 'Shortlisted', candidates: 5 },
    { stage: 'Interview', candidates: 3 },
    { stage: 'Offered', candidates: 1 },
  ];

  const scoreDistribution = [
    { range: '90-100 Pts', count: 4, fill: '#4f46e5' },
    { range: '80-89 Pts', count: 11, fill: '#0d9488' },
    { range: '70-79 Pts', count: 7, fill: '#d97706' },
    { range: 'Below 70', count: 2, fill: '#94a3b8' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hiring Velocity & Capability Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational recruitment metrics derived from practical candidate diagnostic benchmarks.
          </p>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Avg Time to Verified Hire</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700 font-mono">11 Days</span>
              <span className="text-[10px] text-teal-600 font-semibold">-68% vs Legacy</span>
            </div>
            <span className="text-[10px] text-slate-400">Industry avg: 34 days</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Interview-to-Offer Ratio</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-teal-700 font-mono">1 : 2.4</span>
            </div>
            <span className="text-[10px] text-slate-400">High quality screening</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Candidate Pass Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800 font-mono">62.5%</span>
            </div>
            <span className="text-[10px] text-slate-400">On 75+ Benchmark</span>
          </Card>

          <Card className="p-4 bg-white">
            <span className="text-xs text-slate-500 font-medium">Interviewer Hours Saved</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600 font-mono">84 hrs</span>
            </div>
            <span className="text-[10px] text-slate-400">This quarter across team</span>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline Conversion Funnel */}
          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Candidate Pipeline Conversion Waterfall</CardTitle>
              <Badge variant="indigo" size="sm">
                Live Data
              </Badge>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  <Bar dataKey="candidates" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Diagnostic Score Distribution */}
          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Candidate Capability Score Distribution</CardTitle>
              <Badge variant="teal" size="sm">
                24 Candidates
              </Badge>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry: any) => `${entry.range}: ${entry.count}`}
                  >
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
