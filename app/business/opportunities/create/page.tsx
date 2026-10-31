'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Trash2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { OpportunityType } from '@/lib/types';

export default function CreateOpportunityWizardPage() {
  const router = useRouter();
  const { state, createOpportunity } = useZaprillStore();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<OpportunityType>('internship');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [compensationText, setCompensationText] = useState('₹45,000 / month (Paid Internship)');
  const [stipendOrSalaryINR, setStipendOrSalaryINR] = useState(45000);
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Model unit economics and contribution margins\nAudit landlord lease escalation liabilities\nPrepare monthly investor and bank covenant reports'
  );

  // Skill Requirements
  const [requiredSkills, setRequiredSkills] = useState<
    Array<{ skillId: string; skillName: string; minimumScore: number; weightPct: number }>
  >([
    {
      skillId: 'skill-fin-excel',
      skillName: 'Advanced Excel & Financial Modeling',
      minimumScore: 75,
      weightPct: 50,
    },
    {
      skillId: 'skill-fin-analysis',
      skillName: 'Financial Analysis & Unit Economics',
      minimumScore: 70,
      weightPct: 50,
    },
  ]);

  const handleAddSkill = () => {
    const unselected = state.skills.find(
      (s) => !requiredSkills.some((rs) => rs.skillId === s.id)
    );
    if (unselected) {
      setRequiredSkills([
        ...requiredSkills,
        {
          skillId: unselected.id,
          skillName: unselected.name,
          minimumScore: 70,
          weightPct: 20,
        },
      ]);
    }
  };

  const handleRemoveSkill = (id: string) => {
    setRequiredSkills(requiredSkills.filter((rs) => rs.skillId !== id));
  };

  const handlePublish = () => {
    const responsibilities = responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    createOpportunity({
      title,
      type,
      location,
      workMode,
      compensationText,
      stipendOrSalaryINR,
      description,
      responsibilities,
      requiredSkills,
      preferredEvidenceTypes: ['Financial Model', 'Case Deck'],
      deadline: '2026-12-15',
    });

    router.push('/business/opportunities');
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link href="/business/opportunities" className="hover:text-indigo-600 transition-colors">
            ← Cancel & Return
          </Link>
          <span className="font-semibold text-slate-700">Multi-Step Opportunity Wizard</span>
        </div>

        {/* Wizard Stepper Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { step: 1, title: 'Basic Details' },
            { step: 2, title: 'Role Scope' },
            { step: 3, title: 'Skill Criteria' },
            { step: 4, title: 'Preview & Publish' },
          ].map((st) => (
            <div
              key={st.step}
              className={`p-3 rounded-xl border text-center transition-all ${
                currentStep === st.step
                  ? 'bg-indigo-50 border-indigo-400 font-bold text-indigo-900 ring-2 ring-indigo-500/20'
                  : currentStep > st.step
                  ? 'bg-teal-50 border-teal-200 text-teal-800 font-medium'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block font-mono">Step 0{st.step}</span>
              <span className="text-xs">{st.title}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="p-6 bg-white space-y-4 text-xs">
            <CardTitle className="text-base">Step 1: Role Type & Compensation</CardTitle>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Opportunity Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Financial Modeler & Coworking Analyst"
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Opportunity Type:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OpportunityType)}
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="job">Full-Time Job</option>
                  <option value="internship">Paid Internship</option>
                  <option value="project">Contract Project</option>
                  <option value="task">Paid Task</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Mode:</label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as any)}
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Andheri East, Mumbai"
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Compensation Text (INR):</label>
                <input
                  type="text"
                  value={compensationText}
                  onChange={(e) => setCompensationText(e.target.value)}
                  placeholder="e.g. ₹45,000 / month (Paid Internship)"
                  className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <CardFooter className="px-0 pb-0 pt-4 bg-transparent border-t flex justify-end">
              <Button
                variant="primary"
                size="md"
                disabled={!title}
                onClick={() => setCurrentStep(2)}
              >
                Next: Role Scope
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Description & Responsibilities */}
        {currentStep === 2 && (
          <Card className="p-6 bg-white space-y-4 text-xs">
            <CardTitle className="text-base">Step 2: Description & Responsibilities</CardTitle>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Role Description & Context:</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the commercial problem and what unit economics challenge the candidate will solve..."
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Key Responsibilities (One per line):</label>
              <textarea
                rows={5}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-4 bg-transparent border-t flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={!description}
                onClick={() => setCurrentStep(3)}
              >
                Next: Skill Criteria
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Required Skills & Weights */}
        {currentStep === 3 && (
          <Card className="p-6 bg-white space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Step 3: Capability Requirements & Weights</CardTitle>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Candidates will be matched based on these verified benchmark scores.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddSkill}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Skill
              </Button>
            </div>

            <div className="space-y-3">
              {requiredSkills.map((req, idx) => (
                <div
                  key={req.skillId}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-6">
                    <span className="font-semibold text-slate-900 block">{req.skillName}</span>
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] text-slate-400 block">Min Score:</label>
                    <input
                      type="number"
                      value={req.minimumScore}
                      onChange={(e) => {
                        const updated = [...requiredSkills];
                        updated[idx].minimumScore = Number(e.target.value);
                        setRequiredSkills(updated);
                      }}
                      className="w-full p-1 rounded border border-slate-300 font-mono text-xs"
                      min={40}
                      max={100}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-400 block">Weight %:</label>
                    <input
                      type="number"
                      value={req.weightPct}
                      onChange={(e) => {
                        const updated = [...requiredSkills];
                        updated[idx].weightPct = Number(e.target.value);
                        setRequiredSkills(updated);
                      }}
                      className="w-full p-1 rounded border border-slate-300 font-mono text-xs"
                      min={10}
                      max={100}
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleRemoveSkill(req.skillId)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <CardFooter className="px-0 pb-0 pt-4 bg-transparent border-t flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="primary" size="md" onClick={() => setCurrentStep(4)}>
                Next: Preview & Publish
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Preview & Publish */}
        {currentStep === 4 && (
          <Card className="p-6 bg-white space-y-6 text-xs">
            <CardTitle className="text-base">Step 4: Preview & Publish Locally</CardTitle>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="indigo" size="sm" className="capitalize">
                    {type}
                  </Badge>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{location} ({workMode})</span>
                    <span>•</span>
                    <span className="font-bold text-indigo-700 font-mono">{compensationText}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">{description}</p>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Key Responsibilities:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {responsibilitiesText
                    .split('\n')
                    .filter(Boolean)
                    .map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Required Competencies:</span>
                <div className="flex flex-wrap gap-2">
                  {requiredSkills.map((s) => (
                    <span
                      key={s.skillId}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-medium"
                    >
                      {s.skillName} (Min: {s.minimumScore} | Weight: {s.weightPct}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pb-0 pt-4 bg-transparent border-t flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="teal" size="lg" onClick={handlePublish}>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Publish Opportunity to Talent Feed
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
