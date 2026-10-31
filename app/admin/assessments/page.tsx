'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  PlusCircle,
  Search,
  ExternalLink,
  Clock,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function AdminAssessmentsPage() {
  const { state } = useZaprillStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = state.assessments.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = ['All', 'Finance', 'Data', 'Engineering', 'Operations', 'Product'];

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Standardized Assessments Manager</h1>
            <p className="text-sm text-slate-500 mt-1">
              Curate practical evaluation instruments, multi-stage rubrics, and diagnostic test banks.
            </p>
          </div>
          <Badge variant="teal" className="text-xs py-1 px-3">
            {state.assessments.length} Standard Instruments
          </Badge>
        </div>

        {/* Filters */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assessment title, skill, or scenario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((assess) => (
            <Card key={assess.id} className="p-5 border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="teal" className="text-[10px] uppercase font-bold">
                    {assess.category}
                  </Badge>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">
                    {assess.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{assess.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{assess.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {assess.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" /> {assess.stages?.length || 5} stages
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    100 pts
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/talent/assessments/${assess.id}`}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  Candidate View <ExternalLink className="w-3 h-3" />
                </Link>
                <Badge variant="success" className="text-[10px]">Published</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
