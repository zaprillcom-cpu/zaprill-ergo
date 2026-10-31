'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { DimensionScores, DimensionPercentages } from '@/lib/types';
import { normalizeDimensionPercentages } from '@/lib/utils';

interface DimensionRadarProps {
  scores: DimensionScores;
  percentages?: DimensionPercentages;
  className?: string;
  height?: number;
}

export function DimensionRadar({ scores, percentages, className, height = 260 }: DimensionRadarProps) {
  const effectivePct = percentages || normalizeDimensionPercentages(scores);

  const chartData = [
    { subject: 'Understanding', percentage: effectivePct.understanding, fullMark: 100, raw: `${scores.understanding}/20 pts` },
    { subject: 'Application', percentage: effectivePct.application, fullMark: 100, raw: `${scores.application}/30 pts` },
    { subject: 'Reasoning', percentage: effectivePct.reasoning, fullMark: 100, raw: `${scores.reasoning}/20 pts` },
    { subject: 'Error Detection', percentage: effectivePct.errorDetection, fullMark: 100, raw: `${scores.errorDetection}/15 pts` },
    { subject: 'Transfer', percentage: effectivePct.transfer, fullMark: 100, raw: `${scores.transfer}/15 pts` },
  ];

  return (
    <div className={className}>
      <div style={{ height: `${height}px` }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 9 }} />
            <Radar
              name="Demonstrated Capability"
              dataKey="percentage"
              stroke="#4f46e5"
              fill="#6366f1"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown list with points */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-slate-100">
        {chartData.map((d) => (
          <div key={d.subject} className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-200/70 text-center">
            <span className="text-[10px] text-slate-500 block truncate font-medium">{d.subject}</span>
            <div className="flex items-baseline justify-center gap-1 mt-0.5">
              <span className="text-sm font-bold text-slate-900">{d.percentage}%</span>
              <span className="text-[10px] text-indigo-600 font-mono">({d.raw})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
