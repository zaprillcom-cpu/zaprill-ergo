'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ErgoLogo } from '@/components/ergo/ergo-logo';
import { useAuth } from '@/lib/auth/auth-context';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      setMessage(res.message);
      setSubmitted(true);
    } catch {
      setMessage('Failed to simulate reset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <ErgoLogo size="md" showTagline={true} withLink={true} />
        <Link href="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
          ← Back to Login
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-9 shadow-xl relative overflow-hidden">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Reset your password
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Enter the email associated with your ERGO profile
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Simulation Link Sent</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {message}
              </p>
              <div className="mt-6 space-y-2">
                <Link
                  href="/reset-password"
                  className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-[#16C5A6] to-[#12A88E] text-[#091B3A] text-xs font-bold shadow-md hover:brightness-105 text-center transition-all"
                >
                  Proceed to Reset Screen Simulator →
                </Link>
                <Link
                  href="/login"
                  className="block text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@zaprill.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16C5A6] to-[#12A88E] text-[#091B3A] text-xs font-bold shadow-lg shadow-[#16C5A6]/20 hover:brightness-105 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
              >
                {loading ? <span>Sending...</span> : <span>Send Reset Instructions</span>}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 pb-2">
        <span>ERGO by Zaprill · Career Intelligence Platform</span>
      </div>
    </div>
  );
}
