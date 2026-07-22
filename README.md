Nonprofit Organization Management System

// ===== USER DOMAIN =====
user [icon: user, color: yellow] {
  id string pk
  name string
  email string
  emailVerified boolean
  image string
  role string
  banned boolean
  banReason string
  banExpires Date
  createdAt Date
  updatedAt Date
}

UserProfile [icon: user-check, color: yellow] {
  id string pk
  userId string fk
  fatherName string
  motherName string
  occupation string
  organization string
  designation string
  education string
  bio text
  facebook string
  linkedin string
  website string
  createdAt Date
  updatedAt Date
}

UserDevice [icon: smartphone, color: yellow] {
  id string pk
  userId string fk
  deviceId string
  deviceName string
  deviceType enum
  operatingSystem string
  browser string
  appVersion string
  ipAddress string
  lastLogin Date
  createdAt Date
  updatedAt Date
}

UserSession [icon: key, color: yellow] {
  id string pk
  userId string fk
  deviceId string fk
  accessToken string
  refreshToken string
  expiresAt Date
  loginTime Date
  logoutTime Date
  status enum
  createdAt Date
}

UserToken [icon: lock, color: yellow] {
  id string pk
  userId string fk
  token string
  tokenType enum
  expiresAt Date
  isUsed boolean
  createdAt Date
}

UserOTP [icon: hash, color: yellow] {
  id string pk
  userId string fk
  phone string
  otp string
  purpose enum
  expiresAt Date
  verifiedAt Date
  status enum
  createdAt Date
}

UserLoginHistory [icon: log-in, color: yellow] {
  id string pk
  userId string fk
  deviceId string fk
  ipAddress string
  location string
  loginTime Date
  logoutTime Date
  status enum
  createdAt Date
}

UserNotificationSetting [icon: bell, color: yellow] {
  id string pk
  userId string fk
  pushNotification boolean
  emailNotification boolean
  smsNotification boolean
  campaignNotification boolean
  emergencyNotification boolean
  newsletter boolean
  createdAt Date
  updatedAt Date
}

UserSecurity [icon: shield, color: yellow] {
  id string pk
  userId string fk
  twoFactorEnabled boolean
  securityQuestion string
  securityAnswer string
  failedLoginAttempts int
  accountLocked boolean
  lastPasswordChanged Date
  createdAt Date
  updatedAt Date
}

UserAddress [icon: map-pin, color: yellow] {
  id string pk
  userId string fk
  countryId string fk
  divisionId string fk
  districtId string fk
  upazilaId string fk
  unionId string fk
  village string
  postCode string
  addressLine string
  latitude decimal
  longitude decimal
  isDefault boolean
}

// ===== ROLE & PERMISSION DOMAIN =====
Role [icon: shield, color: red] {
  id string pk
  roleName string
  displayName string
  description text
  roleType enum
  priority int
  status enum
  createdAt Date
  updatedAt Date
}

Permission [icon: key, color: red] {
  id string pk
  permissionName string
  module string
  description text
  createdAt Date
  updatedAt Date
}

RolePermission [icon: lock, color: red] {
  id string pk
  roleId string fk
  permissionId string fk
  canView boolean
  canCreate boolean
  canUpdate boolean
  canDelete boolean
  canApprove boolean
  createdAt Date
  updatedAt Date
}

UserRole [icon: user-check, color: red] {
  id string pk
  userId string fk
  roleId string fk
  assignedBy string fk
  assignedDate Date
  status enum
  createdAt Date
  updatedAt Date
}

StaffRole [icon: briefcase, color: red] {
  id string pk
  staffId string fk
  roleId string fk
  department string
  designation string
  joiningDate Date
  status enum
  createdAt Date
  updatedAt Date
}

VolunteerRole [icon: user-plus, color: red] {
  id string pk
  volunteerId string fk
  roleId string fk
  assignedArea string
  responsibility text
  startDate Date
  endDate Date
  status enum
  createdAt Date
  updatedAt Date
}

CoordinatorRole [icon: map, color: red] {
  id string pk
  coordinatorId string fk
  roleId string fk
  organizationLevel enum
  divisionId string fk
  districtId string fk
  upazilaId string fk
  unionId string fk
  assignedDate Date
  status enum
  createdAt Date
  updatedAt Date
}

CommitteeRole [icon: users, color: red] {
  id string pk
  committeeId string fk
  memberId string fk
  role enum
  startDate Date
  endDate Date
  status enum
  createdAt Date
  updatedAt Date
}

AdminPermission [icon: check-square, color: red] {
  id string pk
  adminId string fk
  module string
  canView boolean
  canCreate boolean
  canUpdate boolean
  canDelete boolean
  canApprove boolean
  canExport boolean
  createdAt Date
  updatedAt Date
}

RoleHierarchy [icon: layers, color: red] {
  id string pk
  parentRoleId string fk
  childRoleId string fk
  hierarchyLevel int
  createdAt Date
  updatedAt Date
}

AccessLog [icon: list, color: red] {
  id string pk
  userId string fk
  roleId string fk
  module string
  action string
  ipAddress string
  device string
  browser string
  createdAt Date
}

// ===== MEMBERSHIP DOMAIN =====
Membership [icon: award, color: purple] {
  id string pk
  userId string fk
  membershipNumber string
  membershipType enum
  organizationRole string
  joiningDate Date
  expiryDate Date
  monthlyContribution decimal
  status enum
  approvedBy string fk
  approvedAt Date
  createdAt Date
  updatedAt Date
}

