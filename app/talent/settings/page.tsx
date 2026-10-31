'use client';

import React, { useState } from 'react';
import { Settings, User, Shield, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export default function TalentSettingsPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0];
  const [bio, setBio] = useState(talent.bio);
  const [headline, setHeadline] = useState(talent.headline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Talent Workspace Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal profile information and public capability passport sharing.
          </p>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Headline:</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Professional Bio:</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-slate-600 text-[11px] space-y-1">
              <span className="font-bold text-slate-900">Public Demo Slug:</span>
              <p className="font-mono text-indigo-700">/p/{talent.publicSlug}</p>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-teal-50 rounded-lg text-teal-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Settings saved locally!
              </div>
            )}

            <Button variant="primary" size="md">
              Save Profile Settings
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
