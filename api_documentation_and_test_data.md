# GROVO Server API Endpoints & Test Data Reference

This document serves as the comprehensive reference for all backend API routes, controllers, and services in the **GROVO (ASHRAY)** backend. It contains request/response schemas, verification rules, and Bangladesh-specific test datasets for success, validation failure, and edge case scenarios.

---

## 🔑 Authentication Headers & Globals
Most endpoints (except registration and login) support authentication via HTTP headers:
- `x-user-id` (e.g., `usr-dhk-001`, `admin-mock`): Used to identify the authenticated user.
- `x-donor-id` (e.g., `dnr-dhk-002`): Used to identify the authenticated donor.
- `x-user-role` (e.g., `admin`, `user`): Used to authorize admin-only actions.

---

## 📊 1. Endpoint Summary Table

| Method | Endpoint | Controller | Service | Auth Required | Request Params/Body Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/user/auth/register` | `userController.registerUser` | `userService.registerUser` | No | `firstName`, `lastName`, `email`, `phone`, `password`, `dateOfBirth`, `gender`, `bloodGroup`, `nationalId`, `address` |
| **POST** | `/api/v1/user/auth/verify-otp` | `userController.verifyOtp` | `userService.verifyOtp` | No | `email`, `otp` |
| **POST** | `/api/v1/user/auth/login` | `userController.loginUser` | `userService.loginUser` | No | `email`, `password` |
| **GET** | `/api/v1/user/me` | `userController.getMe` | `userService.getMe` | Yes (`x-user-id`) | Retrieve current user profile |
| **PUT** | `/api/v1/user/me` | `userController.updateMe` | `userService.updateMe` | Yes (`x-user-id`) | Profile details updates |
| **POST** | `/api/v1/user/memberships/:id/approve` | `userController.approveMembership` | `userService.approveMembership` | Yes (`x-user-id` = Admin ID) | URL parameter: `id` |
| **POST** | `/api/v1/user/memberships/:id/reject` | `userController.rejectMembership` | `userService.rejectMembership` | Yes (`x-user-id` = Admin ID) | URL parameter: `id`, Body: `remarks` |
| **POST** | `/api/v1/user/memberships/verify-qr` | `userController.verifyQr` | `userService.verifyQrCode` | Yes (`x-user-id` = Admin ID) | `qrCode` |
| **POST** | `/api/v1/user/memberships/:id/renew` | `userController.renewMembership` | `userService.renewMembership` | Yes (`x-user-id` = Admin ID) | URL parameter: `id`, Body: `amount` |
| **GET** | `/api/v1/user/memberships/:id/activities` | `userController.getMembershipActivities` | `userService.getMembershipActivities` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/donation/` | `donationController.processDonation` | `donationService.processDonation` | Yes | `donorId`, `amount`, `campaignId`, `projectId`, `paymentMethod`, `transactionId`, `currency`, `isAnonymous`, `message` |
| **GET** | `/api/v1/donation/my-donations` | `donationController.getMyDonations` | `donationService.getMyDonations` | Yes (`x-donor-id`) | Get logged-in donor's historical logs |
| **GET** | `/api/v1/donation/:id/receipt` | `donationController.getReceipt` | `donationService.getReceipt` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/donation/:id/refund` | `donationController.requestRefund` | `donationService.requestRefund` | Yes | URL parameter: `id`, Body: `reason` |
| **GET** | `/api/v1/donation/payment-gateways` | `donationController.getPaymentGateways` | `donationService.getPaymentGateways` | No | Fetch active gateways |
| **POST** | `/api/v1/donation/settlements` | `donationController.createSettlement` | `donationService.createSettlement` | Yes | `gatewayId`, `totalCollected`, `processingFee` |
| **GET** | `/api/v1/campaigns/` | `campaignsController.listCampaigns` | `campaignsService.listCampaigns` | No | Query: `status`, `category`, `type`, `page`, `limit` |
| **GET** | `/api/v1/campaigns/:slug` | `campaignsController.getCampaignBySlug` | `campaignsService.getCampaignBySlug` | No | URL parameter: `slug` |
| **GET** | `/api/v1/campaigns/:id/transparency-report` | `campaignsController.getTransparencyReport` | `campaignsService.getTransparencyReport` | No | URL parameter: `id` |
| **POST** | `/api/v1/campaigns/` | `campaignsController.createCampaign` | `campaignsService.createCampaign` | Yes | `title`, `slug`, `category_name`, `description`, `short_description`, `campaign_type`, `target_amount`, `start_date`, `end_date`, `thumbnail`, `banner` |
| **POST** | `/api/v1/campaigns/:id/publish` | `campaignsController.publishCampaign` | `campaignsService.publishCampaign` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/campaigns/projects` | `campaignsController.createProject` | `campaignsService.createProject` | Yes | `campaign_id`, `project_name`, `description`, `branch_id`, `start_date`, `end_date`, `project_manager_id` |
| **POST** | `/api/v1/campaigns/projects/:id/expenses` | `campaignsController.createProjectExpense` | `campaignsService.createProjectExpense` | Yes | URL parameter: `id`, Body: `expense_category`, `description`, `amount` |
| **POST** | `/api/v1/campaigns/projects/:id/updates` | `campaignsController.createProjectUpdate` | `campaignsService.createProjectUpdate` | Yes | URL parameter: `id`, Body: `title`, `description`, `progress_percentage` |
| **POST** | `/api/v1/campaigns/fund-allocations` | `campaignsController.createFundAllocation` | `campaignsService.createFundAllocation` | Yes | `campaign_id`, `project_id`, `allocated_amount`, `remarks` |
| **POST** | `/api/v1/campaigns/expenses/:id/approve` | `campaignsController.approveProjectExpense` | `campaignsService.approveProjectExpense` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/volunteer/register` | `volunteerController.registerVolunteer` | `volunteerService.registerVolunteer` | Yes | `user_id`, `branch_id`, `profession`, `organization`, `skills[]`, `languages[]`, `emergency_contact`, `blood_group`, `experience` |
| **POST** | `/api/v1/volunteer/assignments` | `volunteerController.assignVolunteer` | `volunteerService.assignVolunteer` | Yes | `volunteer_id`, `campaign_id`, `project_id`, `assigned_role` |
| **GET** | `/api/v1/volunteer/:id/performance` | `volunteerController.getPerformance` | `volunteerService.getPerformance` | Yes | URL parameter: `id` |
| **GET** | `/api/v1/volunteer/` | `volunteerController.listVolunteers` | `volunteerService.listVolunteers` | Yes | Query: `status`, `page`, `limit` |
| **POST** | `/api/v1/volunteer/performance` | `volunteerController.registerPerformance` | `volunteerService.registerPerformance` | Yes | `volunteerId`, `totalAssignments`, `completedAssignments`, `attendanceRate`, `score` |
| **GET** | `/api/v1/volunteer/available` | `volunteerController.getAvailableVolunteers` | `volunteerService.getAvailableVolunteers` | Yes | Fetch active available volunteers |
| **POST** | `/api/v1/beneficiary/` | `beneficiaryController.registerBeneficiary` | `beneficiaryService.registerBeneficiary` | Yes | `fullName`, `phone`, `nationalId`, `branchId`, `occupation`, `monthlyIncome` |
| **POST** | `/api/v1/beneficiary/assessment` | `beneficiaryController.logNeedAssessment` | `beneficiaryService.logNeedAssessment` | Yes | `beneficiaryId`, `type`, `priority`, `officerId`, `requiredSupport` |
| **POST** | `/api/v1/beneficiary/distributions/:id/verify` | `beneficiaryController.verifyDistribution` | `beneficiaryService.verifyDistribution` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/beneficiary/distributions/:id/acknowledge` | `beneficiaryController.acknowledgeDistribution` | `beneficiaryService.acknowledgeDistribution` | Yes | URL parameter: `id`, Body: `signature`, `photo`, `remarks` |
| **POST** | `/api/v1/beneficiary/admin/relief-packages` | `beneficiaryController.createReliefPackage` | `beneficiaryService.createReliefPackage` | Yes | `packageName`, `description`, `estimatedValue` |
| **POST** | `/api/v1/beneficiary/admin/distribution-campaigns` | `beneficiaryController.createDistributionCampaign` | `beneficiaryService.createDistributionCampaign` | Yes | `campaignId`, `title`, `distributionDate`, `location` |
| **POST** | `/api/v1/beneficiary/:id/follow-ups` | `beneficiaryController.createFollowUpVisit` | `beneficiaryService.createFollowUpVisit` | Yes | URL parameter: `id`, Body: `remarks`, `nextVisitDate` |
| **GET** | `/api/v1/beneficiary/:id` | `beneficiaryController.getBeneficiaryDetail` | `beneficiaryService.getBeneficiaryDetail` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/governance/branches` | `governanceController.createBranch` | `governanceService.createBranch` | Yes | `organizationId`, `branchCode`, `branchName`, `branchType`, `managerId`, `divisionId`, `districtId`, `upazilaId`, `unionId`, `address`, `phone`, `email`, `latitude`, `longitude` |
| **GET** | `/api/v1/governance/branches` | `governanceController.listBranches` | `governanceService.listBranches` | Yes | Query: `division_id`, `district_id`, `type`, `page`, `limit` |
| **GET** | `/api/v1/governance/branches/:id` | `governanceController.getBranchDetail` | `governanceService.getBranchDetail` | Yes | URL parameter: `id` |
| **PUT** | `/api/v1/governance/branches/:id` | `governanceController.updateBranch` | `governanceService.updateBranch` | Yes | URL parameter: `id`, Body: partial updates |
| **GET** | `/api/v1/governance/branches/:id/statistics` | `governanceController.getBranchStatistics` | `governanceService.getBranchStatistics` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/governance/area-assignments` | `governanceController.assignArea` | `governanceService.assignArea` | Yes | `userId`, `branchId`, `divisionId`, `districtId`, `upazilaId`, `unionId` |
| **POST** | `/api/v1/governance/committees` | `governanceController.createCommittee` | `governanceService.createCommittee` | Yes | `branchId`, `committeeName`, `committeeLevel`, `description`, `formationDate`, `members` |
| **POST** | `/api/v1/governance/branch-transfers` | `governanceController.createBranchTransfer` | `governanceService.createBranchTransfer` | Yes | `fromBranchId`, `toBranchId`, `transferType`, `description` |
| **POST** | `/api/v1/notifications/my` | `notificationController.getMyNotifications` | `notificationService.getMyNotifications` | Yes (`x-user-id`) | Query: `is_read`, `page`, `limit` |
| **PATCH** | `/api/v1/notifications/:id/read` | `notificationController.markAsRead` | `notificationService.markAsRead` | Yes (`x-user-id`) | URL parameter: `id` |
| **POST** | `/api/v1/admin/notifications` | `notificationController.createNotification` | `notificationService.createNotification` | Yes | `title`, `message`, `type`, `priority`, `channels[]`, `target_audience` |
| **POST** | `/api/v1/admin/emergency-alerts` | `notificationController.createEmergencyAlert` | `notificationService.createEmergencyAlert` | Yes | `title`, `description`, `priority`, `target_area`, `expires_at`, `channels[]` |
| **POST** | `/api/v1/admin/emergency-alerts/:id/resolve` | `notificationController.resolveEmergencyAlert` | `notificationService.resolveEmergencyAlert` | Yes | URL parameter: `id` |
| **POST** | `/api/v1/support/tickets` | `supportController.openTicket` | `supportService.openTicket` | Yes (`x-user-id`) | `subject`, `description`, `category`, `priority` |
| **POST** | `/api/v1/support/tickets/:id/replies` | `supportController.submitReply` | `supportService.submitReply` | Yes (`x-user-id`) | URL parameter: `id`, Body: `message`, `isStaff` |
| **GET** | `/api/v1/support/tickets/my` | `supportController.listMyTickets` | `supportService.listMyTickets` | Yes (`x-user-id`) | Query: `status`, `category`, `page`, `limit` |
| **GET** | `/api/v1/support/tickets/:id` | `supportController.getTicketDetail` | `supportService.getTicketDetail` | Yes | URL parameter: `id`, Headers: `x-user-role` |
| **GET** | `/api/v1/admin/support/tickets` | `supportController.listAllTickets` | `supportService.listAllTickets` | Yes (Admin) | Query: `status`, `priority`, `category`, `page`, `limit` |
| **POST** | `/api/v1/reports` | `analyticsController.generateReport` | `analyticsService.generateReport` | Yes | `reportName`, `reportType`, `templateId`, `parameters` |
| **GET** | `/api/v1/dashboards/me` | `analyticsController.getDashboardMe` | `analyticsService.getDashboardMe` | Yes (`x-user-id`) | Fetch active layout |
| **POST** | `/api/v1/admin/cms/pages` | `cmsController.createPage` | `cmsService.createPage` | Yes | `title`, `slug`, `content`, `metaTitle`, `metaDesc`, `template` |
| **PUT** | `/api/v1/admin/system/settings/:key` | `cmsController.updateSystemSetting` | `cmsService.updateSystemSetting` | Yes | URL key, Body: `settingValue`, `description` |
| **POST** | `/api/v1/admin/coordinators` | `branchController.assignCoordinator` | `branchService.assignCoordinator` | Yes | `userId`, `regionName`, `divisionId`, `districtId` |
| **POST** | `/api/v1/admin/territories` | `branchController.assignTerritory` | `branchService.assignTerritory` | Yes | `userId`, `branchId`, `divisionId`, `districtId`, `upazilaId`, `unionId` |
| **POST** | `/api/v1/ai/assistant/chat` | `aiController.chatAssistant` | `aiService.chatAssistant` | Yes | `assistantId`, `message` |
| **POST** | `/api/v1/ai/route-optimizations` | `aiController.routeOptimization` | `aiService.routeOptimization` | Yes | `optimizationType`, `startLocation`, `endLocation`, `waypoints[]` |

