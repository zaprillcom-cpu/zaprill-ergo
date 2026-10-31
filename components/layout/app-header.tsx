'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Search,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useZaprillStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export function AppHeader() {
  const pathname = usePathname();
  const { currentRole, currentUser, state } = useZaprillStore();
  const [notifOpen, setNotifOpen] = useState(false);

  // Compute breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return { label, url };
  });

  // Filter notifications for current active role
  const roleNotifs = state.notifications.filter((n) => n.role === currentRole);
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-9 z-30 shadow-xs">
      {/* Left: Breadcrumbs & Path */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
        <Link href={`/${currentRole}/dashboard`} className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
          {currentRole.toUpperCase()}
        </Link>
        {breadcrumbs.slice(1).map((crumb, idx) => (
          <React.Fragment key={crumb.url}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link
              href={crumb.url}
              className={
                idx === breadcrumbs.length - 2
                  ? 'text-indigo-600 font-medium'
                  : 'text-slate-500 hover:text-slate-800 transition-colors'
              }
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Right Actions: Notifications, Search, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills, evidence, opportunities..."
            className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-56 transition-all"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[10px] text-indigo-600 font-medium">{unreadCount} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {roleNotifs.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No notifications yet</p>
                ) : (
                  roleNotifs.map((n) => (
                    <Link
                      key={n.id}
                      href={n.actionUrl || `/${currentRole}/dashboard`}
                      onClick={() => setNotifOpen(false)}
                      className="block p-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{formatDate(n.timestamp)}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.description}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Persona Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
            {currentUser && 'name' in currentUser ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-none truncate max-w-[120px]">
              {currentUser && 'name' in currentUser ? currentUser.name : 'Super Admin'}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight capitalize mt-0.5">{currentRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
