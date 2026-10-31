'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Role,
  TalentProfile,
  BusinessProfile,
  ExpertProfile,
  InstitutionProfile,
  Skill,
  Assessment,
  AssessmentAttempt,
  Simulation,
  Opportunity,
  Application,
  ExpertReviewRecord,
  EvidenceRecord,
  ProjectRecord,
  Endorsement,
  Message,
  NotificationItem,
  CohortStudent,
  InstitutionCampaign,
  GraphNode,
  GraphEdge,
  DimensionScores,
  ApplicationStage,
} from './types';
import {
  INITIAL_SKILLS,
  INITIAL_TALENT,
  INITIAL_BUSINESSES,
  INITIAL_EXPERTS,
  INITIAL_INSTITUTIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_SIMULATIONS,
  INITIAL_OPPORTUNITIES,
  INITIAL_ATTEMPTS,
  INITIAL_APPLICATIONS,
  INITIAL_EXPERT_REVIEWS,
  INITIAL_EVIDENCE,
  INITIAL_PROJECTS,
  INITIAL_ENDORSEMENTS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_COHORT_STUDENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_GRAPH_NODES,
  INITIAL_GRAPH_EDGES,
} from './mock-data';
import { calculateTotalScore, normalizeDimensionPercentages, calculateOpportunityMatch } from './utils';

const STORAGE_KEY = 'zaprill_prototype_state_v1.0';

export interface ZaprillState {
  currentRole: Role;
  skills: Skill[];
  talent: TalentProfile[];
  businesses: BusinessProfile[];
  experts: ExpertProfile[];
  institutions: InstitutionProfile[];
  assessments: Assessment[];
  simulations: Simulation[];
  opportunities: Opportunity[];
  attempts: AssessmentAttempt[];
  applications: Application[];
  expertReviews: ExpertReviewRecord[];
  evidence: EvidenceRecord[];
  projects: ProjectRecord[];
  endorsements: Endorsement[];
  messages: Message[];
  notifications: NotificationItem[];
  cohortStudents: CohortStudent[];
  campaigns: InstitutionCampaign[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
}

function getInitialState(): ZaprillState {
  return {
    currentRole: 'talent',
    skills: INITIAL_SKILLS,
    talent: INITIAL_TALENT,
    businesses: INITIAL_BUSINESSES,
    experts: INITIAL_EXPERTS,
    institutions: INITIAL_INSTITUTIONS,
    assessments: INITIAL_ASSESSMENTS,
    simulations: INITIAL_SIMULATIONS,
    opportunities: INITIAL_OPPORTUNITIES,
    attempts: INITIAL_ATTEMPTS,
    applications: INITIAL_APPLICATIONS,
    expertReviews: INITIAL_EXPERT_REVIEWS,
    evidence: INITIAL_EVIDENCE,
    projects: INITIAL_PROJECTS,
    endorsements: INITIAL_ENDORSEMENTS,
    messages: INITIAL_MESSAGES,
    notifications: INITIAL_NOTIFICATIONS,
    cohortStudents: INITIAL_COHORT_STUDENTS,
    campaigns: INITIAL_CAMPAIGNS,
    graphNodes: INITIAL_GRAPH_NODES,
    graphEdges: INITIAL_GRAPH_EDGES,
  };
}

// Global in-memory cache to sync components within the same session
let memoryState: ZaprillState = getInitialState();
const listeners = new Set<(state: ZaprillState) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener(memoryState));
}

function saveStateToStorage(state: ZaprillState) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }
}

function loadStateFromStorage(): ZaprillState {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse state from localStorage, falling back to seed:', e);
    }
  }
  return getInitialState();
}

// Initialise memory state from storage once on client
if (typeof window !== 'undefined') {
  memoryState = loadStateFromStorage();
}

