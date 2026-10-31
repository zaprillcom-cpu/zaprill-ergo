'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ErgoLogo } from '@/components/ergo/ergo-logo';
import { useAuth } from '@/lib/auth/auth-context';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await register(name, email, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.error || 'Failed to create profile. Please check your inputs.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <ErgoLogo size="md" showTagline={true} withLink={true} />
        <Link href="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
          Already have an account? <span className="text-[#16C5A6] font-bold">Sign In</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-9 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#16C5A6]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create your ERGO Profile
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Unlock your verified Market Value and Resume Health diagnostic
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
              >
                <option value="Frontend Developer">Frontend Developer (React / Next.js)</option>
                <option value="Full-Stack Engineer">Full-Stack Engineer (Node / React)</option>
                <option value="Backend Developer">Backend Developer (Python / Go / Java)</option>
                <option value="Data Analyst">Data Analyst / BI Specialist</option>
                <option value="Product Manager">Associate Product Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16C5A6] to-[#12A88E] text-[#091B3A] text-xs font-bold shadow-lg shadow-[#16C5A6]/20 hover:brightness-105 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <span>Setting up workspace...</span>
              ) : (
                <>
                  <span>Create Account & Access ERGO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            By signing up, you agree to ERGO's{' '}
            <span className="text-slate-700 underline">Demonstration Terms</span> and confidential analysis.
          </p>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 pb-2">
        <span>ERGO by Zaprill · Career Intelligence Platform</span>
      </div>
    </div>
  );
}
