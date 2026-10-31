'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { AssessmentPlayer } from '@/components/assessments/assessment-player';
import { useZaprillStore } from '@/lib/store';

export default function AssessmentAttemptPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const assessment =
    state.assessments.find((a) => a.id === id) || state.assessments[0];

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <AssessmentPlayer assessment={assessment} />
      </div>
    </AppShell>
  );
}
