'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminAnalyticsPage() {
  const monthlyVolume = [
    { month: 'Jun', assessments: 18, hires: 4 },
    { month: 'Jul', assessments: 24, hires: 7 },
    { month: 'Aug', assessments: 38, hires: 11 },
    { month: 'Sep', assessments: 52, hires: 16 },
    { month: 'Oct', assessments: 71, hires: 22 },
  ];

  const timeToHireData = [
    { method: 'Traditional Resume Screening', days: 34 },
    { method: 'Standard Take-Home Tests', days: 21 },
    { method: 'Zaprill Evidence Passport', days: 6.2 },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Growth & Telemetry Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Global ecosystem metrics tracking candidate assessments, expert ratings, and business hiring velocity.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Average Time-to-Hire</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-600">6.2 Days</span>
              <span className="text-xs text-emerald-600 font-semibold">-81% vs Market</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Pre-verified evidence skips test rounds</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">First-Round Interview Rate</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-indigo-600">74%</span>
              <span className="text-xs text-indigo-700 font-medium">Conversion</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">vs 4% industry resume screening</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Inter-Rater Consensus</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">96.2%</span>
              <span className="text-xs text-teal-600 font-semibold">Reliability</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Accredited expert network benchmark</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Hiring Satisfaction</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">4.92 / 5</span>
              <span className="text-xs text-amber-500">★ ★ ★ ★ ★</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Employer net promoter score</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Submissions Growth */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Monthly Assessment & Placement Volume</CardTitle>
              <p className="text-xs text-slate-500">Growth trajectory of completed candidate assessments and corporate hires.</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyVolume} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="assessments" fill="#4F46E5" name="Assessments Completed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hires" fill="#0D9488" name="Verified Hires" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Time to Hire Comparison */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Time-to-Hire Efficiency (Days)</CardTitle>
              <p className="text-xs text-slate-500">Days from job application to finalized offer letter.</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeToHireData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                    <YAxis dataKey="method" type="category" stroke="#475569" fontSize={10} width={140} />
                    <Tooltip formatter={(val: any) => [`${val} Days`, 'Duration']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="days" fill="#6366F1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
