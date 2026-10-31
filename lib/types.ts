export type Role = 'talent' | 'business' | 'expert' | 'institution' | 'admin';

export type CapabilityLevel = 
  | 'self_declared' 
  | 'assessment_demonstrated' 
  | 'expert_reviewed' 
  | 'business_confirmed';

export type OpportunityType = 'job' | 'internship' | 'project' | 'task';

export type ApplicationStage = 
  | 'applied' 
  | 'screening' 
  | 'assessment_verified' 
  | 'shortlisted' 
  | 'interview' 
  | 'offered' 
  | 'rejected' 
  | 'withdrawn';

export interface DimensionScores {
  understanding: number;   // 0-20
  application: number;     // 0-30
  reasoning: number;       // 0-20
  errorDetection: number;  // 0-15
  transfer: number;        // 0-15
}

export interface DimensionPercentages {
  understanding: number;   // 0-100%
  application: number;     // 0-100%
  reasoning: number;       // 0-100%
  errorDetection: number;  // 0-100%
  transfer: number;        // 0-100%
}

export type SkillCategory = 'Finance' | 'Data & Analytics' | 'Software Engineering' | 'Growth & Marketing' | 'Operations' | 'Data' | 'Engineering' | 'Product';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  subskills: string[];
  benchmarks: {
    junior: number;
    mid: number;
    senior: number;
  };
}

export interface TalentSkill {
  skillId: string;
  name: string;
  category: string;
  level: CapabilityLevel;
  score: number; // 0-100
  dimensions?: DimensionPercentages;
  lastDemonstrated: string;
  evidenceCount: number;
  verifiedBy?: string;
  verificationDate?: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  education: {
    institution: string;
    degree: string;
    year: string;
    isSelfTaught?: boolean;
    class12Only?: boolean;
  };
  experienceYears: number;
  desiredRoles: string[];
  availability: 'Immediate' | '2 Weeks' | '1 Month' | 'Open to Freelance';
  hourlyRateINR?: number;
  expectedSalaryINR?: number;
  skills: TalentSkill[];
  overallCapabilityScore: number; // 0-100
  knowledgeMastery: number; // 0-100
  appliedCapability: number; // 0-100
  endorsementsCount: number;
  shareEvidencePublicly: boolean;
  publicSlug: string;
  slug?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  description: string;
  isVerified: boolean;
  verificationBadgeDate?: string;
  contactPerson: {
    name: string;
    role: string;
    email: string;
  };
  billingPlan: 'Starter' | 'Growth' | 'Enterprise';
  activeOpportunitiesCount: number;
}

export interface ExpertProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  domain: string;
  organization: string;
  experienceYears: number;
  isApproved: boolean;
  accreditationNumber: string;
  calibrationScore: number; // e.g. 96.4%
  reviewsCompleted: number;
  totalEarnedINR: number;
  hourlyRateINR: number;
  bio: string;
  evaluationsCompleted?: number;
  rating?: number;
  hourlyRate?: number;
  specialties?: string[];
}

export interface InstitutionProfile {
  id: string;
  name: string;
  code: string;
  type: 'University' | 'Polytechnic' | 'Autonomous College' | 'Bootcamp';
  location: string;
  totalStudents: number;
  activeCampaigns: number;
  cohortCount?: number;
  contactPerson: {
    name: string;
    role: string;
    email: string;
  };
}

export interface AssessmentStageQuestion {
  id: string;
  title: string;
  stageName: 'Understanding' | 'Application' | 'Reasoning' | 'Error Detection' | 'Transfer';
  maxPoints: number;
  instruction: string;
  contextData?: any;
  inputPlaceholder?: string;
  sampleAnswer?: string;
  rubricHints?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  skillId: string;
  skillName: string;
  category: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Master';
  durationMinutes: number;
  totalPoints: 100;
  description: string;
  scenario: string;
  stages: AssessmentStageQuestion[];
  isPublished: boolean;
  authorType: 'Zaprill Curated' | 'Enterprise Custom';
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  talentId: string;
  talentName: string;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'submitted' | 'ai_evaluated' | 'pending_expert_review' | 'expert_reviewed';
  answers: {
    stage1Understanding: string;
    stage2ApplicationModel: any;
    stage3Reasoning: string;
    stage4ErrorDetection: string;
    stage5Transfer: string;
  };
  dimensionScores: DimensionScores; // raw points: 20, 30, 20, 15, 15 = 100
  totalScore: number; // 0-100
  strengths: string[];
  improvementAreas: string[];
  evaluationSource: 'simulated_ai' | 'expert_reviewed' | 'combined';
  evaluationDate: string;
  version: string;
  suggestedNextChallenge: string;
  expertReviewId?: string;
  linkedEvidenceId?: string;
}

