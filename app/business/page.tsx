'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Users,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function BusinessLandingPage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const handleLaunch = () => {
    setRole('business');
    router.push('/business/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="teal" size="md">
              For Businesses & Hiring Teams
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hire Proven Problem Solvers. Eliminate 4 Rounds of Whiteboarding.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Why spend 40 engineering or finance hours vetting resumes when you can inspect verified spreadsheet models,
              dimensional rubrics, and accredited expert evaluations before the first interview?
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={handleLaunch}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Launch Business Workspace (HarbourDesk Spaces)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">65% Shorter Hiring Loops</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review candidates who have already passed the exact unit economics or systems engineering assessment
                customized for your business.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Inspect Real Artifacts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Open candidate financial worksheets, check calculation formulas, and evaluate how they diagnosed junior
                analyst errors in Stage 4.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Multi-Candidate Comparison</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare up to 3 candidates side-by-side across overall capability score, applied metrics, knowledge mastery,
                and compensation expectations.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
