export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  location: string;
  targetRole: string;
  yearsExperience: number;
  currentSalary: number;
  targetSalary: number;
  phone?: string;
  education?: string;
  bio?: string;
}

export interface CareerHealthFactor {
  label: string;
  score: number;
  category: string;
  feedback: string;
  status: 'good' | 'average' | 'needs-focus';
}

export interface CareerHealthRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  effort: 'Quick Win' | 'Medium' | 'Comprehensive';
  impact: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface CareerHealthData {
  overallScore: number;
  previousScore: number;
  scoreCategory: string;
  lastUpdated: string;
  factors: CareerHealthFactor[];
  historicalTrends: { month: string; score: number }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: CareerHealthRecommendation[];
}

export interface MarketValueData {
  role: string;
  location: string;
  experienceYears: number;
  currentSalary: number; // e.g. 650000 (₹6.5L)
  marketAverage: number; // e.g. 820000 (₹8.2L)
  potentialSalary: number; // e.g. 1150000 (₹11.5L)
  percentile: number; // 45th percentile
  confidenceScore: number; // 92%
  salaryBand: { min: number; max: number };
  experienceTiers: { tier: string; experience: string; salary: number; isUserTier?: boolean }[];
  locationComparisons: { city: string; avgSalary: number; differencePercent: number }[];
  skillImpactMultipliers: { skill: string; additionalValueAnnual: number; demandLevel: 'Very High' | 'High' | 'Moderate' }[];
}

export interface ResumeData {
  fileName: string;
  fileSize: string;
  lastParsed: string;
  overallAtsScore: number;
  readabilityScore: number;
  impactScore: number;
  brevityScore: number;
  extractedName: string;
  extractedTitle: string;
  extractedYearsExp: number;
  extractedSkills: string[];
  missingKeywords: string[];
  strengths: string[];
  criticalIssues: string[];
  extractedExperience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  extractedEducation: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salaryRange: string;
  minSalaryAnnual: number;
  maxSalaryAnnual: number;
  experienceRequired: string;
  postedAgo: string;
  matchScore: number;
  matchBreakdown: {
    technicalSkills: number;
    experience: number;
    roleRelevance: number;
  };
  skillsRequired: string[];
  skillsMatched: string[];
  skillsMissing: string[];
  description: string;
  responsibilities: string[];
  whyYouMatch: string;
  isSaved?: boolean;
  isApplied?: boolean;
}

export interface SkillGapItem {
  id: string;
  name: string;
  category: 'Technical' | 'Tools & Platforms' | 'Communication' | 'Problem Solving' | 'Industry Knowledge';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'Learning' | 'Practising' | 'Completed';
  learningEffort: string;
  salaryImpact: string;
  courseRecommendation: string;
  description: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface AssessmentModule {
  id: string;
  title: string;
  category: string;
  description: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsCount: number;
  lastScore?: number;
  isCompleted?: boolean;
  questions: AssessmentQuestion[];
}

export interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  isLiveAI?: boolean;
  model?: string;
  webSources?: Array<{ title: string; url: string; snippet?: string }>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'health' | 'job' | 'skill' | 'coach';
}
