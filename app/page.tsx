'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  FileText,
  Briefcase,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ErgoLogo } from '@/components/ergo/ergo-logo';
import { useAuth } from '@/lib/auth/auth-context';

export default function HomePage() {
  const router = useRouter();
  const { loginAsDemo, careerHealth, marketValue, resumeData } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const fiveQuestions = [
    {
      q: 'Where do I currently stand in the job market?',
      a: 'Our Career Health Score evaluates your profile across 6 objective dimensions including ATS readability, market competitiveness, and skill relevance.',
      icon: Activity,
    },
    {
      q: 'What is my actual market value?',
      a: 'We benchmark your technical stack and years of experience against real-time salary disclosures, revealing your 50th and 90th percentile earning potential.',
      icon: TrendingUp,
    },
    {
      q: 'Which jobs are suitable for my profile?',
      a: 'Discover curated openings with transparent % match scores broken down by technical capabilities, role relevance, and experience alignment.',
      icon: Briefcase,
    },
    {
      q: 'What skills am I missing?',
      a: 'Our Skill Gap Analyzer maps the exact high-yield technologies that block your next salary band and shows you their direct financial upside.',
      icon: Compass,
    },
    {
      q: 'What should I do next to improve my prospects?',
      a: 'Receive prioritized, high-leverage recommendations and an intelligent 30-day action plan from the ERGO AI Career Coach.',
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      q: 'What is ERGO?',
      a: 'ERGO is an AI-powered Career Intelligence Platform created by Zaprill. It helps students, fresh graduates, and professionals discover their true market value, diagnose resume flaws, identify critical skill gaps, and accelerate career progress.',
    },
    {
      q: 'Is my resume data safe and private?',
      a: 'Yes. In ERGO, your resume is analyzed confidentially to calculate your career intelligence metrics. Your details are never sold or shared with third parties without your explicit request.',
    },
    {
      q: 'How does ERGO calculate Market Value?',
      a: 'Rather than relying on unverified self-reported survey averages, ERGO models real-time salary disclosures across Indian tech hubs (Bengaluru, Mumbai, Gurgaon, and Remote) mapped directly to your specific technical stack and years of experience.',
    },
    {
      q: 'How can I try the interactive platform right now?',
      a: 'Click "Launch Interactive Demo" anywhere on this page. You will instantly enter the full authenticated ERGO experience as Aarav Mehta (Frontend Developer, 2 years exp) with real interactive tools, assessments, and AI coach interactions.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#12131A] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <ErgoLogo size="md" showTagline={true} withLink={true} />

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-[#0F2B5D] transition-colors">
              How ERGO Works
            </a>
            <a href="#market-value" className="hover:text-[#0F2B5D] transition-colors">
              Market Value Engine
            </a>
            <a href="#features" className="hover:text-[#0F2B5D] transition-colors">
              Core Capabilities
            </a>
            <a href="#faq" className="hover:text-[#0F2B5D] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={loginAsDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-md shadow-[#16C5A6]/25 hover:bg-[#12A88E] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#16C5A6]/10 via-[#0F2B5D]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16C5A6]/10 border border-[#16C5A6]/30 text-[#0F766E] text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
                <span>ERGO by Zaprill · Career Intelligence Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F2B5D] leading-[1.08] mb-6">
                Stop guessing your worth.{' '}
                <span className="bg-gradient-to-r from-[#0F2B5D] via-[#133672] to-[#16C5A6] bg-clip-text text-transparent">
                  Let ERGO calculate it.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                ERGO evaluates your resume, benchmarks your real market compensation, identifies critical skill gaps, and matches you with high-fit opportunities you can actually land.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button
                  onClick={loginAsDemo}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#16C5A6] text-[#091B3A] text-sm font-bold shadow-xl shadow-[#16C5A6]/25 hover:bg-[#12A88E] hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Live Platform as Aarav</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <span>Sign In with Credentials</span>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16C5A6]" />
                  <span>Free Demo Account</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16C5A6]" />
                  <span>Instant ATS Analysis</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16C5A6]" />
                  <span>Verified Salary Benchmarks</span>
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#16C5A6]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top Pill */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0F2B5D] flex items-center justify-center text-[#16C5A6] font-black text-xs shadow-sm">
                      E
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Aarav Mehta</h4>
                      <p className="text-[10px] text-slate-500">Frontend Developer · Mumbai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#0B6756] bg-[#16C5A6]/15 px-2.5 py-1 rounded-full border border-[#16C5A6]/30">
                    Live Score
                  </span>
                </div>

                {/* Core Metric 1: Career Health */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">Career Health Score</span>
                    <span className="text-xs font-bold text-emerald-600">+8% vs last month</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0F2B5D]">{careerHealth.overallScore}</span>
                    <span className="text-xs font-semibold text-slate-400">/ 100</span>
                    <span className="ml-auto text-xs font-bold text-[#16C5A6]">Competitive Tier</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 mt-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0F2B5D] to-[#16C5A6]"
                      style={{ width: `${careerHealth.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Core Metric 2: Market Value Gap */}
                <div className="p-4 rounded-2xl bg-[#0F2B5D]/5 border border-[#0F2B5D]/15 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#0F2B5D]">Calculated Market Value</span>
                    <span className="text-[10px] font-bold text-[#0F2B5D] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      INR Benchmark
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black text-[#0F2B5D]">₹11,50,000</span>
                    <span className="text-xs text-slate-500">/ year (Top 10%)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-tight">
                    Current: ₹6.5L · <strong className="text-[#0B6756] font-semibold">+₹5.0L potential gap</strong> detected based on Next.js stack.
                  </p>
                </div>

                {/* Core Metric 3: Resume & Skill Check */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">ATS Pass Rate</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">{resumeData.overallAtsScore}%</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Clean single-column</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Missing Key Skill</span>
                    <p className="text-xs font-bold text-rose-600 mt-1.5 truncate">System Design</p>
                    <span className="text-[10px] text-slate-500 font-medium">+₹2.5L bump</span>
                  </div>
                </div>

                <button
                  onClick={loginAsDemo}
                  className="w-full py-2.5 rounded-xl bg-[#0F2B5D] text-white font-semibold text-xs hover:bg-[#133672] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Fundamental Questions ERGO Answers */}
      <section id="how-it-works" className="py-20 bg-white border-y border-[#E2E4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#16C5A6]/10 px-3 py-1 rounded-full border border-[#16C5A6]/30">
              Career Decision Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B5D] tracking-tight mt-4">
              Five fundamental questions answered with precision
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Never make a career move based on gut feeling or generic advice again.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiveQuestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#16C5A6]/50 hover:bg-white hover:shadow-xl hover:shadow-[#0F2B5D]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#16C5A6] shadow-sm mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.q}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.a}
                  </p>
                </div>
              );
            })}

            {/* Final CTA Card in the Grid */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#091B3A] to-[#0F2B5D] text-white flex flex-col justify-between border border-[#1D3B6F]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16C5A6]">
                  Ready to check your standing?
                </span>
                <h3 className="text-xl font-bold mt-2 leading-tight">
                  Experience your career command center right now.
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Interactive simulation with realistic Mumbai & Bengaluru tech market benchmarks.
                </p>
              </div>

              <button
                onClick={loginAsDemo}
                className="mt-6 w-full py-3 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-lg shadow-[#16C5A6]/30 hover:bg-[#12A88E] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="features" className="py-20 bg-[#F8F9FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200/60 px-3 py-1 rounded-full">
              Full Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              Connected modules designed for career breakthrough
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every tool inside ERGO shares the same profile intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-[#0F2B5D]/10 text-[#0F2B5D] flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">Career Health Score</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single unified readiness metric with detailed factor breakdown, strengths, and historical trajectory.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-[#16C5A6]/15 text-[#0F766E] flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">Market Value Engine</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective compensation ranges in INR with peer comparisons across Mumbai, Bengaluru, and Remote.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">ATS Resume Diagnostic</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep parser simulation that highlights unread sections, missing keywords, and weak metric bullets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-[#16C5A6]/15 text-[#0B6756] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-[#16C5A6]" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">AI Career Coach</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Intelligent conversational assistant for negotiation scripting, interview preparation, and 30-day plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-white border-t border-[#E2E4EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F2B5D] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about ERGO by Zaprill.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-[#0F2B5D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-light text-slate-400 ml-4">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#071326] text-slate-400 py-12 border-t border-[#1D3B6F]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1D3B6F]/40">
            <ErgoLogo size="md" showTagline={true} theme="dark" withLink={true} />

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-white transition-colors">
                Create Account
              </Link>
              <a href="https://www.zaprill.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Parent Brand (Zaprill)
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} ERGO by Zaprill. All rights reserved.</p>
            <p>Illustrative Career Intelligence Engine & Simulation System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
