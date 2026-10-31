'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Opportunity, TalentProfile } from '@/lib/types';
import { calculateOpportunityMatch, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OpportunityCardProps {
  opportunity: Opportunity;
  talentProfile?: TalentProfile;
  hasApplied?: boolean;
  onApply?: () => void;
}

export function OpportunityCard({
  opportunity,
  talentProfile,
  hasApplied = false,
  onApply,
}: OpportunityCardProps) {
  const match = talentProfile ? calculateOpportunityMatch(talentProfile, opportunity) : null;

  return (
    <Card className="hoverEffect bg-white flex flex-col justify-between">
      <CardContent className="p-5 pb-4 space-y-4">
        {/* Header: Logo, Title, Business */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl flex-shrink-0">
              {opportunity.businessLogo || '🏢'}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">{opportunity.businessName}</span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                <Link href={`/talent/opportunities/${opportunity.id}`}>{opportunity.title}</Link>
              </h3>
            </div>
          </div>

          <Badge
            variant={
              opportunity.type === 'job'
                ? 'indigo'
                : opportunity.type === 'internship'
                ? 'teal'
                : opportunity.type === 'project'
                ? 'amber'
                : 'default'
            }
            size="sm"
            className="capitalize uppercase text-[10px]"
          >
            {opportunity.type}
          </Badge>
        </div>

        {/* Location & Compensation */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {opportunity.location} ({opportunity.workMode})
          </span>
          <span>•</span>
          <span className="font-semibold text-indigo-700 font-mono">
            {opportunity.compensationText}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Transparent Capability Matching Formula Breakdown */}
        {match && (
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Capability Match Score:
              </span>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                  match.matchScore >= 85
                    ? 'bg-teal-100 text-teal-800'
                    : match.matchScore >= 70
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {match.matchScore}% Match
              </span>
            </div>

            <div className="flex flex-wrap gap-1 text-[10px]">
              {opportunity.requiredSkills.map((req) => {
                const isMatched = match.matchedSkills.some((ms) => ms.includes(req.skillName));
                return (
                  <span
                    key={req.skillId}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${
                      isMatched
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {isMatched ? <CheckCircle2 className="w-3 h-3 text-teal-600" /> : <AlertCircle className="w-3 h-3 text-slate-400" />}
                    {req.skillName} (Min {req.minimumScore})
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      <div className="p-4 px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Deadline: {formatDate(opportunity.deadline)}</span>

        <div className="flex items-center gap-2">
          <Link href={`/talent/opportunities/${opportunity.id}`}>
            <Button variant="outline" size="sm">
              Inspect Match
            </Button>
          </Link>
          {hasApplied ? (
            <Badge variant="teal" size="md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </Badge>
          ) : (
            onApply && (
              <Button variant="primary" size="sm" onClick={onApply}>
                Apply with Passport
              </Button>
            )
          )}
        </div>
      </div>
    </Card>
  );
}