MembershipCard [icon: credit-card, color: purple] {
  id string pk
  membershipId string fk
  cardNumber string
  cardType enum
  issueDate Date
  expiryDate Date
  cardStatus enum
  profilePhoto string
  signature string
  createdAt Date
  updatedAt Date
}

MembershipQRCode [icon: maximize, color: purple] {
  id string pk
  membershipCardId string fk
  qrCode string
  barcode string
  verificationUrl string
  scanCount int
  lastScannedAt Date
  createdAt Date
  updatedAt Date
}

MembershipVerification [icon: check-circle, color: purple] {
  id string pk
  membershipId string fk
  verificationMethod enum
  verifiedBy string fk
  verificationStatus enum
  verificationDate Date
  remarks text
  createdAt Date
  updatedAt Date
}

MembershipRenewal [icon: refresh-cw, color: purple] {
  id string pk
  membershipId string fk
  renewalDate Date
  renewalAmount decimal
  paymentStatus enum
  nextExpiryDate Date
  processedBy string fk
  createdAt Date
  updatedAt Date
}

MembershipActivity [icon: activity, color: purple] {
  id string pk
  membershipId string fk
  activityType string
  description text
  performedBy string fk
  ipAddress string
  createdAt Date
}

// ===== ORGANIZATION DOMAIN =====
Organization [icon: building, color: green] {
  id string pk
  organizationName string
  organizationCode string
  registrationNumber string
  logo string
  email string
  phone string
  website string
  description text
  foundedDate Date
  status boolean
  createdAt Date
  updatedAt Date
}

Branch [icon: git-branch, color: green] {
  id string pk
  organizationId string fk
  branchName string
  branchCode string
  branchType enum
  divisionId string fk
  districtId string fk
  upazilaId string fk
  unionId string fk
  address string
  latitude decimal
  longitude decimal
  phone string
  email string
  managerId string fk
  status boolean
  createdAt Date
  updatedAt Date
}

Employee [icon: briefcase, color: green] {
  id string pk
  userId string fk
  employeeCode string
  designation string
  department string
  joiningDate Date
  status boolean
  createdAt Date
  updatedAt Date
}

BranchManager [icon: user-check, color: green] {
  id string pk
  branchId string fk
  userId string fk
  assignedDate Date
  status string
  createdAt Date
  updatedAt Date
}

BranchStaff [icon: users, color: green] {
  id string pk
  branchId string fk
  userId string fk
  designation string
  status string
  createdAt Date
  updatedAt Date
}

// ===== GEOGRAPHY DOMAIN =====
Country [icon: globe, color: blue] {
  id string pk
  name string
  code string
  createdAt Date
  updatedAt Date
}

Division [icon: map, color: blue] {
  id string pk
  name string
  code string
  createdAt Date
  updatedAt Date
}

District [icon: map-pin, color: blue] {
  id string fk
  divisionId string fk
  name string
  code string
  createdAt Date
  updatedAt Date
}

Upazila [icon: navigation, color: blue] {
  id string pk
  districtId string fk
  name string
  code string
  createdAt Date
  updatedAt Date
}

Union [icon: home, color: blue] {
  id string pk
  upazilaId string fk
  name string
  code string
  createdAt Date
  updatedAt Date
}

// ===== CAMPAIGN DOMAIN =====
CampaignCategory [icon: folder, color: orange] {
  id string pk
  name string
  icon string
  description text
  status boolean
  createdAt Date
  updatedAt Date
}

Campaign [icon: flag, color: orange] {
  id string pk
  campaignCode string
  title string
  slug string
  categoryId string fk
  description text
  shortDescription string
  campaignType enum
  targetAmount decimal
  raisedAmount decimal
  startDate Date
  endDate Date
  thumbnail string
  banner string
  status boolean
  createdBy string fk
  createdAt Date
  updatedAt Date
}

CampaignGoal [icon: target, color: orange] {
  id string pk
  campaignId string fk
  goalTitle string
  targetAmount decimal
  currentAmount decimal
  progressPercentage float
  status boolean
  createdAt Date
  updatedAt Date
}

CampaignMilestone [icon: flag, color: orange] {
  id string pk
  campaignId string fk
  title string
  description text
  targetAmount decimal
  achievedAt Date
  status boolean
  createdAt Date
  updatedAt Date
}

CampaignMedia [icon: image, color: orange] {
  id string pk
  campaignId string fk
  mediaType enum
  title string
  fileUrl string
  thumbnail string
  uploadedBy string fk
  createdAt Date
  updatedAt Date
}

CampaignDonation [icon: heart, color: orange] {
  id string pk
  campaignId string fk
  donationId string fk
  donorId string fk
  amount decimal
  paymentStatus enum
  createdAt Date
}

EmergencyCampaign [icon: alert-triangle, color: red] {
  id string pk
  campaignId string fk
  emergencyType enum
  priority enum
  affectedArea string
  requiredAmount decimal
  currentAmount decimal
  status boolean
  createdAt Date
  updatedAt Date
}

Donation [icon: dollar-sign, color: orange] {
  id string pk
  donationCode string
  donorId string fk
  amount decimal
  campaignId string fk
  projectId string fk
  paymentMethod string
  transactionId string
  currency string
  isAnonymous boolean
  message text
  status string
  createdAt Date
  updatedAt Date
}

// ===== PROJECT DOMAIN =====
ProjectCategory [icon: layers, color: gray] {
  id string pk
  name string
  description text
  status boolean
  createdAt Date
  updatedAt Date
}

