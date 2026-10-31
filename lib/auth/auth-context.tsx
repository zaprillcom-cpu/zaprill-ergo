'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  CareerHealthData,
  MarketValueData,
  ResumeData,
  JobListing,
  SkillGapItem,
  AssessmentModule,
  CoachMessage,
  NotificationItem,
} from '@/lib/types/ergo';
import {
  DEMO_USER,
  INITIAL_CAREER_HEALTH,
  INITIAL_MARKET_VALUE,
  INITIAL_RESUME,
  INITIAL_JOBS,
  INITIAL_SKILL_GAPS,
  INITIAL_ASSESSMENTS,
  INITIAL_COACH_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '@/lib/mock-data/ergo-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message: string }>;
  
  // Interactive App State
  careerHealth: CareerHealthData;
  marketValue: MarketValueData;
  resumeData: ResumeData;
  jobs: JobListing[];
  skillGaps: SkillGapItem[];
  assessments: AssessmentModule[];
  coachMessages: CoachMessage[];
  notifications: NotificationItem[];
  
  // Actions
  updateProfile: (updated: Partial<User>) => void;
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  updateSkillStatus: (skillId: string, status: SkillGapItem['status']) => void;
  completeAssessment: (assessmentId: string, score: number) => void;
  sendCoachMessage: (messageText: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  simulateResumeUpload: (fileName: string) => Promise<void>;
}

const STORAGE_KEY_AUTH = 'ergo_auth_session_v1';
const STORAGE_KEY_DATA = 'ergo_app_data_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Application Data States
  const [careerHealth, setCareerHealth] = useState<CareerHealthData>(INITIAL_CAREER_HEALTH);
  const [marketValue, setMarketValue] = useState<MarketValueData>(INITIAL_MARKET_VALUE);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME);
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(INITIAL_SKILL_GAPS);
  const [assessments, setAssessments] = useState<AssessmentModule[]>(INITIAL_ASSESSMENTS);
  const [coachMessages, setCoachMessages] = useState<CoachMessage[]>(INITIAL_COACH_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Hydrate session and data on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      if (savedAuth) {
        setUser(JSON.parse(savedAuth));
      } else {
        // Default to demo user logged in for seamless demo experience
        setUser(DEMO_USER);
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(DEMO_USER));
      }

      const savedData = localStorage.getItem(STORAGE_KEY_DATA);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.careerHealth) setCareerHealth(parsed.careerHealth);
        if (parsed.jobs) setJobs(parsed.jobs);
        if (parsed.skillGaps) setSkillGaps(parsed.skillGaps);
        if (parsed.assessments) setAssessments(parsed.assessments);
        if (parsed.coachMessages) setCoachMessages(parsed.coachMessages);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.resumeData) setResumeData(parsed.resumeData);
      }
    } catch {
      // Fallback
      setUser(DEMO_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save persistent state
  const persistData = (partial: Record<string, unknown>) => {
    try {
      const current = localStorage.getItem(STORAGE_KEY_DATA);
      const obj = current ? JSON.parse(current) : {};
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify({ ...obj, ...partial }));
    } catch {
      // Ignore storage errors in private mode
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // realistic network delay

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'demo@zaprill.com' && pass === 'Demo@123') {
      setUser(DEMO_USER);
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(DEMO_USER));
      setIsLoading(false);
      return { success: true };
    }

    if (pass.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Allow user login for custom email in demo mode
    const customUser: User = {
      ...DEMO_USER,
      email: normalizedEmail,
      name: normalizedEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Career Explorer',
    };
    setUser(customUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(customUser));
    setIsLoading(false);
    return { success: true };
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setUser(DEMO_USER);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(DEMO_USER));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (!name.trim() || !email.trim() || !pass) {
      setIsLoading(false);
      return { success: false, error: 'Please provide all required fields.' };
    }

    const newUser: User = {
      ...DEMO_USER,
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    router.push('/login');
  };

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      message: `Password reset link simulated and generated for ${email}. Check your inbox.`,
    };
  };

  const resetPassword = async (password: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      message: 'Your password has been successfully updated in this demo session.',
    };
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
    const nextUser = { ...user, ...updated };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(nextUser));
  };

  const toggleSaveJob = (jobId: string) => {
    setJobs((prev) => {
      const updated = prev.map((j) => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j));
      persistData({ jobs: updated });
      return updated;
    });
  };

  const applyToJob = (jobId: string) => {
    setJobs((prev) => {
      const updated = prev.map((j) => (j.id === jobId ? { ...j, isApplied: true } : j));
      persistData({ jobs: updated });
      return updated;
    });

    // Add notification
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        title: 'Application Recorded',
        message: `Your profile was submitted for ${job.title} at ${job.company}.`,
        time: 'Just now',
        read: false,
        type: 'job',
      };
      setNotifications((prev) => {
        const nextNotifs = [newNotif, ...prev];
        persistData({ notifications: nextNotifs });
        return nextNotifs;
      });
    }
  };

  const updateSkillStatus = (skillId: string, status: SkillGapItem['status']) => {
    setSkillGaps((prev) => {
      const updated = prev.map((s) => (s.id === skillId ? { ...s, status } : s));
      persistData({ skillGaps: updated });
      return updated;
    });
  };

  const completeAssessment = (assessmentId: string, score: number) => {
    setAssessments((prev) => {
      const updated = prev.map((a) =>
        a.id === assessmentId ? { ...a, isCompleted: true, lastScore: score } : a
      );
      persistData({ assessments: updated });
      return updated;
    });

    // Recalculate Career Health score
    setCareerHealth((prev) => {
      const updatedOverall = Math.min(100, Math.round((prev.overallScore * 0.8) + (score * 0.2)));
      const updated: CareerHealthData = {
        ...prev,
        overallScore: updatedOverall,
        previousScore: prev.overallScore,
        lastUpdated: 'Just now',
      };
      persistData({ careerHealth: updated });
      return updated;
    });
  };

  const sendCoachMessage = async (messageText: string) => {
    const userMsg: CoachMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Just now',
    };

    const updatedMessages = [...coachMessages, userMsg];
    setCoachMessages(updatedMessages);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ sender: m.sender, text: m.text })),
          profile: {
            name: user?.name,
            role: user?.role,
            targetRole: user?.targetRole,
            location: user?.location || 'Mumbai & Bengaluru',
            currentSalary: user?.currentSalary || '₹6.5L/year',
            estimatedMarketValue: '₹8.2L/year',
            top10Percentile: '₹11.5L/year',
            overallScore: careerHealth.overallScore,
            skills: resumeData.extractedSkills,
            missingSkills: skillGaps.filter((s) => s.status === 'Not Started').map((s) => s.name),
            atsScore: resumeData.overallAtsScore,
            workExperience: resumeData.extractedExperience.map(
              (e) => `${e.role} at ${e.company} (${e.period}): ${e.bullets.join('; ')}`
            ),
            jobMatches: jobs.slice(0, 4).map(
              (j) => `${j.title} at ${j.company} (${j.location}) · ${j.salaryRange} · ${j.matchScore}% Match`
            ),
            completedAssessments: assessments.map(
              (a) => `${a.title}: ${a.isCompleted ? `${a.lastScore}% (Passed)` : 'Not Completed'}`
            ),
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const coachMsg: CoachMessage = {
          id: `msg_${Date.now() + 1}`,
          sender: 'coach',
          text: data.text,
          timestamp: 'Just now',
          suggestedPrompts: data.suggestedPrompts,
          isLiveAI: data.isLiveAI,
          model: data.model,
          webSources: data.webSources,
        };

        setCoachMessages((prev) => {
          const next = [...prev, coachMsg];
          persistData({ coachMessages: next });
          return next;
        });
        return;
      }
    } catch {
      // Fall through to deterministic fallback if network is interrupted
    }

    // Fallback contextual AI responses
    let botResponse = `I have analyzed your query: "${messageText}". Based on your target role (${user?.targetRole || 'Senior Engineer'}) and current 2-year trajectory, focusing on System Design and high-yield resume metrics will yield the highest return.`;

    const lower = messageText.toLowerCase();
    if (lower.includes('underpaid') || lower.includes('salary') || lower.includes('worth')) {
      botResponse = `**Market Value Analysis**:
At **₹6.5L/year** in Mumbai with 2 years of modern Next.js/React experience, you are currently at the **42nd percentile**.
- **Market Average**: ₹8.2L/year (+₹1.7L gap)
- **Top 10% Earning Potential**: ₹11.5L/year (+₹5.0L gap)

**What's holding you back?**
1. System Design architecture in interviews.
2. Demonstrating cloud deployment (AWS/Docker).
Closing these two gaps will position you to demand **₹10L–₹12L** with total confidence in your next round of interviews.`;
    } else if (lower.includes('skill') || lower.includes('learn')) {
      botResponse = `**Top 3 High-Yield Skills to Acquire Next**:
1. **High-Level System Design**: Required in 82% of top-paying roles in Bengaluru and Mumbai. Expected salary boost: **+₹2.5L/yr**.
2. **Distributed Caching (Redis)**: Cache-aside patterns and rate limiting. Expected salary boost: **+₹1.6L/yr**.
3. **Containerization (Docker)**: Deploying production Node & Next.js apps. Expected salary boost: **+₹1.1L/yr**.

Check the **[Skill Gap Analysis](/dashboard/skill-gap)** tab to see your tailored learning roadmap.`;
    } else if (lower.includes('resume') || lower.includes('ats')) {
      botResponse = `**Resume Intelligence Diagnosis (Current Score: 84/100)**:
- **ATS Filter Readability**: 90% (Passes cleanly)
- **Primary Issue**: Experience bullets describe *what you did* rather than *what you improved*.
- **Fix**: Transform "Engineered checkout flow" into "Engineered checkout flow with Next.js App Router, decreasing latency by 180ms and boosting merchant conversions by 14%".

Visit your **[Resume Intelligence](/dashboard/resume)** workspace to download a revised PDF or run our ATS simulator.`;
    } else if (lower.includes('plan') || lower.includes('30-day') || lower.includes('roadmap')) {
      botResponse = `**30-Day ERGO Career Acceleration Roadmap**:

- **Days 1–7 (Resume & ATS Optimization)**:
  - Add quantified metrics to your top 3 experience bullets.
  - Integrate missing keywords: *System Design, Redis, Microservices*.
- **Days 8–18 (High-Impact Technical Skills)**:
  - Complete the Redis caching and rate-limiting modules.
  - Push 1 end-to-end repository demonstrating Next.js SSR + Redis caching.
- **Days 19–25 (Targeted Job Applications)**:
  - Apply to the 4 matched positions with >85% fit in your **[Jobs Portal](/dashboard/jobs)**.
- **Days 26–30 (Interview & Salary Negotiation)**:
  - Benchmark against our ₹8.2L–₹11.5L compensation curves. Never accept below ₹9.5L for senior responsibilities.`;
    }

    const coachMsg: CoachMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'coach',
      text: botResponse,
      timestamp: 'Just now',
      suggestedPrompts: [
        'How can I prepare for a System Design interview?',
        'Which companies in Bangalore pay ₹12L+ for 2 yrs exp?',
        'What are the best bullet point formulas for developers?',
      ],
      isLiveAI: false,
    };

    setCoachMessages((prev) => {
      const next = [...prev, coachMsg];
      persistData({ coachMessages: next });
      return next;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      persistData({ notifications: updated });
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      persistData({ notifications: updated });
      return updated;
    });
  };

  const simulateResumeUpload = async (fileName: string) => {
    await new Promise((r) => setTimeout(r, 1200));
    setResumeData((prev) => {
      const updated: ResumeData = {
        ...prev,
        fileName,
        lastParsed: 'Just now',
        overallAtsScore: Math.min(94, prev.overallAtsScore + 4),
      };
      persistData({ resumeData: updated });
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        careerHealth,
        marketValue,
        resumeData,
        jobs,
        skillGaps,
        assessments,
        coachMessages,
        notifications,
        updateProfile,
        toggleSaveJob,
        applyToJob,
        updateSkillStatus,
        completeAssessment,
        sendCoachMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        simulateResumeUpload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