export interface SimulationDataset {
  locations: Array<{
    name: string;
    city: string;
    totalDesks: number;
    currentOccupancyPct: number;
    avgDeskPriceINR: number;
    monthlyRentINR: number;
    staffPayrollINR: number;
    utilitiesMaintenanceINR: number;
  }>;
  assumptions: {
    targetOccupancyPct: number;
    deskPriceInflationPct: number;
    utilityInflationPct: number;
    communityEventsBudgetINR: number;
  };
}

export interface Simulation {
  id: string;
  title: string;
  domain: string;
  companyName: string;
  brief: string;
  objectives: string[];
  dataset: SimulationDataset;
  deliverables: string[];
  sampleSolutionSummary: string;
  followUpQuestion: string;
}

export interface EvidenceRecord {
  id: string;
  talentId: string;
  title: string;
  type: 'Financial Model' | 'SQL Query & Schema' | 'Code Repository' | 'Product Spec' | 'Live Deployment' | 'Case Deck';
  description: string;
  associatedSkillId: string;
  associatedSkillName: string;
  fileUrl?: string;
  fileName?: string;
  metricsHighlighted: string;
  isPubliclyVisible: boolean;
  status: 'self_uploaded' | 'verified_with_assessment' | 'expert_endorsed';
  createdAt: string;
}

export interface ProjectRecord {
  id: string;
  talentId: string;
  businessId?: string;
  businessName?: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  deliverables: string[];
  milestones: Array<{
    title: string;
    completed: boolean;
    date: string;
  }>;
  clientFeedback?: {
    rating: number;
    quote: string;
    reviewer: string;
    date: string;
  };
  evidenceIds: string[];
}

export interface Opportunity {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  title: string;
  type: OpportunityType;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  compensationText: string; // e.g. "₹45,000 / month (Internship stipend)"
  stipendOrSalaryINR: number;
  stipendOrSalary?: number;
  description: string;
  responsibilities: string[];
  requiredSkills: Array<{
    skillId: string;
    skillName: string;
    minimumScore: number;
    weightPct: number;
  }>;
  preferredEvidenceTypes: string[];
  postedAt: string;
  deadline: string;
  applicantsCount: number;
  status: 'active' | 'closed' | 'draft';
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  businessId: string;
  businessName: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  appliedDate: string;
  currentStage: ApplicationStage;
  matchScore: number; // 0-100%
  matchBreakdown: {
    skillsMatchPct: number;
    evidenceMatchPct: number;
    matchedSkills: string[];
    missingEvidence: string[];
    suggestions: string;
  };
  timeline: Array<{
    stage: ApplicationStage;
    timestamp: string;
    note?: string;
  }>;
  candidateNotes?: string;
  businessNotes?: string;
}

export interface ExpertReviewRecord {
  id: string;
  expertId: string;
  expertName: string;
  talentId: string;
  talentName: string;
  attemptId: string;
  assessmentTitle: string;
  requestedAt: string;
  submittedAt?: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  coiDeclared: boolean;
  scores?: DimensionScores;
  totalScore?: number;
  qualitativeComments?: {
    methodology: string;
    analyticalDepth: string;
    commercialInsight: string;
    areasForGrowth: string;
  };
  completedAt?: string;
  feeINR: number;
}

export interface Endorsement {
  id: string;
  talentId: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  relationship: 'Manager' | 'Mentor' | 'Client' | 'Peer Reviewer';
  skillId: string;
  skillName: string;
  content: string;
  date: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderRole: Role;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  role: Role;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface CohortStudent {
  id: string;
  institutionId: string;
  name: string;
  rollNo: string;
  department: string;
  semester: number;
  cgpa: number;
  primarySkill: string;
  capabilityScore: number;
  status: 'Ready for Placement' | 'In Training' | 'Assessment Pending';
  targetOpportunitiesCount: number;
}

export interface InstitutionCampaign {
  id: string;
  institutionId: string;
  name: string;
  assessmentId: string;
  assessmentTitle: string;
  cohort: string;
  enrolledStudentsCount: number;
  completedCount: number;
  avgScore: number;
  status: 'Active' | 'Scheduled' | 'Completed';
  startDate: string;
  endDate: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'talent' | 'skill' | 'knowledge' | 'assessment' | 'evidence' | 'opportunity';
  category?: string;
  score?: number;
  status?: string;
  details?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'possesses' | 'validates' | 'supports' | 'requires' | 'evaluates';
  status: string;
}
