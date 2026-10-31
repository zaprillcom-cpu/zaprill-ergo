'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Check,
  Briefcase,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function AdminBusinessesPage() {
  const { state, verifyBusiness } = useZaprillStore();
  const [search, setSearch] = useState('');
  const [verifiedToast, setVerifiedToast] = useState<string | null>(null);

  const filtered = state.businesses.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.industry.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = (id: string, name: string) => {
    verifyBusiness(id);
    setVerifiedToast(name);
    setTimeout(() => setVerifiedToast(null), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise & Business Verification</h1>
            <p className="text-sm text-slate-500 mt-1">
              Authenticate corporate entities, verify MCA/GST credentials, and grant verified hiring privileges.
            </p>
          </div>
          <Badge variant="teal" className="text-xs py-1 px-3">
            {state.businesses.filter((b) => b.isVerified).length} / {state.businesses.length} Verified
          </Badge>
        </div>

        {verifiedToast && (
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            {verifiedToast} has been granted the Zaprill Verified Enterprise badge!
          </div>
        )}

        {/* Search */}
        <Card className="p-4 border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search business by company name, industry, or headquarters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </Card>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((biz) => (
            <Card key={biz.id} className="p-5 border-slate-200 hover:border-slate-300 transition-all space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-extrabold text-indigo-700 text-base">
                    {biz.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{biz.name}</h3>
                      {biz.isVerified ? (
                        <Badge variant="teal" className="gap-1 text-[10px]">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="text-[10px]">Pending Verification</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{biz.industry} • {biz.location}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">ID: {biz.id}</p>
                  </div>
                </div>

                <div>
                  {!biz.isVerified ? (
                    <Button
                      size="sm"
                      onClick={() => handleVerify(biz.id, biz.name)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verify Enterprise
                    </Button>
                  ) : (
                    <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Authenticated
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {biz.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  {biz.activeOpportunitiesCount} Active Opportunities
                </span>
                <span className="text-[11px] text-slate-400">
                  {biz.isVerified ? `Verified on ${biz.verificationBadgeDate || '2026-10-01'}` : 'Requires KYC verification'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
