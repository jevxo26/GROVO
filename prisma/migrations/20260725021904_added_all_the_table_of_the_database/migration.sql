-- CreateEnum
CREATE TYPE "ReliefVerificationMethod" AS ENUM ('QR_CODE', 'BARCODE', 'OTP', 'NATIONAL_ID', 'MANUAL_VERIFICATION');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('MONTHLY_DONATION', 'EMERGENCY_RELIEF', 'MEDICAL_SUPPORT', 'EDUCATION_SUPPORT', 'FOOD_DISTRIBUTION', 'WINTER_CAMPAIGN', 'ORPHAN_SUPPORT', 'MOSQUE_PROJECT', 'SHELTER_PROJECT', 'CUSTOM_CAMPAIGN');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MediaTypes" AS ENUM ('IMAGE', 'VIDEO', 'PDF', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "EmergencyType" AS ENUM ('FLOOD', 'FIRE', 'MEDICAL', 'CYCLONE', 'EARTHQUAKE', 'WINTER', 'FOOD_CRISIS');

-- CreateEnum
CREATE TYPE "EmergencyPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');

-- CreateEnum
CREATE TYPE "VolunteerCompletionStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ScheduleFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "GatewayEnvironment" AS ENUM ('SANDBOX', 'PRODUCTION');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PROCESSED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('UNPAID', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SettlementStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "DonorType" AS ENUM ('INDIVIDUAL', 'CORPORATE', 'LIFETIME', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DONATION', 'MEMBERSHIP_FEE', 'REFUND', 'REWARD', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('DONATION_CERTIFICATE', 'APPRECIATION_CERTIFICATE', 'CSR_CERTIFICATE', 'VOLUNTEER_RECOGNITION');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('REGISTERED', 'SUBSCRIPTION_STARTED', 'DONATION_COMPLETED', 'MEMBERSHIP_RENEWED', 'BADGE_EARNED', 'CERTIFICATE_ISSUED');

