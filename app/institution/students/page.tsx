'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Download,
  GraduationCap,
  ArrowUpDown,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZaprillStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';

export default function InstitutionStudentsPage() {
  const { state } = useZaprillStore();
  const students = state.cohortStudents;

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'name'>('score-desc');

  const filteredStudents = students
    .filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        s.primarySkill.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'All' || s.department === selectedDept;
      const matchStatus = selectedStatus === 'All' || s.status === selectedStatus;
      return matchSearch && matchDept && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'score-desc') return b.capabilityScore - a.capabilityScore;
      if (sortBy === 'score-asc') return a.capabilityScore - b.capabilityScore;
      return a.name.localeCompare(b.name);
    });

  const handleExportCSV = () => {
    exportToCSV(
      filteredStudents.map((s) => ({
        RollNo: s.rollNo,
        Name: s.name,
        Department: s.department,
        Semester: s.semester,
        CGPA: s.cgpa,
        PrimarySkill: s.primarySkill,
        CapabilityScore: s.capabilityScore,
        PlacementStatus: s.status,
        EligibleOpportunities: s.targetOpportunitiesCount,
      })),
      'Apex_Institute_Student_Directory'
    );
  };

  const departments = ['All', 'Computer Science', 'Data Analytics', 'Finance & Commerce', 'Operations & Logistics'];
  const statuses = ['All', 'Ready for Placement', 'In Training', 'Assessment Pending'];

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Capability Directory</h1>
            <p className="text-sm text-slate-500 mt-1">
              Class of 2026 — 40 registered students evaluated across practical competency rubrics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs border-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              Export Directory (CSV)
            </Button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <Card className="p-4 border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, roll no, or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Department */}
            <div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    Dept: {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    Status: {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="score-desc">Sort: Highest Capability Score</option>
                <option value="score-asc">Sort: Lowest Capability Score</option>
                <option value="name">Sort: Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Directory Table */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Showing {filteredStudents.length} of {students.length} students
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">CGPA</th>
                    <th className="py-3 px-4">Core Skill</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Placement Status</th>
                    <th className="py-3 px-4">Matches</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                            {student.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <Link
                              href={`/institution/students/${student.id}`}
                              className="font-bold text-slate-900 hover:text-indigo-600"
                            >
                              {student.name}
                            </Link>
                            <span className="text-[10px] text-slate-400 block">Sem {student.semester}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{student.rollNo}</td>
                      <td className="py-3 px-4 text-slate-600">{student.department}</td>
                      <td className="py-3 px-4 font-mono font-medium">{student.cgpa}</td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-medium text-slate-800 line-clamp-1">
                          {student.primarySkill}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                            student.capabilityScore >= 80
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : student.capabilityScore >= 70
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {student.capabilityScore} / 100
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {student.status === 'Ready for Placement' ? (
                          <Badge variant="teal" className="text-[10px]">Ready</Badge>
                        ) : student.status === 'In Training' ? (
                          <Badge variant="warning" className="text-[10px]">Training</Badge>
                        ) : (
                          <Badge variant="neutral" className="text-[10px]">Pending</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-indigo-600">
                        {student.targetOpportunitiesCount} jobs
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/institution/students/${student.id}`}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          Profile <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
