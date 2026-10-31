'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function InstitutionsLandingPage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const handleLaunch = () => {
    setRole('institution');
    router.push('/institution/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="indigo" size="md">
              For Universities & Autonomous Colleges
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Transform Campus Placement Outcomes with Proven Skill Indexing
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Help your engineering and management students graduate with verified Capability Passports. Run standardized
              placement assessment campaigns, diagnose curriculum gaps, and present verified talent cohorts to hiring
              enterprises.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={handleLaunch}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Launch Institution Portal (Apex Institute)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">40-Student Cohort Benchmarking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter students by department, CGPA, and practical capability score. Spot high-potential candidates who
                excel beyond standard semester exam scores.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Placement Readiness Campaigns</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Launch targeted assessment drives across departments, monitor completion rates in real time, and share
                cohort capability dashboards directly with recruiters.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Accredited Student Passports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equip your students with verifiable links that bypass automated applicant tracking filters and prove
                hands-on readiness.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
