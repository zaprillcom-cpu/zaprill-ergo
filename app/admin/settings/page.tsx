'use client';

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RefreshCw,
  Check,
  Save,
  AlertCircle,
  Database,
  Lock,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';

export default function AdminSettingsPage() {
  const { resetDemoData } = useZaprillStore();

  const [platformName, setPlatformName] = useState('Zaprill — Capability Intelligence');
  const [evalHonorarium, setEvalHonorarium] = useState('4000');
  const [contactMasking, setContactMasking] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all demo data back to default initial state?')) {
      resetDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Global Platform Administration Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            System configuration, calibration rules, honorarium standards, and client-side persistence control.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Global settings updated successfully!
          </div>
        )}

        {resetSuccess && (
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-600" />
            Platform demo database restored to default seed state!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Core Settings */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Ecosystem Parameters</CardTitle>
              <p className="text-xs text-slate-500">Standard operating guidelines for evaluation fees and match scoring.</p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Standard Expert Review Honorarium (INR)
                  </label>
                  <input
                    type="number"
                    value={evalHonorarium}
                    onChange={(e) => setEvalHonorarium(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Disbursed 100% to accredited reviewers</span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Candidate Double-Blind Privacy Masking
                  </label>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="text-slate-700 font-medium">Mask Personal Contact Info</span>
                    <button
                      type="button"
                      onClick={() => setContactMasking(!contactMasking)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        contactMasking ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          contactMasking ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  Save Parameters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Database Reset */}
          <Card className="border-red-200 bg-red-50/20">
            <CardHeader>
              <CardTitle className="text-base text-red-950 flex items-center gap-2">
                <Database className="w-4 h-4 text-red-600" />
                Prototype State Management
              </CardTitle>
              <p className="text-xs text-red-800">
                This prototype persists all modifications to your browser localStorage under <code className="font-mono bg-red-100 px-1 py-0.5 rounded text-red-900">zaprill_prototype_state_v1.0</code>.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Restore Default Seed Data</span>
                <p className="text-xs text-slate-500">
                  Resets candidate attempts, applications, expert reviews, and business postings back to clean initial demo state.
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset All Demo Data
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}
