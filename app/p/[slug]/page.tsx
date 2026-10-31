'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { PassportCard } from '@/components/passport/passport-card';
import { useZaprillStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function PublicPassportPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { state } = useZaprillStore();

  // Find talent by public slug or default to Aarav Mehta
  const talent =
    state.talent.find((t) => t.publicSlug === slug) || state.talent[0];

  const talentEvidence = state.evidence.filter((e) => e.talentId === talent.id);
  const talentAttempts = state.attempts.filter((a) => a.talentId === talent.id);
  const talentEndorsements = state.endorsements.filter((e) => e.talentId === talent.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="no-print">
        <DemoBanner />
        <Navbar />
      </div>

      <main className="flex-1 py-8 print:py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Public Profile Badge & Navigation Back */}
          <div className="no-print flex items-center justify-between">
            <Link href="/talent/passport">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Talent Workspace
              </Button>
            </Link>

            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Public Verified Demonstration Link
            </span>
          </div>

          {/* Render Full Passport Card with isPublicView = true (respects private evidence toggles) */}
          <PassportCard
            talent={talent}
            evidence={talentEvidence}
            attempts={talentAttempts}
            endorsements={talentEndorsements}
            isPublicView={true}
          />
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
