'use client';

import React, { useState } from 'react';
import {
  Compass,
  RotateCcw,
  Sparkles,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  DollarSign,
  BarChart,
} from 'lucide-react';
import { Simulation } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';

export function CoworkingSimulator({ simulation }: { simulation: Simulation }) {
  const [activeTab, setActiveTab] = useState<'brief' | 'dataset' | 'model' | 'submission'>('model');

  // Interactive assumption controls
  const [occupancyAdjustment, setOccupancyAdjustment] = useState<number>(0); // e.g. -10 to +10%
  const [cyberhubUtilitySurgePct, setCyberhubUtilitySurgePct] = useState<number>(10); // 10%
  const [andheriDeskPriceDeltaPct, setAndheriDeskPriceDeltaPct] = useState<number>(0); // 0%
  const [recommendationText, setRecommendationText] = useState<string>('');
  const [submittedSim, setSubmittedSim] = useState(false);

  const locations = simulation.dataset.locations;

  // Compute live location economics with dynamic sliders
  const computedLocations = locations.map((loc) => {
    let occ = loc.currentOccupancyPct + occupancyAdjustment;
    occ = Math.max(10, Math.min(100, occ));

    let deskPrice = loc.avgDeskPriceINR;
    if (loc.city === 'Mumbai' && andheriDeskPriceDeltaPct !== 0) {
      deskPrice = Math.round(deskPrice * (1 + andheriDeskPriceDeltaPct / 100));
    }

    let utilities = loc.utilitiesMaintenanceINR;
    if (loc.city === 'Gurugram' && cyberhubUtilitySurgePct !== 0) {
      utilities = Math.round(utilities * (1 + cyberhubUtilitySurgePct / 100));
    }

    const occupiedDesks = Math.round((loc.totalDesks * occ) / 100);
    const monthlyRevenue = occupiedDesks * deskPrice;
    const monthlyOpEx = loc.monthlyRentINR + loc.staffPayrollINR + utilities;
    const monthlyEBITDA = monthlyRevenue - monthlyOpEx;
    const ebitdaMarginPct = monthlyRevenue > 0 ? (monthlyEBITDA / monthlyRevenue) * 100 : 0;
    const breakevenDesks = deskPrice > 0 ? monthlyOpEx / deskPrice : 0;
    const breakevenOccupancyPct = (breakevenDesks / loc.totalDesks) * 100;

    return {
      ...loc,
      effectiveOccupancy: occ,
      effectiveDeskPrice: deskPrice,
      effectiveUtilities: utilities,
      occupiedDesks,
      monthlyRevenue,
      monthlyOpEx,
      monthlyEBITDA,
      ebitdaMarginPct,
      breakevenDesks,
      breakevenOccupancyPct,
    };
  });

  const totalRev = computedLocations.reduce((acc, l) => acc + l.monthlyRevenue, 0);
  const totalOpEx = computedLocations.reduce((acc, l) => acc + l.monthlyOpEx, 0);
  const totalEBITDA = totalRev - totalOpEx;
  const networkMarginPct = totalRev > 0 ? (totalEBITDA / totalRev) * 100 : 0;

  const handleFillSample = () => {
    setOccupancyAdjustment(3);
    setCyberhubUtilitySurgePct(15);
    setAndheriDeskPriceDeltaPct(-5);
    setRecommendationText(
      'HarbourDesk should preserve the Mumbai EBITDA cushion by converting open floor desks into 12-month lock-in private suites. In Gurugram, install sub-metered HVAC controls to curb the 15% tariff surge. Capital expansion into Tier-2 hubs should follow revenue-share management contracts rather than fixed-liability leases.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold uppercase tracking-wider">
              Fictional Business Simulation
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs text-slate-300 font-medium">{simulation.companyName}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">{simulation.title}</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{simulation.brief}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="amber" size="sm" onClick={handleFillSample}>
            <Sparkles className="w-3.5 h-3.5" />
            Fill Sample Solution
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        variant="pills"
        tabs={[
          { id: 'model', label: 'Interactive Financial Model', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'dataset', label: 'Baseline Facility Dataset', icon: <Building2 className="w-4 h-4" /> },
          { id: 'brief', label: 'Problem Brief & Objectives', icon: <FileText className="w-4 h-4" /> },
          { id: 'submission', label: 'Executive Recommendation', icon: <CheckCircle className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
      />

      {/* Tab 1: Interactive Model */}
      {activeTab === 'model' && (
        <div className="space-y-6">
          {/* Real-time Sensitivity Sliders */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Live Scenario Stress Testers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Network Occupancy Swing:</span>
                    <span className="font-bold text-indigo-600 font-mono">
                      {occupancyAdjustment >= 0 ? `+${occupancyAdjustment}%` : `${occupancyAdjustment}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={occupancyAdjustment}
                    onChange={(e) => setOccupancyAdjustment(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Simulates seasonal tech hiring downturns or surges</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>CyberHub Gurugram Utility Surge:</span>
                    <span className="font-bold text-amber-600 font-mono">+{cyberhubUtilitySurgePct}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={cyberhubUtilitySurgePct}
                    onChange={(e) => setCyberhubUtilitySurgePct(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Simulates peak summer HVAC tariff escalation</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Andheri Mumbai Desk Price Shift:</span>
                    <span className="font-bold text-indigo-600 font-mono">
                      {andheriDeskPriceDeltaPct >= 0 ? `+${andheriDeskPriceDeltaPct}%` : `${andheriDeskPriceDeltaPct}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-25}
                    max={25}
                    value={andheriDeskPriceDeltaPct}
                    onChange={(e) => setAndheriDeskPriceDeltaPct(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Simulates response to nearby competitor price slashing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 bg-white">
              <span className="text-xs text-slate-500 font-medium">Network Monthly Revenue</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">{formatINR(totalRev)}</p>
              <span className="text-[10px] text-slate-400">950 total desk capacity</span>
            </Card>

            <Card className="p-4 bg-white">
              <span className="text-xs text-slate-500 font-medium">Network Monthly OpEx</span>
              <p className="text-xl font-bold text-slate-700 mt-1 font-mono">{formatINR(totalOpEx)}</p>
              <span className="text-[10px] text-slate-400">Fixed rent + payroll + utilities</span>
            </Card>

            <Card className="p-4 bg-white">
              <span className="text-xs text-slate-500 font-medium">Monthly EBITDA</span>
              <p className={`text-xl font-bold mt-1 font-mono ${totalEBITDA >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                {formatINR(totalEBITDA)}
              </p>
              <span className="text-[10px] font-semibold text-slate-500">Margin: {networkMarginPct.toFixed(1)}%</span>
            </Card>

            <Card className="p-4 bg-white">
              <span className="text-xs text-slate-500 font-medium">Network Capital Efficiency</span>
              <p className="text-xl font-bold text-teal-600 mt-1 font-mono">
                {networkMarginPct >= 20 ? 'Optimal' : networkMarginPct >= 10 ? 'Healthy' : 'Fragile'}
              </p>
              <span className="text-[10px] text-slate-400">Based on cash generation buffer</span>
            </Card>
          </div>

          {/* Location Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Location-Wise Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="p-3">Location Hub</th>
                      <th className="p-3 text-right">Desks</th>
                      <th className="p-3 text-right">Effective Occ %</th>
                      <th className="p-3 text-right">Desk Price</th>
                      <th className="p-3 text-right">Revenue</th>
                      <th className="p-3 text-right">OpEx</th>
                      <th className="p-3 text-right">EBITDA</th>
                      <th className="p-3 text-right">Margin %</th>
                      <th className="p-3 text-right text-teal-800">BE Desks</th>
                      <th className="p-3 text-right text-teal-800">BE Occ %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {computedLocations.map((loc) => (
                      <tr key={loc.name} className="hover:bg-slate-50/70">
                        <td className="p-3 font-sans font-semibold text-slate-900">
                          {loc.name}
                          <span className="block text-[10px] font-normal text-slate-400">{loc.city}</span>
                        </td>
                        <td className="p-3 text-right text-slate-600">{loc.totalDesks}</td>
                        <td className="p-3 text-right font-bold text-slate-800">{loc.effectiveOccupancy}%</td>
                        <td className="p-3 text-right text-slate-700">{formatINR(loc.effectiveDeskPrice)}</td>
                        <td className="p-3 text-right font-semibold text-slate-900">{formatINR(loc.monthlyRevenue)}</td>
                        <td className="p-3 text-right text-slate-600">{formatINR(loc.monthlyOpEx)}</td>
                        <td className={`p-3 text-right font-bold ${loc.monthlyEBITDA >= 0 ? 'text-indigo-700' : 'text-rose-600'}`}>
                          {formatINR(loc.monthlyEBITDA)}
                        </td>
                        <td className="p-3 text-right">{loc.ebitdaMarginPct.toFixed(1)}%</td>
                        <td className="p-3 text-right font-semibold text-teal-700">{loc.breakevenDesks.toFixed(1)}</td>
                        <td className="p-3 text-right font-bold text-teal-800">{loc.breakevenOccupancyPct.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Dataset */}
      {activeTab === 'dataset' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Baseline Location Dataset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-600">
              The dataset represents historical contractual commitments and operating parameters for HarbourDesk Spaces across its 3 operational locations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div key={loc.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">{loc.name} ({loc.city})</h4>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Total Desks:</span>
                    <span className="font-mono font-semibold">{loc.totalDesks}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Current Occupancy:</span>
                    <span className="font-mono font-semibold">{loc.currentOccupancyPct}%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Average Desk Price:</span>
                    <span className="font-mono font-semibold">{formatINR(loc.avgDeskPriceINR)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Monthly Lease Rent:</span>
                    <span className="font-mono font-semibold">{formatINR(loc.monthlyRentINR)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Staff Payroll:</span>
                    <span className="font-mono font-semibold">{formatINR(loc.staffPayrollINR)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Utilities & Maintenance:</span>
                    <span className="font-mono font-semibold">{formatINR(loc.utilitiesMaintenanceINR)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Brief */}
      {activeTab === 'brief' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Problem Brief & Simulation Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>{simulation.brief}</p>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-950 space-y-2">
              <h4 className="font-bold">Core Investigation Objectives:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {simulation.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Follow-up Board Challenge:</h4>
              <p className="italic text-slate-700 bg-slate-100 p-3 rounded-lg border border-slate-200">
                "{simulation.followUpQuestion}"
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Executive Recommendation */}
      {activeTab === 'submission' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Executive Operational Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-600">
              Synthesize your financial model findings into an executive memo for HarbourDesk’s Leadership Team. Address lease escalation, price elasticity, and Tier-2 expansion viability.
            </p>
            <textarea
              rows={6}
              value={recommendationText}
              onChange={(e) => setRecommendationText(e.target.value)}
              placeholder="Draft your operational strategy and margin defense framework..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />

            {submittedSim ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Simulation Solution Saved</h4>
                  <p className="mt-0.5">
                    Your calculated network EBITDA of {formatINR(totalEBITDA)} ({networkMarginPct.toFixed(1)}% margin) and executive recommendation have been recorded.
                  </p>
                  <p className="mt-2 text-slate-600">
                    <strong>Sample Solution Reference:</strong> {simulation.sampleSolutionSummary}
                  </p>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setSubmittedSim(true)}
                disabled={!recommendationText}
              >
                Submit Simulation Findings
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