-- CreateEnum
CREATE TYPE "bloodGroup" AS ENUM ('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "FieldActivityType" AS ENUM ('FOOD_DISTRIBUTION', 'MEDICAL_CAMP', 'EDUCATION_PROGRAM', 'RELIEF_DISTRIBUTION', 'TREE_PLANTATION', 'BLOOD_DONATION', 'AWARENESS_CAMPAIGN');

-- CreateEnum
CREATE TYPE "VolunteerRewardType" AS ENUM ('APPRECIATION', 'GIFT', 'BONUS', 'RECOGNITION', 'EXCELLENCE_AWARD');

-- CreateTable
CREATE TABLE "beneficiaries" (
    "id" TEXT NOT NULL,
    "beneficiaryCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "nationalId" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "branchId" TEXT,
    "divisionId" TEXT,
    "districtId" TEXT,
    "upazilaId" TEXT,
    "unionId" TEXT,
    "address" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_profiles" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "occupation" TEXT,
    "monthlyIncome" DOUBLE PRECISION DEFAULT 0.0,
    "familySize" INTEGER NOT NULL DEFAULT 1,
    "houseType" TEXT,
    "education" TEXT,
    "healthCondition" TEXT,
    "specialNeeds" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_members" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "age" INTEGER,
    "occupation" TEXT,
    "monthlyIncome" DOUBLE PRECISION DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_categories" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT,
    "priorityLevel" "PriorityLevel" NOT NULL DEFAULT 'MEDIUM',
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_documents" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT,
    "fileUrl" TEXT NOT NULL,
    "verificationStatus" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relief_beneficiary_verifications" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "verifiedBy" TEXT NOT NULL,
    "verificationMethod" "ReliefVerificationMethod" NOT NULL DEFAULT 'MANUAL_VERIFICATION',
    "verificationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "relief_beneficiary_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_need_assessments" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "assessmentType" TEXT NOT NULL,
    "requiredSupport" TEXT NOT NULL,
    "priority" "PriorityLevel" NOT NULL DEFAULT 'MEDIUM',
    "assessedBy" TEXT NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_need_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relief_packages" (
    "id" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "description" TEXT,
    "estimatedValue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "relief_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relief_items" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "estimatedPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "relief_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_campaigns" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "title" TEXT NOT NULL,
    "distributionDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_schedules" (
    "id" TEXT NOT NULL,
    "distributionCampaignId" TEXT NOT NULL,
    "branchId" TEXT,
    "distributionCenterId" TEXT,
    "scheduleDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_centers" (
    "id" TEXT NOT NULL,
    "centerName" TEXT NOT NULL,
    "branchId" TEXT,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "capacity" INTEGER NOT NULL DEFAULT 100,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_records" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "distributionCampaignId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "distributedBy" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_items" (
    "id" TEXT NOT NULL,
    "distributionRecordId" TEXT NOT NULL,
    "reliefItemId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_qr_codes" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "barcode" TEXT,
    "verificationUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_verifications" (
    "id" TEXT NOT NULL,
    "distributionRecordId" TEXT NOT NULL,
    "verificationMethod" "ReliefVerificationMethod" NOT NULL DEFAULT 'QR_CODE',
    "verifiedBy" TEXT NOT NULL,
    "verificationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribution_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acknowledgements" (
    "id" TEXT NOT NULL,
    "distributionRecordId" TEXT NOT NULL,
    "signature" TEXT,
    "photo" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acknowledgements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_feedbacks" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "distributionRecordId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "feedback" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beneficiary_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow_up_visits" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "visitedBy" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "nextVisitDate" TIMESTAMP(3),
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_up_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_histories" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assignedOfficer" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_activity_logs" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "performedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beneficiary_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign" (
    "id" TEXT NOT NULL,
    "campaignCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "campaignType" "CampaignType" NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "raisedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "thumbnail" TEXT,
    "banner" TEXT,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_goal" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "goalTitle" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "currentAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_milestone" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "achievedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_media" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "mediaType" "MediaTypes" NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "thumbnail" TEXT,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_donation" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "donationId" TEXT,
    "donorId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_campaign" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "emergencyType" "EmergencyType" NOT NULL,
    "priority" "EmergencyPriority" NOT NULL DEFAULT 'HIGH',
    "affectedArea" TEXT NOT NULL,
    "requiredAmount" DOUBLE PRECISION NOT NULL,
    "currentAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation" (
    "id" TEXT NOT NULL,
    "donationNumber" TEXT NOT NULL,
    "donorId" TEXT,
    "campaignId" TEXT,
    "projectId" TEXT,
    "donationTypeId" TEXT,
    "categoryId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_item" (
    "id" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_schedule" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "donationTypeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "ScheduleFrequency" NOT NULL DEFAULT 'MONTHLY',
    "startDate" TIMESTAMP(3) NOT NULL,
    "nextPaymentDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_installment" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "installmentNo" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund" (
    "id" TEXT NOT NULL,
    "fundName" TEXT NOT NULL,
    "fundCode" TEXT NOT NULL,
    "description" TEXT,
    "currentBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_transfer" (
    "id" TEXT NOT NULL,
    "fromFundId" TEXT NOT NULL,
    "toFundId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fund_transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_allocation_history" (
    "id" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "projectId" TEXT,
    "campaignId" TEXT,
    "allocatedAmount" DOUBLE PRECISION NOT NULL,
    "allocatedBy" TEXT,
    "allocationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fund_allocation_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "donorCode" TEXT NOT NULL,
    "donorType" "DonorType" NOT NULL DEFAULT 'INDIVIDUAL',
    "membershipId" TEXT,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_donors" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "profession" TEXT,
    "organization" TEXT,
    "monthlyCommitment" DOUBLE PRECISION DEFAULT 0.0,
    "preferredCampaign" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individual_donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_donors" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyRegistrationNo" TEXT,
    "tradeLicense" TEXT,
    "contactPerson" TEXT NOT NULL,
    "designation" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "monthlyCommitment" DOUBLE PRECISION DEFAULT 0.0,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corporate_donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_organizations" (
    "id" TEXT NOT NULL,
    "corporateDonorId" TEXT NOT NULL,
    "industry" TEXT,
    "companySize" TEXT,
    "employeeCount" INTEGER,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_subscriptions" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "subscriptionType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "billingCycle" "BillingCycle" NOT NULL DEFAULT 'MONTHLY',
    "startDate" TIMESTAMP(3) NOT NULL,
    "nextBillingDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_commitments" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "pledgedAmount" DOUBLE PRECISION NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "remainingAmount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_commitments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_wallets" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalDonated" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_transactions" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "referenceNo" TEXT NOT NULL,
    "description" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_certificates" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "certificateType" "CertificateType" NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "downloadUrl" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_badges" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "badgeName" TEXT NOT NULL,
    "badgeLevel" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donor_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_fees" (
    "id" TEXT NOT NULL,
    "membershipType" TEXT NOT NULL,
    "minimumAmount" DOUBLE PRECISION NOT NULL,
    "maximumAmount" DOUBLE PRECISION NOT NULL,
    "billingCycle" "BillingCycle" NOT NULL DEFAULT 'YEARLY',
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_payments" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT NOT NULL,
    "paymentStatus" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_histories" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "oldType" TEXT,
    "newType" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_rewards" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "rewardValue" DOUBLE PRECISION NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_activities" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "description" TEXT NOT NULL,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donor_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_preferences" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "preferredCategory" TEXT,
    "preferredCampaign" TEXT,
    "anonymousDonation" BOOLEAN NOT NULL DEFAULT false,
    "emailNotification" BOOLEAN NOT NULL DEFAULT true,
    "smsNotification" BOOLEAN NOT NULL DEFAULT true,
    "pushNotification" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentGatewayId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "transactionId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_gateway" (
    "id" TEXT NOT NULL,
    "gatewayName" TEXT NOT NULL,
    "merchantId" TEXT,
    "apiKey" TEXT,
    "secretKey" TEXT,
    "environment" "GatewayEnvironment" NOT NULL DEFAULT 'SANDBOX',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transaction" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "gatewayTransactionId" TEXT,
    "gatewayResponse" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_webhook" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT,
    "gateway" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refund" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "refundAmount" DOUBLE PRECISION NOT NULL,
    "refundReason" TEXT NOT NULL,
    "refundStatus" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "processedBy" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_receipt" (
    "id" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "receiptUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donation_receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "donationId" TEXT,
    "donorId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "invoiceUrl" TEXT,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settlement" (
    "id" TEXT NOT NULL,
    "paymentGatewayId" TEXT NOT NULL,
    "totalCollected" DOUBLE PRECISION NOT NULL,
    "processingFee" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "settlementDate" TIMESTAMP(3) NOT NULL,
    "status" "SettlementStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout" (
    "id" TEXT NOT NULL,
    "branchId" TEXT,
    "projectId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "approvedBy" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_report" (
    "id" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalDonation" DOUBLE PRECISION NOT NULL,
    "totalExpense" DOUBLE PRECISION NOT NULL,
    "netBalance" DOUBLE PRECISION NOT NULL,
    "generatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_log" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT,
    "event" TEXT NOT NULL,
    "request" TEXT,
    "response" TEXT,
    "ipAddress" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "campaignId" TEXT,
    "categoryId" TEXT,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "branchId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "projectManagerId" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_budget" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "estimatedBudget" DOUBLE PRECISION NOT NULL,
    "approvedBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "allocatedBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remainingBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_expense" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "expenseCategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "approvedBy" TEXT,
    "status" "ExpenseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_attachment" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expense_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_beneficiary" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "districtId" TEXT,
    "beneficiaryType" TEXT,
    "assistanceType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_volunteer" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "assignedRole" TEXT,
    "assignedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionStatus" "VolunteerCompletionStatus" NOT NULL DEFAULT 'ASSIGNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_gallery" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mediaType" "MediaTypes" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_update" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progressPercentage" DOUBLE PRECISION NOT NULL,
    "publishedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_timeline" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_allocation" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "allocatedAmount" DOUBLE PRECISION NOT NULL,
    "allocationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fund_allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_report" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reportTitle" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "beneficiariesCount" INTEGER NOT NULL DEFAULT 0,
    "totalExpense" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reportFile" TEXT,
    "publishedBy" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "volunteerCode" TEXT NOT NULL,
    "branchId" TEXT,
    "membershipId" TEXT,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experience" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_profiles" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "profession" TEXT,
    "organization" TEXT,
    "skills" TEXT,
    "languages" TEXT,
    "emergencyContact" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "availability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_skills" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillLevel" "SkillLevel" NOT NULL DEFAULT 'INTERMEDIATE',
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_availabilities" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "availableDays" TEXT NOT NULL,
    "availableFrom" TEXT NOT NULL,
    "availableTo" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_assignments" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "campaignId" TEXT,
    "projectId" TEXT,
    "assignedBy" TEXT NOT NULL,
    "assignedRole" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_schedules" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "scheduleDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_attendances" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3),
    "checkOutTime" TIMESTAMP(3),
    "attendanceStatus" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_tasks" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "PriorityLevel" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_activities" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "activityTitle" TEXT NOT NULL,
    "activityType" "FieldActivityType" NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "performedBy" TEXT NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_visits" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "visitedBy" TEXT NOT NULL,
    "divisionId" TEXT,
    "districtId" TEXT,
    "upazilaId" TEXT,
    "unionId" TEXT,
    "visitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_reports" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "reportTitle" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "beneficiariesCount" INTEGER NOT NULL DEFAULT 0,
    "totalExpense" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "reportFile" TEXT,
    "submittedBy" TEXT NOT NULL,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiary_verifications" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "verifiedBy" TEXT NOT NULL,
    "verificationMethod" TEXT NOT NULL,
    "verificationStatus" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_performances" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "totalAssignments" INTEGER NOT NULL DEFAULT 0,
    "completedAssignments" INTEGER NOT NULL DEFAULT 0,
    "attendanceRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "performanceScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_performances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_rewards" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "rewardType" "VolunteerRewardType" NOT NULL DEFAULT 'APPRECIATION',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rewardDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_certificates" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "certificateType" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certificateUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_expenses" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "receiptUrl" TEXT,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_reimbursements" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "approvedAmount" DOUBLE PRECISION NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentStatus" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_reimbursements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetGroup" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "publishedBy" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_trainings" (
    "id" TEXT NOT NULL,
    "trainingTitle" TEXT NOT NULL,
    "description" TEXT,
    "trainer" TEXT NOT NULL,
    "trainingDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "certificateAvailable" BOOLEAN NOT NULL DEFAULT false,
    "status" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_documents" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "verificationStatus" "GeneralStatus" NOT NULL DEFAULT 'PENDING',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_activity_logs" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "performedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beneficiaries_beneficiaryCode_key" ON "beneficiaries"("beneficiaryCode");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiaries_nationalId_key" ON "beneficiaries"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiary_profiles_beneficiaryId_key" ON "beneficiary_profiles"("beneficiaryId");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiary_categories_categoryName_key" ON "beneficiary_categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiary_qr_codes_beneficiaryId_key" ON "beneficiary_qr_codes"("beneficiaryId");

-- CreateIndex
CREATE UNIQUE INDEX "acknowledgements_distributionRecordId_key" ON "acknowledgements"("distributionRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_campaignCode_key" ON "campaign"("campaignCode");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_slug_key" ON "campaign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_category_name_key" ON "campaign_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_campaign_campaignId_key" ON "emergency_campaign"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "donation_category_name_key" ON "donation_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "donation_type_name_key" ON "donation_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "donation_donationNumber_key" ON "donation"("donationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "fund_fundName_key" ON "fund"("fundName");

-- CreateIndex
CREATE UNIQUE INDEX "fund_fundCode_key" ON "fund"("fundCode");

-- CreateIndex
CREATE UNIQUE INDEX "donors_donorCode_key" ON "donors"("donorCode");

-- CreateIndex
CREATE UNIQUE INDEX "individual_donors_donorId_key" ON "individual_donors"("donorId");

-- CreateIndex
CREATE UNIQUE INDEX "corporate_donors_donorId_key" ON "corporate_donors"("donorId");

-- CreateIndex
CREATE UNIQUE INDEX "donor_organizations_corporateDonorId_key" ON "donor_organizations"("corporateDonorId");

-- CreateIndex
CREATE UNIQUE INDEX "donor_wallets_donorId_key" ON "donor_wallets"("donorId");

-- CreateIndex
CREATE UNIQUE INDEX "donor_transactions_referenceNo_key" ON "donor_transactions"("referenceNo");

-- CreateIndex
CREATE UNIQUE INDEX "donor_certificates_certificateNumber_key" ON "donor_certificates"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "membership_payments_transactionId_key" ON "membership_payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "donor_preferences_donorId_key" ON "donor_preferences"("donorId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactionId_key" ON "payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_gateway_gatewayName_key" ON "payment_gateway"("gatewayName");

-- CreateIndex
CREATE UNIQUE INDEX "donation_receipt_donationId_key" ON "donation_receipt"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "donation_receipt_receiptNumber_key" ON "donation_receipt"("receiptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_invoiceNumber_key" ON "invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "project_category_name_key" ON "project_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_projectCode_key" ON "project"("projectCode");

-- CreateIndex
CREATE UNIQUE INDEX "project_budget_projectId_key" ON "project_budget"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_volunteerCode_key" ON "volunteers"("volunteerCode");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_profiles_volunteerId_key" ON "volunteer_profiles"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_certificates_certificateNumber_key" ON "volunteer_certificates"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_reimbursements_expenseId_key" ON "volunteer_reimbursements"("expenseId");

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "campaign_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_goal" ADD CONSTRAINT "campaign_goal_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_milestone" ADD CONSTRAINT "campaign_milestone_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_media" ADD CONSTRAINT "campaign_media_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_donation" ADD CONSTRAINT "campaign_donation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_donation" ADD CONSTRAINT "campaign_donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_campaign" ADD CONSTRAINT "emergency_campaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_donationTypeId_fkey" FOREIGN KEY ("donationTypeId") REFERENCES "donation_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "donation_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_item" ADD CONSTRAINT "donation_item_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_item" ADD CONSTRAINT "donation_item_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_schedule" ADD CONSTRAINT "donation_schedule_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_schedule" ADD CONSTRAINT "donation_schedule_donationTypeId_fkey" FOREIGN KEY ("donationTypeId") REFERENCES "donation_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_installment" ADD CONSTRAINT "donation_installment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "donation_schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transfer" ADD CONSTRAINT "fund_transfer_fromFundId_fkey" FOREIGN KEY ("fromFundId") REFERENCES "fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transfer" ADD CONSTRAINT "fund_transfer_toFundId_fkey" FOREIGN KEY ("toFundId") REFERENCES "fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transfer" ADD CONSTRAINT "fund_transfer_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation_history" ADD CONSTRAINT "fund_allocation_history_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation_history" ADD CONSTRAINT "fund_allocation_history_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation_history" ADD CONSTRAINT "fund_allocation_history_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation_history" ADD CONSTRAINT "fund_allocation_history_allocatedBy_fkey" FOREIGN KEY ("allocatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_paymentGatewayId_fkey" FOREIGN KEY ("paymentGatewayId") REFERENCES "payment_gateway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_webhook" ADD CONSTRAINT "payment_webhook_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refund" ADD CONSTRAINT "refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refund" ADD CONSTRAINT "refund_processedBy_fkey" FOREIGN KEY ("processedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation_receipt" ADD CONSTRAINT "donation_receipt_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlement" ADD CONSTRAINT "settlement_paymentGatewayId_fkey" FOREIGN KEY ("paymentGatewayId") REFERENCES "payment_gateway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_report" ADD CONSTRAINT "financial_report_generatedBy_fkey" FOREIGN KEY ("generatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_log" ADD CONSTRAINT "payment_log_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "project_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_projectManagerId_fkey" FOREIGN KEY ("projectManagerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_budget" ADD CONSTRAINT "project_budget_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_expense" ADD CONSTRAINT "project_expense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_attachment" ADD CONSTRAINT "expense_attachment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "project_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_beneficiary" ADD CONSTRAINT "project_beneficiary_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_volunteer" ADD CONSTRAINT "project_volunteer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_volunteer" ADD CONSTRAINT "project_volunteer_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_gallery" ADD CONSTRAINT "project_gallery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_update" ADD CONSTRAINT "project_update_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_timeline" ADD CONSTRAINT "project_timeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation" ADD CONSTRAINT "fund_allocation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_allocation" ADD CONSTRAINT "fund_allocation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_report" ADD CONSTRAINT "project_report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
