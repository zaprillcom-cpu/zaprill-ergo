import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                Z
              </div>
              <span className="font-bold text-white text-base tracking-tight">ZAPRILL</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm mb-4 leading-relaxed">
              Capability Intelligence & Opportunity Network. Enabling verified practical skill demonstrations,
              verifiable Capability Passports, and merit-based hiring across India.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-[11px] text-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Interactive Prototype Demonstration
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/proof-of-knowledge" className="hover:text-white transition-colors">
                  Proof of Knowledge
                </Link>
              </li>
              <li>
                <Link href="/talent/assessments" className="hover:text-white transition-colors">
                  Practical Assessments
                </Link>
              </li>
              <li>
                <Link href="/talent/simulations" className="hover:text-white transition-colors">
                  Business Simulations
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Stakeholders */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Workspaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/talent" className="hover:text-white transition-colors">
                  For Talent
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  For Business
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="hover:text-white transition-colors">
                  For Institutions
                </Link>
              </li>
              <li>
                <Link href="/experts" className="hover:text-white transition-colors">
                  For Experts
                </Link>
              </li>
              <li>
                <Link href="/p/aarav-mehta" className="hover:text-white transition-colors">
                  Public Passport Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Zaprill
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Zaprill Technologies Pvt. Ltd. All rights reserved. Built for evaluation prototype.</p>
          <div className="flex items-center gap-6">
            <span>Fictional Demonstration Data</span>
            <span>Indian Market Focus</span>
            <span>WCAG Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
