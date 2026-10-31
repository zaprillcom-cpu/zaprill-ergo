'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  FileText,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { TalentProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CandidateCardProps {
  talent: TalentProfile;
  isSelectedForCompare?: boolean;
  onToggleCompare?: () => void;
  showCompareCheckbox?: boolean;
}

export function CandidateCard({
  talent,
  isSelectedForCompare = false,
  onToggleCompare,
  showCompareCheckbox = true,
}: CandidateCardProps) {
  return (
    <Card className="hoverEffect bg-white flex flex-col justify-between">
      <CardContent className="p-5 space-y-4">
        {/* Candidate Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/business/talent/${talent.id}`}
                  className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  {talent.name}
                </Link>
                {talent.skills.some((s) => s.level === 'expert_reviewed') && (
                  <span title="Expert-Reviewed Candidate">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium line-clamp-1">{talent.headline}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />
                  {talent.location}
                </span>
                <span>•</span>
                <span>{talent.availability}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Capability Score</span>
            <span className="text-base font-black text-indigo-700 font-mono">
              {talent.overallCapabilityScore}/100
            </span>
          </div>
        </div>

        {/* Education Highlight (degree holders, self-taught, Class 12) */}
        <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center gap-2 border border-slate-200/60">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span className="truncate">
            {talent.education.isSelfTaught
              ? 'Self-Taught Professional (Validated through practical assessments)'
              : talent.education.class12Only
              ? 'Class 12 Higher Secondary (Proven through verified modeling)'
              : `${talent.education.degree} — ${talent.education.institution}`}
          </span>
        </div>

        {/* Verified Skills Pills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Top Demonstrated Skills:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {talent.skills.slice(0, 3).map((skill) => (
              <span
                key={skill.skillId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-800 border border-slate-200"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="font-mono text-indigo-700 font-bold">({skill.score})</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer Actions & Compare Checkbox */}
      <div className="p-3 px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        {showCompareCheckbox ? (
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-900">
            <input
              type="checkbox"
              checked={isSelectedForCompare}
              onChange={onToggleCompare}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span className="text-[11px]">Compare</span>
          </label>
        ) : (
          <span className="text-[11px] text-slate-400">
            {talent.skills.filter((s) => s.evidenceCount > 0).length} Evidence Files
          </span>
        )}

        <Link href={`/business/talent/${talent.id}`}>
          <Button variant="primary" size="sm">
            Inspect Profile
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
