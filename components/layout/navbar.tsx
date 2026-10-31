'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Award,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

export function Navbar() {
  const router = useRouter();
  const { setRole } = useZaprillStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExploreDemo = () => {
    setRole('talent');
    router.push('/talent/dashboard');
  };

  return (
    <header className="sticky top-9 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
            Z
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight leading-tight">
              ZAPRILL
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Capability Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <Link href="/how-it-works" className="hover:text-indigo-600 transition-colors">
            How It Works
          </Link>
          <Link href="/proof-of-knowledge" className="hover:text-indigo-600 transition-colors">
            Proof of Knowledge
          </Link>
          <Link href="/talent" className="hover:text-indigo-600 transition-colors">
            For Talent
          </Link>
          <Link href="/business" className="hover:text-indigo-600 transition-colors">
            For Business
          </Link>
          <Link href="/institutions" className="hover:text-indigo-600 transition-colors">
            Institutions
          </Link>
          <Link href="/experts" className="hover:text-indigo-600 transition-colors">
            Expert Network
          </Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExploreDemo}
            className="shadow-sm shadow-indigo-500/25"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Explore Demo
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              How It Works
            </Link>
            <Link
              href="/proof-of-knowledge"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Proof of Knowledge
            </Link>
            <Link
              href="/talent"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              For Talent
            </Link>
            <Link
              href="/business"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              For Business
            </Link>
            <Link
              href="/institutions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Institutions
            </Link>
            <Link
              href="/experts"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Expert Network
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Pricing
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                handleExploreDemo();
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Explore Interactive Demo
            </Button>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Sign In to Workspace
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
