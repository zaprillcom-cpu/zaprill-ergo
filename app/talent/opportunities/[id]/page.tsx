'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  RotateCcw,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useZaprillStore } from '@/lib/store';
import { calculateOpportunityMatch, formatDate } from '@/lib/utils';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { state, applyToOpportunity, withdrawApplication } = useZaprillStore();
  const [candidateNotes, setCandidateNotes] = useState('');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [applyStatusMessage, setApplyStatusMessage] = useState<string | null>(null);

  const talent = state.talent[0]; // Aarav Mehta

  const opportunity =
    state.opportunities.find((o) => o.id === id) || state.opportunities[0];

  const existingApp = state.applications.find(
    (a) => a.opportunityId === opportunity.id && a.talentId === talent.id && a.currentStage !== 'withdrawn'
  );

  const match = calculateOpportunityMatch(talent, opportunity);

  const handleApply = () => {
    const res = applyToOpportunity(opportunity.id, candidateNotes);
    setApplyModalOpen(false);
    if (res.success) {
      router.push('/talent/applications');
    } else {
      setApplyStatusMessage(res.message);
    }
  };

  const handleWithdraw = () => {
    if (existingApp) {
      withdrawApplication(existingApp.id);
      setWithdrawModalOpen(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/talent/opportunities" className="hover:text-indigo-600 transition-colors">
            ← Back to All Opportunities
          </Link>
          <span className="font-mono text-indigo-700 font-semibold uppercase">{opportunity.type}</span>
        </div>

        {/* Header Card */}
        <Card className="p-6 bg-white border-indigo-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl flex-shrink-0">
                {opportunity.businessLogo}
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500">{opportunity.businessName}</span>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{opportunity.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {opportunity.location} ({opportunity.workMode})
                  </span>
                  <span>•</span>
                  <span className="font-mono font-bold text-indigo-700">
                    {opportunity.compensationText}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold font-mono">
                {match.matchScore}% Match
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Deadline: {formatDate(opportunity.deadline)}</span>
            </div>
          </div>

          {applyStatusMessage && (
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-800 text-xs">
              {applyStatusMessage}
            </div>
          )}

          {/* Action Callout */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {existingApp ? (
              <div className="flex items-center gap-3">
                <Badge variant="teal" size="md">
                  <CheckCircle2 className="w-4 h-4" />
                  Applied (Stage: {existingApp.currentStage.replace(/_/g, ' ')})
                </Badge>
                <Button variant="outline" size="sm" onClick={() => setWithdrawModalOpen(true)}>
                  Withdraw Application
                </Button>
                <Link href="/talent/applications">
                  <Button variant="primary" size="sm">
                    View Live Timeline
                  </Button>
                </Link>
              </div>
            ) : (
              <Button variant="primary" size="lg" onClick={() => setApplyModalOpen(true)}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Apply with Capability Passport
              </Button>
            )}
          </div>
        </Card>

        {/* Transparent Capability Matching Formula Breakdown */}
        <Card className="p-6 bg-slate-50 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Transparent Match Formula Breakdown
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              70% Skills ({match.skillsMatchPct}%) + 30% Evidence ({match.evidenceMatchPct}%)
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {match.suggestions}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Matched Requirements */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-teal-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Matched Skills & Minimums:
              </span>
              <ul className="space-y-1 text-slate-700">
                {match.matchedSkills.map((ms, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1 h-1 rounded-full bg-teal-500" />
                    <span>{ms}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evidence & Suggestions */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Preferred Evidence Type:
              </span>
              <p className="text-slate-600 text-[11px]">
                {opportunity.preferredEvidenceTypes.join(', ')}. (HarbourDesk Coworking Model attached from your Evidence Vault).
              </p>
            </div>
          </div>
        </Card>

        {/* Responsibilities and Scope */}
        <Card className="p-6 bg-white space-y-4">
          <CardTitle className="text-sm">Role Scope & Primary Responsibilities</CardTitle>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700 leading-relaxed">
            {opportunity.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply to ${opportunity.title}`}
        description={`Your Capability Passport will be submitted directly to ${opportunity.businessName}.`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply}>
              Confirm & Submit Application
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p>
            The hiring team will inspect your verified <strong>82/100 score</strong> on the Coworking Profitability
            Assessment, your Excel modeling evidence, and your dimensional radar profile.
          </p>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Add a personal note to the hiring team (optional):
            </label>
            <textarea
              rows={3}
              value={candidateNotes}
              onChange={(e) => setCandidateNotes(e.target.value)}
              placeholder="e.g. I have already analyzed your Mumbai and Bengaluru hub metrics and identified the 7.5% lease escalation exposure..."
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            />
          </div>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        title="Withdraw Application?"
        description="Are you sure you want to withdraw your application from HarbourDesk Spaces?"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setWithdrawModalOpen(false)}>
              Keep Application
            </Button>
            <Button variant="destructive" size="sm" onClick={handleWithdraw}>
              Yes, Withdraw Application
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600">
          Your application status will be marked as withdrawn in your tracking board. You can re-apply in the future if
          the role remains open.
        </p>
      </Modal>
    </AppShell>
  );
}
