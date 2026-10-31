'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DemoBanner } from '@/components/layout/demo-banner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useZaprillStore } from '@/lib/store';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function VerifyAccountPage() {
  const router = useRouter();
  const { currentRole } = useZaprillStore();
  const [code, setCode] = useState('749201');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/onboarding/role');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 py-12 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verify Your Account</h1>
            <p className="text-xs text-slate-500">
              Enter the 6-digit simulation confirmation code sent to your registered address.
            </p>
          </div>

          <Card className="p-6 bg-white border-slate-200 shadow-md">
            <form onSubmit={handleVerify} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-2 text-center">
                  Simulation Verification OTP:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                />
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-800 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Simulated OTP pre-filled for rapid demo testing.</span>
              </div>

              <Button variant="primary" size="md" className="w-full">
                Verify & Continue to Role Onboarding
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
