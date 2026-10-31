'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Filter,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { OpportunityCard } from '@/components/shared/opportunity-card';
import { useZaprillStore } from '@/lib/store';
import { OpportunityType } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function TalentOpportunitiesPage() {
  const { state, applyToOpportunity } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const types: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Opportunities (15)' },
    { id: 'job', label: 'Full-time Jobs' },
    { id: 'internship', label: 'Paid Internships' },
    { id: 'project', label: 'Contract Projects' },
    { id: 'task', label: 'Paid Tasks' },
  ];

  const filteredOpportunities = state.opportunities.filter((opp) => {
    const matchesType = selectedType === 'all' || opp.type === selectedType;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Capability-Matched Opportunities</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Opportunities transparently matched to your verified assessment scores and supporting evidence.
            </p>
          </div>

          <Link href="/talent/applications">
            <Button variant="outline" size="sm">
              My Applications ({state.applications.filter((a) => a.talentId === talent.id).length})
            </Button>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedType === t.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles, companies, skills..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => {
            const hasApplied = state.applications.some(
              (a) => a.opportunityId === opp.id && a.talentId === talent.id && a.currentStage !== 'withdrawn'
            );

            return (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                talentProfile={talent}
                hasApplied={hasApplied}
                onApply={() => applyToOpportunity(opp.id)}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
