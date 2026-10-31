'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  FileText,
  Briefcase,
  Compass,
  CheckCircle2,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ErgoLogo } from '@/components/ergo/ergo-logo';

interface AppSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AppSidebar({ mobileOpen = false, onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, careerHealth, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Career Health', href: '/dashboard/career-health', icon: Activity, badge: `${careerHealth.overallScore}/100` },
    { label: 'Market Value', href: '/dashboard/market-value', icon: TrendingUp },
    { label: 'Resume Intelligence', href: '/dashboard/resume', icon: FileText, badge: '84%' },
    { label: 'Find Jobs', href: '/dashboard/jobs', icon: Briefcase, badge: '5 New' },
    { label: 'Skill Gap Analysis', href: '/dashboard/skill-gap', icon: Compass },
    { label: 'Career Assessments', href: '/dashboard/assessments', icon: CheckCircle2 },
    { label: 'AI Career Coach', href: '/dashboard/coach', icon: Sparkles, highlight: true },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#091B3A] text-slate-300 border-r border-[#1D3B6F]/40 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1D3B6F]/50 flex items-center justify-between">
        <ErgoLogo size="md" showTagline={true} theme="dark" withLink={true} />
      </div>

      {/* User Career Quick Snapshot */}
      <div className="mx-3.5 mt-3.5 p-3 rounded-xl bg-[#0F2B5D]/90 border border-[#1D3B6F] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#16C5A6] to-[#0EA5E9] flex items-center justify-center text-[#091B3A] font-black text-sm shrink-0 overflow-hidden ring-2 ring-[#16C5A6]/30">
          {user?.name ? user.name.charAt(0) : 'A'}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-white truncate">{user?.name || 'Aarav Mehta'}</h4>
          <p className="text-[11px] text-[#16C5A6] font-medium truncate">{user?.role || 'Frontend Developer'}</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Career Intelligence
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#16C5A6] text-[#091B3A] shadow-md shadow-[#16C5A6]/20 font-bold'
                  : item.highlight
                  ? 'text-[#5EEAD4] hover:bg-[#0F2B5D] hover:text-white'
                  : 'text-slate-300 hover:text-white hover:bg-[#0F2B5D]/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#091B3A]' : item.highlight ? 'text-[#16C5A6]' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#091B3A]/20 text-[#091B3A]'
                      : 'bg-[#0F2B5D] text-slate-300 group-hover:text-white border border-[#1D3B6F]/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Demo Account Indicator & Logout */}
      <div className="p-3.5 border-t border-[#1D3B6F]/50 bg-[#07152E]">
        <div className="p-2.5 rounded-lg bg-[#0F2B5D]/70 border border-[#1D3B6F] mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16C5A6] animate-pulse" />
            <span className="text-[11px] font-medium text-slate-200">Demo Mode Active</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-[#16C5A6] bg-[#16C5A6]/10 px-1.5 py-0.5 rounded border border-[#16C5A6]/30">
            Preview
          </span>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Demo Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex fixed top-0 bottom-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10 animate-in slide-in-from-left duration-200 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
