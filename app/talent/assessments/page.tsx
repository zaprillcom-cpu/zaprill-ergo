'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Search,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function TalentAssessmentsCatalogPage() {
  const { state } = useZaprillStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Finance', 'Data & Analytics', 'Software Engineering', 'Operations', 'Growth & Marketing'];

  const filteredAssessments = state.assessments.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.skillName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Practical Diagnostic Assessments</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Demonstrate hands-on problem solving across five standardized dimensions. Upgrade self-declared skills to verified status.
            </p>
          </div>

          <Link href="/talent/assessments/assess-coworking-profitability/attempt">
            <Button variant="amber" size="sm">
              <Sparkles className="w-3.5 h-3.5" />
              Primary Demo Assessment
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assessments & skills..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => {
            const hasAttempted = state.attempts.some((att) => att.assessmentId === assessment.id);
            const isCoworking = assessment.id === 'assess-coworking-profitability';

            return (
              <Card
                key={assessment.id}
                className={`hoverEffect flex flex-col justify-between ${
                  isCoworking ? 'border-indigo-300 ring-2 ring-indigo-500/10 shadow-md' : 'bg-white'
                }`}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={isCoworking ? 'indigo' : 'slate'} size="sm">
                      {assessment.category}
                    </Badge>
                    <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-100">
                      {assessment.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                      <Link href={`/talent/assessments/${assessment.id}`}>{assessment.title}</Link>
                    </h3>
                    <span className="text-[11px] text-indigo-600 font-medium block mt-0.5">
                      Evaluates: {assessment.skillName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {assessment.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {assessment.durationMinutes} mins
                    </span>
                    <span className="font-mono font-bold text-teal-700">
                      {assessment.totalPoints} Total Points (5 Stages)
                    </span>
                  </div>
                </CardContent>

                <div className="p-3 px-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  {hasAttempted ? (
                    <span className="text-teal-700 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      Attempted (82 Pts)
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Not attempted</span>
                  )}

                  <Link href={`/talent/assessments/${assessment.id}`}>
                    <Button variant={isCoworking ? 'primary' : 'outline'} size="sm">
                      {hasAttempted ? 'View Results' : 'View Rubric'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
