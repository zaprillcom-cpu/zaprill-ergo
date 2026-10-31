'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  FileText,
  FolderGit2,
  Share2,
  Printer,
  Copy,
  ExternalLink,
  ShieldCheck,
  User,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import { TalentProfile, EvidenceRecord, AssessmentAttempt, Endorsement } from '@/lib/types';
import { formatINR, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge, CapabilityBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZaprillStore } from '@/lib/store';

interface PassportCardProps {
  talent: TalentProfile;
  evidence: EvidenceRecord[];
  attempts: AssessmentAttempt[];
  endorsements: Endorsement[];
  isPublicView?: boolean;
}

export function PassportCard({
  talent,
  evidence,
  attempts,
  endorsements,
  isPublicView = false,
}: PassportCardProps) {
  const { toggleEvidenceVisibility } = useZaprillStore();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const publicUrl = `${window.location.origin}/p/${talent.publicSlug}`;
      navigator.clipboard.writeText(publicUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Filter evidence based on public view controls
  const visibleEvidence = isPublicView
    ? evidence.filter((e) => e.isPubliclyVisible)
    : evidence;

  return (
    <div className="space-y-6 print-page">
      {/* Top Header Card: Identity, Badges, and Print Actions */}
      <Card className="border-indigo-100 shadow-md overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
        <div className="h-3 bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-700" />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-indigo-500/20"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{talent.name}</h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Verified Capability Passport
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700">{talent.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {talent.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {talent.experienceYears} Years Experience
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    {talent.education.isSelfTaught ? 'Self-Taught Professional' : talent.education.degree}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Copy Link & Print */}
            <div className="no-print flex items-center gap-2 self-stretch md:self-auto justify-end">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Share Link
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </Button>
              {!isPublicView && (
                <Link href={`/p/${talent.publicSlug}`}>
                  <Button variant="primary" size="sm">
                    Public View
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium">Overall Capability Score</span>
              <p className="text-2xl font-black text-indigo-600 mt-0.5">{talent.overallCapabilityScore}/100</p>
              <span className="text-[10px] text-slate-400">Multi-dimensional aggregate</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium">Applied Capability</span>
              <p className="text-2xl font-black text-teal-600 mt-0.5">{talent.appliedCapability}%</p>
              <span className="text-[10px] text-slate-400">Hands-on model performance</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium">Knowledge Mastery</span>
              <p className="text-2xl font-black text-slate-800 mt-0.5">{talent.knowledgeMastery}%</p>
              <span className="text-[10px] text-slate-400">Conceptual & reasoning depth</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium">Verified Evidence Artifacts</span>
              <p className="text-2xl font-black text-amber-600 mt-0.5">{visibleEvidence.length}</p>
              <span className="text-[10px] text-slate-400">Spreadsheets & code repos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Distinct Capability Tiers Legend */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <span className="font-semibold text-slate-700">Capability Tiers Legend:</span>
        <div className="flex flex-wrap items-center gap-3">
          <CapabilityBadge level="self_declared" />
          <CapabilityBadge level="assessment_demonstrated" />
          <CapabilityBadge level="expert_reviewed" />
          <CapabilityBadge level="business_confirmed" />
        </div>
      </div>

      {/* Skills & Dimension Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Demonstrated Skills & Dimensional Mastery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {talent.skills.map((skill) => (
              <div
                key={skill.skillId}
                className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{skill.name}</h4>
                    <span className="text-[10px] text-slate-500">{skill.category}</span>
                  </div>
                  <CapabilityBadge level={skill.level} />
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-slate-600 font-medium">Demonstrated Score:</span>
                  <span className="text-sm font-bold text-indigo-700 font-mono">{skill.score}/100</span>
                </div>

                {/* Dimension percentages if demonstrated */}
                {skill.dimensions && (
                  <div className="pt-2 border-t border-slate-200/60 grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
                    <div className="bg-white p-1 rounded border border-slate-200/80">
                      <span className="text-slate-400 block text-[9px] font-sans">Under.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.understanding}%</span>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200/80">
                      <span className="text-slate-400 block text-[9px] font-sans">App.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.application}%</span>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200/80">
                      <span className="text-slate-400 block text-[9px] font-sans">Reason.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.reasoning}%</span>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200/80">
                      <span className="text-slate-400 block text-[9px] font-sans">Error</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.errorDetection}%</span>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200/80">
                      <span className="text-slate-400 block text-[9px] font-sans">Trans.</span>
                      <span className="font-bold text-slate-800">{skill.dimensions.transfer}%</span>
                    </div>
                  </div>
                )}

                {skill.verifiedBy && (
                  <p className="text-[10px] text-teal-700 mt-2 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    Verified by {skill.verifiedBy} ({formatDate(skill.verificationDate || skill.lastDemonstrated)})
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verified Evidence Vault */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-sm">Verified Evidence Vault & Work Artifacts</CardTitle>
            {!isPublicView && (
              <span className="text-[11px] text-slate-500">
                You control public evidence visibility with the toggle icons.
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {visibleEvidence.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No public evidence artifacts enabled.</p>
          ) : (
            visibleEvidence.map((evi) => (
              <div
                key={evi.id}
                className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xs transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900">{evi.title}</h4>
                      <Badge variant="slate" size="sm">
                        {evi.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">{evi.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-teal-700 font-medium mt-1">
                      <span>⚡ {evi.metricsHighlighted}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-normal">Skill: {evi.associatedSkillName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!isPublicView && (
                    <button
                      onClick={() => toggleEvidenceVisibility(evi.id)}
                      className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      title={evi.isPubliclyVisible ? 'Publicly Visible (Click to make Private)' : 'Private (Click to make Public)'}
                    >
                      {evi.isPubliclyVisible ? (
                        <Eye className="w-4 h-4 text-teal-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  )}
                  <Button variant="outline" size="sm">
                    Inspect Artifact
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Endorsements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Enterprise Endorsements & Peer Verifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {endorsements.map((end) => (
            <div key={end.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="italic text-slate-700 leading-relaxed">"{end.content}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-500">
                <span className="font-semibold text-slate-900">
                  {end.authorName} — {end.authorTitle}, {end.authorCompany} ({end.relationship})
                </span>
                <span className="text-[10px]">{formatDate(end.date)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