---

## 📂 2. Detailed Endpoint Documentation

### 👥 2.1. User & Authentication Services

#### POST `/api/v1/user/auth/register`
- **Controller**: `userController.registerUser`
- **Service**: `userService.registerUser`
- **Auth Required**: No

**Request Body Schema**:
```typescript
{
  firstName: string;        // Required
  lastName: string;         // Required
  email: string;            // Required, unique
  phone: string;            // Optional, BD phone (+8801XXXXXXXXX)
  password: string;         // Required, min 6 characters
  dateOfBirth?: string;     // Optional, ISO Date
  gender?: string;          // Optional
  bloodGroup?: string;      // Optional
  nationalId?: string;      // Optional, 10-17 digits NID
  address?: string;         // Optional
}
```

**Success Scenario Test Payload**:
```json
{
  "firstName": "Abdur",
  "lastName": "Rahman",
  "email": "abdur.rahman.bd@gmail.com",
  "phone": "+8801712345678",
  "password": "StrongPassword2026!",
  "dateOfBirth": "1994-08-15",
  "gender": "MALE",
  "bloodGroup": "O_POSITIVE",
  "nationalId": "5501234567",
  "address": "Holding 12, Road 4, Sector 11, Uttara, Dhaka-1230"
}
```
**Validation Failure Scenario (Missing Password)**:
```json
{
  "firstName": "Abdur",
  "lastName": "Rahman",
  "email": "abdur.rahman.bd@gmail.com"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Abdur",
    "lastName": "Rahman",
    "email": "abdur.rahman.bd@gmail.com",
    "phone": "+8801712345678",
    "password": "StrongPassword2026!",
    "dateOfBirth": "1994-08-15",
    "gender": "MALE",
    "bloodGroup": "O_POSITIVE",
    "nationalId": "5501234567",
    "address": "Holding 12, Road 4, Sector 11, Uttara, Dhaka-1230"
  }'
```

