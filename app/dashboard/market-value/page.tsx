'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  MapPin,
  Briefcase,
  Sparkles,
  Info,
  ArrowRight,
  ShieldAlert,
  BarChart2,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function MarketValuePage() {
  const { marketValue } = useAuth();
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedExpTier, setSelectedExpTier] = useState('Early Career');

  const formatINR = (val: number) => {
    return `₹${(val / 100000).toFixed(1)}L`;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Illustrative Benchmark:</strong> Salary estimates are derived from real-time Indian tech job listings requiring mandatory compensation disclosures.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300 shrink-0">
          Q4 2026 Index
        </span>
      </div>

      {/* Hero Salary Command Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Compensation Intelligence Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Calculated Market Value
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Based on your verified <strong className="text-slate-900 font-semibold">{marketValue.role}</strong> profile with{' '}
              <strong className="text-slate-900 font-semibold">{marketValue.experienceYears} years of experience</strong> located in {marketValue.location}.
            </p>
          </div>

          {/* Value Gap Stat */}
          <div className="p-6 rounded-2xl bg-[#0D0C18] text-white border border-[#232138] flex flex-col justify-center min-w-[240px] shadow-xl">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Top 10% Earning Potential
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-black text-[#C5A8FF]">
                {formatINR(marketValue.potentialSalary)}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ yr</span>
            </div>
            <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>+₹5,00,000 / yr</span>
              <span className="text-slate-400 font-normal">gap over current ₹6.5L</span>
            </div>
          </div>
        </div>

        {/* Visual Percentile Distribution Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-end mb-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Salary</span>
              <strong className="text-slate-700 font-bold">{formatINR(marketValue.currentSalary)} (42nd %ile)</strong>
            </div>
            <div className="text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Market Median</span>
              <strong className="text-slate-900 font-bold">{formatINR(marketValue.marketAverage)} (50th %ile)</strong>
            </div>
            <div className="text-right">
              <span className="text-[#0F2B5D] block text-[10px] uppercase font-bold">90th Percentile Ceiling</span>
              <strong className="text-[#0F2B5D] font-black">{formatINR(marketValue.potentialSalary)}</strong>
            </div>
          </div>

          <div className="w-full h-3.5 rounded-full bg-slate-100 p-0.5 overflow-hidden flex">
            {/* Current to Median */}
            <div
              className="h-full rounded-l-full bg-slate-300"
              style={{ width: '42%' }}
              title="Current Position: 42nd Percentile"
            />
            {/* Median to Target */}
            <div
              className="h-full bg-gradient-to-r from-slate-400 to-[#16C5A6]"
              style={{ width: '48%' }}
              title="Target Range: 50th to 90th Percentile"
            />
            {/* Upper band */}
            <div className="h-full rounded-r-full bg-slate-200" style={{ width: '10%' }} />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-2">
            <span>Entry Band: {formatINR(marketValue.salaryBand.min)}</span>
            <span>Senior Band Ceiling: {formatINR(marketValue.salaryBand.max)}</span>
          </div>
        </div>
      </div>

      {/* Experience Tiers & Location Variations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Experience Tiers Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Experience-Based Salary Bands</h3>
              <p className="text-[11px] text-slate-500">How frontend earnings progress by seniority</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Mumbai Index
            </span>
          </div>

          <div className="space-y-3">
            {marketValue.experienceTiers.map((tier, idx) => {
              const isCurrent = tier.isUserTier;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#16C5A6]/10 border-[#16C5A6]/40 shadow-sm'
                      : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {tier.tier}
                        {isCurrent && (
                          <span className="text-[9px] font-bold text-[#0B6756] bg-[#16C5A6]/20 px-1.5 py-0.2 rounded-full">
                            Your Tier
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-500">{tier.experience}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{formatINR(tier.salary)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Differences Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">City & Remote Differentials</h3>
              <p className="text-[11px] text-slate-500">Compensation differences across Indian tech hubs</p>
            </div>
            <MapPin className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {marketValue.locationComparisons.map((loc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{loc.city}</span>
                  <span className="text-[10px] text-slate-500">Benchmark average</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 block">{formatINR(loc.avgSalary)}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      loc.differencePercent > 0 ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {loc.differencePercent > 0 ? `+${loc.differencePercent}% premium` : 'Baseline'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highest Paying Skill Multipliers */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Skill Multipliers Driving Your Next Raise</h3>
            <p className="text-xs text-slate-500">
              Verified salary increments associated with specific technical competencies
            </p>
          </div>
          <Link
            href="/dashboard/skill-gap"
            className="text-xs font-bold text-[#0F2B5D] hover:underline flex items-center gap-1"
          >
            <span>Bridge Gaps</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketValue.skillImpactMultipliers.map((skill, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#16C5A6]/40 hover:bg-white transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {skill.demandLevel} Demand
                </span>
                <span className="text-xs font-black text-emerald-600">
                  +{formatINR(skill.additionalValueAnnual)} / yr
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{skill.skill}</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Frequently demanded in senior technical interviews.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
