'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  Clock,
  TrendingUp,
  BookOpen,
  Filter,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { SkillGapItem } from '@/lib/types/ergo';

export default function SkillGapPage() {
  const { skillGaps, updateSkillStatus } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  const categories = [
    'All',
    'Technical',
    'Tools & Platforms',
    'Communication',
    'Problem Solving',
    'Industry Knowledge',
  ];

  const filteredSkills = skillGaps.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesPri = selectedPriority === 'All' || s.priority === selectedPriority;
    return matchesCat && matchesPri;
  });

  const statusColors: Record<SkillGapItem['status'], string> = {
    'Not Started': 'bg-slate-100 text-slate-700 border-slate-200',
    'Learning': 'bg-blue-50 text-blue-700 border-blue-200',
    'Practising': 'bg-teal-50 text-teal-700 border-teal-200',
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const nextStatusMap: Record<SkillGapItem['status'], SkillGapItem['status']> = {
    'Not Started': 'Learning',
    'Learning': 'Practising',
    'Practising': 'Completed',
    'Completed': 'Not Started',
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16C5A6]/15 text-[#0F766E] text-xs font-bold mb-3 border border-[#16C5A6]/30">
              <Compass className="w-3.5 h-3.5 text-[#16C5A6]" />
              <span>Target Role: Senior Full-Stack Engineer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F2B5D] tracking-tight">
              Actionable Skill Gap Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              We identified 7 high-leverage skills required to transition from your current 42nd percentile salary (₹6.5L) into top-tier compensation bands (₹11.5L–₹16.0L).
            </p>
          </div>

          {/* Quick Progress Ring */}
          <div className="p-5 rounded-2xl bg-[#091B3A] text-white border border-[#1D3B6F] flex items-center gap-4 shrink-0 shadow-lg">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Gap Completion</span>
              <p className="text-2xl font-black text-white mt-0.5">
                {Math.round(
                  (skillGaps.filter((s) => s.status === 'Completed').length / skillGaps.length) * 100
                )}%
              </p>
              <span className="text-[11px] text-[#16C5A6] font-medium">
                {skillGaps.filter((s) => s.status === 'Completed').length} of {skillGaps.length} masteries verified
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100 mt-6">
          <span className="text-xs font-semibold text-slate-500 mr-2">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F2B5D] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="space-y-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-[#16C5A6]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    skill.priority === 'High'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {skill.priority} Priority
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {skill.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {skill.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Effort: {skill.learningEffort}
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Salary Impact: {skill.salaryImpact}
                </span>
                <span className="text-slate-700 font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#16C5A6]" />
                  Curated: {skill.courseRecommendation}
                </span>
              </div>
            </div>

            {/* Interactive Status Changer Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => updateSkillStatus(skill.id, nextStatusMap[skill.status])}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  statusColors[skill.status]
                } hover:opacity-80`}
                title="Click to cycle status"
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>Status: {skill.status}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
