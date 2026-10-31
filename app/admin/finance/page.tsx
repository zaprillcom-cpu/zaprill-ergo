'use client';

import React from 'react';
import {
  CreditCard,
  TrendingUp,
  Download,
  Building2,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatINR, exportToCSV } from '@/lib/utils';

export default function AdminFinancePage() {
  const transactions = [
    {
      id: 'INV-2026-10-901',
      entity: 'HarbourDesk Spaces',
      type: 'Enterprise Subscription (Growth Plan)',
      amount: 45000,
      date: '2026-10-01',
      status: 'Settled',
      method: 'Corporate Net Banking',
    },
    {
      id: 'INV-2026-10-892',
      entity: 'FinTech Bharat',
      type: 'Enterprise Subscription (Starter Plan)',
      amount: 25000,
      date: '2026-10-02',
      status: 'Settled',
      method: 'Razorpay UPI AutoPay',
    },
    {
      id: 'INV-2026-10-844',
      entity: 'Dr. Vikram Sen',
      type: 'Expert Honorarium Disbursement',
      amount: -4000,
      date: '2026-10-20',
      status: 'Disbursed',
      method: 'NEFT Direct to HDFC',
    },
    {
      id: 'INV-2026-10-811',
      entity: 'Apex Institute of Technology',
      type: 'Campus Diagnostic Licensing (40 Cohort)',
      amount: 60000,
      date: '2026-09-28',
      status: 'Settled',
      method: 'University Wire Transfer',
    },
    {
      id: 'INV-2026-10-752',
      entity: 'Aarav Mehta',
      type: 'Expert Evaluation Sponsorship (Sponsored by HarbourDesk)',
      amount: 4000,
      date: '2026-10-22',
      status: 'Escrow Held',
      method: 'Corporate Credit',
    },
  ];

  const handleExportCSV = () => {
    exportToCSV(
      transactions.map((t) => ({
        InvoiceId: t.id,
        Entity: t.entity,
        Description: t.type,
        Amount: t.amount,
        Date: t.date,
        Status: t.status,
        PaymentMethod: t.method,
      })),
      'Zaprill_Platform_Financial_Ledger'
    );
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Financial Treasury & Billing</h1>
            <p className="text-sm text-slate-500 mt-1">
              Consolidated enterprise subscriptions, campus diagnostics licensing, and expert honorarium disbursements.
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 border-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            Export Ledger (CSV)
          </Button>
        </div>

        {/* Financial KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Monthly Gross</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{formatINR(1240000)}</span>
              <span className="text-xs text-emerald-600 font-semibold">+18% MoM</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">SaaS & Campus recurring</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Enterprise ARR Run-rate</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-indigo-600">{formatINR(8400000)}</span>
              <span className="text-xs text-indigo-600 font-semibold">8 Active Clients</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">100% Net Revenue Retention</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Expert Honorarium Volume</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-700">{formatINR(192000)}</span>
              <span className="text-xs text-slate-500">YTD</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Zero platform fee on reviews</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Disbursement Health</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">99.8%</span>
              <span className="text-xs text-emerald-600 font-semibold">T+1 Auto-Sweep</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">RazorpayX Gateway Connected</p>
          </Card>
        </div>

        {/* Transaction History Table */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-slate-900">Recent Ecosystem Settlements</CardTitle>
            <Badge variant="outline" className="text-xs">Live Settlement Feed</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">{t.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{t.entity}</td>
                      <td className="py-3 px-4 text-slate-600">{t.type}</td>
                      <td className="py-3 px-4 text-slate-500">{t.date}</td>
                      <td className="py-3 px-4 text-slate-500">{t.method}</td>
                      <td className={`py-3 px-4 font-mono font-bold ${t.amount < 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                        {formatINR(t.amount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge
                          variant={
                            t.status === 'Settled'
                              ? 'success'
                              : t.status === 'Disbursed'
                              ? 'teal'
                              : 'warning'
                          }
                          className="text-[10px]"
                        >
                          {t.status}
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