---

#### POST `/api/v1/user/auth/verify-otp`
- **Controller**: `userController.verifyOtp`
- **Service**: `userService.verifyOtp`
- **Auth Required**: No

**Request Body Schema**:
```typescript
{
  email: string; // Required
  otp: string;   // Required, 6 digits
}
```
**Success Test Data**:
```json
{
  "email": "abdur.rahman.bd@gmail.com",
  "otp": "123456"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/user/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "abdur.rahman.bd@gmail.com",
    "otp": "123456"
  }'
```

---

#### POST `/api/v1/user/auth/login`
- **Controller**: `userController.loginUser`
- **Service**: `userService.loginUser`
- **Auth Required**: No

**Request Body Schema**:
```typescript
{
  email: string;    // Required
  password: string; // Required
}
```
**Success Test Data**:
```json
{
  "email": "abdur.rahman.bd@gmail.com",
  "password": "StrongPassword2026!"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "abdur.rahman.bd@gmail.com",
    "password": "StrongPassword2026!"
  }'
```

---

### 💰 2.2. Donation Management

#### POST `/api/v1/donation/`
- **Controller**: `donationController.processDonation`
- **Service**: `donationService.processDonation`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  donorId: string;           // Required
  amount: number;            // Required, must be positive
  campaignId?: string;       // Optional
  projectId?: string;        // Optional
  paymentMethod: string;     // Required (e.g. "BKASH", "NAGAD", "CARD")
  transactionId: string;     // Required, unique gateway trx ID
  currency?: string;         // Optional, default: "BDT"
  isAnonymous?: boolean;     // Optional, default: false
  message?: string;          // Optional
}
```
**Success Test Data**:
```json
{
  "donorId": "dnr-dhaka-102",
  "amount": 5000,
  "campaignId": "cmp-flood-relief-2026",
  "paymentMethod": "BKASH",
  "transactionId": "TRX-BKASH-89823X892",
  "currency": "BDT",
  "isAnonymous": false,
  "message": "Assisting flood victims in Mohammadpur"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/donation/ \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-default-mock" \
  -d '{
    "donorId": "dnr-dhaka-102",
    "amount": 5000,
    "campaignId": "cmp-flood-relief-2026",
    "paymentMethod": "BKASH",
    "transactionId": "TRX-BKASH-89823X892",
    "currency": "BDT",
    "isAnonymous": false,
    "message": "Assisting flood victims in Mohammadpur"
  }'
