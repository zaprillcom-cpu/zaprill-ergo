'use client';

import React, { useState } from 'react';
import { formatINR } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface LocationRow {
  id: string;
  name: string;
  city: string;
  totalDesks: number;
  occupancyPct: number;
  deskPriceINR: number;
  rentINR: number;
  staffINR: number;
  utilitiesINR: number;
}

export function FinancialModelSheet({
  onChange,
}: {
  onChange?: (calculatedOutputs: Record<string, any>) => void;
}) {
  const initialRows: LocationRow[] = [
    {
      id: 'mumbai',
      name: 'Andheri East Hub',
      city: 'Mumbai',
      totalDesks: 300,
      occupancyPct: 82,
      deskPriceINR: 14500,
      rentINR: 2200000,
      staffINR: 350000,
      utilitiesINR: 250000,
    },
    {
      id: 'blr',
      name: 'Indiranagar Hub',
      city: 'Bengaluru',
      totalDesks: 250,
      occupancyPct: 88,
      deskPriceINR: 12800,
      rentINR: 1600000,
      staffINR: 280000,
      utilitiesINR: 200000,
    },
    {
      id: 'gurugram',
      name: 'CyberHub Centre',
      city: 'Gurugram',
      totalDesks: 400,
      occupancyPct: 70,
      deskPriceINR: 16000,
      rentINR: 3100000,
      staffINR: 420000,
      utilitiesINR: 418000, // Includes 10% utility surge
    },
  ];

  const [rows, setRows] = useState<LocationRow[]>(initialRows);

  const handleCellChange = (id: string, field: keyof LocationRow, val: number) => {
    const updated = rows.map((r) => (r.id === id ? { ...r, [field]: val } : r));
    setRows(updated);
    if (onChange) {
      onChange(calculateTotals(updated));
    }
  };

  const calculateTotals = (data: LocationRow[]) => {
    return data.map((r) => {
      const occupiedDesks = Math.round((r.totalDesks * r.occupancyPct) / 100);
      const monthlyRevenue = occupiedDesks * r.deskPriceINR;
      const totalOpEx = r.rentINR + r.staffINR + r.utilitiesINR;
      const monthlyEBITDA = monthlyRevenue - totalOpEx;
      const ebitdaMarginPct = monthlyRevenue > 0 ? (monthlyEBITDA / monthlyRevenue) * 100 : 0;
      const breakevenDesks = r.deskPriceINR > 0 ? totalOpEx / r.deskPriceINR : 0;
      const breakevenOccupancyPct = (breakevenDesks / r.totalDesks) * 100;

      return {
        ...r,
        occupiedDesks,
        monthlyRevenue,
        totalOpEx,
        monthlyEBITDA,
        ebitdaMarginPct,
        breakevenDesks,
        breakevenOccupancyPct,
      };
    });
  };

  const computedRows = calculateTotals(rows);

  const aggregateRevenue = computedRows.reduce((acc, r) => acc + r.monthlyRevenue, 0);
  const aggregateOpEx = computedRows.reduce((acc, r) => acc + r.totalOpEx, 0);
  const aggregateEBITDA = aggregateRevenue - aggregateOpEx;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Interactive Operational Model Table
          </h4>
          <p className="text-[11px] text-slate-500">
            Editable assumptions (shaded cells). Revenue, EBITDA, and Breakeven recalculate in real time.
          </p>
        </div>
        <button
          onClick={() => setRows(initialRows)}
          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Baseline
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <th className="p-3">Location</th>
              <th className="p-3 text-right">Desks</th>
              <th className="p-3 text-right bg-amber-50/70 border-x border-amber-100">Occupancy %</th>
              <th className="p-3 text-right bg-amber-50/70 border-r border-amber-100">Desk Price</th>
              <th className="p-3 text-right">Monthly Revenue</th>
              <th className="p-3 text-right">Fixed Rent</th>
              <th className="p-3 text-right">Payroll</th>
              <th className="p-3 text-right bg-amber-50/70 border-x border-amber-100">Utilities</th>
              <th className="p-3 text-right">Monthly OpEx</th>
              <th className="p-3 text-right font-bold text-indigo-900">EBITDA</th>
              <th className="p-3 text-right">Margin %</th>
              <th className="p-3 text-right text-teal-800">BE Desks</th>
              <th className="p-3 text-right text-teal-800">BE Occ %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {computedRows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-sans font-semibold text-slate-900 whitespace-nowrap">
                  {r.name}
                  <span className="block text-[10px] font-normal text-slate-400">{r.city}</span>
                </td>
                <td className="p-3 text-right text-slate-600">{r.totalDesks}</td>

                {/* Editable: Occupancy */}
                <td className="p-2 text-right bg-amber-50/40 border-x border-amber-100">
                  <input
                    type="number"
                    value={r.occupancyPct}
                    onChange={(e) => handleCellChange(r.id, 'occupancyPct', Number(e.target.value))}
                    className="w-16 text-right px-1.5 py-1 rounded border border-amber-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
                    min={0}
                    max={100}
                  />
                  %
                </td>

                {/* Editable: Desk Price */}
                <td className="p-2 text-right bg-amber-50/40 border-r border-amber-100">
                  <input
                    type="number"
                    value={r.deskPriceINR}
                    onChange={(e) => handleCellChange(r.id, 'deskPriceINR', Number(e.target.value))}
                    className="w-20 text-right px-1.5 py-1 rounded border border-amber-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
                    step={500}
                  />
                </td>

                {/* Computed Revenue */}
                <td className="p-3 text-right font-semibold text-slate-800">
                  {formatINR(r.monthlyRevenue)}
                </td>

                <td className="p-3 text-right text-slate-600">{formatINR(r.rentINR)}</td>
                <td className="p-3 text-right text-slate-600">{formatINR(r.staffINR)}</td>

                {/* Editable: Utilities */}
                <td className="p-2 text-right bg-amber-50/40 border-x border-amber-100">
                  <input
                    type="number"
                    value={r.utilitiesINR}
                    onChange={(e) => handleCellChange(r.id, 'utilitiesINR', Number(e.target.value))}
                    className="w-20 text-right px-1.5 py-1 rounded border border-amber-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
                    step={10000}
                  />
                </td>

                {/* Computed OpEx */}
                <td className="p-3 text-right font-medium text-slate-700">{formatINR(r.totalOpEx)}</td>

                {/* Computed EBITDA */}
                <td className={`p-3 text-right font-bold ${r.monthlyEBITDA >= 0 ? 'text-indigo-700' : 'text-rose-600'}`}>
                  {formatINR(r.monthlyEBITDA)}
                </td>

                <td className="p-3 text-right">{r.ebitdaMarginPct.toFixed(1)}%</td>
                <td className="p-3 text-right font-semibold text-teal-700">{r.breakevenDesks.toFixed(1)}</td>
                <td className="p-3 text-right font-bold text-teal-800">{r.breakevenOccupancyPct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
              <td className="p-3 font-sans">Combined Network Total</td>
              <td className="p-3 text-right">950 Desks</td>
              <td className="p-3 text-right bg-slate-200/50">--</td>
              <td className="p-3 text-right bg-slate-200/50">--</td>
              <td className="p-3 text-right text-indigo-900">{formatINR(aggregateRevenue)}</td>
              <td className="p-3 text-right" colSpan={3}>
                Combined OpEx:
              </td>
              <td className="p-3 text-right">{formatINR(aggregateOpEx)}</td>
              <td className="p-3 text-right text-indigo-700 text-sm">{formatINR(aggregateEBITDA)}</td>
              <td className="p-3 text-right">
                {aggregateRevenue > 0 ? ((aggregateEBITDA / aggregateRevenue) * 100).toFixed(1) : 0}%
              </td>
              <td className="p-3 text-right text-teal-700" colSpan={2}>
                Network Health: Strong
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
