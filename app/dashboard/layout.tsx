'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/ergo/shell/app-sidebar';
import { AppHeader } from '@/components/ergo/shell/app-header';
import { useAuth } from '@/lib/auth/auth-context';
import { ErgoLogo } from '@/components/ergo/ergo-logo';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, isLoading, loginAsDemo } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0F2B5D] flex items-center justify-center text-[#16C5A6] text-xl font-black animate-pulse shadow-xl shadow-[#0F2B5D]/25 mb-4">
          <ErgoLogo size="md" theme="dark" withLink={false} />
        </div>
        <p className="text-sm font-semibold text-slate-700">Loading ERGO Career Intelligence...</p>
        <span className="text-xs text-slate-400 mt-1">Preparing your verified profile</span>
      </div>
    );
  }

  // If unauthenticated, render friendly demo gatekeeper
  if (!user) {
    return (
      <div className="min-h-screen bg-[#071326] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#091B3A] border border-[#133672] rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#16C5A6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex justify-center mb-6">
            <ErgoLogo size="lg" theme="dark" withLink={false} />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#16C5A6]/15 border border-[#16C5A6]/30 flex items-center justify-center mx-auto mb-4 text-[#16C5A6]">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Protected Career Intelligence Portal
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Sign in with demo credentials (<span className="text-[#16C5A6] font-mono">demo@zaprill.com</span>) to access your Career Health Score, ATS Resume Diagnostic, and Market Benchmarks.
          </p>

          <div className="space-y-3">
            <button
              onClick={loginAsDemo}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#16C5A6] to-[#12A88E] text-[#091B3A] font-bold text-xs shadow-lg shadow-[#16C5A6]/20 hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Demo Session as Aarav Mehta</span>
            </button>

            <Link
              href="/login"
              className="w-full py-2.5 px-4 rounded-xl border border-[#133672] hover:bg-[#0F2B5D]/60 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Go to Login Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#12131A] flex flex-col">
      {/* Sidebar */}
      <AppSidebar
        mobileOpen={mobileNavNavOpenSafe(mobileNavOpen)}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Top Header */}
        <AppHeader onOpenMobileNav={() => setMobileNavOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function mobileNavNavOpenSafe(open: boolean) {
  return open;
}
