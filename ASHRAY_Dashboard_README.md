# ASHRAY Dashboard — Frontend Developer Documentation

> **Version:** 1.0  
> **Last Updated:** 2026-07-12  
> **Project:** ASHRAY — Smart Foundation & Donation Management Platform  
> **Audience:** Frontend Developers (React/Vue/Angular)  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Roles & Access Control](#2-user-roles--access-control)
3. [Global Dashboard Architecture](#3-global-dashboard-architecture)
4. [Route Registry](#4-route-registry)
   - [Super Admin / National Admin](#41-super-admin--national-admin)
   - [Division / District / Upazila / Union Coordinators](#42-division--district--upazila--union-coordinators)
   - [Volunteer Dashboard](#43-volunteer-dashboard)
   - [Individual Donor Dashboard](#44-individual-donor-dashboard)
   - [Corporate Donor Dashboard](#45-corporate-donor-dashboard)
   - [General Member Dashboard](#46-general-member-dashboard)
5. [Shared Components & Layouts](#5-shared-components--layouts)
6. [State Management & API Integration](#6-state-management--api-integration)
7. [Design Tokens & Theming](#7-design-tokens--theming)
8. [Development Guidelines](#8-development-guidelines)

---

## 1. Project Overview

ASHRAY is a **Foundation Operating System (Foundation OS)** designed to digitize non-profit organizations, charities, and humanitarian foundations. The platform centralizes:

- Membership & Volunteer Management
- Donor Engagement & Fundraising
- Campaign & Project Execution
- Financial Transparency & Reporting
- Multi-Branch Organizational Hierarchy
- AI-Powered Insights & Automation

This document provides the **complete route map, component hierarchy, and data requirements** for every dashboard view in the system.

---

## 2. User Roles & Access Control

| Role | Role Code | Hierarchy Level | Primary Dashboard |
|------|-----------|-----------------|-------------------|
| **Super Admin** | `super_admin` | Platform | `/admin/dashboard` |
| **National Admin** | `national_admin` | National | `/admin/dashboard` |
| **Division Coordinator** | `division_coordinator` | Division | `/coordinator/dashboard` |
| **District Coordinator** | `district_coordinator` | District | `/coordinator/dashboard` |
| **Upazila Coordinator** | `upazila_coordinator` | Upazila | `/coordinator/dashboard` |
| **Union Coordinator** | `union_coordinator` | Union | `/coordinator/dashboard` |
| **Executive Member** | `executive_member` | Branch | `/member/dashboard` |
| **Staff** | `staff` | Branch | `/staff/dashboard` |
| **Volunteer** | `volunteer` | Field | `/volunteer/dashboard` |
| **Individual Donor** | `individual_donor` | Self | `/donor/dashboard` |
| **Corporate Donor** | `corporate_donor` | Organization | `/corporate/dashboard` |
| **General Member** | `general_member` | Self | `/member/dashboard` |

> **Auth Guard:** Every route is protected by `RBACMiddleware` which validates `UserRole` → `RolePermission` → `AccessPolicy` before rendering.

---

## 3. Global Dashboard Architecture

```
DashboardLayout
├── Sidebar (Navigation)
│   ├── Role-Based Menu Items
│   ├── Branch/Organization Switcher
│   └── User Profile / Membership Card
├── TopBar
│   ├── Search (Global)
│   ├── Notifications (InApp + Push)
│   ├── Language Switcher
│   └── Quick Actions
├── Main Content Area
│   ├── Breadcrumbs
│   ├── Page Header (Title + Actions)
│   └── Route Outlet (Dynamic Views)
└── Footer
    ├── System Version
    └── Quick Support
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| Mobile | < 768px | Collapsible sidebar, stacked cards, bottom nav |
| Tablet | 768–1024px | Mini sidebar, 2-column grids |
| Desktop | > 1024px | Full sidebar, multi-column dashboards |

---

## 4. Route Registry

### 4.1 Super Admin / National Admin

> **Base Route:** `/admin`  
> **Layout:** `AdminDashboardLayout`  
> **Entities:** 36 modules, 200+ entities

#### Core Dashboard
```
GET /admin/dashboard
```
**Widgets:**
- `KPICardGrid` — Total Donations, Active Members, Total Volunteers, Beneficiaries Served, Campaign Success Rate
- `DonationAnalyticsChart` — Monthly donation trends (Line/Bar)
- `UserGrowthChart` — Monthly user registration trends
- `CampaignPerformanceChart` — Active vs. completed campaigns
- `BranchPerformanceMap` — Geo-visualization of branch activity
- `LiveDonationFeed` — Real-time donation ticker
- `RecentActivityLog` — Audit trail preview
- `SystemHealthMonitor` — CPU, Memory, DB Status

#### User & Membership Management
```
GET /admin/members
GET /admin/members/:id
GET /admin/members/:id/activity
GET /admin/members/:id/verification
GET /admin/members/approvals
GET /admin/membership-cards
GET /admin/membership-cards/generate
GET /admin/membership-renewals
```
**Components:**
- `MembersDataTable` — Sortable, filterable, pagination
- `MembershipApprovalWorkflow` — Approve/Reject with remarks
- `MembershipCardGenerator` — QR + Barcode generation preview
- `MemberProfileView` — Tabbed view (Profile, Donations, Activity, Certificates)
- `BulkActionToolbar` — Export CSV/PDF, Send bulk notification

**Filters:**
- Membership Type: Volunteer, General Member, Donor, Staff, Executive
- Status: Pending, Approved, Suspended, Expired
- Location: Division → District → Upazila → Union
- Date Range: Joining date, Expiry date

#### Volunteer Management
```
GET /admin/volunteers
GET /admin/volunteers/:id
GET /admin/volunteers/:id/assignments
GET /admin/volunteers/:id/performance
GET /admin/volunteers/:id/rewards
GET /admin/volunteer-assignments
GET /admin/volunteer-schedules
```
**Components:**
- `VolunteerDirectory` — Skill-based filtering, availability calendar
- `AssignmentManager` — Drag-and-drop campaign/project assignment
- `PerformanceScorecard` — Attendance rate, completed tasks, impact score
- `RewardIssuer` — Issue certificates, badges, appreciation notes

#### Donor Management
```
GET /admin/donors
GET /admin/donors/:id
GET /admin/donors/:id/wallet
GET /admin/donors/:id/subscriptions
GET /admin/donors/:id/certificates
GET /admin/corporate-donors
GET /admin/corporate-donors/:id
GET /admin/corporate-donors/:id/csr-report
```
**Components:**
- `DonorDirectory` — Filter by donor type, total donated, last active
- `DonorWalletView` — Balance, transaction history, reward points
- `SubscriptionManager` — Auto-renewal toggle, billing cycle view
- `CertificateGenerator` — Donation certificates, CSR reports, appreciation letters
- `ReferralTracker` — Referral tree visualization

#### Campaign & Project Management
```
GET /admin/campaigns
GET /admin/campaigns/create
GET /admin/campaigns/:id
GET /admin/campaigns/:id/milestones
GET /admin/campaigns/:id/media
GET /admin/campaigns/:id/donations
GET /admin/emergency-campaigns
GET /admin/projects
GET /admin/projects/:id
GET /admin/projects/:id/budget
GET /admin/projects/:id/expenses
GET /admin/projects/:id/beneficiaries
GET /admin/projects/:id/volunteers
GET /admin/projects/:id/gallery
GET /admin/projects/:id/reports
GET /admin/fund-allocations
```
**Components:**
- `CampaignBuilder` — Step wizard (Basic Info → Goals → Media → Launch)
- `CampaignTracker` — Progress bar, milestone timeline, donor count
- `EmergencyCampaignLauncher` — One-click emergency activation with push notifications
- `ProjectManager` — Budget vs. actual expense tracking
- `BeneficiaryRegistry` — Add beneficiaries, verify needs, track assistance
- `ExpenseApprovalWorkflow` — Receipt upload, admin verification, approval chain
- `FundAllocationPanel` — Drag funds from campaigns to projects with audit trail

#### Financial Management
```
GET /admin/finance/dashboard
GET /admin/finance/donations
GET /admin/finance/payments
GET /admin/finance/refunds
GET /admin/finance/funds
GET /admin/finance/fund-transfers
GET /admin/finance/settlements
GET /admin/finance/payouts
GET /admin/finance/reports
GET /admin/finance/audit-logs
```
**Components:**
- `FinancialOverview` — Income, Expense, Net Balance, Pending Payments
- `TransactionExplorer` — Gateway-wise transaction status (SSLCommerz, bKash, Nagad, Stripe, PayPal)
- `FundBalanceTracker` — Emergency Fund, Education Fund, Medical Fund, Food Fund, General Fund
- `SettlementReconciliation` — Auto-match gateway settlements with internal records
- `PayoutManager` — Branch-wise fund disbursement tracking
- `FinancialReportBuilder` — Custom date range, export to PDF/Excel/CSV

#### Organization Structure
```
GET /admin/organization
GET /admin/organization/branches
GET /admin/organization/branches/:id
GET /admin/organization/branches/:id/staff
GET /admin/organization/branches/:id/committee
GET /admin/organization/branches/:id/settings
GET /admin/organization/hierarchy
GET /admin/organization/departments
GET /admin/organization/designations
GET /admin/organization/employees
GET /admin/organization/area-assignments
```
**Components:**
- `BranchManager` — CRUD for Head Office → Division → District → Upazila → Union
- `CommitteeBuilder` — Assign Chairman, Secretary, Treasurer, Executive Members
- `EmployeeDirectory` — Department, designation, reporting manager
- `AreaAssignmentMap` — Visual assignment of coordinators to geographic areas
- `BranchSettingsPanel` — Working hours, holidays, contact info

#### Beneficiary & Relief Distribution
```
GET /admin/beneficiaries
GET /admin/beneficiaries/:id
GET /admin/beneficiaries/:id/family
GET /admin/beneficiaries/:id/documents
GET /admin/beneficiaries/:id/needs
GET /admin/beneficiaries/:id/history
GET /admin/relief-packages
GET /admin/distribution-campaigns
GET /admin/distribution-schedules
GET /admin/distribution-centers
GET /admin/distribution-records
GET /admin/distribution-verifications
```
**Components:**
- `BeneficiaryRegister` — Form with QR code generation, category tagging
- `NeedAssessmentForm` — Support type, priority level, assessment date
- `ReliefPackageBuilder` — Item-level configuration (Rice, Lentils, Oil, Medicine, etc.)
- `DistributionScheduler` — Calendar view of distribution events
- `DistributionTracker` — Real-time verification status (QR/Barcode/OTP/Manual)
- `AcknowledgementViewer` — Digital signatures and photo confirmations

#### Events, Gallery & Media
```
GET /admin/events
GET /admin/events/create
GET /admin/events/:id
GET /admin/events/:id/registrations
GET /admin/events/:id/attendance
GET /admin/events/:id/gallery
GET /admin/media
GET /admin/media/albums
GET /admin/media/albums/:id
GET /admin/success-stories
GET /admin/testimonials
GET /admin/news
GET /admin/press-releases
GET /admin/newsletters
```
**Components:**
- `EventManager` — Event creation, speaker management, session scheduling
- `MediaLibrary` — Bulk upload, album organization, category tagging
- `LiveDonationFeedEditor` — Moderate anonymous donations, display settings
- `SuccessStoryBuilder` — Beneficiary stories with media attachments
- `NewsletterComposer` — Rich text editor, recipient segmentation, schedule send

#### Notifications & Communication
```
GET /admin/notifications
GET /admin/notifications/templates
GET /admin/notifications/broadcast
GET /admin/notifications/emergency-alerts
GET /admin/support-tickets
GET /admin/support-tickets/:id
GET /admin/announcements
GET /admin/faqs
```
**Components:**
- `NotificationEngine` — Push, Email, SMS, In-App unified composer
- `TemplateManager` — Variable placeholders, multi-language support
- `BroadcastCampaignBuilder` — Target audience selection, scheduling
- `EmergencyAlertLauncher` — Priority-based, geo-targeted alerts
- `SupportTicketDesk` — Ticket assignment, reply threading, attachment support
- `FAQManager` — Category-based Q&A, sort order management

#### Analytics & Reporting
```
GET /admin/analytics
GET /admin/analytics/donations
GET /admin/analytics/campaigns
GET /admin/analytics/projects
GET /admin/analytics/volunteers
GET /admin/analytics/beneficiaries
GET /admin/analytics/branches
GET /admin/analytics/financial
GET /admin/analytics/memberships
GET /admin/analytics/users
GET /admin/reports
GET /admin/reports/scheduled
GET /admin/reports/audit-logs
GET /admin/reports/system-logs
GET /admin/reports/error-logs
```
**Components:**
- `CustomDashboardBuilder` — Drag-and-drop widget configuration
- `KPITracker` — Target vs. current value with trend indicators
- `AnalyticsExplorer` — Date range comparison, drill-down charts
- `ReportScheduler` — Automated PDF/Excel/CSV generation and email delivery
- `AuditLogViewer` — Filter by module, action, user, IP address
- `SystemHealthDashboard` — Server metrics, DB status, API response times

#### AI & Automation
```
GET /admin/ai/assistant
GET /admin/ai/recommendations
GET /admin/ai/predictions
GET /admin/ai/fraud-detection
GET /admin/ai/duplicate-detection
GET /admin/ai/workflow-automation
GET /admin/ai/route-optimization
GET /admin/ai/impact-analytics
GET /admin/ai/model-management
```
**Components:**
- `AIAssistantPanel` — Chat interface for admin queries
- `SmartRecommendationEngine` — Campaign suggestions, volunteer matching
- `FraudDetectionMonitor` — Risk scores, flagged transactions
- `WorkflowAutomationBuilder` — Trigger-action visual editor
- `RouteOptimizer` — Relief distribution logistics map
- `AIModelManager` — Model versions, training datasets, accuracy metrics

#### CMS & System Configuration
```
GET /admin/cms/pages
GET /admin/cms/banners
GET /admin/cms/sliders
GET /admin/cms/menus
GET /admin/cms/footers
GET /admin/cms/social-links
GET /admin/cms/seo
GET /admin/settings/general
GET /admin/settings/localization
GET /admin/settings/payment
GET /admin/settings/notification
GET /admin/settings/security
GET /admin/settings/integrations
GET /admin/settings/backups
GET /admin/settings/maintenance
```
**Components:**
- `PageBuilder` — WYSIWYG editor for CMS pages
- `BannerSliderManager` — Image upload, display order, link configuration
- `MenuEditor` — Nested menu items with icons and permissions
- `SEOManager` — Meta title, description, keywords, OG image per page
- `LocalizationPanel` — Language management, translation keys, currency settings
- `PaymentGatewayConfig` — API keys, sandbox mode, webhook setup
- `IntegrationManager` — bKash, Nagad, SSLCommerz, Firebase, AWS S3, Twilio
- `BackupManager` — Automated backup schedule, restore points, encryption settings
- `MaintenanceModeToggle` — Custom message, whitelist IPs

---

### 4.2 Division / District / Upazila / Union Coordinators

> **Base Route:** `/coordinator`  
> **Layout:** `CoordinatorDashboardLayout`  
> **Scope:** Hierarchical data access (assigned area only)

```
GET /coordinator/dashboard
GET /coordinator/members
GET /coordinator/volunteers
GET /coordinator/volunteers/assign
GET /coordinator/donors
GET /coordinator/campaigns
GET /coordinator/campaigns/:id
GET /coordinator/projects
GET /coordinator/projects/:id
GET /coordinator/projects/:id/expenses
GET /coordinator/beneficiaries
GET /coordinator/distribution
GET /coordinator/distribution/schedule
GET /coordinator/field-activities
GET /coordinator/field-activities/:id/reports
GET /coordinator/field-activities/:id/verify
GET /coordinator/analytics
GET /coordinator/reports
GET /coordinator/branch-settings
GET /coordinator/announcements
```

**Key Differences from Admin:**
- **Data Scope:** Only sees members, volunteers, donors, campaigns, and projects within assigned Division/District/Upazila/Union
- **Approval Authority:** Can approve memberships and field activity reports within jurisdiction
- **Fund Visibility:** View-only access to fund allocations; cannot transfer funds
- **Volunteer Assignment:** Can assign volunteers to local projects and campaigns
- **Field Verification:** Can verify beneficiary distributions and field activity expenses

**Components:**
- `AreaFilterBanner` — Persistent filter showing current assigned area
- `LocalPerformanceDashboard` — Branch-specific KPIs and comparisons
- `VolunteerActivityFeed` — Real-time updates from assigned volunteers
- `ExpenseVerificationPanel` — Approve/reject expense submissions with receipt preview
- `DistributionQRScanner` — Mobile-optimized QR/barcode scanner for field verification

---

### 4.3 Volunteer Dashboard

> **Base Route:** `/volunteer`  
> **Layout:** `VolunteerDashboardLayout`  
> **Primary Use:** Field operations, member registration, activity reporting

```
GET /volunteer/dashboard
GET /volunteer/profile
GET /volunteer/profile/skills
GET /volunteer/profile/availability
GET /volunteer/assignments
GET /volunteer/assignments/:id
GET /volunteer/assignments/:id/tasks
GET /volunteer/schedule
GET /volunteer/schedule/calendar
GET /volunteer/attendance
GET /volunteer/field-activities
GET /volunteer/field-activities/create
GET /volunteer/field-activities/:id
GET /volunteer/field-activities/:id/report
GET /volunteer/field-activities/:id/gallery
GET /volunteer/field-activities/:id/expenses
GET /volunteer/members/register
GET /volunteer/donors/register
GET /volunteer/donors/corporate-register
GET /volunteer/beneficiaries/register
GET /volunteer/beneficiaries/verify
GET /volunteer/performance
GET /volunteer/rewards
GET /volunteer/certificates
GET /volunteer/training
GET /volunteer/announcements
GET /volunteer/documents
GET /volunteer/expenses
GET /volunteer/expenses/reimbursements
```

**Components:**
- `VolunteerHome` — Today's schedule, pending tasks, quick action buttons
- `MemberRegistrationForm` — Mobile-first form for on-field member onboarding with OTP verification
- `DonorOnboarding` — Individual and corporate donor registration with commitment setup
- `FieldActivityLogger` — GPS-enabled activity tracker with photo upload, beneficiary count, expense entry
- `ExpenseReporter` — Camera-first receipt capture, amount entry, description
- `BeneficiaryVerifier` — QR/Barcode scanner, OTP verification, digital signature capture
- `PerformanceTracker` — Assignment completion rate, attendance score, impact metrics
- `RewardGallery` — Earned badges, certificates, appreciation notes
- `TrainingModule` — Video/text training materials, completion tracking

**Mobile-First Design:**
- All volunteer routes are optimized for mobile/tablet usage
- Camera integration for document/photo capture
- Offline mode support for field areas with poor connectivity
- GPS tagging for all field activities

---

### 4.4 Individual Donor Dashboard

> **Base Route:** `/donor`  
> **Layout:** `DonorDashboardLayout`  
> **Primary Use:** Donation management, campaign discovery, transparency tracking

```
GET /donor/dashboard
GET /donor/profile
GET /donor/profile/preferences
GET /donor/membership-card
GET /donor/wallet
GET /donor/wallet/transactions
GET /donor/subscriptions
GET /donor/subscriptions/manage
GET /donor/donations
GET /donor/donations/:id
GET /donor/donations/:id/receipt
GET /donor/donations/:id/impact
GET /donor/campaigns
GET /donor/campaigns/:id
GET /donor/campaigns/:id/donate
GET /donor/emergency-campaigns
GET /donor/projects
GET /donor/projects/:id
GET /donor/projects/:id/updates
GET /donor/projects/:id/gallery
GET /donor/impact
GET /donor/impact/reports
GET /donor/certificates
GET /donor/badges
GET /donor/referrals
GET /donor/referrals/rewards
GET /donor/notifications
GET /donor/messages
GET /donor/ai-recommendations
```

**Components:**
- `DonorHome` — Quick donate buttons, active subscriptions, recent impact summary
- `CampaignBrowser` — Category filter, progress bars, urgency indicators, search
- `DonationCheckout` — Amount selector, fund allocation, payment gateway selection, anonymous toggle
- `TransparencyTracker` — Fund flow visualization: Donation → Fund → Project → Beneficiary
- `ImpactReportViewer` — Photo galleries, beneficiary stories, expense breakdowns
- `DigitalReceiptVault` — Searchable, downloadable receipts and invoices
- `CertificateGallery` — Donation certificates, appreciation letters, tax/CSR documents
- `SmartRecommendationWidget` — AI-suggested campaigns based on donation history and preferences
- `ReferralDashboard` — Referral code, invite links, reward tracking

---

### 4.5 Corporate Donor Dashboard

> **Base Route:** `/corporate`  
> **Layout:** `CorporateDashboardLayout`  
> **Primary Use:** Organizational giving, CSR reporting, project sponsorship

```
GET /corporate/dashboard
GET /corporate/profile
GET /corporate/profile/organization
GET /corporate/membership-card
GET /corporate/subscriptions
GET /corporate/subscriptions/manage
GET /corporate/project-sponsorships
GET /corporate/project-sponsorships/:id
GET /corporate/project-sponsorships/:id/impact
GET /corporate/donations
GET /corporate/donations/:id
GET /corporate/donations/:id/invoice
GET /corporate/csr-reports
GET /corporate/csr-reports/:id
GET /corporate/csr-reports/:id/download
GET /corporate/impact
GET /corporate/impact/analytics
GET /corporate/employees
GET /corporate/employees/:id/donations
GET /corporate/branding
GET /corporate/certificates
GET /corporate/analytics
GET /corporate/notifications
GET /corporate/messages
```

**Components:**
- `CorporateHome` — Total contributed, active sponsorships, employee participation rate
- `ProjectSponsorshipManager` — Browse projects, sponsor selection, milestone tracking
- `CSRReportBuilder` — Auto-generated CSR reports with logo, donation summary, impact metrics
- `EmployeeGivingProgram` — Track employee donations, matching gift programs
- `BrandingPanel` — Upload company logo for certificates and public recognition
- `CorporateAnalytics` — Donation trends, project impact scores, beneficiary reach
- `InvoiceManager` — Downloadable invoices for accounting/tax purposes

---

### 4.6 General Member Dashboard

> **Base Route:** `/member`  
> **Layout:** `MemberDashboardLayout`  
> **Primary Use:** Membership management, community engagement, limited donations

```
GET /member/dashboard
GET /member/profile
GET /member/membership-card
GET /member/donations
GET /member/donations/:id
GET /member/campaigns
GET /member/campaigns/:id
GET /member/events
GET /member/events/:id
GET /member/events/:id/register
GET /member/gallery
GET /member/notifications
GET /member/messages
GET /member/certificates
GET /member/settings
```

**Components:**
- `MemberHome` — Membership status, upcoming events, community announcements
- `DigitalMembershipCard` — QR code display, download as PDF/Apple Wallet
- `EventExplorer` — Upcoming foundation events, registration, attendance QR
- `CommunityGallery` — Public photos and videos from foundation activities
- `MemberSettings` — Notification preferences, privacy settings, address management

---

## 5. Shared Components & Layouts

### Layout Components

| Component | Path | Description |
|-----------|------|-------------|
| `DashboardLayout` | `/layouts/DashboardLayout` | Base layout with sidebar, topbar, footer |
| `AdminDashboardLayout` | `/layouts/AdminDashboardLayout` | Extended layout with admin-specific quick actions |
| `CoordinatorDashboardLayout` | `/layouts/CoordinatorDashboardLayout` | Includes area-filter banner |
| `VolunteerDashboardLayout` | `/layouts/VolunteerDashboardLayout` | Mobile-optimized, bottom navigation |
| `DonorDashboardLayout` | `/layouts/DonorDashboardLayout` | Clean, conversion-focused layout |
| `CorporateDashboardLayout` | `/layouts/CorporateDashboardLayout` | Branding header, professional styling |
| `MemberDashboardLayout` | `/layouts/MemberDashboardLayout` | Community-focused, event-centric |

### Reusable UI Components

```
/components
├── /charts
│   ├── LineChart.tsx
│   ├── BarChart.tsx
│   ├── PieChart.tsx
│   ├── DonutChart.tsx
│   ├── GeoMap.tsx
│   └── KPIChart.tsx
├── /tables
│   ├── DataTable.tsx
│   ├── SortableHeader.tsx
│   ├── FilterPanel.tsx
│   ├── Pagination.tsx
│   └── BulkActionBar.tsx
├── /forms
│   ├── FormWizard.tsx
│   ├── DynamicForm.tsx
│   ├── ImageUploader.tsx
│   ├── FileDropzone.tsx
│   ├── QRScanner.tsx
│   └── SignaturePad.tsx
├── /cards
│   ├── KPICard.tsx
│   ├── CampaignCard.tsx
│   ├── MemberCard.tsx
│   ├── DonationCard.tsx
│   └── ActivityCard.tsx
├── /modals
│   ├── ConfirmationModal.tsx
│   ├── MemberDetailModal.tsx
│   ├── PaymentModal.tsx
│   └── NotificationComposer.tsx
├── /feedback
│   ├── LoadingSkeleton.tsx
│   ├── EmptyState.tsx
│   ├── ErrorBoundary.tsx
│   └── ToastNotification.tsx
└── /navigation
    ├── Sidebar.tsx
    ├── Breadcrumbs.tsx
    ├── RoleBasedMenu.tsx
    └── MobileBottomNav.tsx
```

---

## 6. State Management & API Integration

### API Layer Structure

```
/services
├── /api
│   ├── authApi.ts          # Authentication, OTP, sessions
│   ├── memberApi.ts        # Membership CRUD, approvals, cards
│   ├── donorApi.ts         # Donor profiles, wallets, subscriptions
│   ├── campaignApi.ts      # Campaigns, projects, milestones
│   ├── donationApi.ts      # Donations, payments, receipts, refunds
│   ├── volunteerApi.ts     # Volunteer profiles, assignments, schedules
│   ├── beneficiaryApi.ts   # Beneficiary registry, distributions
│   ├── financeApi.ts       # Funds, transfers, settlements, reports
│   ├── organizationApi.ts  # Branches, hierarchy, employees
│   ├── mediaApi.ts         # Uploads, albums, galleries
│   ├── notificationApi.ts  # Push, email, SMS, templates
│   ├── analyticsApi.ts     # Dashboard data, reports, KPIs
│   ├── aiApi.ts            # AI recommendations, predictions, fraud
│   └── cmsApi.ts           # Pages, banners, settings
```

### State Management Pattern

```typescript
// Recommended: Zustand or Redux Toolkit with RTK Query

// Store slices
interface DashboardState {
  user: User | null;
  role: Role | null;
  permissions: Permission[];
  currentBranch: Branch | null;
  notifications: Notification[];
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

// Auth guard hook
function useRouteGuard(requiredPermission: string) {
  const { permissions } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!permissions.includes(requiredPermission)) {
      router.push('/unauthorized');
    }
  }, [permissions, requiredPermission]);
}
```

### Data Fetching Strategy

| Route Type | Strategy | Cache Time |
|------------|----------|------------|
| Dashboard KPIs | SWR / React Query | 5 minutes |
| Real-time feeds (donations) | WebSocket | Live |
| Analytics charts | API polling every 30s | 30 seconds |
| Static lists (branches, divisions) | Local storage + background sync | 24 hours |
| User profiles | On-demand fetch | Session |
| Transaction history | Pagination + infinite scroll | 1 minute |

---

## 7. Design Tokens & Theming

### Color Palette

```css
:root {
  /* Primary Brand */
  --color-primary: #2563EB;        /* Trust Blue */
  --color-primary-dark: #1D4ED8;
  --color-primary-light: #DBEAFE;

  /* Semantic Colors */
  --color-success: #059669;        /* Donation Success */
  --color-warning: #D97706;        /* Campaign Urgent */
  --color-danger: #DC2626;          /* Emergency Alert */
  --color-info: #0891B2;           /* Information */

  /* Neutral Scale */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* Role Accents */
  --color-admin: #7C3AED;          /* Purple */
  --color-coordinator: #0D9488;    /* Teal */
  --color-volunteer: #EA580C;      /* Orange */
  --color-donor: #059669;          /* Green */
  --color-corporate: #0369A1;      /* Navy */
  --color-member: #4F46E5;         /* Indigo */
}
```

### Typography

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem;  /* 36px */
```

### Spacing Scale

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Shadow & Elevation

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-card: 0 2px 8px rgb(0 0 0 / 0.08);
--shadow-dropdown: 0 10px 25px -5px rgb(0 0 0 / 0.1);
```

---

## 8. Development Guidelines

### Code Structure

```
/src
├── /app                    # Next.js App Router (or React Router)
│   ├── /(dashboard)
│   │   ├── /admin
│   │   ├── /coordinator
│   │   ├── /volunteer
│   │   ├── /donor
│   │   ├── /corporate
│   │   └── /member
│   ├── /api                # API route handlers (if needed)
│   └── /auth
├── /components
│   ├── /ui                 # shadcn/ui or similar base components
│   ├── /charts
│   ├── /tables
│   ├── /forms
│   ├── /cards
│   ├── /modals
│   ├── /feedback
│   └── /navigation
├── /hooks
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   ├── useDashboardData.ts
│   ├── useRealTime.ts
│   └── useLocalStorage.ts
├── /lib
│   ├── /utils
│   ├── /constants
│   └── /types
├── /services
│   └── /api
├── /store                  # Zustand / Redux
├── /styles
│   └── globals.css
└── /public
    └── /images
```

### Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| API Response Time | < 500ms |
| Dashboard Load Time | < 2s |

### Accessibility (a11y)

- All routes must be keyboard navigable
- Color contrast ratio minimum 4.5:1
- Screen reader support for all data tables (ARIA labels)
- Focus management for modals and drawers
- Reduced motion support for animations
- RTL language support (Bengali/Arabic)

### Security Checklist

- [ ] All routes protected by auth middleware
- [ ] Role-based route guards implemented
- [ ] Sensitive data encrypted in localStorage (if used)
- [ ] XSS prevention on all user-generated content
- [ ] CSRF tokens on all mutating requests
- [ ] Rate limiting indicators on API calls
- [ ] Session timeout warnings and auto-logout
- [ ] Audit logging for sensitive actions

### Testing Strategy

```
/tests
├── /unit
│   ├── components/
│   ├── hooks/
│   └── utils/
├── /integration
│   ├── api/
│   └── auth/
├── /e2e
│   ├── admin-dashboard.spec.ts
│   ├── volunteer-workflow.spec.ts
│   ├── donor-journey.spec.ts
│   └── payment-flow.spec.ts
└── /visual
    └── screenshots/
```

---

## Appendix A: Quick Reference — Route to Entity Mapping

| Route Module | Primary Entities | Key API Endpoints |
|--------------|------------------|-------------------|
| `/admin/members` | User, Membership, MembershipCard, MembershipQRCode | `GET /api/members`, `POST /api/members/:id/approve` |
| `/admin/donors` | Donor, IndividualDonor, CorporateDonor, DonorWallet | `GET /api/donors`, `GET /api/donors/:id/wallet` |
| `/admin/campaigns` | Campaign, CampaignGoal, CampaignMilestone, EmergencyCampaign | `GET /api/campaigns`, `POST /api/campaigns` |
| `/admin/projects` | Project, ProjectBudget, ProjectExpense, ProjectBeneficiary | `GET /api/projects`, `GET /api/projects/:id/budget` |
| `/admin/finance` | Donation, Payment, Fund, FundTransfer, Settlement | `GET /api/finance/dashboard`, `GET /api/finance/reports` |
| `/admin/volunteers` | Volunteer, VolunteerAssignment, VolunteerSchedule, VolunteerPerformance | `GET /api/volunteers`, `GET /api/volunteers/:id/performance` |
| `/admin/beneficiaries` | Beneficiary, ReliefPackage, DistributionCampaign, DistributionRecord | `GET /api/beneficiaries`, `POST /api/distribution/verify` |
| `/admin/analytics` | AnalyticsSnapshot, KPI, Report, AuditLog | `GET /api/analytics/:type`, `GET /api/reports` |
| `/volunteer/field-activities` | FieldActivity, ActivityReport, VolunteerExpense | `POST /api/field-activities`, `POST /api/expenses` |
| `/donor/campaigns` | Campaign, CampaignDonation, DonationReceipt | `GET /api/campaigns/active`, `POST /api/donations` |

---

## Appendix B: Emergency Campaign Launch Flow

```
Admin Action:
  Admin Dashboard → Emergency Campaign → Create
    → Select Emergency Type (Flood/Fire/Medical/Cyclone/Winter/Food Crisis)
    → Set Target Amount & Priority
    → Define Affected Area (Division/District/Upazila/Union)
    → Upload Media
    → Launch

System Response:
  → Push Notification to all members in affected area
  → SMS alert to registered donors
  → Email campaign to subscriber base
  → Live Donation Counter activated on homepage
  → Real-time progress tracking enabled
  → Volunteer auto-assignment to field operations

Donor Journey:
  → Receives alert → Clicks → Lands on Emergency Campaign Page
  → Pre-filled suggested amount → One-click donation
  → Instant digital receipt → Impact tracking enabled
```

---

## Appendix C: Multi-Branch Hierarchy Visualization

```
Head Office (National)
├── Division Coordinator (8 Divisions)
│   ├── District Coordinator (64 Districts)
│   │   ├── Upazila Coordinator (492 Upazilas)
│   │   │   ├── Union Coordinator (4,500+ Unions)
│   │   │   │   ├── Volunteers
│   │   │   │   ├── Members
│   │   │   │   ├── Donors
│   │   │   │   └── Beneficiaries
│   │   │   └── Ward Level
│   │   └── District Office
│   └── Division Office
└── National Admin / Super Admin
```

---

**Document Maintainers:** Frontend Lead, Product Manager  
**Review Cycle:** Bi-weekly or per major feature release  
**Feedback:** Submit via `#frontend-dev` channel or create a PR against `/docs/dashboard-routes.md`

---

*End of Document*