Project [icon: clipboard, color: gray] {
  id string pk
  projectCode string
  campaignId string fk
  projectName string
  description text
  branchId string fk
  startDate Date
  endDate Date
  projectManagerId string fk
  status boolean
  createdAt Date
  updatedAt Date
}

ProjectBudget [icon: dollar-sign, color: gray] {
  id string pk
  projectId string fk
  estimatedBudget decimal
  approvedBudget decimal
  allocatedBudget decimal
  remainingBudget decimal
  approvedBy string fk
  createdAt Date
  updatedAt Date
}

ProjectExpense [icon: credit-card, color: gray] {
  id string pk
  projectId string fk
  expenseCategory string
  description text
  amount decimal
  expenseDate Date
  approvedBy string fk
  status boolean
  createdAt Date
  updatedAt Date
}

ProjectBeneficiary [icon: users, color: gray] {
  id string pk
  projectId string fk
  beneficiaryName string
  phone string
  address string
  districtId string fk
  beneficiaryType string
  assistanceType string
  status boolean
  createdAt Date
  updatedAt Date
}

ProjectVolunteer [icon: user-plus, color: gray] {
  id string pk
  projectId string fk
  volunteerId string fk
  assignedRole string
  assignedDate Date
  completionStatus boolean
  createdAt Date
  updatedAt Date
}

ProjectGallery [icon: camera, color: gray] {
  id string pk
  projectId string fk
  title string
  mediaType enum
  fileUrl string
  uploadedBy string fk
  createdAt Date
  updatedAt Date
}

ProjectUpdate [icon: edit, color: gray] {
  id string pk
  projectId string fk
  title string
  description text
  progressPercentage float
  publishedBy string fk
  createdAt Date
  updatedAt Date
}

ProjectTimeline [icon: clock, color: gray] {
  id string pk
  projectId string fk
  event string
  description text
  eventDate Date
  createdBy string fk
  createdAt Date
}

ProjectReport [icon: file-text, color: gray] {
  id string pk
  projectId string fk
  reportTitle string
  summary text
  beneficiariesCount int
  totalExpense decimal
  reportFile string
  publishedBy string fk
  publishedAt Date
  createdAt Date
}

FundAllocation [icon: trending-up, color: gray] {
  id string pk
  campaignId string fk
  projectId string fk
  allocatedAmount decimal
  allocationDate Date
  approvedBy string fk
  remarks text
  createdAt Date
  updatedAt Date
}

ExpenseAttachment [icon: paperclip, color: gray] {
  id string pk
  expenseId string fk
  fileName string
  fileUrl string
  fileType string
  uploadedBy string fk
  createdAt Date
}

// ===== DONOR DOMAIN =====
Donor [icon: heart, color: teal] {
  id string pk
  userId string fk
  donorCode string
  donorType string
  membershipId string fk
  registrationDate Date
  status string
  createdAt Date
  updatedAt Date
}

IndividualDonor [icon: user, color: teal] {
  id string pk
  donorId string fk
  profession string
  organization string
  monthlyCommitment decimal
  preferredCampaign string
  status string
  createdAt Date
  updatedAt Date
}

CorporateDonor [icon: building, color: teal] {
  id string pk
  donorId string fk
  companyName string
  companyRegistrationNo string
  tradeLicense string
  contactPerson string
  designation string
  website string
  logo string
  monthlyCommitment decimal
  status string
  createdAt Date
  updatedAt Date
}

DonorPreference [icon: settings, color: teal] {
  id string pk
  donorId string fk
  preferredCategory string
  preferredCampaign string
  anonymousDonation boolean
  emailNotification boolean
  smsNotification boolean
  pushNotification boolean
  createdAt Date
  updatedAt Date
}

DonorSubscription [icon: repeat, color: teal] {
  id string pk
  donorId string fk
  subscriptionType string
  amount decimal
  billingCycle string
  startDate Date
  nextBillingDate Date
  status string
  createdAt Date
  updatedAt Date
}

DonationCommitment [icon: check-square, color: teal] {
  id string pk
  donorId string fk
  campaignId string fk
  pledgedAmount decimal
  pledgeDate Date
  fulfilledAmount decimal
  status string
  createdAt Date
  updatedAt Date
}

DonorWallet [icon: wallet, color: teal] {
  id string pk
  donorId string fk
  balance decimal
  currency string
  lastUpdated Date
  createdAt Date
  updatedAt Date
}

DonorWalletTransaction [icon: file-text, color: teal] {
  id string pk
  walletId string fk
  amount decimal
  transactionType string
  description string
  referenceId string
  createdAt Date
}

DonorCertificate [icon: award, color: teal] {
  id string pk
  donorId string fk
  certificateType string
  certificateNumber string
  issueDate Date
  certificateUrl string
  createdAt Date
  updatedAt Date
}

DonorBadge [icon: star, color: teal] {
  id string pk
  donorId string fk
  badgeType string
  badgeName string
  icon string
  awardedDate Date
  createdAt Date
  updatedAt Date
}

DonorActivity [icon: activity, color: teal] {
  id string pk
  donorId string fk
  activityType string
  description text
  performedBy string
  createdAt Date
}

// ===== VOLUNTEER DOMAIN =====
Volunteer [icon: user-check, color: pink] {
  id string pk
  userId string fk
  volunteerCode string
  branchId string fk
  membershipId string fk
  joiningDate Date
  experience text
  status string
  createdAt Date
  updatedAt Date
}

