'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { formatINR } from '@/lib/utils';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="indigo" size="md">
              Simple & Transparent Pricing
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Invest in Verified Proof, Not Unfiltered Resumes
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              All plans are priced in Indian Rupees (INR). Clearly labeled as illustrative prototype figures. No hidden
              recruiting agency commissions.
            </p>
          </div>

          {/* Business Plans */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 text-center">Business & Employer Subscriptions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <Card className="bg-white flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <Badge variant="slate" size="sm">
                    Starter
                  </Badge>
                  <div>
                    <span className="text-3xl font-black text-slate-900">₹14,999</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    For seed-stage startups and small agencies looking for 1–2 proven junior analysts or engineers.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>3 Active Opportunity Listings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Access to 24 Verified Talent Profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Direct In-App Messaging</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/business/billing" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Select Starter
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Growth (Most Popular) */}
              <Card className="bg-white border-2 border-indigo-600 shadow-xl flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider">
                  Most Popular for High-Growth
                </div>
                <CardContent className="p-6 space-y-4">
                  <Badge variant="indigo" size="sm">
                    Growth
                  </Badge>
                  <div>
                    <span className="text-3xl font-black text-indigo-700">₹39,999</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    For scaling companies like HarbourDesk Spaces wanting tailored assessments and candidate comparison.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Unlimited Opportunity Postings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Custom Enterprise Assessment Rubrics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Side-by-Side 3-Candidate Comparison</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Dedicated Talent Success Lead</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/business/billing" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Select Growth
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Enterprise */}
              <Card className="bg-white flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <Badge variant="teal" size="sm">
                    Enterprise
                  </Badge>
                  <div>
                    <span className="text-3xl font-black text-slate-900">₹95,000</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    For national organizations hiring across multi-city hubs with custom SSO and ATS integration.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Full Campus Cohort Benchmarking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Private Simulation Challenge Hosting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Priority SLA & Verified Business Badge</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Talent & Expert Economics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-slate-50 border-slate-200 space-y-3">
              <Badge variant="indigo" size="sm">
                For Talent
              </Badge>
              <h3 className="text-lg font-bold text-slate-900">Free Baseline + Optional Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Taking diagnostic assessments and building your Capability Passport is completely <strong>free</strong>.
                You can optionally request an accredited expert review for ₹999 to certify your passport with independent
                institutional credibility.
              </p>
            </Card>

            <Card className="p-6 bg-teal-50/60 border-teal-200 space-y-3">
              <Badge variant="teal" size="sm">
                For Experts
              </Badge>
              <h3 className="text-lg font-bold text-slate-900">Earn ₹4,000 per Certified Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accredited senior practitioners evaluate candidate financial models and code submissions. Earn direct
                honorariums while helping surface real merit across Indian engineering and finance talent.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
