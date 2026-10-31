'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  FileCheck2,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function TalentLandingPage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const handleLaunch = () => {
    setRole('talent');
    router.push('/talent/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="indigo" size="md">
              For Talent & Career Seekers
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Let Your Work Artifacts Speak Louder Than Your Degree
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are a self-taught financial analyst like Aarav Mehta, a fresher from a Tier-3 college, or an
              experienced professional pivoting careers—Zaprill gives you the platform to prove your capability with
              evidence.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={handleLaunch}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Launch Talent Workspace (Aarav Mehta)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Diagnostic Assessments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work through real commercial models across 20+ skills in Finance, Analytics, Software, Marketing, and
                Operations.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Verifiable Capability Passport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Showcase your demonstrated scores, supporting spreadsheet models, and accredited expert endorsements to any
                employer.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Direct-to-Hiring Pipeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apply to curated jobs, internships, freelance projects, and paid tasks with transparent match scores and zero
                resume screening lag.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
