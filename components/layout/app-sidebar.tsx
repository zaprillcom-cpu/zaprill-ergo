'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  FileCheck2,
  FolderGit2,
  Briefcase,
  Layers,
  Award,
  MessageSquare,
  Settings,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  BarChart3,
  CreditCard,
  ShieldCheck,
  Network,
  CheckCircle2,
  PlusCircle,
  Menu,
  X,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { useZaprillStore } from '@/lib/store';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();
  const { currentRole, currentUser } = useZaprillStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string | number;
  }

  const navItemsByRole: Record<Role, NavItem[]> = {
    talent: [
      { label: 'Dashboard', href: '/talent/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Capability Passport', href: '/talent/passport', icon: <Award className="w-4 h-4" /> },
      { label: 'Practical Assessments', href: '/talent/assessments', icon: <FileCheck2 className="w-4 h-4" />, badge: '12' },
      { label: 'Business Simulations', href: '/talent/simulations', icon: <Compass className="w-4 h-4" /> },
      { label: 'Evidence Vault', href: '/talent/evidence', icon: <FileText className="w-4 h-4" />, badge: '3' },
      { label: 'Projects & Milestones', href: '/talent/projects', icon: <FolderGit2 className="w-4 h-4" /> },
      { label: 'Find Opportunities', href: '/talent/opportunities', icon: <Briefcase className="w-4 h-4" />, badge: '15' },
      { label: 'My Applications', href: '/talent/applications', icon: <Layers className="w-4 h-4" /> },
      { label: 'Validation & Reviews', href: '/talent/validation', icon: <CheckCircle2 className="w-4 h-4" />, badge: '1' },
      { label: 'Messages', href: '/talent/messages', icon: <MessageSquare className="w-4 h-4" /> },
      { label: 'Settings & Privacy', href: '/talent/settings', icon: <Settings className="w-4 h-4" /> },
    ],
    business: [
      { label: 'Overview Dashboard', href: '/business/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Talent Directory', href: '/business/talent', icon: <Users className="w-4 h-4" />, badge: '24' },
      { label: 'Candidate Shortlists', href: '/business/shortlists', icon: <Award className="w-4 h-4" /> },
      { label: 'Manage Opportunities', href: '/business/opportunities', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Create Opportunity', href: '/business/opportunities/create', icon: <PlusCircle className="w-4 h-4" /> },
      { label: 'Assessments & Benchmarks', href: '/business/assessments', icon: <FileCheck2 className="w-4 h-4" /> },
      { label: 'Simulations & Cases', href: '/business/simulations', icon: <Compass className="w-4 h-4" /> },
      { label: 'Candidate Validation', href: '/business/validation', icon: <ShieldCheck className="w-4 h-4" /> },
      { label: 'Contract Projects', href: '/business/projects', icon: <FolderGit2 className="w-4 h-4" /> },
      { label: 'Messages', href: '/business/messages', icon: <MessageSquare className="w-4 h-4" /> },
      { label: 'Hiring Analytics', href: '/business/analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Plans & Billing', href: '/business/billing', icon: <CreditCard className="w-4 h-4" /> },
      { label: 'Company Settings', href: '/business/settings', icon: <Settings className="w-4 h-4" /> },
    ],
    expert: [
      { label: 'Review Dashboard', href: '/expert/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Assignments Queue', href: '/expert/assignments', icon: <FileCheck2 className="w-4 h-4" />, badge: '1' },
      { label: 'Rubric Calibration', href: '/expert/calibration', icon: <Compass className="w-4 h-4" /> },
      { label: 'Expert Profile', href: '/expert/profile', icon: <Award className="w-4 h-4" /> },
      { label: 'Earnings & Invoices', href: '/expert/payments', icon: <CreditCard className="w-4 h-4" /> },
    ],
    institution: [
      { label: 'Cohort Overview', href: '/institution/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Student Directory', href: '/institution/students', icon: <Users className="w-4 h-4" />, badge: '40' },
      { label: 'Placement Campaigns', href: '/institution/campaigns', icon: <GraduationCap className="w-4 h-4" /> },
      { label: 'Cohort Analytics', href: '/institution/analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Campus Settings', href: '/institution/settings', icon: <Settings className="w-4 h-4" /> },
    ],
    admin: [
      { label: 'Admin Command', href: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'User Directory', href: '/admin/users', icon: <Users className="w-4 h-4" />, badge: '38' },
      { label: 'Business Verification', href: '/admin/businesses', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Expert Accreditation', href: '/admin/experts', icon: <Award className="w-4 h-4" /> },
      { label: 'Skill Taxonomy', href: '/admin/taxonomy', icon: <Layers className="w-4 h-4" /> },
      { label: 'Capability Graph', href: '/admin/graph', icon: <Network className="w-4 h-4" /> },
      { label: 'Assessments Manager', href: '/admin/assessments', icon: <FileCheck2 className="w-4 h-4" /> },
      { label: 'Platform Finance', href: '/admin/finance', icon: <CreditCard className="w-4 h-4" /> },
      { label: 'System Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Security & Audits', href: '/admin/security', icon: <ShieldCheck className="w-4 h-4" /> },
      { label: 'Global Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
    ],
  };

  const navItems = navItemsByRole[currentRole] || navItemsByRole.talent;

  const roleLabels: Record<Role, { title: string; subtitle: string; icon: string }> = {
    talent: { title: 'Talent Workspace', subtitle: 'Aarav Mehta', icon: '👤' },
    business: { title: 'Business Workspace', subtitle: 'HarbourDesk Spaces', icon: '🏢' },
    expert: { title: 'Expert Network', subtitle: 'Dr. Vikram Sen', icon: '🎖️' },
    institution: { title: 'Institution Portal', subtitle: 'Apex Institute of Tech', icon: '🎓' },
    admin: { title: 'Platform Admin', subtitle: 'Super Admin Console', icon: '🛡️' },
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-xl focus:outline-none ring-2 ring-white"
        aria-label="Toggle navigation menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Dark Navy Sidebar */}
      <aside
        className={cn(
          'fixed top-10 bottom-0 left-0 w-64 bg-[#0B1329] border-r border-[#1E293B] text-slate-300 flex flex-col z-40 transition-transform duration-200 ease-in-out',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo and Workspace Branding */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
              Z
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                ZAPRILL
                <span className="text-[10px] uppercase font-semibold text-teal-400 bg-teal-950/80 px-1.5 py-0.2 rounded border border-teal-800/60">
                  OS
                </span>
              </span>
              <p className="text-[10px] text-slate-400 leading-tight">Capability Intelligence</p>
            </div>
          </Link>
        </div>

        {/* Current Active Workspace Indicator */}
        <div className="mx-3 mt-3 p-3 rounded-xl bg-[#131C38] border border-[#202D52] flex items-center gap-3">
          <div className="text-xl">{roleLabels[currentRole].icon}</div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{roleLabels[currentRole].title}</h4>
            <p className="text-[11px] text-slate-400 truncate">{roleLabels[currentRole].subtitle}</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${currentRole}/dashboard` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131C38]'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn('transition-colors', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                      isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-[#1E293B] text-slate-400 group-hover:text-slate-200'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Workspace Links */}
        <div className="p-3 border-t border-[#1E293B] bg-[#0A1024]">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-[#131C38] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Public Homepage</span>
            </div>
            <span className="text-[10px] text-slate-500">↗</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
