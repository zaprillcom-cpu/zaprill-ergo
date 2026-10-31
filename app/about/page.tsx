'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Heart, Award, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="indigo" size="md">
              Our Mission
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Leveling the Economic Playing Field for Applied Talent
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Zaprill was founded to dismantle the arbitrary credentials and pedigree bias that lock talented individuals
              out of high-growth careers across India.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-8 rounded-2xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900">The Problem with Legacy Hiring</h2>
            <p>
              In India today, millions of intelligent, hardworking people teach themselves financial modeling, database
              optimization, and software architecture online. Yet when they submit a resume, automated applicant tracking
              systems discard them within milliseconds simply because they lack a prestigious tier-1 college brand.
            </p>
            <p>
              Simultaneously, high-growth startups and businesses like HarbourDesk Spaces waste hundreds of leadership hours
              interviewing candidates who look great on paper but cannot diagnose a simple lease escalation flaw or model
              basic unit economics under pressure.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-4">The Zaprill Solution: Capability Intelligence</h2>
            <p>
              Zaprill replaces subjective claims with verifiable practical proof. By combining standardized multi-stage
              assessments, transparent 5-dimension rubric scoring, and accredited independent expert reviews, we give
              candidates a portable Capability Passport that employers can trust instantly.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="font-mono text-2xl font-black text-indigo-600">100%</span>
                <p className="text-xs text-slate-600 mt-1">Merit-Based Matching</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="font-mono text-2xl font-black text-teal-600">5</span>
                <p className="text-xs text-slate-600 mt-1">Diagnostic Dimensions</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="font-mono text-2xl font-black text-slate-800">0</span>
                <p className="text-xs text-slate-600 mt-1">Degree Gatekeeping</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