```

---

### 🚀 2.3. Campaigns & Transparency

#### POST `/api/v1/campaigns/`
- **Controller**: `campaignsController.createCampaign`
- **Service**: `campaignsService.createCampaign`
- **Auth Required**: Yes (Admin only)

**Request Body Schema**:
```typescript
{
  title: string;             // Required
  slug: string;              // Required, unique
  category_name?: string;    // Optional (e.g. "Disaster Relief")
  description?: string;      // Optional
  short_description?: string;// Optional
  campaign_type: string;     // Required (e.g. "EMERGENCY" / "PROJECT")
  target_amount: number;     // Required
  start_date: string;        // Required, ISO date string
  end_date?: string;         // Optional
  thumbnail?: string;        // Optional
  banner?: string;           // Optional
}
```
**Success Test Data**:
```json
{
  "title": "Flood Relief savar 2026",
  "slug": "flood-relief-savar-2026",
  "category_name": "Disaster Relief",
  "description": "Providing urgent support, dry food, and medical kits to families in Savar",
  "campaign_type": "EMERGENCY",
  "target_amount": 1500000,
  "start_date": "2026-07-20T00:00:00.000Z",
  "end_date": "2026-08-30T23:59:59.000Z"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/campaigns/ \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "title": "Flood Relief savar 2026",
    "slug": "flood-relief-savar-2026",
    "category_name": "Disaster Relief",
    "campaign_type": "EMERGENCY",
    "target_amount": 1500000,
    "start_date": "2026-07-20T00:00:00.000Z"
  }'
