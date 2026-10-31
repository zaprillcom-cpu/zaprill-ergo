'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Download,
  Eye,
  RefreshCw,
  Search,
  Check,
  X,
  Clock,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function ResumeIntelligencePage() {
  const { resumeData, simulateResumeUpload } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'experience' | 'preview'>('overview');

  // Live OpenAI Bullet Optimizer state
  const [optimizingBullet, setOptimizingBullet] = useState(false);
  const [bulletInput, setBulletInput] = useState(
    'Engineered checkout flow and state management using React and Redux.'
  );
  const [optimizationResult, setOptimizationResult] = useState<{
    originalBullet: string;
    optimizedBullet: string;
    impactMetric: string;
    formulaUsed: string;
    keywordsIncluded: string[];
    explanation: string;
    isLiveAI?: boolean;
    model?: string;
  } | null>(null);

  const handleOptimizeBullet = async (customText?: string) => {
    const text = customText || bulletInput;
    if (!text.trim() || optimizingBullet) return;

    setOptimizingBullet(true);
    try {
      const res = await fetch('/api/ai/resume-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet: text, targetRole: 'Frontend / Full-Stack Engineer' }),
      });
      if (res.ok) {
        const data = await res.json();
        setOptimizationResult(data);
      }
    } catch (err) {
      console.error('Failed to optimize bullet:', err);
    } finally {
      setOptimizingBullet(false);
    }
  };

  const handleSimulateDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(20);

    const timer1 = setTimeout(() => setUploadProgress(55), 400);
    const timer2 = setTimeout(() => setUploadProgress(85), 800);

    await simulateResumeUpload(file.name);
    setUploadProgress(100);
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 400);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Upload & Parser Diagnostic Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
              <FileText className="w-3.5 h-3.5" />
              <span>ERGO ATS Resume Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Resume Diagnostic: {resumeData.overallAtsScore}/100
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Active document:{' '}
              <strong className="text-slate-900 font-semibold">{resumeData.fileName}</strong> ({resumeData.fileSize}) ·{' '}
              Parsed {resumeData.lastParsed}.
            </p>
          </div>

          {/* Interactive Upload Box */}
          <div className="shrink-0 w-full lg:w-auto">
            <label className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#16C5A6]/40 hover:border-[#16C5A6] rounded-2xl bg-[#16C5A6]/5 hover:bg-[#16C5A6]/10 transition-all text-center group">
              <UploadCloud className="w-8 h-8 text-[#16C5A6] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900">
                {uploading ? `Parsing (${uploadProgress}%)` : 'Upload or Drop New Resume'}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Supports PDF and DOCX (Demo parser)</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                disabled={uploading}
                onChange={handleSimulateDrop}
              />
            </label>
          </div>
        </div>

        {/* Progress Bar when uploading */}
        {uploading && (
          <div className="mt-4">
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0F2B5D] to-[#16C5A6] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Simulating ATS extraction...</span>
              <span>{uploadProgress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          ATS Overview
        </button>
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'keywords'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Keywords & Skills ({resumeData.extractedSkills.length})
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'experience'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Parsed Experience
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'preview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Visual Resume Preview
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Diagnostic Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400">ATS Readability</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{resumeData.readabilityScore}%</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Clean hierarchy</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400">Impact & Metrics</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{resumeData.impactScore}%</p>
              <span className="text-[11px] text-amber-600 font-semibold">Needs quantification</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400">Brevity & Conciseness</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{resumeData.brevityScore}%</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Ideal 1-page length</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400">Keyword Density</span>
              <p className="text-2xl font-black text-slate-900 mt-1">74%</p>
              <span className="text-[11px] text-rose-600 font-semibold">8 high-value missing</span>
            </div>
          </div>

          {/* Strengths & Critical ATS Traps */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">What Your Resume Does Well</h3>
              </div>
              <ul className="space-y-3">
                {resumeData.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Critical ATS Gaps to Fix</h3>
              </div>
              <ul className="space-y-3">
                {resumeData.criticalIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Keywords & Missing Gaps */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Extracted Technical Keywords</h3>
            <p className="text-xs text-slate-500 mb-4">Keywords parsed directly from your uploaded document:</p>
            <div className="flex flex-wrap gap-2">
              {resumeData.extractedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">High-Yield Missing ATS Keywords</h3>
                <p className="text-xs text-slate-500">
                  Required in 70%+ of Senior Frontend / Full-Stack job listings in Mumbai & Bengaluru:
                </p>
              </div>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Fix Priority: High
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {resumeData.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5 text-rose-600" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#0F2B5D]/5 border border-[#0F2B5D]/15 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-700 leading-relaxed font-light">
                <strong className="text-slate-900 font-bold block">Need help rewording your bullets?</strong>
                Ask the ERGO AI Coach to generate ATS-optimized bullets featuring these keywords.
              </div>
              <Link
                href="/dashboard/coach"
                className="px-4 py-2 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-md hover:bg-[#12A88E] shrink-0"
              >
                Draft Bullets with Coach
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Parsed Experience & Live AI Bullet Optimizer */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          {/* OpenAI Live Bullet Optimizer Studio */}
          <div className="bg-gradient-to-r from-[#091B3A] via-[#0F2B5D] to-[#0A1C3E] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#1D3B6F]/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#16C5A6]/20 border border-[#16C5A6]/30 flex items-center justify-center text-[#16C5A6]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live OpenAI Resume Bullet Rewriter</h3>
                    <p className="text-[11px] text-slate-300">
                      Transforms raw engineering tasks into quantified Google XYZ accomplishment statements
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-[#16C5A6] animate-pulse" />
                  <span>OpenAI GPT-4o-mini Live</span>
                </span>
              </div>

              {/* Input Box */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  Draft or Select an Experience Bullet Point to Optimize:
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={bulletInput}
                    onChange={(e) => setBulletInput(e.target.value)}
                    placeholder="e.g. Worked on checkout page and Redux state management"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] transition-all"
                  />
                  <button
                    onClick={() => handleOptimizeBullet()}
                    disabled={optimizingBullet || !bulletInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#16C5A6] text-[#091B3A] font-bold text-xs shadow-md shadow-[#16C5A6]/25 hover:bg-[#12A88E] disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {optimizingBullet ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Optimizing with OpenAI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Rewrite with OpenAI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Optimization Result Card */}
              {optimizationResult && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 pt-4 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <span className="text-[10px] uppercase font-bold text-[#16C5A6] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      ATS-Optimized Output (Google XYZ)
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Impact: {optimizationResult.impactMetric}
                    </span>
                  </div>

                  <p className="text-xs text-white font-medium leading-relaxed bg-[#071326]/60 p-3 rounded-xl border border-white/10">
                    "{optimizationResult.optimizedBullet}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-slate-400 font-medium">Keywords Injected:</span>
                      {optimizationResult.keywordsIncluded.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold text-[10px]">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <span className="text-[10px] text-slate-400 italic">
                      {optimizationResult.explanation}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Work History */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Extracted Work History & Bullet Analysis</h3>

            <div className="space-y-6 divide-y divide-slate-100">
              {resumeData.extractedExperience.map((exp, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-xs text-slate-500 font-semibold">{exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{exp.period}</span>
                  </div>

                  <ul className="mt-3 space-y-3">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16C5A6] mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </div>
                        <button
                          onClick={() => {
                            setBulletInput(b);
                            handleOptimizeBullet(b);
                          }}
                          className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-[#16C5A6]" />
                          <span>Rewrite with AI</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Visual Resume Preview */}
      {activeTab === 'preview' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-8 font-serif text-slate-900">
          <div className="text-center pb-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{resumeData.extractedName}</h2>
            <p className="text-xs text-slate-600 mt-1 font-sans">{resumeData.extractedTitle} · Mumbai, India</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-sans">demo@zaprill.com · +91 98765 43210 · github.com/aaravmehta</p>
          </div>

          <div className="py-5 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2B5D] mb-2 border-b border-slate-100 pb-1">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {resumeData.extractedExperience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-slate-500 font-normal">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-slate-700">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="py-4 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2B5D] mb-2 border-b border-slate-100 pb-1">
              Technical Core Competencies
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {resumeData.extractedSkills.join(' · ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
