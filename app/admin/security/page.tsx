'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Key,
  Database,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminSecurityPage() {
  const auditLogs = [
    {
      id: 'SEC-LOG-2026-10-911',
      event: 'Expert Review Ratified & Cryptographically Sealed',
      actor: 'Dr. Vikram Sen (Accredited Lead Evaluator)',
      target: 'Aarav Mehta (Coworking Hub Unit Economics)',
      hash: '8f9a2b5e1c4d7083a216f901cb54d3ee12a09c2560b4119d5c41',
      timestamp: '2026-10-25 14:32:10 UTC',
      status: 'Verified Valid',
    },
    {
      id: 'SEC-LOG-2026-10-890',
      event: 'Business Enterprise Authenticity Badge Issued',
      actor: 'Super Admin Console',
      target: 'HarbourDesk Spaces (CIN: U70109MH2021PTC362140)',
      hash: '3e11a9f04b2c89d71a54b39e01d67f4a5690b231c89012a445',
      timestamp: '2026-10-22 09:15:04 UTC',
      status: 'Verified Valid',
    },
    {
      id: 'SEC-LOG-2026-10-845',
      event: 'Candidate Contact Masking Enforced',
      actor: 'Zaprill Privacy Engine',
      target: 'Priya Sharma (Application to FinTech Bharat)',
      hash: '901cf4a5690b231c89012a4453e11a9f04b2c89d71a54b39e0',
      timestamp: '2026-10-18 16:40:55 UTC',
      status: 'Privacy Shield Active',
    },
    {
      id: 'SEC-LOG-2026-10-802',
      event: 'Inter-Rater Benchmark Calibration Session',
      actor: 'Dr. Vikram Sen',
      target: 'Blind Benchmark Drill #FN-402 (Concordance: 97.6%)',
      hash: '4b2c89d71a54b39e01d67f4a5690b231c89012a4453e11a9f0',
      timestamp: '2026-10-15 11:20:18 UTC',
      status: 'IRR Audit Pass',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Cryptographic Audit Logs</h1>
              <Badge variant="teal">ISO/IEC 17024 Compliant</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Tamper-evident verification provenance, evaluator signatures, and talent privacy shield telemetry.
            </p>
          </div>
        </div>

        {/* Security Health Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Cryptographic Integrity</span>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">100% Verified</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">All 30 attempt hashes match chain</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Talent Privacy Shield</span>
              <Lock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">Active</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Personal contact details double-masked</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Evaluator Conflict Checks</span>
              <Key className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">Zero Flags</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">COI declarations verified before review</p>
          </Card>
        </div>

        {/* Audit Log Table */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-slate-900">Recent Immutable Provenance Trail</CardTitle>
            <Badge variant="outline" className="text-xs font-mono">SHA-256 Verified</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Log ID</th>
                    <th className="py-3 px-4">Event Description</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Target Entity</th>
                    <th className="py-3 px-4">Cryptographic Hash</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">{log.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{log.event}</td>
                      <td className="py-3 px-4 text-slate-600">{log.actor}</td>
                      <td className="py-3 px-4 text-slate-600">{log.target}</td>
                      <td className="py-3 px-4 font-mono text-[10px] text-slate-400 truncate max-w-[140px]">
                        {log.hash}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{log.timestamp}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="teal" className="text-[10px] gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {log.status}
                        </Badge>
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
