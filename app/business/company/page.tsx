'use client';

import React from 'react';
import { Building2, ShieldCheck, MapPin, Users, Globe, Mail, Phone } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function BusinessCompanyProfilePage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Company Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your verified organization profile and hiring presence visible to talent.
          </p>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-4xl shadow-inner">
              {biz.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{biz.name}</h2>
                {biz.isVerified && (
                  <Badge variant="teal" size="sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Enterprise
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">{biz.industry}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>{biz.location}</span>
                <span>•</span>
                <span>{biz.size}</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">{biz.website}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-700">
            <h4 className="font-bold text-slate-900 mb-1">About HarbourDesk Spaces:</h4>
            <p>{biz.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Lead Hiring Manager:</span>
              <p className="font-semibold text-slate-800">{biz.contactPerson.name}</p>
              <p className="text-slate-500">{biz.contactPerson.role}</p>
              <span className="font-mono text-indigo-700 block">{biz.contactPerson.email}</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Current Subscription:</span>
              <p className="font-semibold text-slate-800">{biz.billingPlan} Plan</p>
              <span className="text-teal-700 font-semibold block">Unlimited opportunity postings enabled</span>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
