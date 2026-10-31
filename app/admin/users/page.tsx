'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Building2,
  Award,
  GraduationCap,
  ExternalLink,
  Download,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';

export default function AdminUsersPage() {
  const { state } = useZaprillStore();

  const [roleFilter, setRoleFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Combine users from all sets
  const allUsers = [
    ...state.talent.map((t) => ({
      id: t.id,
      name: t.name,
      role: 'talent' as const,
      roleLabel: 'Talent',
      subtext: t.headline,
      location: t.location,
      status: 'Active (Passport Live)',
      detailUrl: `/p/${t.slug || t.publicSlug || t.id}`,
    })),
    ...state.businesses.map((b) => ({
      id: b.id,
      name: b.name,
      role: 'business' as const,
      roleLabel: 'Business',
      subtext: b.industry,
      location: b.location,
      status: b.isVerified ? 'Verified Enterprise' : 'Pending Verification',
      detailUrl: `/business/company`,
    })),
    ...state.experts.map((e) => ({
      id: e.id,
      name: e.name,
      role: 'expert' as const,
      roleLabel: 'Expert',
      subtext: e.title,
      location: 'Mumbai, India',
      status: e.isApproved ? 'Accredited Fellow' : 'Pending Review',
      detailUrl: `/expert/profile`,
    })),
    ...state.institutions.map((i) => ({
      id: i.id,
      name: i.name,
      role: 'institution' as const,
      roleLabel: 'Institution',
      subtext: `${i.cohortCount || i.totalStudents || 40} Students Enrolled`,
      location: i.location,
      status: 'Accredited Partner',
      detailUrl: `/institution/dashboard`,
    })),
  ];

  const filteredUsers = allUsers.filter((u) => {
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.subtext.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleExportCSV = () => {
    exportToCSV(
      filteredUsers.map((u) => ({
        ID: u.id,
        Name: u.name,
        Role: u.roleLabel,
        Details: u.subtext,
        Location: u.location,
        Status: u.status,
      })),
      'Zaprill_Global_User_Registry'
    );
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform User Registry</h1>
            <p className="text-sm text-slate-500 mt-1">
              Consolidated registry of {allUsers.length} active ecosystem participants across all 4 user classes.
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            Export Registry (CSV)
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, company, skill or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">All User Roles ({allUsers.length})</option>
                <option value="talent">Talent ({state.talent.length})</option>
                <option value="business">Businesses ({state.businesses.length})</option>
                <option value="expert">Experts ({state.experts.length})</option>
                <option value="institution">Institutions ({state.institutions.length})</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Showing {filteredUsers.length} registered profiles
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Domain / Industry</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Platform Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {user.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{user.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{user.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            user.role === 'talent'
                              ? 'neutral'
                              : user.role === 'business'
                              ? 'primary'
                              : user.role === 'expert'
                              ? 'teal'
                              : 'warning'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {user.roleLabel}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{user.subtext}</td>
                      <td className="py-3 px-4 text-slate-500">{user.location}</td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-medium text-slate-800">{user.status}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={user.detailUrl}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                        >
                          Inspect <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
