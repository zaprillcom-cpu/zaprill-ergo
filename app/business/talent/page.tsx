'use client';

import React, { useState } from 'react';
import { Search, Filter, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { CandidateCard } from '@/components/shared/candidate-card';
import { CandidateComparison } from '@/components/shared/candidate-comparison';
import { useZaprillStore } from '@/lib/store';
import { TalentProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/lib/utils';

export default function BusinessTalentDirectoryPage() {
  const { state } = useZaprillStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedCandidates, setSelectedCandidates] = useState<TalentProfile[]>([]);

  const domains = ['All', 'Finance', 'Data & Analytics', 'Software Engineering', 'Operations', 'Growth & Marketing'];

  const filteredTalent = state.talent.filter((t) => {
    const matchesDomain =
      selectedDomain === 'All' ||
      t.skills.some((s) => s.category.toLowerCase().includes(selectedDomain.toLowerCase()));
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const handleToggleCompare = (talent: TalentProfile) => {
    if (selectedCandidates.some((c) => c.id === talent.id)) {
      setSelectedCandidates(selectedCandidates.filter((c) => c.id !== talent.id));
    } else {
      if (selectedCandidates.length < 3) {
        setSelectedCandidates([...selectedCandidates, talent]);
      } else {
        alert('You can compare a maximum of 3 candidates simultaneously.');
      }
    }
  };

  const handleExportCSV = () => {
    const rows = filteredTalent.map((t) => ({
      ID: t.id,
      Name: t.name,
      Headline: t.headline,
      Location: t.location,
      OverallScore: t.overallCapabilityScore,
      AppliedCapability: t.appliedCapability,
      KnowledgeMastery: t.knowledgeMastery,
      Education: t.education.degree,
      IsSelfTaught: t.education.isSelfTaught ? 'Yes' : 'No',
      Availability: t.availability,
    }));
    exportToCSV('Zaprill_Candidate_Directory', rows);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Verified Talent Directory</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Search 24 pre-evaluated candidates across Indian markets by proven practical capability—not college brand.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              Export Directory CSV
            </Button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDomain === dom
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, name, or city..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((t) => {
            const isSelected = selectedCandidates.some((c) => c.id === t.id);
            return (
              <CandidateCard
                key={t.id}
                talent={t}
                isSelectedForCompare={isSelected}
                onToggleCompare={() => handleToggleCompare(t)}
                showCompareCheckbox={true}
              />
            );
          })}
        </div>

        {/* Comparison Bottom Drawer (up to 3 candidates) */}
        <CandidateComparison
          candidates={selectedCandidates}
          onRemove={(id) => setSelectedCandidates(selectedCandidates.filter((c) => c.id !== id))}
          onClear={() => setSelectedCandidates([])}
        />
      </div>
    </AppShell>
  );
}
