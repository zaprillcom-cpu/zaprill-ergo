'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  Check,
  Star,
  DollarSign,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';

export default function AdminExpertsPage() {
  const { state, approveExpert } = useZaprillStore();
  const [search, setSearch] = useState('');
  const [approvedToast, setApprovedToast] = useState<string | null>(null);

  const filtered = state.experts.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.domain.toLowerCase().includes(search.toLowerCase()) ||
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string, name: string) => {
    approveExpert(id);
    setApprovedToast(name);
    setTimeout(() => setApprovedToast(null), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Expert Accreditation & Council</h1>
            <p className="text-sm text-slate-500 mt-1">
              Accredit independent senior practitioners to ratify candidate Capability Passports under ISO/IEC 17024.
            </p>
          </div>
          <Badge variant="teal" className="text-xs py-1 px-3">
            {state.experts.filter((e) => e.isApproved).length} / {state.experts.length} Accredited Fellows
          </Badge>
        </div>

        {approvedToast && (
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            {approvedToast} has been ratified with full Level-1 Senior Evaluator credentials.
          </div>
        )}

        {/* Search */}
        <Card className="p-4 border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expert by name, domain, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </Card>

        {/* Expert Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((exp) => (
            <Card key={exp.id} className="p-5 border-slate-200 hover:border-slate-300 transition-all space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center font-extrabold text-teal-800 text-base">
                    {exp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{exp.name}</h3>
                      {exp.isApproved ? (
                        <Badge variant="teal" className="gap-1 text-[10px]">
                          <Award className="w-3 h-3" /> Accredited
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="text-[10px]">Pending Approval</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{exp.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      License: {exp.accreditationNumber}
                    </p>
                  </div>
                </div>

                <div>
                  {!exp.isApproved ? (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(exp.id, exp.name)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Accredit
                    </Button>
                  ) : (
                    <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ratified
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {exp.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(exp.specialties || ['Financial Modeling', 'Valuation']).map((spec, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  ★ {(exp.rating || 4.9).toFixed(1)} ({exp.evaluationsCompleted || exp.reviewsCompleted || 48} reviews)
                </span>
                <span className="font-medium text-slate-700">
                  Honorarium: {formatINR(exp.hourlyRateINR || exp.hourlyRate || 4000)} / review
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
