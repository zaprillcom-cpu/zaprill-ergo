'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  PlusCircle,
  Search,
  CheckCircle2,
  FileCheck2,
  Users,
  Compass,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { useZaprillStore } from '@/lib/store';
import { SkillCategory } from '@/lib/types';

export default function AdminTaxonomyPage() {
  const { state } = useZaprillStore();
  const [skills, setSkills] = useState(state.skills);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<SkillCategory>('Finance');
  const [newDesc, setNewDesc] = useState('');
  const [newSubskills, setNewSubskills] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const filteredSkills = skills.filter((s) => {
    const matchDomain = selectedDomain === 'All' || s.category === selectedDomain;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchDomain && matchSearch;
  });

  const domains = ['All', 'Finance', 'Data', 'Engineering', 'Operations', 'Product'];

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `skill-${Date.now()}`,
      name: newTitle,
      category: newDomain,
      description: newDesc,
      subskills: newSubskills.split(',').map((s) => s.trim()).filter(Boolean),
      benchmarks: { junior: 60, mid: 75, senior: 88 },
    };

    setSkills([created, ...skills]);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      setModalOpen(false);
      setNewTitle('');
      setNewDesc('');
      setNewSubskills('');
    }, 1500);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Competency & Skill Taxonomy</h1>
            <p className="text-sm text-slate-500 mt-1">
              Curate standardized capability definitions, rubrics, and diagnostic criteria across all industry domains.
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Competency
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills, subskills, or descriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    Domain: {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="p-5 border-slate-200 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="teal" className="text-[10px] uppercase font-bold">
                    {skill.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400">ID: {skill.id}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{skill.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{skill.description}</p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                    Evaluated Subskills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skill.subskills?.map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Senior Benchmark: <strong>{skill.benchmarks?.senior || 88} pts</strong></span>
                <span className="text-indigo-600 font-semibold">Active in Catalog</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Create Competency */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add New Standardized Competency"
          description="Register a new skill into the Zaprill taxonomy for automated and expert assessments."
        >
          <form onSubmit={handleCreateSkill} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Competency Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Consensus & Blockchain Protocols"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Domain</label>
              <select
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value as SkillCategory)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Finance">Finance</option>
                <option value="Data">Data</option>
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Product">Product</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Description & Scope</label>
              <textarea
                rows={3}
                required
                placeholder="Defines practical execution standards for this competency..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subskills (Comma-separated)</label>
              <input
                type="text"
                placeholder="Subskill 1, Subskill 2, Subskill 3"
                value={newSubskills}
                onChange={(e) => setNewSubskills(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {successToast && (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Competency successfully added to global taxonomy!
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Competency
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