VolunteerProfile [icon: info, color: pink] {
  id string pk
  volunteerId string fk
  profession string
  organization string
  skills text
  languages text
  emergencyContact string
  bloodGroup string
  availability text
  createdAt Date
  updatedAt Date
}

VolunteerSkill [icon: tool, color: pink] {
  id string pk
  volunteerId string fk
  skillName string
  skillLevel string
  experienceYears int
  verifiedBy string
  createdAt Date
  updatedAt Date
}

VolunteerAvailability [icon: calendar, color: pink] {
  id string pk
  volunteerId string fk
  availableDays array
  availableFrom string
  availableTo string
  isAvailable boolean
  createdAt Date
  updatedAt Date
}

VolunteerPerformance [icon: activity, color: pink] {
  id string pk
  volunteerId string fk
  totalAssignments int
  completedAssignments int
  attendanceRate float
  performanceScore float
  rating float
  createdAt Date
  updatedAt Date
}

VolunteerReward [icon: gift, color: pink] {
  id string pk
  volunteerId string fk
  rewardType string
  title string
  description text
  rewardDate Date
  createdAt Date
  updatedAt Date
}

VolunteerCertificate [icon: award, color: pink] {
  id string pk
  volunteerId string fk
  certificateType string
  certificateNumber string
  issueDate Date
  certificateUrl string
  createdAt Date
  updatedAt Date
}

VolunteerExpense [icon: dollar-sign, color: pink] {
  id string pk
  volunteerId string fk
  activityId string fk
  expenseType string
  amount decimal
  description text
  receiptUrl string
  status string
  approvedBy string fk
  createdAt Date
  updatedAt Date
}

VolunteerDocument [icon: file, color: pink] {
  id string pk
  volunteerId string fk
  documentType string
  documentNumber string
  fileUrl string
  verificationStatus string
  createdAt Date
  updatedAt Date
}

VolunteerActivityLog [icon: list, color: pink] {
  id string pk
  volunteerId string fk
  activity string
  performedBy string
  createdAt Date
}

VolunteerTask [icon: check-square, color: pink] {
  id string pk
  taskName string
  description text
  projectId string fk
  priority string
  status string
  createdAt Date
  updatedAt Date
}

TaskAssignment [icon: user-plus, color: pink] {
  id string pk
  taskId string fk
  volunteerId string fk
  assignedDate Date
  status string
  createdAt Date
  updatedAt Date
}

VolunteerSchedule [icon: clock, color: pink] {
  id string pk
  volunteerId string fk
  activityId string fk
  shiftDate Date
  startTime string
  endTime string
  status string
  createdAt Date
  updatedAt Date
}

VolunteerGroup [icon: users, color: pink] {
  id string pk
  groupName string
  description text
  branchId string fk
  status string
  createdAt Date
  updatedAt Date
}

GroupMember [icon: user-minus, color: pink] {
  id string pk
  groupId string fk
  volunteerId string fk
  joinedDate Date
  role string
  status string
  createdAt Date
  updatedAt Date
}

// ===== BENEFICIARY DOMAIN =====
Beneficiary [icon: heart, color: red] {
  id string pk
  beneficiaryCode string
  fullName string
  phone string
  nationalId string
  dateOfBirth Date
  gender string
  branchId string fk
  divisionId string fk
  districtId string fk
  upazilaId string fk
  unionId string fk
  address string
  status string
  createdAt Date
  updatedAt Date
}

BeneficiaryProfile [icon: info, color: red] {
  id string pk
  beneficiaryId string fk
  occupation string
  monthlyIncome decimal
  familySize int
  houseType string
  education string
  healthCondition string
  specialNeeds string
  createdAt Date
  updatedAt Date
}

BeneficiaryDocument [icon: file, color: red] {
  id string pk
  beneficiaryId string fk
  documentType string
  documentNumber string
  fileUrl string
  verificationStatus string
  createdAt Date
  updatedAt Date
}

BeneficiaryQRCode [icon: qr-code, color: red] {
  id string pk
  beneficiaryId string fk
  qrCode string
  barcode string
  verificationUrl string
  createdAt Date
  updatedAt Date
}

BeneficiaryActivityLog [icon: list, color: red] {
  id string pk
  beneficiaryId string fk
  activity string
  description text
  performedBy string
  createdAt Date
}

// ===== DISTRIBUTION DOMAIN =====
BeneficiaryNeedAssessment [icon: activity, color: brown] {
  id string pk
  beneficiaryId string fk
  assessmentType string
  requiredSupport text
  priority string
  assessedBy string
  assessmentDate Date
  createdAt Date
  updatedAt Date
}

DistributionCampaign [icon: flag, color: brown] {
  id string pk
  campaignId string fk
  title string
  distributionDate Date
  location string
  status string
  createdAt Date
  updatedAt Date
}

DistributionSchedule [icon: calendar, color: brown] {
  id string pk
  distributionCampaignId string fk
  branchId string fk
  distributionCenterId string fk
  scheduleDate Date
  startTime string
  endTime string
  status string
  createdAt Date
  updatedAt Date
}

DistributionCenter [icon: home, color: brown] {
  id string pk
  centerName string
  branchId string fk
  address string
  latitude decimal
  longitude decimal
  capacity int
  status string
  createdAt Date
  updatedAt Date
}

DistributionRecord [icon: file-text, color: brown] {
  id string pk
  beneficiaryId string fk
  distributionCampaignId string fk
  packageId string fk
  distributedBy string
  receivedAt Date
  status string
  createdAt Date
  updatedAt Date
}

