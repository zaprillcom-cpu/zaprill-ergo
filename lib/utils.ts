import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CapabilityLevel, DimensionScores, DimensionPercentages, TalentProfile, Opportunity } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers into Indian Rupee strings: e.g. ₹45,000 or ₹12,50,000
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount}`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Normalises 5 dimension raw points to percentage representations:
 * Understanding: raw / 20 * 100
 * Application: raw / 30 * 100
 * Reasoning: raw / 20 * 100
 * ErrorDetection: raw / 15 * 100
 * Transfer: raw / 15 * 100
 */
export function normalizeDimensionPercentages(raw: DimensionScores): DimensionPercentages {
  return {
    understanding: Math.round((raw.understanding / 20) * 100),
    application: Math.round((raw.application / 30) * 100),
    reasoning: Math.round((raw.reasoning / 20) * 100),
    errorDetection: Math.round((raw.errorDetection / 15) * 100),
    transfer: Math.round((raw.transfer / 15) * 100),
  };
}

/**
 * Total score is strictly calculated from sum of earned points, not unweighted average of percentages.
 */
export function calculateTotalScore(raw: DimensionScores): number {
  return (
    Number(raw.understanding || 0) +
    Number(raw.application || 0) +
    Number(raw.reasoning || 0) +
    Number(raw.errorDetection || 0) +
    Number(raw.transfer || 0)
  );
}

/**
 * Transparent illustrative formula for matching Talent to Opportunity:
 * - 70% Skills match (weighted by required skill minimums and talent demonstrated scores)
 * - 30% Supporting Evidence match
 */
export function calculateOpportunityMatch(
  talent: TalentProfile,
  opportunity: Opportunity,
  evidenceCountForSkill: number = 2
): {
  matchScore: number;
  skillsMatchPct: number;
  evidenceMatchPct: number;
  matchedSkills: string[];
  missingEvidence: string[];
  suggestions: string;
} {
  const matchedSkills: string[] = [];
  const missingEvidence: string[] = [];
  let totalSkillScore = 0;

  for (const req of opportunity.requiredSkills) {
    const talentSkill = talent.skills.find((s) => s.skillId === req.skillId || s.name.toLowerCase() === req.skillName.toLowerCase());
    if (talentSkill) {
      if (talentSkill.score >= req.minimumScore) {
        matchedSkills.push(req.skillName);
        totalSkillScore += 100 * (req.weightPct / 100);
      } else {
        const partial = (talentSkill.score / req.minimumScore) * 100;
        totalSkillScore += partial * (req.weightPct / 100);
      }
    } else {
      // not demonstrated
      totalSkillScore += 0;
    }
  }

  const skillsMatchPct = Math.min(100, Math.round(totalSkillScore));

  // Evidence evaluation: Check preferred evidence types against talent evidence
  const hasDemonstratedEvidence = evidenceCountForSkill > 0;
  const evidenceMatchPct = hasDemonstratedEvidence ? 92 : 45;

  if (!hasDemonstratedEvidence) {
    missingEvidence.push('Verified Coworking or Unit-Economics Financial Model');
  }

  // Combined score: 70% skills + 30% evidence
  const matchScore = Math.round(skillsMatchPct * 0.7 + evidenceMatchPct * 0.3);

  let suggestions = '';
  if (matchScore >= 85) {
    suggestions = 'Exceptional alignment. Evidence directly addresses the core operational modeling challenges.';
  } else if (matchScore >= 70) {
    suggestions = 'Strong match. Consider attaching a verified spreadsheet model to showcase unit economic reasoning.';
  } else {
    suggestions = 'Developing match. Take the practical assessment to upgrade self-declared capabilities to verified status.';
  }

  return {
    matchScore,
    skillsMatchPct,
    evidenceMatchPct,
    matchedSkills,
    missingEvidence,
    suggestions,
  };
}

export function getCapabilityLevelBadge(level: CapabilityLevel): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (level) {
    case 'business_confirmed':
      return {
        label: 'Business-Confirmed',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    case 'expert_reviewed':
      return {
        label: 'Expert-Reviewed',
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        dotClass: 'bg-indigo-500',
      };
    case 'assessment_demonstrated':
      return {
        label: 'Assessment-Demonstrated',
        badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
        dotClass: 'bg-teal-500',
      };
    case 'self_declared':
    default:
      return {
        label: 'Self-Declared',
        badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
        dotClass: 'bg-slate-400',
      };
  }
}

/**
 * Export table data to CSV file client-side
 */
export function exportToCSV(
  arg1: string | Record<string, any>[],
  arg2?: string | Record<string, any>[]
) {
  let filename = 'export';
  let rows: Record<string, any>[] = [];

  if (typeof arg1 === 'string') {
    filename = arg1;
    rows = (arg2 as Record<string, any>[]) || [];
  } else if (Array.isArray(arg1)) {
    rows = arg1;
    filename = (arg2 as string) || 'export';
  }

  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          let val = row[header];
          if (val === null || val === undefined) val = '';
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
