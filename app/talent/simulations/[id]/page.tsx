'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { CoworkingSimulator } from '@/components/simulation/coworking-simulator';
import { useZaprillStore } from '@/lib/store';

export default function SimulationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { state } = useZaprillStore();

  const simulation =
    state.simulations.find((s) => s.id === id) || state.simulations[0];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/talent/simulations" className="hover:text-indigo-600 transition-colors">
            ← Back to Simulations Catalog
          </Link>
          <span className="font-mono text-indigo-700 font-semibold">{simulation.domain}</span>
        </div>

        <CoworkingSimulator simulation={simulation} />
      </div>
    </AppShell>
  );
}