DistributionItem [icon: box, color: brown] {
  id string pk
  distributionRecordId string fk
  reliefItemId string fk
  quantity float
  remarks text
  createdAt Date
  updatedAt Date
}

DistributionVerification [icon: shield, color: brown] {
  id string pk
  distributionRecordId string fk
  verificationMethod string
  verifiedBy string
  verificationTime Date
  status string
  createdAt Date
  updatedAt Date
}

Acknowledgement [icon: check, color: brown] {
  id string pk
  distributionRecordId string fk
  signature string
  photo string
  remarks text
  createdAt Date
  updatedAt Date
}

BeneficiaryFeedback [icon: message-square, color: brown] {
  id string pk
  beneficiaryId string fk
  distributionRecordId string fk
  rating int
  feedback text
  submittedAt Date
  createdAt Date
}

FollowUpVisit [icon: repeat, color: brown] {
  id string pk
  beneficiaryId string fk
  visitedBy string
  visitDate Date
  remarks text
  nextVisitDate Date
  status string
  createdAt Date
  updatedAt Date
}

CaseHistory [icon: folder, color: brown] {
  id string pk
  beneficiaryId string fk
  caseType string
  description text
  assignedOfficer string
  status string
  createdAt Date
  updatedAt Date
}

ReliefPackage [icon: package, color: brown] {
  id string pk
  packageName string
  description text
  estimatedValue decimal
  status string
  createdAt Date
  updatedAt Date
}

ReliefPackageItem [icon: list, color: brown] {
  id string pk
  reliefPackageId string fk
  reliefItemId string fk
  quantity float
  unit string
  createdAt Date
  updatedAt Date
}

ReliefItem [icon: box, color: brown] {
  id string pk
  itemName string
  itemCode string
  category string
  description text
  unit string
  status string
  createdAt Date
  updatedAt Date
}

// ===== COMMUNICATION & NOTIFICATION DOMAIN =====
Notification [icon: bell, color: indigo] {
  id string pk
  title string
  message text
  type string
  priority string
  scheduledAt Date
  sentAt Date
  status string
  createdAt Date
  updatedAt Date
}

NotificationRecipient [icon: user, color: indigo] {
  id string pk
  notificationId string fk
  userId string fk
  channel string
  status string
  sentAt Date
  readAt Date
  createdAt Date
}

EmergencyAlert [icon: alert-triangle, color: indigo] {
  id string pk
  title string
  message text
  alertType string
  severity string
  affectedArea string
  issuedBy string
  resolvedAt Date
  status string
  createdAt Date
  updatedAt Date
}

EmergencyAlertResolution [icon: check, color: indigo] {
  id string pk
  alertId string fk
  resolvedBy string
  resolutionNote text
  resolvedAt Date
  createdAt Date
  updatedAt Date
}

Announcement [icon: volume-2, color: indigo] {
  id string pk
  title string
  content text
  targetGroup string
  branchId string fk
  priority string
  publishedBy string
  publishedAt Date
  expiresAt Date
  status string
  createdAt Date
  updatedAt Date
}

UserMessage [icon: mail, color: indigo] {
  id string pk
  senderId string fk
  receiverId string fk
  subject string
  message text
  readAt Date
  status string
  createdAt Date
}

Conversation [icon: message-square, color: indigo] {
  id string pk
  title string
  createdBy string
  status string
  createdAt Date
  updatedAt Date
}

ConversationParticipant [icon: user-plus, color: indigo] {
  id string pk
  conversationId string fk
  userId string fk
  joinedAt Date
  leftAt Date
  status string
  createdAt Date
}

ChatMessage [icon: send, color: indigo] {
  id string pk
  conversationId string fk
  senderId string fk
  message text
  messageType string
  attachmentUrl string
  readAt Date
  createdAt Date
}

CommunicationLog [icon: list, color: indigo] {
  id string pk
  communicationType string
  senderId string
  recipientId string
  subject string
  message text
  channel string
  status string
  createdAt Date
}

BroadcastTemplate [icon: file-text, color: indigo] {
  id string pk
  templateName string
  subject string
  body text
  channel string
  status string
  createdAt Date
  updatedAt Date
}

BroadcastHistory [icon: history, color: indigo] {
  id string pk
  templateId string fk
  sentBy string
  recipientCount int
  channel string
  sentAt Date
  status string
  createdAt Date
}

// ===== SUPPORT & HELP TICKETS DOMAIN =====
SupportTicket [icon: life-buoy, color: violet] {
  id string pk
  ticketNumber string
  userId string fk
  subject string
  description text
  category string
  priority string
  status string
  assignedTo string fk
  createdAt Date
  updatedAt Date
}

TicketReply [icon: message-circle, color: violet] {
  id string pk
  ticketId string fk
  userId string fk
  message text
  isStaff boolean
  createdAt Date
  updatedAt Date
}

FAQCategory [icon: folder, color: violet] {
  id string pk
  categoryName string
  description text
  status string
  createdAt Date
  updatedAt Date
}

FAQItem [icon: help-circle, color: violet] {
  id string pk
  categoryId string fk
  question string
  answer text
  status string
  createdAt Date
  updatedAt Date
}

// ===== AI & AUTOMATION DOMAIN =====
AIAssistant [icon: bot, color: cyan] {
  id string pk
  name string
  description text
  modelType string
  capabilities array
  status string
  createdAt Date
  updatedAt Date
}

