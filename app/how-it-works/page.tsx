'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileCheck2,
  Sparkles,
  Award,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';

export default function HowItWorksPage() {
  const router = useRouter();
  const { setRole } = useZaprillStore();

  const steps = [
    {
      num: '01',
      title: 'Complete a Practical 5-Stage Assessment',
      badge: 'Practical Diagnosis',
      desc: 'Instead of memorized trivia or keyword-stuffed resumes, you tackle realistic workplace scenarios—such as modeling multi-location coworking unit economics, auditing lease escalation clauses, or writing high-concurrency SQL queries.',
      features: [
        'Interactive financial model spreadsheets and SQL consoles',
        'Five diagnostic dimensions: Understanding, Application, Reasoning, Error Detection, Transfer',
        'Realistic raw datasets provided by verified businesses',
      ],
    },
    {
      num: '02',
      title: 'Receive Instant Simulated AI Diagnostic Evaluation',
      badge: 'Automated Diagnostic',
      desc: 'Your submission is instantly benchmarked against normalized rubrics. You receive dimension breakdown percentages, specific analytical strengths, and actionable areas for improvement.',
      features: [
        'Transparent illustrative formula scoring (Sum of earned points: 0–100)',
        'Normalized dimension radar graphs for instant profile visualization',
        'Actionable feedback and suggested next-level challenges',
      ],
    },
    {
      num: '03',
      title: 'Request Accredited Senior Expert Review',
      badge: 'Independent Verification',
      desc: 'To upgrade your results to the highest tier of commercial trust, request an evaluation from our accredited Expert Network. Senior modelers and engineering leaders conduct blind rubric reviews under strict conflict-of-interest declarations.',
      features: [
        'Simulated AI scores stay hidden until the expert enters an independent score',
        'Bounded rubric scoring and detailed qualitative commentary',
        'Validates candidate problem-solving maturity and edge-case handling',
      ],
    },
    {
      num: '04',
      title: 'Publish Your Evidence-Backed Capability Passport',
      badge: 'Permanent Proof',
      desc: 'Your verified skills, spreadsheet models, and assessment reports are compiled into a shareable Capability Passport. You control privacy toggles for confidential work artifacts.',
      features: [
        'Four clear tiers: Self-Declared, Assessment-Demonstrated, Expert-Reviewed, Business-Confirmed',
        'Print-ready PDF layout for offline executive interviews',
        'Shareable public link with cryptographic verification hash',
      ],
    },
    {
      num: '05',
      title: 'Discover Transparently Matched Opportunities',
      badge: 'Merit-Based Matching',
      desc: 'High-growth businesses search talent by proven competencies. Apply directly to jobs, internships, freelance projects, and paid tasks with transparent match scores.',
      features: [
        'Detailed match breakdown: 70% verified skills + 30% supporting evidence',
        'Candidate appears instantly in the hiring manager’s applicant pipeline',
        'Skip 3–4 rounds of repetitive initial screening interviews',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="indigo" size="md">
              The Capability Intelligence Model
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Zaprill Replaces the Broken Resume System
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              From practical assessment to verified passport and guaranteed business visibility. Here is how our 5-step
              verification architecture works.
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-8">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-2 flex items-center md:flex-col items-start gap-3">
                  <span className="font-mono text-3xl font-black text-indigo-600">{st.num}</span>
                  <Badge variant="teal" size="sm">
                    {st.badge}
                  </Badge>
                </div>

                <div className="md:col-span-10 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {st.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive CTA */}
          <div className="p-8 bg-indigo-600 rounded-3xl text-white text-center space-y-4 shadow-xl shadow-indigo-600/20">
            <h2 className="text-2xl font-bold">Experience the Full Flow in Action</h2>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto">
              Follow our primary demo candidate Aarav Mehta as he completes the Coworking Profitability assessment, gets
              reviewed by Dr. Vikram Sen, and applies to HarbourDesk Spaces.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setRole('talent');
                  router.push('/talent/assessments/assess-coworking-profitability');
                }}
                className="bg-white text-indigo-700 hover:bg-slate-100 font-bold"
              >
                Start Coworking Assessment as Aarav
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
