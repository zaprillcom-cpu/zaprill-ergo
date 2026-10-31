'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Upload,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Download,
  Plus,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { useZaprillStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function TalentEvidencePage() {
  const { state, toggleEvidenceVisibility, addEvidence } = useZaprillStore();
  const talent = state.talent[0]; // Aarav Mehta
  const evidenceList = state.evidence.filter((e) => e.talentId === talent.id);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('Financial Model');
  const [newDesc, setNewDesc] = useState('');
  const [newSkillId, setNewSkillId] = useState(talent.skills[0]?.skillId || '');
  const [newMetrics, setNewMetrics] = useState('');
  const [fileName, setFileName] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = state.skills.find((s) => s.id === newSkillId);
    addEvidence({
      title: newTitle,
      type: newType,
      description: newDesc,
      associatedSkillId: newSkillId,
      associatedSkillName: skill?.name || 'Financial Analysis',
      fileName: fileName || `${newTitle.replace(/\s+/g, '_')}.xlsx`,
      metricsHighlighted: newMetrics || 'Reconciled unit economics & margin output.',
      isPubliclyVisible: true,
    });
    setUploadModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewMetrics('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Verified Evidence Vault</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tangible work artifacts (spreadsheet models, SQL schemas, code repos) that back your Capability Passport.
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setUploadModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Upload Work Artifact
          </Button>
        </div>

        {/* Privacy Control Advisory Notice */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900">Evidence Privacy & Sharing Controls:</span>
            <p className="text-[11px] leading-relaxed">
              Use the eye toggle to mark artifacts as Public (visible on your public demo passport) or Private. Note: In
              this prototype, visibility filtering is executed client-side via local storage state rather than
              production-grade cryptographic ACLs.
            </p>
          </div>
        </div>

        {/* Evidence List */}
        <div className="space-y-4">
          {evidenceList.map((evi) => (
            <Card key={evi.id} className="p-5 bg-white border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{evi.title}</h3>
                    <Badge variant="indigo" size="sm">
                      {evi.type}
                    </Badge>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        evi.status === 'verified_with_assessment'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : evi.status === 'expert_endorsed'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {evi.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{evi.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 mt-2">
                    <span className="font-semibold text-teal-700">⚡ {evi.metricsHighlighted}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-400">File: {evi.fileName}</span>
                    <span>•</span>
                    <span>Created: {formatDate(evi.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <button
                  onClick={() => toggleEvidenceVisibility(evi.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    evi.isPubliclyVisible
                      ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                  }`}
                  title={evi.isPubliclyVisible ? 'Publicly visible' : 'Private'}
                >
                  {evi.isPubliclyVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{evi.isPubliclyVisible ? 'Public' : 'Private'}</span>
                </button>

                <Button variant="outline" size="sm">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Inspect Artifact
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Artifact Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Work Artifact to Evidence Vault"
        description="Attach a spreadsheet model, SQL schema, or case deck demonstrating practical execution."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleUploadSubmit}>
              Save to Evidence Vault
            </Button>
          </>
        }
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Artifact Title:</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Andheri East Unit Economics Sensitivity Model"
              className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Artifact Type:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Financial Model">Financial Model</option>
                <option value="SQL Query & Schema">SQL Query & Schema</option>
                <option value="Code Repository">Code Repository</option>
                <option value="Product Spec">Product Spec</option>
                <option value="Case Deck">Case Deck</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Associated Skill:</label>
              <select
                value={newSkillId}
                onChange={(e) => setNewSkillId(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {talent.skills.map((s) => (
                  <option key={s.skillId} value={s.skillId}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Key Metrics Proven:</label>
            <input
              type="text"
              value={newMetrics}
              onChange={(e) => setNewMetrics(e.target.value)}
              placeholder="e.g. 21.5% EBITDA margin, ₹7.67 Lakhs monthly net cash flow"
              className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description & Methodology:</label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Explain formulas used, data source, and sensitivity scenarios modeled..."
              className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Simulated File Attachment:</label>
            <input
              type="file"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Note: Files are held in client state for prototype demonstration and survive page refresh.
            </p>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
