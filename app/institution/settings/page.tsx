'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Mail,
  GraduationCap,
  ShieldCheck,
  Check,
  Save,
  Bell,
  Lock,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function InstitutionSettingsPage() {
  const [tpoName, setTpoName] = useState('Prof. R. K. Deshmukh');
  const [tpoEmail, setTpoEmail] = useState('placements@apextech.edu.in');
  const [tpoPhone, setTpoPhone] = useState('+91 98201 44810');
  const [allowEmployerDiscovery, setAllowEmployerDiscovery] = useState(true);
  const [minScoreThreshold, setMinScoreThreshold] = useState('75');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Placement Office Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage institutional credentials, accreditation status, and employer talent discovery permissions.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Campus placement preferences updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Institutional Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Institutional Identity & Accreditation</CardTitle>
              <p className="text-xs text-slate-500">Official university registration details recognized by Zaprill network.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Institution Name</label>
                  <input
                    type="text"
                    disabled
                    value="Apex Institute of Technology"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 font-medium"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">AISHE / AICTE Code</label>
                  <input
                    type="text"
                    disabled
                    value="AISHE-C-33891"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIRF National Rank</label>
                  <input
                    type="text"
                    disabled
                    value="#42 (Engineering & Technology)"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NAAC Accreditation</label>
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50">
                    <Badge variant="teal">Grade A++</Badge>
                    <span className="text-slate-500 text-[11px]">Valid through March 2029</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TPO Contact Details */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Training & Placement Officer (TPO)</CardTitle>
              <p className="text-xs text-slate-500">Primary point of contact for corporate campus recruiting inquiries.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">TPO Officer Name</label>
                  <input
                    type="text"
                    value={tpoName}
                    onChange={(e) => setTpoName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={tpoEmail}
                    onChange={(e) => setTpoEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Mobile / Direct Line</label>
                  <input
                    type="text"
                    value={tpoPhone}
                    onChange={(e) => setTpoPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employer Discovery Permissions */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Corporate Discovery & Privacy Controls</CardTitle>
              <p className="text-xs text-slate-500">Control how verified employers discover and reach out to your cohort students.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Allow Corporate Employer Discovery</span>
                  <p className="text-[11px] text-slate-500">
                    Permit verified enterprises (e.g. HarbourDesk, FinTech Bharat) to browse candidate capability passports.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowEmployerDiscovery(!allowEmployerDiscovery)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    allowEmployerDiscovery ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      allowEmployerDiscovery ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Minimum Capability Score for External Referral
                </label>
                <select
                  value={minScoreThreshold}
                  onChange={(e) => setMinScoreThreshold(e.target.value)}
                  className="w-full sm:w-64 text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="80">80+ Points (Placement-Ready Only)</option>
                  <option value="75">75+ Points (Recommended Benchmark)</option>
                  <option value="70">70+ Points (All Competent Students)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Students below this score remain in internal diagnostic training before external employer matching.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Save className="w-4 h-4" />
              Save Placement Settings
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
