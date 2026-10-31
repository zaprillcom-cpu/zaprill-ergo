'use client';

import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Mail,
  MapPin,
  Clock,
  Star,
  FileCheck2,
  Check,
  Edit3,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';

export default function ExpertProfilePage() {
  const { state } = useZaprillStore();
  const expert = state.experts[0]; // Dr. Vikram Sen

  const [isAvailable, setIsAvailable] = useState(true);
  const [slaHours, setSlaHours] = useState('48');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Profile Header Card */}
        <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-r from-[#0B1329] via-indigo-950 to-slate-900 border-b border-slate-200" />

          <div className="p-6 sm:p-8 pt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 text-white font-black text-3xl flex items-center justify-center border-4 border-white shadow-md">
                  VS
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900">{expert.name}</h1>
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{expert.title}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Mumbai, India • <Mail className="w-3.5 h-3.5" /> vikram.sen@zaprill-expert.in
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <Badge variant="teal" className="gap-1.5 py-1 px-3">
                  <Award className="w-3.5 h-3.5" />
                  {expert.accreditationNumber}
                </Badge>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 font-medium uppercase">Accredited Domain</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{expert.domain}</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium uppercase">Evaluations Completed</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{expert.evaluationsCompleted || expert.reviewsCompleted || 48} candidates</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium uppercase">Evaluator Rating</span>
                <p className="text-sm font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                  ★ {expert.rating ? expert.rating.toFixed(2) : '4.95'} <span className="text-slate-400 font-normal">/ 5.0</span>
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium uppercase">Per-Review Fee</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{formatINR(expert.hourlyRateINR || expert.hourlyRate || 4000)} honorarium</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Background */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Professional Background & Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>{expert.bio}</p>
                <p>
                  Former Director of Valuation & Financial Modeling at KPMG India. Led over 120 valuation mandates across SaaS, multi-city logistics, and commercial real estate. Specializes in building audit-grade unit economics frameworks and training analysts to avoid circular spreadsheet traps.
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Accredited Specializations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(expert.specialties || ['Valuation', 'Financial Modeling', 'Unit Economics', 'Real Estate DCF']).map((spec: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium text-xs border border-indigo-100">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials from Candidates & Businesses */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Recent Evaluation Reviews & Feedback</CardTitle>
                <p className="text-xs text-slate-500">Unfiltered remarks from assessed candidates and hiring managers.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: 'Aarav Mehta',
                    role: 'Candidate (Financial Analyst)',
                    comment:
                      'Dr. Sen’s rubric feedback was infinitely more constructive than standard interview rejections. He pinpointed exactly why my break-even occupancy assumption failed under Mumbai CAM rates.',
                    rating: 5,
                    date: 'Oct 2026',
                  },
                  {
                    name: 'Aditi Sharma',
                    role: 'VP Operations, HarbourDesk Spaces',
                    comment:
                      'Dr. Vikram Sen’s ratified report gave our hiring committee 100% confidence to bypass two rounds of technical take-home tests and proceed directly to offer stage.',
                    rating: 5,
                    date: 'Oct 2026',
                  },
                ].map((t, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                        <p className="text-[11px] text-slate-500">{t.role} • {t.date}</p>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(t.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">&quot;{t.comment}&quot;</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Availability & Settings */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Evaluator Preferences</CardTitle>
                <p className="text-xs text-slate-500">Queue intake and turnaround settings.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePreferences} className="space-y-4">
                  {/* Availability Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Queue Status</span>
                      <span className="text-[11px] text-slate-500">
                        {isAvailable ? 'Accepting new candidate reviews' : 'Queue paused'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAvailable(!isAvailable)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isAvailable ? 'bg-teal-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isAvailable ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* SLA Hours */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Committed Turnaround SLA
                    </label>
                    <select
                      value={slaHours}
                      onChange={(e) => setSlaHours(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="24">24 Hours (Fast-track)</option>
                      <option value="48">48 Hours (Standard)</option>
                      <option value="72">72 Hours (Extended)</option>
                    </select>
                  </div>

                  {/* Honorarium Payout Account */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Direct Payout Account</span>
                    <p className="text-xs font-bold text-slate-900">HDFC Bank •••••• 4819</p>
                    <p className="text-[11px] text-slate-500">IFSC: HDFC0000128 (Nariman Point)</p>
                  </div>

                  {savedSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5 font-medium">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Preferences updated successfully!
                    </div>
                  )}

                  <Button type="submit" size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Update Evaluator Settings
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Official Credential Badge */}
            <div className="p-5 rounded-2xl bg-[#0B1329] text-white space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <h4 className="text-xs font-bold tracking-tight uppercase text-teal-300">
                  Accreditation Certificate
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ratified by the Zaprill Global Competency Board under Standard ISO/IEC 17024 for human capability appraisal.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Issued: Jan 2025</span>
                <span>Valid: Jan 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