AIConversation [icon: message-square, color: cyan] {
  id string pk
  assistantId string fk
  userId string fk
  title string
  status string
  createdAt Date
  updatedAt Date
}

AIMessage [icon: send, color: cyan] {
  id string pk
  conversationId string fk
  role string
  content text
  tokenCount int
  createdAt Date
}

AIJob [icon: cpu, color: cyan] {
  id string pk
  modelId string fk
  jobType string
  inputData text
  outputData text
  startedAt Date
  completedAt Date
  duration float
  status string
  createdAt Date
  updatedAt Date
}

AITrainingDataset [icon: database, color: cyan] {
  id string pk
  datasetName string
  datasetType string
  description text
  fileUrl string
  recordCount int
  version string
  status string
  createdAt Date
  updatedAt Date
}

AutoTask [icon: calendar, color: cyan] {
  id string pk
  taskName string
  taskType string
  scheduledAt Date
  executedAt Date
  retryCount int
  maxRetries int
  payload text
  status string
  createdAt Date
  updatedAt Date
}

AutomationLog [icon: history, color: cyan] {
  id string pk
  automationType string
  triggerEvent string
  action string
  entityType string
  entityId string
  status string
  errorMessage text
  executedAt Date
  createdAt Date
}

AIModel [icon: box, color: cyan] {
  id string pk
  modelName string
  modelType string
  description text
  algorithm string
  accuracy float
  status string
  createdAt Date
  updatedAt Date
}

AIModelVersion [icon: file-text, color: cyan] {
  id string pk
  modelId string fk
  versionNo string
  accuracy float
  parameters text
  fileUrl string
  trainedAt Date
  status string
  createdAt Date
  updatedAt Date
}

DemandForecast [icon: trending-up, color: cyan] {
  id string pk
  modelId string fk
  category string
  forecastPeriod string
  predictedDemand float
  confidenceInterval string
  region string
  status string
  createdAt Date
  updatedAt Date
}

DonationPrediction [icon: bar-chart-2, color: cyan] {
  id string pk
  modelId string fk
  donorId string fk
  campaignId string fk
  predictedAmount float
  confidenceScore float
  algorithm string
  status string
  createdAt Date
  updatedAt Date
}

PredictiveAlert [icon: alert-circle, color: cyan] {
  id string pk
  alertType string
  severity string
  title string
  message text
  modelId string fk
  status string
  createdAt Date
  updatedAt Date
}

AIInsight [icon: Eye, color: cyan] {
  id string pk
  insightType string
  category string
  title string
  description text
  dataPoints text
  severity string
  createdAt Date
  updatedAt Date
}

AIRecommendation [icon: star, color: cyan] {
  id string pk
  recommendationType string
  targetUserId string fk
  title string
  description text
  confidenceScore float
  metadata text
  status string
  createdAt Date
  updatedAt Date
}

AIAuditLog [icon: list, color: cyan] {
  id string pk
  modelId string fk
  action string
  input text
  output text
  userId string fk
  ipAddress string
  createdAt Date
}

VerificationLog [icon: check-square, color: cyan] {
  id string pk
  pipelineId string fk
  stepName string
  status string
  duration float
  logDetails text
  verifiedAt Date
  createdAt Date
}

VerificationMetric [icon: bar-chart, color: cyan] {
  id string pk
  pipelineId string fk
  metricName string
  metricValue float
  unit string
  measuredAt Date
  createdAt Date
}

VerificationPipeline [icon: shuffle, color: cyan] {
  id string pk
  pipelineName string
  environment string
  status string
  triggeredBy string
  createdAt Date
  updatedAt Date
}

// ===== ANALYTICS & SECURITY DOMAIN =====
AnalyticsSnapshot [icon: activity, color: amber] {
  id string pk
  snapshotType string
  period string
  data text
  generatedAt Date
  createdAt Date
}

APIKey [icon: key, color: amber] {
  id string pk
  keyName string
  apiKey string
  secretKey string
  permissions array
  expiresAt Date
  isActive boolean
  createdBy string fk
  createdAt Date
  updatedAt Date
}

APIAccessLog [icon: list, color: amber] {
  id string pk
  apiKeyId string fk
  endpoint string
  method string
  statusCode int
  ipAddress string
  responseTime float
  createdAt Date
}

APIAccessPermission [icon: lock, color: amber] {
  id string pk
  roleId string fk
  userId string fk
  endpoint string
  method string
  isAllowed boolean
  createdAt Date
  updatedAt Date
}

SystemHealth [icon: heart, color: amber] {
  id string pk
  serviceName string
  status string
  responseTime float
  cpuUsage float
  memoryUsage float
  diskUsage float
  loggedAt Date
  createdAt Date
}

Backup [icon: hard-drive, color: amber] {
  id string pk
  backupName string
  backupType string
  fileUrl string
  fileSize int
  createdBy string fk
  status string
  createdAt Date
}

BackupHistory [icon: history, color: amber] {
  id string pk
  backupId string fk
  action string
  details text
  performedBy string fk
  createdAt Date
}

BackupEncryption [icon: key, color: amber] {
  id string pk
  backupId string fk
  algorithm string
  keyHash string
  encryptedAt Date
  createdAt Date
}

APIIntegration [icon: share-2, color: amber] {
  id string pk
  integrationName string
  provider string
  status string
  config text
  createdAt Date
  updatedAt Date
}

IntegrationSyncLog [icon: refresh-cw, color: amber] {
  id string pk
  integrationId string fk
  syncStatus string
  recordsSynced int
  errorMessage text
  syncedAt Date
  createdAt Date
}