```

---

### 🏢 2.4. Governance & Branch Management

#### POST `/api/v1/governance/branches`
- **Controller**: `governanceController.createBranch`
- **Service**: `governanceService.createBranch`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  organizationId: string;    // Required
  branchCode: string;        // Required, unique
  branchName: string;        // Required
  branchType: string;        // Required (e.g. "HEAD_OFFICE", "DISTRICT_OFFICE")
  address: string;           // Required
  phone?: string;            // Optional
  email?: string;            // Optional
  divisionId?: string;       // Optional
  districtId?: string;       // Optional
  upazilaId?: string;        // Optional
  unionId?: string;          // Optional
}
```
**Success Test Data**:
```json
{
  "organizationId": "org-mock-1",
  "branchCode": "BR-SAVAR-001",
  "branchName": "Savar District Branch Office",
  "branchType": "DISTRICT_OFFICE",
  "address": "Holding 45, Bazar Road, Savar, Dhaka",
  "phone": "+8801812345678",
  "email": "savar.branch@ashray-bd.org",
  "divisionId": "div-dhaka",
  "districtId": "dist-dhaka"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/governance/branches \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "organizationId": "org-mock-1",
    "branchCode": "BR-SAVAR-001",
    "branchName": "Savar District Branch Office",
    "branchType": "DISTRICT_OFFICE",
    "address": "Holding 45, Bazar Road, Savar, Dhaka",
    "phone": "+8801812345678",
    "email": "savar.branch@ashray-bd.org"
  }'
```

