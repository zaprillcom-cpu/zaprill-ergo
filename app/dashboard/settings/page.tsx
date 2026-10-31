'use client';

import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Key,
  LogOut,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [notifJobs, setNotifJobs] = useState(true);
  const [notifSalary, setNotifSalary] = useState(true);
  const [notifHealth, setNotifHealth] = useState(false);
  const [privacyAnonymous, setPrivacyAnonymous] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleResetSession = () => {
    localStorage.removeItem('ergo_app_data_v1');
    showFeedback('Demo data reset to default seed state. Refresh to review initial state.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
          Account Settings & Preferences
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          Manage your notifications, data privacy, and demonstration session
        </p>

        {feedback && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="space-y-6 divide-y divide-slate-100">
          {/* Section 1: Notifications */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-[#16C5A6]" />
              <h3 className="text-sm font-bold text-slate-900">Career Alerts & Notifications</h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">High-Match Job Openings</span>
                  <span className="text-[11px] text-slate-500">Alert me when a company posts a role with &gt;85% suitability score</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifJobs}
                  onChange={(e) => {
                    setNotifJobs(e.target.checked);
                    showFeedback('Notification preferences updated.');
                  }}
                  className="w-4 h-4 text-[#0F2B5D] accent-[#16C5A6] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Market Salary Benchmark Shifts</span>
                  <span className="text-[11px] text-slate-500">Monthly digests on median compensation movements in Indian tech hubs</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifSalary}
                  onChange={(e) => {
                    setNotifSalary(e.target.checked);
                    showFeedback('Notification preferences updated.');
                  }}
                  className="w-4 h-4 text-[#0F2B5D] accent-[#16C5A6] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Weekly Career Health Reminders</span>
                  <span className="text-[11px] text-slate-500">Prompt me to log newly completed projects or skills</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifHealth}
                  onChange={(e) => {
                    setNotifHealth(e.target.checked);
                    showFeedback('Notification preferences updated.');
                  }}
                  className="w-4 h-4 text-[#0F2B5D] accent-[#16C5A6] rounded"
                />
              </label>
            </div>
          </div>

          {/* Section 2: Privacy */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#16C5A6]" />
              <h3 className="text-sm font-bold text-slate-900">Privacy & Confidentiality</h3>
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Anonymous Benchmarking Mode</span>
                <span className="text-[11px] text-slate-500">
                  Allow your verified skill percentiles to contribute anonymously to compensation indexes
                </span>
              </div>
              <input
                type="checkbox"
                checked={privacyAnonymous}
                onChange={(e) => {
                  setPrivacyAnonymous(e.target.checked);
                  showFeedback('Privacy preferences updated.');
                }}
                className="w-4 h-4 text-[#0F2B5D] accent-[#16C5A6] rounded"
              />
            </label>
          </div>

          {/* Section 3: Demo Session Controls */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Demo Session Management</h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Reset Application Data</span>
                <span className="text-[11px] text-slate-500">
                  Restore default initial assessments, jobs, and skills for Aarav Mehta
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetSession}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Demo State</span>
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Demo Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