// ===== CMS & SETTINGS DOMAIN =====
CMSPage [icon: layout, color: sky] {
  id string pk
  title string
  slug string
  content text
  metaTitle string
  metaDesc string
  template string
  status string
  createdAt Date
  updatedAt Date
}

SystemSetting [icon: settings, color: sky] {
  id string pk
  settingKey string
  settingValue text
  description text
  createdAt Date
  updatedAt Date
}

ImpactStory [icon: heart, color: sky] {
  id string pk
  title string
  slug string
  content text
  beneficiaryId string fk
  campaignId string fk
  publishedBy string fk
  status string
  createdAt Date
  updatedAt Date
}

// ===== USER RELATIONSHIPS =====
user.id - UserProfile.userId
user.id < UserDevice.userId
user.id < UserSession.userId
user.id - UserToken.userId
user.id < UserOTP.userId
user.id < UserLoginHistory.userId
user.id - UserNotificationSetting.userId
user.id - UserSecurity.userId
user.id - UserAddress.userId

UserDevice.id < UserSession.deviceId
UserDevice.id < UserLoginHistory.deviceId

// ===== ROLE & PERMISSION RELATIONSHIPS =====
Role.id < RolePermission.roleId
Permission.id < RolePermission.permissionId
user.id < UserRole.userId
Role.id < UserRole.roleId
Employee.id < StaffRole.staffId
Role.id < StaffRole.roleId
user.id < VolunteerRole.volunteerId
Role.id < VolunteerRole.roleId
user.id < CoordinatorRole.coordinatorId
Role.id < CoordinatorRole.roleId
Division.id < CoordinatorRole.divisionId
District.id < CoordinatorRole.districtId
Upazila.id < CoordinatorRole.upazilaId
Union.id < CoordinatorRole.unionId
user.id < CommitteeRole.memberId
user.id < AdminPermission.adminId
Role.id < RoleHierarchy.parentRoleId
Role.id < RoleHierarchy.childRoleId
user.id < AccessLog.userId
Role.id < AccessLog.roleId

// ===== MEMBERSHIP RELATIONSHIPS =====
user.id < Membership.userId
user.id < Membership.approvedBy
Membership.id < MembershipCard.membershipId
MembershipCard.id < MembershipQRCode.membershipCardId
Membership.id < MembershipVerification.membershipId
user.id < MembershipVerification.verifiedBy
Membership.id < MembershipRenewal.membershipId
user.id < MembershipRenewal.processedBy
Membership.id < MembershipActivity.membershipId
user.id < MembershipActivity.performedBy

// ===== ORGANIZATION RELATIONSHIPS =====
Organization.id < Branch.organizationId
user.id < Employee.userId
Employee.id < Branch.managerId
Branch.id < BranchManager.branchId
user.id < BranchManager.userId
Branch.id < BranchStaff.branchId
user.id < BranchStaff.userId

// ===== GEOGRAPHY RELATIONSHIPS =====
Division.id < District.divisionId
District.id < Upazila.districtId
Upazila.id < Union.upazilaId

Division.id < Branch.divisionId
District.id < Branch.districtId
Upazila.id < Branch.upazilaId
Union.id < Branch.unionId

Country.id - UserAddress.countryId
Division.id - UserAddress.divisionId
District.id - UserAddress.districtId
Upazila.id - UserAddress.upazilaId
Union.id - UserAddress.unionId

// ===== CAMPAIGN RELATIONSHIPS =====
CampaignCategory.id < Campaign.categoryId
user.id < Campaign.createdBy
Campaign.id < CampaignGoal.campaignId
Campaign.id < CampaignMilestone.campaignId
Campaign.id < CampaignMedia.campaignId
user.id < CampaignMedia.uploadedBy
Campaign.id < CampaignDonation.campaignId
Donation.id < CampaignDonation.donationId
user.id < CampaignDonation.donorId
Campaign.id < EmergencyCampaign.campaignId
Donor.id < Donation.donorId
Campaign.id < Donation.campaignId
Project.id < Donation.projectId

// ===== PROJECT RELATIONSHIPS =====
Campaign.id < Project.campaignId
Branch.id < Project.branchId
user.id < Project.projectManagerId
Project.id < ProjectBudget.projectId
user.id < ProjectBudget.approvedBy
Project.id < ProjectExpense.projectId
user.id < ProjectExpense.approvedBy
Project.id < ProjectBeneficiary.projectId
District.id < ProjectBeneficiary.districtId
Project.id < ProjectVolunteer.projectId
Volunteer.id < ProjectVolunteer.volunteerId
Project.id < ProjectGallery.projectId
user.id < ProjectGallery.uploadedBy
Project.id < ProjectUpdate.projectId
user.id < ProjectUpdate.publishedBy
Project.id < ProjectTimeline.projectId
user.id < ProjectTimeline.createdBy
Project.id < ProjectReport.projectId
user.id < ProjectReport.publishedBy
Campaign.id < FundAllocation.campaignId
Project.id < FundAllocation.projectId
user.id < FundAllocation.approvedBy
ProjectExpense.id < ExpenseAttachment.expenseId
user.id < ExpenseAttachment.uploadedBy

// ===== DONOR RELATIONSHIPS =====
user.id - Donor.userId
Donor.id - IndividualDonor.donorId
Donor.id - CorporateDonor.donorId
Donor.id - DonorPreference.donorId
Donor.id < DonorSubscription.donorId
Donor.id < DonationCommitment.donorId
Campaign.id < DonationCommitment.campaignId
Donor.id - DonorWallet.donorId
DonorWallet.id < DonorWalletTransaction.walletId
Donor.id < DonorCertificate.donorId
Donor.id < DonorBadge.donorId
Donor.id < DonorActivity.donorId

