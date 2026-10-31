'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Search,
  CheckCheck,
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

interface AppHeaderProps {
  onOpenMobileNav: () => void;
}

export function AppHeader({ onOpenMobileNav }: AppHeaderProps) {
  const pathname = usePathname();
  const { user, careerHealth, notifications, markNotificationAsRead, markAllNotificationsAsRead, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/dashboard': { title: 'Career Command Center', subtitle: 'Real-time readiness, market benchmarks, and priority actions' },
    '/dashboard/career-health': { title: 'Career Health Intelligence', subtitle: 'Comprehensive readiness diagnosis & score breakdown' },
    '/dashboard/market-value': { title: 'Market Value & Compensation', subtitle: 'Live salary percentiles, peer benchmarks, and value gaps' },
    '/dashboard/resume': { title: 'Resume Intelligence & ATS Diagnostic', subtitle: 'Simulate ATS parsing, extract skills, and fix critical traps' },
    '/dashboard/jobs': { title: 'Resume-Matched Opportunities', subtitle: 'Curated job listings ranked by profile suitability score' },
    '/dashboard/skill-gap': { title: 'Skill Gap & Learning Plan', subtitle: 'Targeted technical competencies required for salary progression' },
    '/dashboard/assessments': { title: 'Career Assessments', subtitle: 'Validate skills and elevate your platform readiness score' },
    '/dashboard/coach': { title: 'ERGO AI Career Coach', subtitle: 'Interactive guidance, negotiation strategy, and career planning' },
    '/dashboard/profile': { title: 'Career Profile', subtitle: 'Manage your verified background and target role preferences' },
    '/dashboard/settings': { title: 'Account Settings', subtitle: 'Preferences, demo session management, and notifications' },
  };

  const currentInfo = pageTitles[pathname] || {
    title: 'ERGO Career Intelligence',
    subtitle: 'Make data-backed career decisions',
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2E4EC] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger & Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {currentInfo.title}
          </h1>
          <p className="hidden md:block text-xs text-slate-500 font-normal">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick Metrics, Search, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Career Health Pill */}
        <Link
          href="/dashboard/career-health"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 hover:border-[#16C5A6]/40 hover:bg-[#16C5A6]/5 transition-all text-xs font-semibold text-slate-700"
        >
          <span className="w-2 h-2 rounded-full bg-[#16C5A6]" />
          <span>Health:</span>
          <span className="text-[#0F2B5D] font-bold">{careerHealth.overallScore}/100</span>
        </Link>

        {/* AI Coach Quick Trigger */}
        <Link
          href="/dashboard/coach"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16C5A6]/10 border border-[#16C5A6]/30 hover:bg-[#16C5A6]/20 transition-all text-xs font-semibold text-[#0B6756]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#16C5A6]" />
          <span>Ask Coach</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16C5A6] ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold text-[#0F766E] bg-[#16C5A6]/15 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-[#0F766E] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-[#16C5A6]/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/dashboard/jobs"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-[#0F766E] font-semibold hover:underline"
                >
                  View all career updates →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F2B5D] to-[#16C5A6] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Aarav Mehta'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'demo@zaprill.com'}</p>
                <span className="inline-block mt-1 text-[9px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Demo Account
                </span>
              </div>

              <div className="py-1 text-xs">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Settings & Preferences</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <span className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <span>ERGO Public Site</span>
                  </span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