---

### 🤲 2.5. Beneficiary Management

#### POST `/api/v1/beneficiary/`
- **Controller**: `beneficiaryController.registerBeneficiary`
- **Service**: `beneficiaryService.registerBeneficiary`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  fullName: string;          // Required
  branchId: string;          // Required
  phone?: string;            // Optional
  nationalId?: string;       // Optional
  occupation?: string;       // Optional
  monthlyIncome?: number;    // Optional
}
```
**Success Test Data**:
```json
{
  "fullName": "Mst. Rokeya Begum",
  "phone": "+8801999888777",
  "nationalId": "1992261728392",
  "branchId": "br-dhaka-1",
  "occupation": "Day Laborer",
  "monthlyIncome": 12000
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/beneficiary/ \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-default-mock" \
  -d '{
    "fullName": "Mst. Rokeya Begum",
    "phone": "+8801999888777",
    "nationalId": "1992261728392",
    "branchId": "br-dhaka-1",
    "occupation": "Day Laborer",
    "monthlyIncome": 12000
  }'
```

---

### 🙋 2.6. Volunteer Services

#### POST `/api/v1/volunteer/register`
- **Controller**: `volunteerController.registerVolunteer`
- **Service**: `volunteerService.registerVolunteer`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  user_id?: string;             // Optional (defaults to x-user-id header)
  branch_id: string;            // Required
  profession?: string;          // Optional
  organization?: string;        // Optional
  skills?: string[];            // Optional
  languages?: string[];         // Optional
  emergency_contact?: string;   // Optional
  blood_group?: string;         // Optional
  experience?: string;          // Optional
}
```
**Success Test Data**:
```json
{
  "branch_id": "br-dhaka-1",
  "profession": "Software Engineer",
  "organization": "Jevox Bangladesh Ltd.",
  "skills": ["Rescue Operations", "First Aid", "Tech Support"],
  "languages": ["Bengali", "English"],
  "emergency_contact": "+8801511223344",
  "blood_group": "B_POSITIVE",
  "experience": "2 years of local relief distribution volunteering"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/volunteer/register \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-vol-909" \
  -d '{
    "branch_id": "br-dhaka-1",
    "profession": "Software Engineer",
    "organization": "Jevox Bangladesh Ltd.",
    "skills": ["Rescue Operations", "First Aid"],
    "languages": ["Bengali", "English"],
    "emergency_contact": "+8801511223344",
    "blood_group": "B_POSITIVE",
    "experience": "2 years of local relief distribution volunteering"
  }'
```

---

### 🔔 2.7. Notifications Engine

#### POST `/api/v1/admin/notifications`
- **Controller**: `notificationController.createNotification`
- **Service**: `notificationService.createNotification`
- **Auth Required**: Yes (Admin only)

