'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  FileCheck2,
  ArrowRight,
  Download,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';

export default function InstitutionDashboardPage() {
  const { state } = useZaprillStore();
  const students = state.cohortStudents;
  const campaigns = state.campaigns;

  const readyCount = students.filter((s) => s.status === 'Ready for Placement').length;
  const inTrainingCount = students.filter((s) => s.status === 'In Training').length;
  const pendingCount = students.filter((s) => s.status === 'Assessment Pending').length;
  const avgScore = Math.round(
    students.reduce((acc, s) => acc + s.capabilityScore, 0) / (students.length || 1)
  );

  const topStudents = [...students]
    .sort((a, b) => b.capabilityScore - a.capabilityScore)
    .slice(0, 5);

  const handleExportCohort = () => {
    exportToCSV(
      students.map((s) => ({
        RollNo: s.rollNo,
        Name: s.name,
        Department: s.department,
        Semester: s.semester,
        CGPA: s.cgpa,
        PrimarySkill: s.primarySkill,
        CapabilityScore: s.capabilityScore,
        PlacementStatus: s.status,
        EligibleOpportunities: s.targetOpportunitiesCount,
      })),
      'Apex_Institute_Cohort_Capability_Report'
    );
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Banner */}
        <div className="rounded-2xl bg-[#0B1329] text-white p-6 sm:p-8 border border-[#1E293B] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                Placement & Capability Office
              </span>
              <span className="text-xs text-slate-400">Class of 2026 • Semester 7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Apex Institute of Technology — Talent Readiness
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time evidence-backed competency tracking, diagnostic assessment participation, and direct employer talent pipelines for 40 graduating students.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExportCohort}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export NAAC / TPO Audit
            </Button>
            <Link href="/institution/campaigns">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Launch Assessment Drive
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Enrolled Cohort</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{students.length}</span>
              <span className="text-xs text-slate-500">Students</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">4 Academic Departments</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Placement Ready</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-600">{readyCount}</span>
              <span className="text-xs text-teal-700 font-semibold">
                {Math.round((readyCount / students.length) * 100)}% of Cohort
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Score ≥ 80 pts (High-Trust)</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Mean Capability Score</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{avgScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="text-xs text-emerald-600 font-semibold">+6.2 pts vs Q1</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Standard 5-dimension rubric</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Drives</span>
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{campaigns.length}</span>
              <span className="text-xs text-indigo-600 font-semibold">Running</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">15 Employer Partnerships linked</p>
          </Card>
        </div>

        {/* Two Columns: Active Campaigns & Department Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Active Placement Diagnostic Drives</h2>
              <Link
                href="/institution/campaigns"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View all campaigns <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {campaigns.map((camp) => (
                <Card key={camp.id} className="p-5 border-slate-200 hover:border-indigo-300 transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={camp.status === 'Active' ? 'success' : 'neutral'}>
                          {camp.status}
                        </Badge>
                        <span className="text-xs text-slate-400">{camp.cohort}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{camp.name}</h3>
                      <p className="text-xs text-slate-500">{camp.assessmentTitle}</p>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 text-right">
                      <div>
                        <span className="text-xs font-bold text-slate-900">
                          {camp.completedCount} / {camp.enrolledStudentsCount}
                        </span>
                        <span className="text-[11px] text-slate-500 block">Completed</span>
                      </div>
                      <Badge variant="teal" className="text-xs font-mono">
                        Avg: {camp.avgScore} / 100
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{
                          width: `${(camp.completedCount / camp.enrolledStudentsCount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {Math.round((camp.completedCount / camp.enrolledStudentsCount) * 100)}%
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Department Breakdown Bar */}
            <Card className="border-slate-200 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Readiness by Academic Discipline</h3>
              <div className="space-y-3">
                {[
                  { dept: 'Computer Science & Software', score: 83.4, count: 10, ready: 7 },
                  { dept: 'Data Analytics & Statistics', score: 80.8, count: 10, ready: 5 },
                  { dept: 'Finance & Commerce', score: 76.5, count: 10, ready: 4 },
                  { dept: 'Operations & Logistics', score: 73.2, count: 10, ready: 2 },
                ].map((dept, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{dept.dept}</span>
                      <span className="text-slate-500">
                        {dept.ready}/{dept.count} Ready • Avg: <strong>{dept.score}</strong>
                      </span>
                    </div>
                    <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full"
                        style={{ width: `${(dept.score / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Performers Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Top Ready Talent</h2>
              <Link
                href="/institution/students"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All 40 Students
              </Link>
            </div>

            <Card className="border-slate-200 divide-y divide-slate-100">
              {topStudents.map((student, rank) => (
                <div key={student.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 w-4">#{rank + 1}</span>
                    <div>
                      <Link
                        href={`/institution/students/${student.id}`}
                        className="text-xs font-bold text-slate-900 hover:text-indigo-600 truncate block max-w-[130px]"
                      >
                        {student.name}
                      </Link>
                      <p className="text-[11px] text-slate-400 truncate">{student.department}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {student.capabilityScore} pts
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {student.targetOpportunitiesCount} matches
                    </span>
                  </div>
                </div>
              ))}
            </Card>

            {/* Placement Quick Stat */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-[#0B1329] text-white space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                Corporate Hiring Partnerships
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                HarbourDesk Spaces, FinTech Bharat, and QuickLogistics have active shortlists for Apex candidates.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Avg Stipend: ₹42,000/mo</span>
                <Link href="/institution/students" className="text-teal-400 hover:underline">
                  Browse Matches →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
