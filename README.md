# ZAPRILL — Capability Intelligence & Opportunity Network

> **A verifiable human capability intelligence operating system connecting self-taught and accredited talent to enterprise opportunities through practical assessments, diagnostic rubrics, expert accreditation, and evidence-backed Capability Passports.**

---

## 🌟 Executive Summary

Zaprill solves the foundational flaw of modern hiring: resumes and degrees are poor proxies for actual job execution. Instead of self-reported claims, Zaprill enables talent to demonstrate verifiable competency through practical, multi-stage business assessments and simulated work samples. 

Every demonstrated skill is codified across a standardized **5-dimension diagnostic rubric**, verified by **independent accredited industry experts**, sealed into a shareable **Capability Passport**, and mapped to enterprise hiring pipelines via a transparent capability match algorithm.

---

## 🎭 5 Interconnected Workspaces

The prototype contains realistic dummy data across 5 distinct persona workspaces accessible from any page via the top **Demo Role Switcher**:

| Workspace | Active Demo Persona | Key Capabilities |
| :--- | :--- | :--- |
| **Talent** | **Aarav Mehta**<br>*(Self-taught Financial Analyst, Mumbai)* | • 5-Stage Assessment Player with interactive financial model sheets<br>• Real-world Coworking Profitability Simulator<br>• Multi-tier Capability Passport (Verified, Demonstrated, Expert-Reviewed)<br>• Evidence Vault with public privacy toggles<br>• Transparent Opportunity Match calculation (70% Skills + 30% Evidence)<br>• Application tracking & real-time stage progression |
| **Business** | **HarbourDesk Spaces**<br>*(Flexible Workspace Operator, Mumbai / BLR / DEL)* | • Full Applicant Tracking Pipeline (Applied → Reviewing → Interviewing → Offered)<br>• Talent Directory with candidate capability comparison tool<br>• Opportunity creation with transparent scoring criteria<br>• Enterprise verification status and candidate evidence inspect modal |
| **Expert** | **Dr. Vikram Sen**<br>*(Lead Financial Evaluator, Ex-Director KPMG)* | • Double-blind evaluation queue with Conflict-of-Interest (COI) declaration<br>• Independent 5-dimension rubric scoring (AI score hidden until expert grading)<br>• Verifiable Certified Evaluation Reports with cryptographic SHA-256 seal<br>• Rubric calibration & inter-rater reliability (IRR) concordance drills<br>• Honorarium earnings ledger & TDS statements (₹4,000 / review) |
| **Institution** | **Apex Institute of Technology**<br>*(Mumbai, NIRF Rank #42)* | • 40-student cohort placement readiness dashboard<br>• Student directory with department filters and CSV export<br>• Curricular diagnostic analytics (identifying cohort error-detection gaps)<br>• Campus diagnostic assessment drives and corporate recruiter referrals |
| **Super Admin** | **Zaprill Global Command**<br>*(Platform Operations & Trust)* | • Cross-ecosystem telemetry and entity management<br>• One-click enterprise verification and expert accreditation queues<br>• Standardized competency taxonomy editor across 5 domains<br>• Interactive SVG Multi-Relational Capability Graph<br>• Platform treasury ledger, audit logs, and instant demo data reset |

---

## 🚀 The Core 5-Step Story Demonstration

Follow this exact walkthrough to experience the complete narrative loop:

### Step 1: Take the Practical Assessment (Talent)
1. Switch to **Talent** role (Aarav Mehta).
2. Go to **Practical Assessments** (`/talent/assessments`) and select **"Coworking Hub Unit Economics & Profitability Assessment"**.
3. Launch the assessment attempt (`/talent/assessments/assess-coworking-profitability/attempt`).
4. Click the purple **"Fill Sample Answers (Presenter Mode)"** button to instantly populate realistic formulas, financial models, and break-even calculations across all 5 stages.
5. Click **"Submit Assessment Attempt"**.

### Step 2: Review Diagnostic Evaluation (Talent)
1. View the immediate diagnostic evaluation on the results page (`/talent/assessments/assess-coworking-profitability/results`).
2. Observe the **82 / 100 points** earned across the 5 dimensions:
   - *Understanding:* 18 / 20
   - *Application:* 24 / 30
   - *Reasoning:* 16 / 20
   - *Error Detection:* 12 / 15
   - *Transfer:* 12 / 15
3. Inspect the radar chart and note the clear disclosure: *"Simulated AI diagnostic evaluation — illustrative result"*.

### Step 3: Request & Complete Expert Review (Talent ➔ Expert)
1. On the assessment results page, click **"Request Accredited Expert Review"** (select **Dr. Vikram Sen**).
2. Switch role to **Expert** using the top banner.
3. Open **Assignments Queue** (`/expert/assignments`) and select Aarav Mehta's pending review.
4. Check the COI declaration box. Notice that the candidate's automated score is hidden until the expert completes their independent evaluation.
5. Click **"Submit Certified Evaluation"** (89 / 100 ratified score) and inspect the **Official Certified Report** (`/expert/assignments/[id]/report`) with Dr. Sen's cryptographic verification seal.

### Step 4: Inspect Updated Capability Passport (Talent)
1. Switch back to **Talent** role.
2. Visit **Capability Passport** (`/talent/passport`).
3. Notice that Aarav's tier is now **"Expert-Reviewed"** (96th percentile) with Dr. Sen's ratified badge, dynamic radar chart, verified work artifacts, and client endorsements.
4. Click **"Public Share Link"** or **"Print / PDF"** to preview the printer-optimized version.

### Step 5: Opportunity Discovery & Enterprise Hiring Pipeline (Talent ➔ Business)
1. In Talent workspace, go to **Find Opportunities** (`/talent/opportunities`).
2. Notice the top match: **"Coworking Profitability Analyst" at HarbourDesk Spaces** (₹45,000 / month, **94% Transparent Match**).
3. Click to view opportunity details (`/talent/opportunities/opp-harbourdesk-analyst`) and click **"Submit Application with Passport"**.
4. Switch role to **Business** (HarbourDesk Spaces).
5. Open **Overview Dashboard** (`/business/dashboard`) or the opportunity page (`/business/opportunities/opp-harbourdesk-analyst`).
6. Observe Aarav Mehta appearing at the top of the applicant pipeline.
7. Click **"Move to Interviewing"** or **"Release Offer"**.
8. Switch back to **Talent** ➔ **My Applications** (`/talent/applications`) to confirm that the candidate's timeline updated in real-time!

---

## 🛠️ Technical Architecture

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Vanilla Tailwind CSS with custom dark navy palette (`#0B1329`) and light background tokens (`#F8FAFC`)
- **Data Visualizations:** Recharts (Radar charts, score distributions, and time-to-hire comparisons)
- **Interactive Graphs:** Custom SVG multi-relational network graph connecting talent, skills, tests, evidence, and jobs
- **State Management & Persistence:** Reactive client-side store (`useZaprillStore`) backed by browser `localStorage` under `zaprill_prototype_state_v1.0`. All changes survive page refreshes, and the **"Reset Demo Data"** action restores the pristine seed state at any time.
- **Zero External Dependencies:** No external API keys or databases required; runs 100% self-contained locally.

---

## 💻 Local Setup & Execution

1. Clone or navigate to the repository directory:
   ```bash
   cd /Users/vishnurajvishwakarma/Desktop/ergo
   ```

2. Install dependencies (already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. To run the production build check:
   ```bash
   npm run build
   ```

---

## 🔒 Verification & Compliance Standards

- **Standard ISO/IEC 17024:** Conforms to international standards for bodies operating certification of persons.
- **5-Dimension Standard Rubric:** Every assessment evaluates *Conceptual Understanding (20%)*, *Math & Technical Application (30%)*, *Strategic Reasoning (20%)*, *Error Detection & Auditing (15%)*, and *Contextual Transfer (15%)*.
- **Transparent Matchmaking Algorithm:** Match scores are computed strictly from `(0.70 × Skill Score) + (0.30 × Evidence Quality Score)`, eliminating opaque algorithmic black boxes.
