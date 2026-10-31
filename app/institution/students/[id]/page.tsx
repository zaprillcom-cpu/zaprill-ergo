'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  ArrowLeft,
  Award,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  FileText,
  Mail,
  Download,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { DimensionRadar } from '@/components/assessments/dimension-radar';
import { useZaprillStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';

export default function InstitutionStudentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const student =
    state.cohortStudents.find((s) => s.id === id) || state.cohortStudents[0];

  const [referredSuccess, setReferredSuccess] = useState<string | null>(null);

  const matchedOpps = state.opportunities.slice(0, student.targetOpportunitiesCount || 3);

  const handleRefer = (oppId: string) => {
    setReferredSuccess(oppId);
    setTimeout(() => setReferredSuccess(null), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Navigation */}
        <Link
          href="/institution/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Student Directory
        </Link>

        {/* Profile Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {student.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
                <Badge variant={student.status === 'Ready for Placement' ? 'teal' : 'neutral'}>
                  {student.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Roll No: <span className="font-mono text-slate-700">{student.rollNo}</span> • {student.department} (Semester {student.semester})
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Apex Institute of Technology • Mumbai</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Academic CGPA</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">{student.cgpa} / 10.0</span>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-right">
              <span className="text-[10px] text-teal-700 uppercase font-semibold block">Zaprill Capability</span>
              <span className="text-base font-extrabold text-teal-900 font-mono">{student.capabilityScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core Capability Rubric Profile */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Assessed Skill Competency</CardTitle>
                <p className="text-xs text-slate-500">Standardized diagnostic performance in {student.primarySkill}.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <DimensionRadar
                      scores={{
                        understanding: Math.round(student.capabilityScore * 0.2),
                        application: Math.round(student.capabilityScore * 0.28),
                        reasoning: Math.round(student.capabilityScore * 0.2),
                        errorDetection: Math.round(student.capabilityScore * 0.16),
                        transfer: Math.round(student.capabilityScore * 0.16),
                      }}
                      height={200}
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                      <span className="text-slate-600">Conceptual Grasp</span>
                      <span className="font-bold text-slate-900">88%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                      <span className="text-slate-600">Practical Application</span>
                      <span className="font-bold text-slate-900">82%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                      <span className="text-slate-600">Error Detection</span>
                      <span className="font-bold text-slate-900">76%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                      <span className="text-slate-600">Percentile in Department</span>
                      <span className="font-bold text-teal-600">Top 15%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1 text-xs">
                  <span className="font-bold text-indigo-950 block">Faculty Mentor & TPO Note</span>
                  <p className="text-indigo-900 leading-relaxed">
                    Student has demonstrated strong capability in spreadsheet and data pipeline modeling. Ready for client-facing analytics internships and junior analyst hiring pipelines.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Matched Industry Opportunities */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Matched Employer Opportunities</CardTitle>
                <p className="text-xs text-slate-500">Live positions where student capability score meets minimum requirements.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {matchedOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="neutral" className="text-[10px]">{opp.type}</Badge>
                        <span className="text-xs text-slate-400">{opp.businessName}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{opp.title}</h4>
                      <p className="text-xs text-slate-500">
                        {opp.location} • {formatINR(opp.stipendOrSalaryINR || opp.stipendOrSalary || 45000)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {referredSuccess === opp.id ? (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Endorsed to TPO
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleRefer(opp.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                        >
                          Refer Candidate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Actions & Details */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Academic & Placement Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block">University Enrolment</span>
                  <p className="font-semibold text-slate-800 mt-0.5">Apex Institute of Technology</p>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block">Degree Program</span>
                  <p className="font-semibold text-slate-800 mt-0.5">B.Tech / B.Sc Integrated (Class of 2026)</p>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block">Core Specialization</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{student.primarySkill}</p>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block">Current Placement Status</span>
                  <p className="font-bold text-teal-700 mt-0.5">{student.status}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-slate-300">
                    <Download className="w-3.5 h-3.5" />
                    Download Student Dossier
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-slate-300">
                    <Mail className="w-3.5 h-3.5" />
                    Notify Placement Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
