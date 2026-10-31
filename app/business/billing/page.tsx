'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Download, AlertCircle, FileText } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { formatINR, exportToCSV } from '@/lib/utils';

export default function BusinessBillingPage() {
  const { state } = useZaprillStore();
  const biz = state.businesses[0]; // HarbourDesk Spaces
  const [currentPlan, setCurrentPlan] = useState<'Starter' | 'Growth' | 'Enterprise'>(biz.billingPlan);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const sampleInvoices = [
    { id: 'INV-2026-1001', date: '2026-10-01', plan: 'Growth Plan Subscription', amountINR: 39999, status: 'Paid' },
    { id: 'INV-2026-0901', date: '2026-09-01', plan: 'Growth Plan Subscription', amountINR: 39999, status: 'Paid' },
    { id: 'INV-2026-0801', date: '2026-08-01', plan: 'Growth Plan Subscription', amountINR: 39999, status: 'Paid' },
  ];

  const handleSwitchPlan = (plan: 'Starter' | 'Growth' | 'Enterprise') => {
    setCurrentPlan(plan);
    setSuccessMsg(`Simulated plan changed to ${plan}! No real payment method was charged.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleExportInvoices = () => {
    exportToCSV('HarbourDesk_Invoices', sampleInvoices);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Billing & Plans Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your subscription plan, seat allocations, and download simulated enterprise tax invoices.
          </p>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Simulated Billing:</strong> This is a prototype environment. No actual payment gateways, credit card
            numbers, or UPI transactions are stored or processed.
          </span>
        </div>

        {successMsg && (
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            {successMsg}
          </div>
        )}

        {/* Current Plan Overview */}
        <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Active Tier</span>
              <div className="flex items-center gap-2 mt-0.5">
                <h2 className="text-xl font-bold text-slate-900">{currentPlan} Plan</h2>
                <Badge variant="teal" size="sm">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">Next simulated renewal: 1st Nov 2026</p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-indigo-700 font-mono">
                {currentPlan === 'Starter' ? '₹14,999' : currentPlan === 'Growth' ? '₹39,999' : '₹95,000'}
              </span>
              <span className="text-xs text-slate-500 font-medium"> / month</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
            {(['Starter', 'Growth', 'Enterprise'] as const).map((plan) => (
              <Button
                key={plan}
                variant={currentPlan === plan ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleSwitchPlan(plan)}
              >
                {currentPlan === plan ? `✓ ${plan} (Active)` : `Switch to ${plan}`}
              </Button>
            ))}
          </div>
        </Card>

        {/* Invoices Table */}
        <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Historical Simulated Tax Invoices (GST)</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportInvoices}>
              <Download className="w-3.5 h-3.5 mr-1" />
              Download Invoices CSV
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Billing Date</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                  <th className="p-3 text-right">Status</th>
                  <th className="p-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {sampleInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-semibold text-slate-900">{inv.id}</td>
                    <td className="p-3 text-slate-600">{inv.date}</td>
                    <td className="p-3 font-sans text-slate-700">{inv.plan}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{formatINR(inv.amountINR)}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-sans">
                      <button className="text-indigo-600 hover:underline font-semibold">Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