**Request Body Schema**:
```typescript
{
  title: string;              // Required
  message: string;            // Required
  type: string;               // Required (e.g. "BROADCAST", "PERSONAL")
  priority: string;           // Required ("LOW", "MEDIUM", "HIGH", "CRITICAL")
  channels: string[];         // Required (e.g. ["in_app", "push", "email"])
  target_audience: string;    // Required (e.g. "ALL", "DONORS", "VOLUNTEERS")
  template_variables?: any;   // Optional
  scheduled_at?: string;      // Optional
}
```
**Success Test Data**:
```json
{
  "title": "Winter Blanket Distribution Drive 2026",
  "message": "Blanket distribution starts tomorrow morning in Kurigram branch. Volunteers please report by 8:00 AM.",
  "type": "BROADCAST",
  "priority": "HIGH",
  "channels": ["in_app", "push", "sms"],
  "target_audience": "VOLUNTEERS"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/admin/notifications \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "title": "Winter Blanket Distribution Drive 2026",
    "message": "Blanket distribution starts tomorrow morning in Kurigram branch. Volunteers please report by 8:00 AM.",
    "type": "BROADCAST",
    "priority": "HIGH",
    "channels": ["in_app", "push", "sms"],
    "target_audience": "VOLUNTEERS"
  }'
```

---

#### POST `/api/v1/admin/emergency-alerts`
- **Controller**: `notificationController.createEmergencyAlert`
- **Service**: `notificationService.createEmergencyAlert`
- **Auth Required**: Yes (Admin only)

**Request Body Schema**:
```typescript
{
  title: string;              // Required
  description: string;        // Required
  campaign_id?: string;       // Optional
  priority: string;           // Required ("HIGH" or "CRITICAL")
  target_area: string;        // Required (e.g. "Mohammadpur, Dhaka")
  expires_at: string;         // Required, ISO date string
  channels: string[];         // Required (e.g. ["push", "sms"])
}
```
**Success Test Data**:
```json
{
  "title": "Severe Cyclone Alert - Coastal Branches",
  "description": "Immediate warning to all branches in Cox's Bazar and Patuakhali. Prepare emergency shelters.",
  "priority": "CRITICAL",
  "target_area": "Cox's Bazar",
  "expires_at": "2026-07-22T00:00:00.000Z",
  "channels": ["push", "sms", "email"]
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/admin/emergency-alerts \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "title": "Severe Cyclone Alert - Coastal Branches",
    "description": "Immediate warning to all branches in Cox'\''s Bazar and Patuakhali. Prepare emergency shelters.",
    "priority": "CRITICAL",
    "target_area": "Cox'\''s Bazar",
    "expires_at": "2026-07-22T00:00:00.000Z",
    "channels": ["push", "sms", "email"]
  }'
```

---

### 🎫 2.8. Support Helpdesk

#### POST `/api/v1/support/tickets`
- **Controller**: `supportController.openTicket`
- **Service**: `supportService.openTicket`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  subject: string;            // Required
  description: string;        // Required
  category: string;           // Required (e.g. "DONATION_ISSUE", "MEMBERSHIP", "TECHNICAL")
  priority?: string;          // Optional, default: "MEDIUM"
}
```
**Success Test Data**:
```json
{
  "subject": "Donation deducted twice from Bkash wallet",
  "description": "I made a BDT 5,000 donation but my bKash account balance got debited twice. Transition ID is BK-9283X8.",
  "category": "DONATION_ISSUE",
  "priority": "HIGH"
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/support/tickets \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-default-mock" \
  -d '{
    "subject": "Donation deducted twice from Bkash wallet",
    "description": "I made a BDT 5,000 donation but my bKash account balance got debited twice. Transition ID is BK-9283X8.",
    "category": "DONATION_ISSUE",
    "priority": "HIGH"
  }'
```

---

#### POST `/api/v1/support/tickets/:id/replies`
- **Controller**: `supportController.submitReply`
- **Service**: `supportService.submitReply`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  message: string;            // Required
  isStaff?: boolean;          // Optional, default: false
}
```
**Success Test Data**:
```json
{
  "message": "We have checked with Bkash. One transaction has been cancelled and BDT 5,000 will be refunded within 3 days.",
  "isStaff": true
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/support/tickets/tkt-101/replies \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "message": "We have checked with Bkash. One transaction has been cancelled and BDT 5,000 will be refunded within 3 days.",
    "isStaff": true
  }'
```

---

