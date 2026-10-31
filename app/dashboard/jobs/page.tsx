'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function JobsPage() {
  const { jobs, toggleSaveJob, applyToJob } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [minMatch, setMinMatch] = useState(0);

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skillsRequired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'All' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesMode = selectedMode === 'All' || job.workMode === selectedMode;
    const matchesScore = job.matchScore >= minMatch;

    return matchesQuery && matchesLocation && matchesMode && matchesScore;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Search and Filters Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Resume-Matched Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ranked by profile match algorithms using your verified tech stack
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-slate-900">{filteredJobs.length}</strong> matching positions
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or technology (e.g. Next.js, Razorpay, TypeScript)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16C5A6] focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Location */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#16C5A6]"
          >
            <option value="All">All Locations</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Remote">Remote</option>
          </select>

          {/* Work Mode */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#16C5A6]"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Minimum Match */}
          <select
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#16C5A6]"
          >
            <option value="0">Any Match %</option>
            <option value="80">80%+ Match</option>
            <option value="85">85%+ Match</option>
            <option value="90">90%+ Top Match</option>
          </select>

          {(searchQuery || selectedLocation !== 'All' || selectedMode !== 'All' || minMatch > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedMode('All');
                setMinMatch(0);
              }}
              className="text-xs font-semibold text-[#8923DC] hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No matching jobs found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#16C5A6]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Column: Job Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                    {job.companyLogo || '🏢'}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="text-base font-bold text-slate-900 hover:text-[#0F2B5D] transition-colors"
                      >
                        {job.title}
                      </Link>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {job.workMode}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                      <span className="font-semibold text-slate-800">{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>Exp: {job.experienceRequired}</span>
                      <span>•</span>
                      <span className="text-slate-400">Posted {job.postedAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Match Reason snippet */}
                <p className="text-xs text-slate-600 leading-relaxed font-light pl-16">
                  {job.whyYouMatch}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pl-16">
                  {job.skillsMatched.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{s}</span>
                    </span>
                  ))}
                  {job.skillsMissing.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
                    >
                      Missing: {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Salary, Match Score & Actions */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-4 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-base sm:text-lg font-black text-slate-900 block">
                    {job.salaryRange}
                  </span>
                  <div className="flex items-center lg:justify-end gap-1.5 mt-0.5">
                    <span className="text-xs font-black text-[#0B6756] bg-[#16C5A6]/15 px-2 py-0.5 rounded-full border border-[#16C5A6]/30">
                      {job.matchScore}% Match
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      job.isSaved
                        ? 'bg-[#16C5A6]/15 text-[#0F766E] border-[#16C5A6]/30'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title="Save Job"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <Link
                    href={`/dashboard/jobs/${job.id}`}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => applyToJob(job.id)}
                    disabled={job.isApplied}
                    className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                      job.isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-[#0F2B5D] text-white hover:bg-[#133672]'
                    }`}
                  >
                    {job.isApplied ? 'Applied ✓' : 'Quick Apply'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
