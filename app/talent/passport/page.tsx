'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PassportCard } from '@/components/passport/passport-card';
import { useZaprillStore } from '@/lib/store';

export default function TalentPassportPage() {
  const { state } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const talentEvidence = state.evidence.filter((e) => e.talentId === talent.id);
  const talentAttempts = state.attempts.filter((a) => a.talentId === talent.id);
  const talentEndorsements = state.endorsements.filter((e) => e.talentId === talent.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <PassportCard
          talent={talent}
          evidence={talentEvidence}
          attempts={talentAttempts}
          endorsements={talentEndorsements}
          isPublicView={false}
        />
      </div>
    </AppShell>
  );
}
