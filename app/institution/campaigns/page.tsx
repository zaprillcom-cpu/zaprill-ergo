'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileCheck2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { useZaprillStore } from '@/lib/store';

export default function InstitutionCampaignsPage() {
  const { state } = useZaprillStore();
  const [campaigns, setCampaigns] = useState(state.campaigns);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [cohort, setCohort] = useState('Class of 2026 (Semester 7)');
  const [assessmentId, setAssessmentId] = useState(state.assessments[0]?.id || '');
  const [endDate, setEndDate] = useState('2026-11-30');
  const [launchSuccess, setLaunchSuccess] = useState(false);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const selAssessment = state.assessments.find((a) => a.id === assessmentId);
    const newCamp = {
      id: `camp-${Date.now()}`,
      institutionId: 'inst-apex-tech',
      name: name || 'Special Diagnostic Sprint',
      assessmentId: assessmentId,
      assessmentTitle: selAssessment?.title || 'Practical Assessment',
      cohort: cohort,
      enrolledStudentsCount: 40,
      completedCount: 0,
      avgScore: 0,
      status: 'Active' as const,
      startDate: new Date().toISOString().split('T')[0],
      endDate: endDate,
    };

    setCampaigns([newCamp, ...campaigns]);
    setLaunchSuccess(true);
    setTimeout(() => {
      setLaunchSuccess(false);
      setModalOpen(false);
      setName('');
    }, 1500);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Diagnostic Drives</h1>
            <p className="text-sm text-slate-500 mt-1">
              Organize cohort-wide capability evaluations to benchmark student readiness for upcoming campus recruitment.
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Launch New Diagnostic Drive
          </Button>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Average Cohort Participation</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">89.3%</span>
              <span className="text-xs text-emerald-600 font-semibold">+12% vs 2025</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">67 / 75 eligible students completed</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Industry Ready Ratio</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-600">68%</span>
              <span className="text-xs text-slate-500">Score ≥ 75</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Meeting corporate recruitment bar</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Average Score Growth</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-indigo-600">+7.4 pts</span>
              <span className="text-xs text-indigo-700 font-medium">Post-intervention</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Following practical error-detection clinics</p>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">All Diagnostic Campaigns</h2>

          <div className="grid grid-cols-1 gap-4">
            {campaigns.map((camp) => (
              <Card key={camp.id} className="p-6 border-slate-200 hover:border-indigo-200 transition-all">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={camp.status === 'Active' ? 'success' : 'neutral'}>
                        {camp.status}
                      </Badge>
                      <span className="text-xs font-medium text-slate-500">{camp.cohort}</span>
                      <span className="text-xs text-slate-400">• Window: {camp.startDate} to {camp.endDate}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{camp.name}</h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                      Assessment: <span className="font-semibold">{camp.assessmentTitle}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 self-stretch lg:self-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-slate-400 block">Submissions</span>
                      <span className="text-base font-extrabold text-slate-900">
                        {camp.completedCount} / {camp.enrolledStudentsCount}
                      </span>
                    </div>

                    <div className="text-left lg:text-right">
                      <span className="text-xs text-slate-400 block">Cohort Average</span>
                      <span className="text-base font-extrabold text-teal-600 font-mono">
                        {camp.avgScore > 0 ? `${camp.avgScore} / 100` : 'In Progress'}
                      </span>
                    </div>

                    <Link href={`/institution/students`}>
                      <Button variant="outline" size="sm" className="text-xs gap-1 border-slate-300">
                        View Submissions <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{
                        width: `${camp.enrolledStudentsCount > 0 ? (camp.completedCount / camp.enrolledStudentsCount) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    {camp.enrolledStudentsCount > 0
                      ? `${Math.round((camp.completedCount / camp.enrolledStudentsCount) * 100)}% Participation`
                      : '0%'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal: Launch New Campaign */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Launch Campus Diagnostic Assessment Drive"
          description="Enroll a student batch into a standardized practical evaluation to benchmark capability before corporate hiring drives."
        >
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Finance & Analytics Pre-Placement Benchmark"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Student Cohort
              </label>
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Class of 2026 (Semester 7)">Class of 2026 (Semester 7 - All Depts)</option>
                <option value="Class of 2026 (CSE & IT)">Class of 2026 (CSE & IT)</option>
                <option value="Class of 2026 (Commerce & Finance)">Class of 2026 (Commerce & Finance)</option>
                <option value="Class of 2027 (Summer Interns)">Class of 2027 (Pre-final Summer Interns)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Select Practical Assessment
              </label>
              <select
                value={assessmentId}
                onChange={(e) => setAssessmentId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {state.assessments.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title} ({a.category} • {a.difficulty})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Submission Deadline
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {launchSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Drive initiated! 40 student notifications dispatched.
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Launch Drive
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