// ===== VOLUNTEER RELATIONSHIPS =====
user.id - Volunteer.userId
Branch.id < Volunteer.branchId
Volunteer.id - VolunteerProfile.volunteerId
Volunteer.id < VolunteerSkill.volunteerId
Volunteer.id < VolunteerAvailability.volunteerId
Volunteer.id < VolunteerPerformance.volunteerId
Volunteer.id < VolunteerReward.volunteerId
Volunteer.id < VolunteerCertificate.volunteerId
Volunteer.id < VolunteerExpense.volunteerId
user.id < VolunteerExpense.approvedBy
Volunteer.id < VolunteerDocument.volunteerId
Volunteer.id < VolunteerActivityLog.volunteerId
Project.id < VolunteerTask.projectId
VolunteerTask.id < TaskAssignment.taskId
Volunteer.id < TaskAssignment.volunteerId
Volunteer.id < VolunteerSchedule.volunteerId
Branch.id < VolunteerGroup.branchId
VolunteerGroup.id < GroupMember.groupId
Volunteer.id < GroupMember.volunteerId

// ===== BENEFICIARY RELATIONSHIPS =====
Branch.id < Beneficiary.branchId
Division.id < Beneficiary.divisionId
District.id < Beneficiary.districtId
Upazila.id < Beneficiary.upazilaId
Union.id < Beneficiary.unionId
Beneficiary.id - BeneficiaryProfile.beneficiaryId
Beneficiary.id < BeneficiaryDocument.beneficiaryId
Beneficiary.id < BeneficiaryQRCode.beneficiaryId
Beneficiary.id < BeneficiaryActivityLog.beneficiaryId

// ===== DISTRIBUTION RELATIONSHIPS =====
Beneficiary.id < BeneficiaryNeedAssessment.beneficiaryId
Campaign.id < DistributionCampaign.campaignId
DistributionCampaign.id < DistributionSchedule.distributionCampaignId
Branch.id < DistributionSchedule.branchId
DistributionCenter.id < DistributionSchedule.distributionCenterId
Branch.id < DistributionCenter.branchId
Beneficiary.id < DistributionRecord.beneficiaryId
DistributionCampaign.id < DistributionRecord.distributionCampaignId
ReliefPackage.id < DistributionRecord.packageId
DistributionRecord.id < DistributionItem.distributionRecordId
ReliefItem.id < DistributionItem.reliefItemId
DistributionRecord.id < DistributionVerification.distributionRecordId
DistributionRecord.id < Acknowledgement.distributionRecordId
Beneficiary.id < BeneficiaryFeedback.beneficiaryId
DistributionRecord.id < BeneficiaryFeedback.distributionRecordId
Beneficiary.id < FollowUpVisit.beneficiaryId
Beneficiary.id < CaseHistory.beneficiaryId
ReliefPackage.id < ReliefPackageItem.reliefPackageId
ReliefItem.id < ReliefPackageItem.reliefItemId

// ===== COMMUNICATION RELATIONSHIPS =====
Notification.id < NotificationRecipient.notificationId
user.id < NotificationRecipient.userId
Announcement.id < Announcement.branchId
Conversation.id < ConversationParticipant.conversationId
user.id < ConversationParticipant.userId
Conversation.id < ChatMessage.conversationId
user.id < ChatMessage.senderId
UserMessage.senderId < user.id
UserMessage.receiverId < user.id
CommunicationLog.senderId < user.id
CommunicationLog.recipientId < user.id
BroadcastTemplate.id < BroadcastHistory.templateId
user.id < BroadcastHistory.sentBy

// ===== SUPPORT RELATIONSHIPS =====
user.id < SupportTicket.userId
user.id < SupportTicket.assignedTo
SupportTicket.id < TicketReply.ticketId
user.id < TicketReply.userId
FAQCategory.id < FAQItem.categoryId

// ===== AI RELATIONSHIPS =====
AIAssistant.id < AIConversation.assistantId
user.id < AIConversation.userId
AIConversation.id < AIMessage.conversationId
AIModel.id < AIJob.modelId
AIModel.id < AIModelVersion.modelId
AIModel.id < DemandForecast.modelId
AIModel.id < DonationPrediction.modelId
Donor.id < DonationPrediction.donorId
Campaign.id < DonationPrediction.campaignId
AIModel.id < PredictiveAlert.modelId
user.id < AIRecommendation.targetUserId
AIModel.id < AIAuditLog.modelId
user.id < AIAuditLog.userId
VerificationPipeline.id < VerificationLog.pipelineId
VerificationPipeline.id < VerificationMetric.pipelineId

// ===== ANALYTICS & SECURITY RELATIONSHIPS =====
user.id < APIKey.createdBy
APIKey.id < APIAccessLog.apiKeyId
user.id < APIAccessPermission.userId
user.id < Backup.createdBy
Backup.id < BackupHistory.backupId
user.id < BackupHistory.performedBy
Backup.id < BackupEncryption.backupId
APIIntegration.id < IntegrationSyncLog.integrationId

// ===== CMS RELATIONSHIPS =====
Beneficiary.id < ImpactStory.beneficiaryId
Campaign.id < ImpactStory.campaignId
user.id < ImpactStory.publishedBy