export function useZaprillStore() {
  const [state, setState] = useState<ZaprillState>(memoryState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with memory state on mount
    setState(memoryState);

    const handler = (newState: ZaprillState) => {
      setState(newState);
    };
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const updateState = useCallback((updater: (prev: ZaprillState) => ZaprillState) => {
    const next = updater(memoryState);
    memoryState = next;
    saveStateToStorage(next);
    notifyListeners();
  }, []);

  // 1. Role Switching
  const setRole = useCallback((role: Role) => {
    updateState((prev) => ({
      ...prev,
      currentRole: role,
    }));
  }, [updateState]);

  // 2. Reset Demo
  const resetDemoData = useCallback(() => {
    const fresh = getInitialState();
    memoryState = fresh;
    saveStateToStorage(fresh);
    notifyListeners();
  }, []);

  // 3. Assessment Attempt Submission
  const submitAssessmentAttempt = useCallback(
    (
      assessmentId: string,
      answers: {
        stage1Understanding: string;
        stage2ApplicationModel: any;
        stage3Reasoning: string;
        stage4ErrorDetection: string;
        stage5Transfer: string;
      },
      scores?: DimensionScores
    ) => {
      const currentTalent = memoryState.talent[0]; // Aarav Mehta
      const assessment = memoryState.assessments.find((a) => a.id === assessmentId);
      if (!assessment) return;

      const rawScores: DimensionScores = scores || {
        understanding: 18,
        application: 24,
        reasoning: 16,
        errorDetection: 12,
        transfer: 12,
      };

      const totalScore = calculateTotalScore(rawScores); // 82
      const dimensionPct = normalizeDimensionPercentages(rawScores);

      const newAttemptId = `attempt-${Date.now()}`;
      const newAttempt: AssessmentAttempt = {
        id: newAttemptId,
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        talentId: currentTalent.id,
        talentName: currentTalent.name,
        startedAt: new Date(Date.now() - 40 * 60000).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'ai_evaluated',
        answers,
        dimensionScores: rawScores,
        totalScore,
        strengths: [
          'Strong practical understanding of flexible workspace unit economics and OpEx allocations.',
          'Solid calculation of monthly break-even occupancy desks across multiple Indian hubs.',
          'Prudent refusal to join unsustainable price wars that destroy contribution margin.',
        ],
        improvementAreas: [
          'Incorporate peak hour HVAC electricity tariff penalties into lease sensitivity models.',
          'Consider modeling bad debt reserves for Tier-2 tenant collections.',
        ],
        evaluationSource: 'simulated_ai',
        evaluationDate: new Date().toISOString().split('T')[0],
        version: 'v2.1',
        suggestedNextChallenge: 'Multi-Asset Real Estate Portfolio Waterfall Distribution & IRR Simulation',
      };

      updateState((prev) => {
        // Update talent skill score & level
        const updatedSkills = prev.talent[0].skills.map((s) => {
          if (s.skillId === assessment.skillId) {
            return {
              ...s,
              level: 'assessment_demonstrated' as const,
              score: Math.max(s.score, totalScore),
              dimensions: dimensionPct,
              lastDemonstrated: new Date().toISOString().split('T')[0],
              verifiedBy: 'Zaprill Simulated AI Evaluation',
              verificationDate: new Date().toISOString().split('T')[0],
            };
          }
          return s;
        });

        const updatedTalent = prev.talent.map((t, idx) =>
          idx === 0
            ? {
                ...t,
                skills: updatedSkills,
                appliedCapability: Math.round((t.appliedCapability + totalScore) / 2),
              }
            : t
        );

        return {
          ...prev,
          attempts: [newAttempt, ...prev.attempts.filter((a) => a.id !== newAttemptId)],
          talent: updatedTalent,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: currentTalent.id,
              role: 'talent',
              title: 'Assessment Attempt Evaluated',
              description: `Your ${assessment.title} earned ${totalScore}/100 points (Simulated AI).`,
              timestamp: new Date().toISOString(),
              read: false,
              actionUrl: `/talent/assessments/${assessment.id}/results`,
            },
            ...prev.notifications,
          ],
        };
      });

      return newAttempt;
    },
    [updateState]
  );

  // 4. Request Expert Review
  const requestExpertReview = useCallback(
    (attemptId: string) => {
      const attempt = memoryState.attempts.find((a) => a.id === attemptId);
      if (!attempt) return;
      const currentTalent = memoryState.talent[0];
      const expert = memoryState.experts[0]; // Dr. Vikram Sen

      const reviewId = `asg-review-${Date.now()}`;
      const newReview: ExpertReviewRecord = {
        id: reviewId,
        expertId: expert.id,
        expertName: expert.name,
        talentId: currentTalent.id,
        talentName: currentTalent.name,
        attemptId: attempt.id,
        assessmentTitle: attempt.assessmentTitle,
        requestedAt: new Date().toISOString(),
        status: 'pending',
        coiDeclared: false,
        feeINR: 4000,
      };

      updateState((prev) => ({
        ...prev,
        attempts: prev.attempts.map((a) =>
          a.id === attemptId
            ? { ...a, status: 'pending_expert_review', expertReviewId: reviewId }
            : a
        ),
        expertReviews: [newReview, ...prev.expertReviews],
        notifications: [
          {
            id: `notif-${Date.now()}-1`,
            userId: currentTalent.id,
            role: 'talent',
            title: 'Expert Review Requested',
            description: `Review dispatched to ${expert.name}. Status is Pending Review.`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: '/talent/validation',
          },
          {
            id: `notif-${Date.now()}-2`,
            userId: expert.id,
            role: 'expert',
            title: 'New Evaluation Assignment',
            description: `${currentTalent.name} requested review for ${attempt.assessmentTitle}.`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: `/expert/assignments/${reviewId}`,
          },
          ...prev.notifications,
        ],
      }));
    },
    [updateState]
  );

  // 5. Submit Expert Review (Expert flow)
  const submitExpertReview = useCallback(
    (
      reviewId: string,
      scores: DimensionScores,
      qualitative: {
        methodology: string;
        analyticalDepth: string;
        commercialInsight: string;
        areasForGrowth: string;
      }
    ) => {
      const review = memoryState.expertReviews.find((r) => r.id === reviewId);
      if (!review) return;

      const totalScore = calculateTotalScore(scores);
      const dimensionPct = normalizeDimensionPercentages(scores);

      updateState((prev) => {
        // Update review record
        const updatedReviews = prev.expertReviews.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                status: 'completed' as const,
                scores,
                totalScore,
                qualitativeComments: qualitative,
                completedAt: new Date().toISOString(),
              }
            : r
        );

        // Update attempt
        const updatedAttempts = prev.attempts.map((a) =>
          a.id === review.attemptId
            ? {
                ...a,
                status: 'expert_reviewed' as const,
                dimensionScores: scores,
                totalScore,
                evaluationSource: 'expert_reviewed' as const,
                evaluationDate: new Date().toISOString().split('T')[0],
              }
            : a
        );

        // Update talent skills to expert_reviewed!
        const updatedTalent = prev.talent.map((t) => {
          if (t.id === review.talentId) {
            return {
              ...t,
              skills: t.skills.map((s) => {
                if (s.name.includes('Financial') || s.name.includes('Excel')) {
                  return {
                    ...s,
                    level: 'expert_reviewed' as const,
                    score: Math.max(s.score, totalScore),
                    dimensions: dimensionPct,
                    verifiedBy: review.expertName,
                    verificationDate: new Date().toISOString().split('T')[0],
                  };
                }
                return s;
              }),
              overallCapabilityScore: Math.min(100, t.overallCapabilityScore + 2),
            };
          }
          return t;
        });

        // Update expert earnings & review count
        const updatedExperts = prev.experts.map((e) =>
          e.id === review.expertId
            ? {
                ...e,
                reviewsCompleted: e.reviewsCompleted + 1,
                totalEarnedINR: e.totalEarnedINR + review.feeINR,
              }
            : e
        );

        return {
          ...prev,
          expertReviews: updatedReviews,
          attempts: updatedAttempts,
          talent: updatedTalent,
          experts: updatedExperts,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: review.talentId,
              role: 'talent',
              title: 'Expert Review Completed!',
              description: `${review.expertName} evaluated your submission with a score of ${totalScore}/100. Your Capability Passport is now Expert-Reviewed.`,
              timestamp: new Date().toISOString(),
              read: false,
              actionUrl: '/talent/passport',
            },
            ...prev.notifications,
          ],
        };
      });
    },
    [updateState]
  );

  // 6. Apply to Opportunity (Talent flow)
  const applyToOpportunity = useCallback(
    (opportunityId: string, candidateNotes?: string) => {
      const opp = memoryState.opportunities.find((o) => o.id === opportunityId);
      if (!opp) return { success: false, message: 'Opportunity not found' };

      const currentTalent = memoryState.talent[0]; // Aarav Mehta

      // Prevent duplicate applications
      const existing = memoryState.applications.find(
        (a) => a.opportunityId === opportunityId && a.talentId === currentTalent.id
      );
      if (existing) {
        return { success: false, message: 'You have already applied to this opportunity.' };
      }

      const match = calculateOpportunityMatch(currentTalent, opp);

      const newApp: Application = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        opportunityTitle: opp.title,
        businessId: opp.businessId,
        businessName: opp.businessName,
        talentId: currentTalent.id,
        talentName: currentTalent.name,
        talentAvatar: currentTalent.avatar,
        appliedDate: new Date().toISOString(),
        currentStage: 'applied',
        matchScore: match.matchScore,
        matchBreakdown: match,
        timeline: [
          {
            stage: 'applied',
            timestamp: new Date().toISOString(),
            note: 'Application submitted via Zaprill Capability Passport.',
          },
        ],
        candidateNotes: candidateNotes || '',
      };

      updateState((prev) => ({
        ...prev,
        applications: [newApp, ...prev.applications],
        opportunities: prev.opportunities.map((o) =>
          o.id === opportunityId ? { ...o, applicantsCount: o.applicantsCount + 1 } : o
        ),
        notifications: [
          {
            id: `notif-${Date.now()}-1`,
            userId: currentTalent.id,
            role: 'talent',
            title: 'Application Submitted',
            description: `Applied to ${opp.title} at ${opp.businessName}. Match score: ${match.matchScore}%.`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: '/talent/applications',
          },
          {
            id: `notif-${Date.now()}-2`,
            userId: opp.businessId,
            role: 'business',
            title: 'New Candidate Application',
            description: `${currentTalent.name} (${match.matchScore}% Match) applied for ${opp.title}.`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: `/business/talent/${currentTalent.id}`,
          },
          ...prev.notifications,
        ],
      }));

      return { success: true, message: 'Application submitted successfully!' };
    },
    [updateState]
  );

  // 7. Withdraw Application (Talent flow)
  const withdrawApplication = useCallback(
    (applicationId: string) => {
      updateState((prev) => ({
        ...prev,
        applications: prev.applications.map((a) =>
          a.id === applicationId
            ? {
                ...a,
                currentStage: 'withdrawn' as const,
                timeline: [
                  ...a.timeline,
                  { stage: 'withdrawn', timestamp: new Date().toISOString(), note: 'Withdrawn by candidate.' },
                ],
              }
            : a
        ),
      }));
    },
    [updateState]
  );

  // 8. Update Application Stage (Business flow)
  const updateApplicationStage = useCallback(
    (applicationId: string, newStage: ApplicationStage, note?: string) => {
      const app = memoryState.applications.find((a) => a.id === applicationId);
      if (!app) return;

      updateState((prev) => ({
        ...prev,
        applications: prev.applications.map((a) =>
          a.id === applicationId
            ? {
                ...a,
                currentStage: newStage,
                timeline: [
                  ...a.timeline,
                  {
                    stage: newStage,
                    timestamp: new Date().toISOString(),
                    note: note || `Stage updated to ${newStage.replace(/_/g, ' ')} by hiring team.`,
                  },
                ],
              }
            : a
        ),
        notifications: [
          {
            id: `notif-${Date.now()}`,
            userId: app.talentId,
            role: 'talent',
            title: 'Application Status Updated',
            description: `${app.businessName} updated your application for ${app.opportunityTitle} to "${newStage.replace(/_/g, ' ')}".`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: '/talent/applications',
          },
          ...prev.notifications,
        ],
      }));
    },
    [updateState]
  );

  // 9. Create Opportunity (Business flow)
  const createOpportunity = useCallback(
    (oppData: Omit<Opportunity, 'id' | 'businessId' | 'businessName' | 'businessLogo' | 'postedAt' | 'applicantsCount' | 'status'>) => {
      const currentBiz = memoryState.businesses[0]; // HarbourDesk Spaces

      const newOpp: Opportunity = {
        ...oppData,
        id: `opp-${Date.now()}`,
        businessId: currentBiz.id,
        businessName: currentBiz.name,
        businessLogo: currentBiz.logo,
        postedAt: new Date().toISOString().split('T')[0],
        applicantsCount: 0,
        status: 'active',
      };

      updateState((prev) => ({
        ...prev,
        opportunities: [newOpp, ...prev.opportunities],
        businesses: prev.businesses.map((b) =>
          b.id === currentBiz.id
            ? { ...b, activeOpportunitiesCount: b.activeOpportunitiesCount + 1 }
            : b
        ),
      }));

      return newOpp;
    },
    [updateState]
  );

  // 10. Add Evidence (Talent flow)
  const addEvidence = useCallback(
    (evidenceData: Omit<EvidenceRecord, 'id' | 'talentId' | 'createdAt' | 'status'>) => {
      const currentTalent = memoryState.talent[0];
      const newEvi: EvidenceRecord = {
        ...evidenceData,
        id: `evi-${Date.now()}`,
        talentId: currentTalent.id,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'self_uploaded',
      };

      updateState((prev) => ({
        ...prev,
        evidence: [newEvi, ...prev.evidence],
        talent: prev.talent.map((t) =>
          t.id === currentTalent.id
            ? {
                ...t,
                skills: t.skills.map((s) =>
                  s.skillId === evidenceData.associatedSkillId
                    ? { ...s, evidenceCount: s.evidenceCount + 1 }
                    : s
                ),
              }
            : t
        ),
      }));

      return newEvi;
    },
    [updateState]
  );

  // 11. Toggle Evidence Visibility
  const toggleEvidenceVisibility = useCallback(
    (evidenceId: string) => {
      updateState((prev) => ({
        ...prev,
        evidence: prev.evidence.map((e) =>
          e.id === evidenceId ? { ...e, isPubliclyVisible: !e.isPubliclyVisible } : e
        ),
      }));
    },
    [updateState]
  );

  // 12. Admin Actions: Verify Business & Approve Expert
  const verifyBusiness = useCallback(
    (businessId: string) => {
      updateState((prev) => ({
        ...prev,
        businesses: prev.businesses.map((b) =>
          b.id === businessId
            ? { ...b, isVerified: true, verificationBadgeDate: new Date().toISOString().split('T')[0] }
            : b
        ),
      }));
    },
    [updateState]
  );

  const approveExpert = useCallback(
    (expertId: string) => {
      updateState((prev) => ({
        ...prev,
        experts: prev.experts.map((e) =>
          e.id === expertId
            ? {
                ...e,
                isApproved: true,
                accreditationNumber: `ZAP-EXP-${Date.now().toString().slice(-6)}`,
              }
            : e
        ),
      }));
    },
    [updateState]
  );

  // 13. Send Message
  const sendMessage = useCallback(
    (threadId: string, recipientId: string, content: string) => {
      const senderRole = memoryState.currentRole;
      let senderId = 'talent-aarav-mehta';
      let senderName = 'Aarav Mehta';

      if (senderRole === 'business') {
        senderId = 'biz-harbourdesk';
        senderName = 'Aditi Sharma (HarbourDesk Spaces)';
      } else if (senderRole === 'expert') {
        senderId = 'expert-vikram-sen';
        senderName = 'Dr. Vikram Sen';
      } else if (senderRole === 'institution') {
        senderId = 'inst-apex-tech';
        senderName = 'Apex Institute Placements';
      } else if (senderRole === 'admin') {
        senderId = 'admin-super';
        senderName = 'Zaprill Platform Support';
      }

      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        threadId,
        senderRole,
        senderId,
        senderName,
        recipientId,
        content,
        timestamp: new Date().toISOString(),
        read: true,
      };

      updateState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMsg],
      }));
    },
    [updateState]
  );

  // Active current user entity depending on role
  const currentUser = {
    talent: state.talent[0], // Aarav Mehta
    business: state.businesses[0], // HarbourDesk Spaces
    expert: state.experts[0], // Dr. Vikram Sen
    institution: state.institutions[0], // Apex Institute of Technology
    admin: {
      id: 'admin-super',
      name: 'Super Admin',
      email: 'admin@zaprill.internal',
      role: 'Platform Admin',
    },
  }[state.currentRole];

  return {
    state,
    mounted,
    currentRole: state.currentRole,
    currentUser,
    setRole,
    resetDemoData,
    submitAssessmentAttempt,
    requestExpertReview,
    submitExpertReview,
    applyToOpportunity,
    withdrawApplication,
    updateApplicationStage,
    createOpportunity,
    addEvidence,
    toggleEvidenceVisibility,
    verifyBusiness,
    approveExpert,
    sendMessage,
  };
}
