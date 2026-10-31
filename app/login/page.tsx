'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { ErgoLogo } from '@/components/ergo/ergo-logo';
import { useAuth } from '@/lib/auth/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.error || 'Invalid credentials. Please verify or use the demo login button.');
      }
    } catch {
      setError('An error occurred. Try the instant demo login button below.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@zaprill.com');
    setPassword('Demo@123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Bar with Logo */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <ErgoLogo size="md" showTagline={true} withLink={true} />
        <Link
          href="/"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Return to Public Site
        </Link>
      </div>

      {/* Main Login Card Container */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-9 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#16C5A6]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-[#0F2B5D] tracking-tight">
              Sign in to ERGO
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Access your real-time Career Intelligence Command Center
            </p>
          </div>

          {/* Demo Account Box */}
          <div className="p-3.5 rounded-2xl bg-[#16C5A6]/10 border border-[#16C5A6]/30 mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
                Demo Credentials Available
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[10px] font-bold text-[#0F2B5D] hover:underline"
              >
                Autofill Credentials
              </button>
            </div>
            <div className="text-[11px] text-slate-600 font-mono mt-1 space-y-0.5">
              <p>Email: <span className="font-semibold text-slate-900">demo@zaprill.com</span></p>
              <p>Password: <span className="font-semibold text-slate-900">Demo@123</span></p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-[#0F2B5D] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#16C5A6] text-[#091B3A] text-xs font-bold shadow-lg shadow-[#16C5A6]/25 hover:bg-[#12A88E] disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to ERGO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <span className="bg-white px-2">Or instant demo</span>
            </div>
          </div>

          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={loginAsDemo}
            className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
            <span>Launch Directly as Aarav Mehta</span>
          </button>

          {/* Registration link */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an ERGO profile yet?{' '}
            <Link href="/register" className="font-bold text-[#0F2B5D] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-[11px] text-slate-500 pb-2">
        <span>ERGO by Zaprill · Confidential Career Intelligence Platform</span>
      </div>
    </div>
  );
}
