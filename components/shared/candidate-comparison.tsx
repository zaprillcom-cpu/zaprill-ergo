'use client';

import React from 'react';
import Link from 'next/link';
import { X, CheckCircle2, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { TalentProfile } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CapabilityBadge } from '@/components/ui/badge';

interface CandidateComparisonProps {
  candidates: TalentProfile[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CandidateComparison({ candidates, onRemove, onClear }: CandidateComparisonProps) {
  if (candidates.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t-2 border-indigo-600 shadow-2xl z-40 p-4 max-h-[85vh] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Candidate Comparison Matrix ({candidates.length}/3 Selected)
            </h3>
            <p className="text-[11px] text-slate-500">
              Side-by-side evaluation of verified capability metrics, education background, and evidence files.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidates.map((c) => (
            <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative text-xs space-y-3">
              <button
                onClick={() => onRemove(c.id)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1"
                title="Remove from comparison"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover border" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                  <p className="text-[11px] text-slate-600 truncate max-w-[180px]">{c.headline}</p>
                  <span className="text-[10px] text-slate-400">{c.location}</span>
                </div>
              </div>

              {/* Capability Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center bg-white p-2.5 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Overall</span>
                  <span className="font-mono text-sm font-black text-indigo-700">{c.overallCapabilityScore}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Applied</span>
                  <span className="font-mono text-sm font-black text-teal-700">{c.appliedCapability}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Knowledge</span>
                  <span className="font-mono text-sm font-black text-slate-800">{c.knowledgeMastery}%</span>
                </div>
              </div>

              {/* Education Background */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Background:</span>
                <p className="text-slate-700 font-medium">
                  {c.education.isSelfTaught
                    ? 'Self-Taught Professional'
                    : c.education.class12Only
                    ? 'Class 12 Higher Secondary'
                    : `${c.education.degree} (${c.education.year})`}
                </p>
              </div>

              {/* Top Skills */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Demonstrated Skills:</span>
                <div className="space-y-1">
                  {c.skills.slice(0, 3).map((s) => (
                    <div key={s.skillId} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-700 font-medium truncate max-w-[150px]">{s.name}</span>
                      <CapabilityBadge level={s.level} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Expected: {c.expectedSalaryINR ? formatINR(c.expectedSalaryINR) : 'Negotiable'}</span>
                <Link href={`/business/talent/${c.id}`}>
                  <Button variant="primary" size="sm">
                    Inspect Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
