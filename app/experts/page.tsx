'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Award, ShieldCheck, CheckCircle2, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function ExpertsLandingPage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const handleLaunch = () => {
    setRole('expert');
    router.push('/expert/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="indigo" size="md">
              The Accredited Expert Network
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Certify Real Capability. Earn Meaningful Honorariums.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Join senior modelers like Dr. Vikram Sen and engineering leads who set standard evaluation rubrics,
              conduct blind peer reviews, and certify emerging talent without recruiter bias.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={handleLaunch}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Launch Expert Dashboard (Dr. Vikram Sen)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Strict Blind Review Rubrics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review candidate financial sheets and code models without seeing automated AI scores until your own
                independent evaluation is saved.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Conflict-of-Interest Governance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every review requires an explicit COI sign-off, protecting evaluation sanctity for candidates and hiring
                enterprises alike.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">₹4,000 / Certified Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive direct honorariums for each diagnostic evaluation completed. Transparent earnings ledger and
                invoice generation.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
