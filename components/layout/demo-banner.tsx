'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  RotateCcw,
  Sparkles,
  User,
  Building2,
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useZaprillStore } from '@/lib/store';
import { Role } from '@/lib/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

export function DemoBanner() {
  const router = useRouter();
  const { currentRole, setRole, resetDemoData, currentUser } = useZaprillStore();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const roles: Array<{
    id: Role;
    label: string;
    persona: string;
    icon: React.ReactNode;
    route: string;
  }> = [
    {
      id: 'talent',
      label: 'Talent',
      persona: 'Aarav Mehta (Financial Analyst)',
      icon: <User className="w-3.5 h-3.5" />,
      route: '/talent/dashboard',
    },
    {
      id: 'business',
      label: 'Business',
      persona: 'HarbourDesk Spaces (Operations)',
      icon: <Building2 className="w-3.5 h-3.5" />,
      route: '/business/dashboard',
    },
    {
      id: 'expert',
      label: 'Expert',
      persona: 'Dr. Vikram Sen (Accredited Reviewer)',
      icon: <Award className="w-3.5 h-3.5" />,
      route: '/expert/dashboard',
    },
    {
      id: 'institution',
      label: 'Institution',
      persona: 'Apex Institute of Technology',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      route: '/institution/dashboard',
    },
    {
      id: 'admin',
      label: 'Admin',
      persona: 'Platform Super Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      route: '/admin/dashboard',
    },
  ];

  const handleRoleSelect = (role: Role, route: string) => {
    setRole(role);
    router.push(route);
  };

  const handleReset = () => {
    resetDemoData();
    setResetModalOpen(false);
    router.push('/talent/dashboard');
  };

  return (
    <>
      <div className="demo-banner bg-slate-900 border-b border-slate-800 text-white text-xs px-3 py-2 flex flex-wrap items-center justify-between gap-2.5 z-40 sticky top-0 backdrop-blur-md">
        {/* Left: Indicator & Guide */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Demo — fictional data
          </span>

          <button
            onClick={() => setGuideModalOpen(true)}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">5-Min Presentation Story</span>
          </button>
        </div>

        {/* Center: Quick 1-Click Role Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 overflow-x-auto max-w-full">
          <span className="text-[11px] text-slate-400 px-2 font-medium hidden md:inline">Switch Persona:</span>
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRoleSelect(r.id, r.route)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title={r.persona}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Reset Data & Active Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span>Reset Demo</span>
          </button>

          <Link
            href="/talent/passport"
            className="hidden lg:inline-flex items-center gap-1 text-[11px] text-teal-300 hover:underline"
          >
            Aarav’s Passport
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Confirmation Modal for Reset Demo */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset Demo to Initial Seed?"
        description="This will restore all 24 talent profiles, 8 businesses, assessments, opportunities, and applications to their clean fictional seed state."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleReset}>
              Yes, Reset Everything
            </Button>
          </>
        }
      >
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            Any custom assessment attempts, submitted reviews, or locally created opportunities will be replaced with
            the initial Indian market seed dataset.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
            💡 <strong>Tip:</strong> The seed state is pre-loaded with Aarav Mehta’s 82/100 score, pending expert review, and
            HarbourDesk Spaces application.
          </div>
        </div>
      </Modal>

      {/* Presentation Walkthrough Story Modal */}
      <Modal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        title="Zaprill Core Demonstration Story"
        description="Follow this connected end-to-end journey across all three core personas."
        maxWidth="2xl"
        footer={
          <Button variant="primary" size="sm" onClick={() => setGuideModalOpen(false)}>
            Close & Continue Exploring
          </Button>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-900">
            <strong>Narrative Goal:</strong> Demonstrate how verified practical assessment evidence bridges the gap between self-taught talent and high-growth businesses without relying on degree gatekeeping.
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Talent Assessment & AI Scoring</h4>
                <p className="mt-0.5">
                  As <strong>Aarav Mehta</strong> (Talent), open <Link href="/talent/assessments/assess-coworking-profitability" className="text-indigo-600 underline font-medium">Coworking Profitability Assessment</Link>. Click <em>Fill Sample Answers</em> and submit. Inspect the 5-dimension score (82/100), AI evaluation badge, and click <strong>Request Expert Review</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Expert Blind Rubric Review</h4>
                <p className="mt-0.5">
                  Switch to <strong>Dr. Vikram Sen</strong> (Expert). Open <Link href="/expert/assignments/asg-coworking-profitability-aarav" className="text-indigo-600 underline font-medium">Review Assignment</Link>. Accept COI declaration, inspect candidate model, submit bounded scores and remarks. Observe validation status transition to <em>Expert-Reviewed</em>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Capability Passport Update</h4>
                <p className="mt-0.5">
                  Switch back to <strong>Talent</strong>. View <Link href="/talent/passport" className="text-indigo-600 underline font-medium">Capability Passport</Link> and <Link href="/p/aarav-mehta" className="text-indigo-600 underline font-medium">Public Profile</Link>. The badge has turned from Self-Declared to <strong>Expert-Reviewed</strong> with verifiable dimension scores.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Transparent Opportunity Matching & Application</h4>
                <p className="mt-0.5">
                  Browse <Link href="/talent/opportunities/opp-harbourdesk-analyst" className="text-indigo-600 underline font-medium">HarbourDesk Opportunity</Link>. Inspect the 94% match calculation breakdown. Submit application.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                5
              </span>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Business Candidate Pipeline & Verification</h4>
                <p className="mt-0.5">
                  Switch to <strong>HarbourDesk Spaces</strong> (Business). Open <Link href="/business/talent/talent-aarav-mehta" className="text-indigo-600 underline font-medium">Aarav Mehta’s Profile</Link>. Inspect his spreadsheet model, advance him to <em>Interview Scheduled</em>, and observe his application timeline synchronize live!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