### 📊 2.9. Reports & Telemetry

#### POST `/api/v1/reports`
- **Controller**: `analyticsController.generateReport`
- **Service**: `analyticsService.generateReport`
- **Auth Required**: Yes (Admin only)

**Request Body Schema**:
```typescript
{
  reportName: string;         // Required
  reportType: string;         // Required (e.g. "PDF", "EXCEL")
  templateId?: string;        // Optional
  parameters?: any;           // Optional parameters like date ranges, branchIds
}
```
**Success Test Data**:
```json
{
  "reportName": "Q2_Branch_Performance_Report_2026",
  "reportType": "PDF",
  "templateId": "tmpl-quarterly-standard",
  "parameters": {
    "branchId": "br-dhaka-1",
    "start_date": "2026-04-01",
    "end_date": "2026-06-30"
  }
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/reports \
  -H "Content-Type: application/json" \
  -H "x-user-id: admin-mock" \
  -d '{
    "reportName": "Q2_Branch_Performance_Report_2026",
    "reportType": "PDF",
    "parameters": {
      "branchId": "br-dhaka-1"
    }
  }'
```

---

### 🤖 2.10. AI Assistant & Optimizations

#### POST `/api/v1/ai/assistant/chat`
- **Controller**: `aiController.chatAssistant`
- **Service**: `aiService.chatAssistant`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  assistantId: string;        // Required
  message: string;            // Required
}
```
**Success Test Data**:
```json
{
  "assistantId": "ai-relief-planner",
  "message": "Find volunteers with medical rescue skills located in Dhaka branch territory."
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/ai/assistant/chat \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-default-mock" \
  -d '{
    "assistantId": "ai-relief-planner",
    "message": "Find volunteers with medical rescue skills located in Dhaka branch territory."
  }'
```

---

#### POST `/api/v1/ai/route-optimizations`
- **Controller**: `aiController.routeOptimization`
- **Service**: `aiService.routeOptimization`
- **Auth Required**: Yes

**Request Body Schema**:
```typescript
{
  optimizationType: string;   // Required (e.g. "SHORTEST_PATH", "TRAFFIC_AWARE")
  startLocation: string;      // Required (coordinates, "latitude,longitude")
  endLocation: string;        // Required (coordinates, "latitude,longitude")
  waypoints: string[];        // Required (array of coordinates)
}
```
**Success Test Data**:
```json
{
  "optimizationType": "SHORTEST_PATH",
  "startLocation": "23.7645,90.3542",
  "endLocation": "23.7700,90.3600",
  "waypoints": ["23.7650,90.3550", "23.7680,90.3590"]
}
```
**cURL Command**:
```bash
curl -X POST http://localhost:5000/api/v1/ai/route-optimizations \
  -H "Content-Type: application/json" \
  -H "x-user-id: usr-default-mock" \
  -d '{
    "optimizationType": "SHORTEST_PATH",
    "startLocation": "23.7645,90.3542",
    "endLocation": "23.7700,90.3600",
    "waypoints": ["23.7650,90.3550", "23.7680,90.3590"]
  }'
```

---

## 🛑 3. Verification & Validation Failure Payloads

The following payloads represent scenarios designed to trigger validation failure in the controllers or service layers.

### ⚠️ Scenario A: Validation Failure (Missing Required Field)
- **Endpoint**: `/api/v1/user/auth/register`
- **Reason**: `firstName` is missing.
- **Payload**:
```json
{
  "lastName": "Rahman",
  "email": "invalid.fields@domain.com",
  "password": "Password123!"
}
```
- **Expected Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Required fields are missing."
}
```

### ⚠️ Scenario B: Validation Failure (Invalid Data Type)
- **Endpoint**: `/api/v1/donation/`
- **Reason**: `amount` is negative or formatted as an invalid alphanumeric string in an endpoint that rejects non-positive/non-numbers.
- **Payload**:
```json
{
  "donorId": "dnr-dhaka-102",
  "amount": -500.50,
  "paymentMethod": "BKASH",
  "transactionId": "TRX-FAILED-101"
}
```
- **Expected Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Missing required parameters or donation amount must be a positive number."
}
```
