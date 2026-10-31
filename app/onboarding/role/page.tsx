'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';
import { Role } from '@/lib/types';
import { User, Building2, Award, GraduationCap, ArrowRight } from 'lucide-react';

export default function OnboardingRolePage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const handleSelectRole = (role: Role, route: string) => {
    setRole(role);
    router.push(route);
  };

  const options: Array<{ role: Role; title: string; desc: string; icon: any; route: string }> = [
    {
      role: 'talent',
      title: 'Talent Workspace',
      desc: 'Build your Capability Passport, complete practical assessments, and connect with hiring companies.',
      icon: User,
      route: '/talent/dashboard',
    },
    {
      role: 'business',
      title: 'Business Workspace',
      desc: 'Create job and project opportunities, inspect verified candidate spreadsheets, and manage applicant stages.',
      icon: Building2,
      route: '/business/dashboard',
    },
    {
      role: 'expert',
      title: 'Expert Evaluation Network',
      desc: 'Review candidate submissions with independent rubrics, audit models, and earn structured honorariums.',
      icon: Award,
      route: '/expert/dashboard',
    },
    {
      role: 'institution',
      title: 'Institution & Campus Portal',
      desc: 'Manage student cohort readiness, launch assessment campaigns, and benchmark skill distributions.',
      icon: GraduationCap,
      route: '/institution/dashboard',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Select Your Workspace Persona</h1>
            <p className="text-xs text-slate-500">
              Each workspace features a pre-loaded Indian-market dataset for immediate evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <Card
                  key={opt.role}
                  className="p-5 bg-white hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => handleSelectRole(opt.role, opt.route)}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{opt.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-bold">
                    <span>Enter Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
