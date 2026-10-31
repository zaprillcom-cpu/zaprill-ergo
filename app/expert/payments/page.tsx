'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  DollarSign,
  Building2,
  Calendar,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatINR } from '@/lib/utils';

export default function ExpertPaymentsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadInvoice = (invoiceId: string) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const transactions = [
    {
      id: 'TXN-2026-10-884',
      candidate: 'Aarav Mehta',
      topic: 'Coworking Hub Unit Economics & Profitability',
      date: '2026-10-25',
      gross: 4000,
      tds: 400,
      net: 3600,
      status: 'Processing',
      payoutDate: '2026-11-05',
    },
    {
      id: 'TXN-2026-10-842',
      candidate: 'Priya Sharma',
      topic: 'PostgreSQL Advanced Analytics & Query Tuning',
      date: '2026-10-18',
      gross: 4000,
      tds: 400,
      net: 3600,
      status: 'Paid',
      payoutDate: '2026-10-20',
    },
    {
      id: 'TXN-2026-10-791',
      candidate: 'Rohan Iyer',
      topic: 'SaaS DCF & Unit Economics Modeling',
      date: '2026-10-12',
      gross: 4000,
      tds: 400,
      net: 3600,
      status: 'Paid',
      payoutDate: '2026-10-15',
    },
    {
      id: 'TXN-2026-09-640',
      candidate: 'Sneha Patel',
      topic: 'Omni-channel Working Capital Stress Test',
      date: '2026-09-28',
      gross: 4000,
      tds: 400,
      net: 3600,
      status: 'Paid',
      payoutDate: '2026-10-05',
    },
    {
      id: 'TXN-2026-09-588',
      candidate: 'Tanya Kapoor',
      topic: 'Corporate Valuation & LBO Feasibility',
      date: '2026-09-15',
      gross: 4000,
      tds: 400,
      net: 3600,
      status: 'Paid',
      payoutDate: '2026-09-20',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Evaluator Earnings & Honorarium Payouts</h1>
            <p className="text-sm text-slate-500 mt-1">
              Honorarium disbursements, TDS statements, and verified payment invoices.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadInvoice('all')}
              className="gap-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download FY 26-27 TDS Certificate
            </Button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            TDS Form 16A Statement downloaded successfully.
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Earned (YTD)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{formatINR(192000)}</span>
              <span className="text-xs text-emerald-600 font-semibold">+18% MoM</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">48 reviews completed</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Pending Clearance</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-indigo-600">{formatINR(8000)}</span>
              <span className="text-xs text-slate-500">2 reviews</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Disbursing Nov 5, 2026</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">TDS Deducted (Sec 194J)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">{formatINR(19200)}</span>
              <span className="text-xs text-slate-500">10% Professional</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Deposited to PAN: AAAPZ••••K</p>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Primary Payout Method</span>
            <div className="mt-2">
              <span className="text-sm font-bold text-slate-900 block">HDFC Bank •••• 4819</span>
              <span className="text-xs text-teal-600 font-medium">NEFT / RTGS Auto-Sweep</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Verified on 12 Jan 2025</p>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base text-slate-900">Honorarium Settlement History</CardTitle>
              <p className="text-xs text-slate-500">Individual candidate reviews and net honorarium disbursements.</p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              Per-Review: ₹4,000 Flat
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Candidate & Assessment</th>
                    <th className="py-3 px-4">Completed On</th>
                    <th className="py-3 px-4">Gross Honorarium</th>
                    <th className="py-3 px-4">TDS (10%)</th>
                    <th className="py-3 px-4">Net Payout</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">{tx.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{tx.candidate}</span>
                        <span className="text-[11px] text-slate-500 truncate block max-w-xs">{tx.topic}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                      <td className="py-3 px-4 font-mono font-medium">{formatINR(tx.gross)}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">-{formatINR(tx.tds)}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{formatINR(tx.net)}</td>
                      <td className="py-3 px-4">
                        {tx.status === 'Paid' ? (
                          <Badge variant="success">Paid</Badge>
                        ) : (
                          <Badge variant="warning">Nov 05 Payout</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDownloadInvoice(tx.id)}
                          className="p-1 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
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
