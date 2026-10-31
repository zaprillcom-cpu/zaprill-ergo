'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DimensionRadar } from '@/components/assessments/dimension-radar';

export default function InstitutionAnalyticsPage() {
  const departmentScores = [
    { name: 'Computer Science', score: 83.4, count: 10, ready: 7 },
    { name: 'Data Analytics', score: 80.8, count: 10, ready: 5 },
    { name: 'Finance & Commerce', score: 76.5, count: 10, ready: 4 },
    { name: 'Operations & Logistics', score: 73.2, count: 10, ready: 2 },
  ];

  const scoreBuckets = [
    { range: '90 - 100 (Master)', count: 6, fill: '#0D9488' },
    { range: '80 - 89 (Proficient)', count: 14, fill: '#14B8A6' },
    { range: '70 - 79 (Competent)', count: 15, fill: '#6366F1' },
    { range: '< 70 (Developing)', count: 5, fill: '#94A3B8' },
  ];

  const dimensionAverages = {
    understanding: 16.2, // out of 20 (81%)
    application: 23.4,    // out of 30 (78%)
    reasoning: 14.4,      // out of 20 (72%)
    errorDetection: 9.6,  // out of 15 (64%)
    transfer: 10.4,       // out of 15 (69%)
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cohort Competency Analytics & Diagnostics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Aggregate performance across academic disciplines, dimensional strengths, and campus hiring conversion rates.
          </p>
        </div>

        {/* Highlight Alert Box: Diagnostic Insight */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-900 space-y-1">
            <span className="font-bold text-amber-950 block">Curricular Diagnostic Alert: Error Detection Gap</span>
            <p className="leading-relaxed">
              Across all 4 departments, students score highest in <em>Conceptual Understanding (81%)</em> and <em>Math Application (78%)</em>, but drop to <em>64% in Error Detection</em> (missing hidden lease escalation traps and join anomalies). Recommending a 2-day practical spreadsheet auditing workshop before final campus interviews.
            </p>
          </div>
        </div>

        {/* Charts Row 1: Score Distribution & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Buckets Histogram */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Cohort Capability Score Distribution</CardTitle>
              <p className="text-xs text-slate-500">Breakdown of 40 students across standardized performance tiers.</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreBuckets} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                    <YAxis dataKey="range" type="category" stroke="#475569" fontSize={11} width={130} />
                    <Tooltip
                      formatter={(val: any) => [`${val} Students`, 'Count']}
                      contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {scoreBuckets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Aggregate Dimension Radar */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Cohort 5-Dimension Aggregate Profile</CardTitle>
              <p className="text-xs text-slate-500">Benchmark comparison of mean cohort strengths vs employer expectation threshold.</p>
            </CardHeader>
            <CardContent>
              <DimensionRadar scores={dimensionAverages} height={260} />
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2: Department Comparison & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Scores Bar Chart */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Average Score by Academic Discipline</CardTitle>
              <p className="text-xs text-slate-500">Comparative mean capability scores across participating departments.</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentScores} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} interval={0} />
                    <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={11} />
                    <Tooltip
                      formatter={(val: any) => [`${val} / 100`, 'Mean Score']}
                      contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Campus Placement Funnel */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Placement Conversion Pipeline</CardTitle>
              <p className="text-xs text-slate-500">Progression from enrollment to verified corporate hiring offers.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { stage: '1. Enrolled in Cohort', count: 40, pct: '100%', color: 'bg-slate-200 text-slate-800' },
                { stage: '2. Diagnostic Assessment Completed', count: 35, pct: '88%', color: 'bg-indigo-100 text-indigo-800' },
                { stage: '3. Capability Verified (≥ 75 pts)', count: 24, pct: '60%', color: 'bg-teal-100 text-teal-800' },
                { stage: '4. Corporate Shortlist & Interview', count: 18, pct: '45%', color: 'bg-teal-200 text-teal-900' },
                { stage: '5. Placement Offer Released', count: 11, pct: '28%', color: 'bg-emerald-500 text-white' },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{step.stage}</span>
                    <span className="font-bold text-slate-900">{step.count} students ({step.pct})</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${step.color.split(' ')[0]}`}
                      style={{ width: step.pct }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
