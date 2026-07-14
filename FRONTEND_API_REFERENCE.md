# GROVO - Frontend API & Data Reference

This document provides a comprehensive reference for all database models, API routes, and controllers available in the GROVO backend.

## 📊 Database Models (Prisma Schemas)

### AIAssistant

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **modelType**: `String`
- **capabilities**: `String[]`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **conversations**: `AIConversation[]`

### AIAuditLog

- **id**: `String`
- **modelId**: `String?`
- **action**: `String`
- **input**: `String?`
- **output**: `String?`
- **userId**: `String?`
- **ipAddress**: `String?`
- **createdAt**: `DateTime`

### AIConversation

- **id**: `String`
- **assistantId**: `String`
- **assistant**: `AIAssistant`
- **userId**: `String`
- **title**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **messages**: `AIMessage[]`

### AIInsight

- **id**: `String`
- **insightType**: `String`
- **category**: `String`
- **title**: `String`
- **description**: `String`
- **dataPoints**: `String?`
- **severity**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AIJob

- **id**: `String`
- **modelId**: `String`
- **model**: `AIModel`
- **jobType**: `String`
- **inputData**: `String?`
- **outputData**: `String?`
- **startedAt**: `DateTime?`
- **completedAt**: `DateTime?`
- **duration**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AIMessage

- **id**: `String`
- **conversationId**: `String`
- **conversation**: `AIConversation`
- **role**: `String`
- **content**: `String`
- **tokenCount**: `Int`
- **createdAt**: `DateTime`

### AIModel

- **id**: `String`
- **modelName**: `String`
- **modelType**: `String`
- **description**: `String?`
- **algorithm**: `String`
- **accuracy**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **versions**: `AIModelVersion[]`
- **jobs**: `AIJob[]`

### AIModelVersion

- **id**: `String`
- **modelId**: `String`
- **model**: `AIModel`
- **versionNo**: `String`
- **accuracy**: `Float`
- **parameters**: `String?`
- **fileUrl**: `String?`
- **trainedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AIRecommendation

- **id**: `String`
- **recommendationType**: `String`
- **targetUserId**: `String?`
- **title**: `String`
- **description**: `String?`
- **confidenceScore**: `Float`
- **metadata**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AITrainingDataset

- **id**: `String`
- **datasetName**: `String`
- **datasetType**: `String`
- **description**: `String?`
- **fileUrl**: `String`
- **recordCount**: `Int`
- **version**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### APIAccessLog

- **id**: `String`
- **apiKeyId**: `String`
- **apiKey**: `APIKey`
- **endpoint**: `String`
- **method**: `String`
- **statusCode**: `Int`
- **ipAddress**: `String?`
- **responseTime**: `Float`
- **createdAt**: `DateTime`

### APIAccessPermission

- **id**: `String`
- **roleId**: `String?`
- **userId**: `String?`
- **endpoint**: `String`
- **method**: `String`
- **isAllowed**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### APIKey

- **id**: `String`
- **keyName**: `String`
- **apiKey**: `String`
- **secretKey**: `String`
- **permissions**: `String[]`
- **expiresAt**: `DateTime?`
- **isActive**: `Boolean`
- **createdBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **accessLogs**: `APIAccessLog[]`

### AccessLog

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **roleId**: `String`
- **role**: `Role`
- **module**: `String`
- **action**: `String`
- **ipAddress**: `String?`
- **device**: `String?`
- **browser**: `String?`
- **createdAt**: `DateTime`

### AccessPolicy

- **id**: `String`
- **policyName**: `String`
- **description**: `String?`
- **rules**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Account

- **id**: `String`
- **accountId**: `String`
- **providerId**: `String`
- **userId**: `String`
- **user**: `User`
- **accessToken**: `String?`
- **refreshToken**: `String?`
- **idToken**: `String?`
- **accessTokenExpiresAt**: `DateTime?`
- **refreshTokenExpiresAt**: `DateTime?`
- **scope**: `String?`
- **password**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Acknowledgement

- **id**: `String`
- **distributionRecordId**: `String`
- **distributionRecord**: `DistributionRecord`
- **signature**: `String?`
- **photo**: `String?`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ActivityReport

- **id**: `String`
- **activityId**: `String`
- **activity**: `FieldActivity`
- **reportTitle**: `String`
- **summary**: `String?`
- **beneficiariesCount**: `Int`
- **totalExpense**: `Float`
- **reportFile**: `String?`
- **submittedBy**: `String`
- **approvedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AdminPermission

- **id**: `String`
- **adminId**: `String`
- **admin**: `User`
- **module**: `String`
- **canView**: `Boolean`
- **canCreate**: `Boolean`
- **canUpdate**: `Boolean`
- **canDelete**: `Boolean`
- **canApprove**: `Boolean`
- **canExport**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Album

- **id**: `String`
- **albumName**: `String`
- **description**: `String?`
- **coverImage**: `String?`
- **createdBy**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **albumMedia**: `AlbumMedia[]`

### AlbumMedia

- **id**: `String`
- **albumId**: `String`
- **album**: `Album`
- **mediaId**: `String`
- **media**: `Media`
- **sortOrder**: `Int`
- **createdAt**: `DateTime`

### AnalyticsSnapshot

- **id**: `String`
- **snapshotType**: `String`
- **period**: `String`
- **data**: `String`
- **generatedAt**: `DateTime`
- **createdAt**: `DateTime`

### Announcement

- **id**: `String`
- **title**: `String`
- **content**: `String`
- **targetGroup**: `String?`
- **branchId**: `String?`
- **priority**: `String`
- **publishedBy**: `String`
- **publishedAt**: `DateTime?`
- **expiresAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AreaAssignment

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **branchId**: `String`
- **branch**: `Branch`
- **divisionId**: `String?`
- **division**: `Division?`
- **districtId**: `String?`
- **district**: `District?`
- **upazilaId**: `String?`
- **upazila**: `Upazila?`
- **unionId**: `String?`
- **union**: `Union?`
- **assignedBy**: `String`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AreaCoverage

- **id**: `String`
- **branchId**: `String`
- **divisionId**: `String?`
- **districtId**: `String?`
- **upazilaId**: `String?`
- **unionId**: `String?`
- **population**: `Int`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AuditLog

- **id**: `String`
- **userId**: `String?`
- **action**: `String`
- **module**: `String`
- **entityType**: `String`
- **entityId**: `String`
- **oldData**: `String?`
- **newData**: `String?`
- **ipAddress**: `String?`
- **userAgent**: `String?`
- **createdAt**: `DateTime`

### AutoTask

- **id**: `String`
- **taskName**: `String`
- **taskType**: `String`
- **scheduledAt**: `DateTime`
- **executedAt**: `DateTime?`
- **retryCount**: `Int`
- **maxRetries**: `Int`
- **payload**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### AutomationLog

- **id**: `String`
- **automationType**: `String`
- **triggerEvent**: `String`
- **action**: `String`
- **entityType**: `String?`
- **entityId**: `String?`
- **status**: `String`
- **errorMessage**: `String?`
- **executedAt**: `DateTime`
- **createdAt**: `DateTime`

### Backup

- **id**: `String`
- **backupName**: `String`
- **backupType**: `String`
- **fileUrl**: `String`
- **fileSize**: `Int`
- **createdBy**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **histories**: `BackupHistory[]`

### BackupEncryption

- **id**: `String`
- **backupId**: `String`
- **algorithm**: `String`
- **keyHash**: `String`
- **encryptedAt**: `DateTime`
- **createdAt**: `DateTime`

### BackupHistory

- **id**: `String`
- **backupId**: `String`
- **backup**: `Backup`
- **action**: `String`
- **details**: `String?`
- **performedBy**: `String`
- **createdAt**: `DateTime`

### Banner

- **id**: `String`
- **title**: `String`
- **subtitle**: `String?`
- **imageUrl**: `String`
- **linkUrl**: `String?`
- **position**: `String`
- **sortOrder**: `Int`
- **startDate**: `DateTime?`
- **endDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Beneficiary

- **id**: `String`
- **beneficiaryCode**: `String`
- **fullName**: `String`
- **phone**: `String?`
- **nationalId**: `String?`
- **dateOfBirth**: `DateTime?`
- **gender**: `String?`
- **branchId**: `String`
- **branch**: `Branch`
- **divisionId**: `String?`
- **districtId**: `String?`
- **upazilaId**: `String?`
- **unionId**: `String?`
- **address**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **profile**: `BeneficiaryProfile?`
- **familyMembers**: `FamilyMember[]`
- **documents**: `BeneficiaryDocument[]`
- **needAssessments**: `BeneficiaryNeedAssessment[]`
- **qrCodes**: `BeneficiaryQRCode[]`
- **distributionRecords**: `DistributionRecord[]`
- **feedbacks**: `BeneficiaryFeedback[]`
- **followUps**: `FollowUpVisit[]`
- **caseHistories**: `CaseHistory[]`
- **activities**: `BeneficiaryActivityLog[]`
- **successStories**: `SuccessStory[]`

### BeneficiaryActivityLog

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **activity**: `String`
- **description**: `String?`
- **performedBy**: `String`
- **createdAt**: `DateTime`

### BeneficiaryAnalytics

- **id**: `String`
- **period**: `String`
- **totalBeneficiaries**: `Int`
- **newBeneficiaries**: `Int`
- **totalDistributions**: `Int`
- **totalDistributedValue**: `Float`
- **createdAt**: `DateTime`

### BeneficiaryCategory

- **id**: `String`
- **categoryName**: `String`
- **description**: `String?`
- **priorityLevel**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BeneficiaryDocument

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **documentType**: `String`
- **documentNumber**: `String`
- **fileUrl**: `String`
- **verificationStatus**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BeneficiaryFeedback

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **distributionRecordId**: `String`
- **distributionRecord**: `DistributionRecord`
- **rating**: `Int`
- **feedback**: `String?`
- **submittedAt**: `DateTime`
- **createdAt**: `DateTime`

### BeneficiaryNeedAssessment

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **assessmentType**: `String`
- **requiredSupport**: `String?`
- **priority**: `String`
- **assessedBy**: `String`
- **assessmentDate**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BeneficiaryProfile

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **occupation**: `String?`
- **monthlyIncome**: `Float`
- **familySize**: `Int`
- **houseType**: `String?`
- **education**: `String?`
- **healthCondition**: `String?`
- **specialNeeds**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BeneficiaryQRCode

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **qrCode**: `String`
- **barcode**: `String?`
- **verificationUrl**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BeneficiaryVerification

- **id**: `String`
- **beneficiaryId**: `String`
- **verifiedBy**: `String`
- **verificationMethod**: `String`
- **verificationStatus**: `String`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Branch

- **id**: `String`
- **organizationId**: `String`
- **organization**: `Organization`
- **branchName**: `String`
- **branchCode**: `String`
- **branchType**: `BranchType`
- **divisionId**: `String?`
- **division**: `Division?`
- **districtId**: `String?`
- **district**: `District?`
- **upazilaId**: `String?`
- **upazila**: `Upazila?`
- **unionId**: `String?`
- **union**: `Union?`
- **address**: `String`
- **latitude**: `Float?`
- **longitude**: `Float?`
- **phone**: `String?`
- **email**: `String?`
- **managerId**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **offices**: `BranchOffice[]`
- **committees**: `Committee[]`
- **employees**: `Employee[]`
- **areaAssignments**: `AreaAssignment[]`
- **settings**: `BranchSetting[]`
- **activities**: `BranchActivity[]`
- **parentLinks**: `OrganizationHierarchy[]`
- **childLinks**: `OrganizationHierarchy[]`
- **branchManagers**: `BranchManager[]`
- **branchStaff**: `BranchStaff[]`
- **territoryAssignments**: `TerritoryAssignment[]`
- **branchCoverages**: `BranchCoverage[]`
- **zoneAssignments**: `ZoneAssignment[]`
- **branchTargets**: `BranchTarget[]`
- **branchPerformances**: `BranchPerformance[]`
- **branchBudgets**: `BranchBudget[]`
- **branchExpenses**: `BranchExpense[]`
- **branchFunds**: `BranchFund[]`
- **branchInventories**: `BranchInventory[]`
- **branchVehicles**: `BranchVehicle[]`
- **branchMeetings**: `BranchMeeting[]`
- **branchAnnouncements**: `BranchAnnouncement[]`
- **branchDocuments**: `BranchDocument[]`
- **branchAudits**: `BranchAudit[]`
- **transfersFrom**: `BranchTransfer[]`
- **transfersTo**: `BranchTransfer[]`
- **branchStatistics**: `BranchStatistics[]`
- **branchDashboards**: `BranchDashboard[]`
- **branchActivityLogs**: `BranchActivityLog[]`
- **volunteers**: `Volunteer[]`
- **schedules**: `DistributionSchedule[]`
- **distributionCenters**: `DistributionCenter[]`
- **events**: `Event[]`
- **beneficiaries**: `Beneficiary[]`
- **projects**: `Project[]`

### BranchActivity

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **activityType**: `OrgActivityType`
- **description**: `String`
- **performedBy**: `String`
- **createdAt**: `DateTime`

### BranchActivityLog

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **activity**: `String`
- **performedBy**: `String`
- **details**: `String?`
- **createdAt**: `DateTime`

### BranchAnalytics

- **id**: `String`
- **branchId**: `String`
- **period**: `String`
- **totalDonations**: `Float`
- **totalExpenses**: `Float`
- **volunteerCount**: `Int`
- **projectCount**: `Int`
- **createdAt**: `DateTime`

### BranchAnnouncement

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **title**: `String`
- **content**: `String`
- **publishedBy**: `String`
- **expiresAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchAudit

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **auditType**: `String`
- **auditor**: `String`
- **findings**: `String?`
- **auditDate**: `DateTime`
- **resolvedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchBudget

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **budgetYear**: `Int`
- **estimatedBudget**: `Float`
- **approvedBudget**: `Float`
- **spentAmount**: `Float`
- **remainingAmount**: `Float`
- **approvedBy**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchCoverage

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **coverageArea**: `String`
- **populationServed**: `Int`
- **activeSince**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchDashboard

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **widgetType**: `String`
- **config**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchDocument

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **documentName**: `String`
- **documentType**: `String`
- **fileUrl**: `String`
- **uploadedBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchExpense

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **expenseCategory**: `String`
- **description**: `String?`
- **amount**: `Float`
- **expenseDate**: `DateTime`
- **approvedBy**: `String?`
- **receiptUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchFund

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **fundName**: `String`
- **currentBalance**: `Float`
- **lastUpdated**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchInventory

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **itemName**: `String`
- **quantity**: `Int`
- **unit**: `String`
- **location**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchManager

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **userId**: `String`
- **user**: `User`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchMeeting

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **title**: `String`
- **agenda**: `String?`
- **meetingDate**: `DateTime`
- **location**: `String?`
- **attendees**: `String[]`
- **minutes**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchOffice

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **officeName**: `String`
- **officeType**: `String`
- **officeAddress**: `String`
- **contactPerson**: `String?`
- **phone**: `String?`
- **email**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchPerformance

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **period**: `String`
- **donationTotal**: `Float`
- **expenseTotal**: `Float`
- **volunteerCount**: `Int`
- **projectCount**: `Int`
- **performanceScore**: `Float`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchSetting

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **workingDays**: `String[]`
- **openingTime**: `String`
- **closingTime**: `String`
- **contactNumber**: `String?`
- **email**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchStaff

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **userId**: `String`
- **user**: `User`
- **role**: `String`
- **department**: `String?`
- **joiningDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchStatistics

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **period**: `String`
- **memberCount**: `Int`
- **donationTotal**: `Float`
- **projectCount**: `Int`
- **volunteerCount**: `Int`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchTarget

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **targetType**: `String`
- **targetValue**: `Float`
- **achievedValue**: `Float`
- **period**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchTransfer

- **id**: `String`
- **fromBranchId**: `String`
- **fromBranch**: `Branch`
- **toBranchId**: `String`
- **toBranch**: `Branch`
- **transferType**: `String`
- **description**: `String?`
- **approvedBy**: `String?`
- **transferDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BranchVehicle

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **vehicleNumber**: `String`
- **vehicleType**: `String`
- **assignedDriver**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### BroadcastCampaign

- **id**: `String`
- **title**: `String`
- **message**: `String`
- **channel**: `String`
- **targetGroup**: `String?`
- **scheduledAt**: `DateTime?`
- **sentAt**: `DateTime?`
- **totalRecipients**: `Int`
- **deliveredCount**: `Int`
- **failedCount**: `Int`
- **status**: `String`
- **createdBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **recipients**: `BroadcastRecipient[]`

### BroadcastRecipient

- **id**: `String`
- **broadcastId**: `String`
- **broadcast**: `BroadcastCampaign`
- **userId**: `String`
- **channel**: `String`
- **deliveredAt**: `DateTime?`
- **readAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### BudgetForecast

- **id**: `String`
- **branchId**: `String?`
- **projectId**: `String?`
- **forecastPeriod**: `String`
- **predictedIncome**: `Float`
- **predictedExpense**: `Float`
- **confidenceScore**: `Float`
- **createdAt**: `DateTime`

### CMSComponent

- **id**: `String`
- **sectionId**: `String`
- **section**: `CMSSection`
- **componentType**: `String`
- **content**: `String?`
- **config**: `String?`
- **sortOrder**: `Int`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CMSPage

- **id**: `String`
- **title**: `String`
- **slug**: `String`
- **content**: `String?`
- **metaTitle**: `String?`
- **metaDesc**: `String?`
- **template**: `String?`
- **publishedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **sections**: `CMSSection[]`

### CMSSection

- **id**: `String`
- **pageId**: `String`
- **page**: `CMSPage`
- **title**: `String?`
- **content**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **components**: `CMSComponent[]`

### Campaign

- **id**: `String`
- **campaignCode**: `String`
- **title**: `String`
- **slug**: `String`
- **categoryId**: `String`
- **category**: `CampaignCategory`
- **description**: `String?`
- **shortDescription**: `String?`
- **campaignType**: `String`
- **targetAmount**: `Float`
- **raisedAmount**: `Float`
- **startDate**: `DateTime`
- **endDate**: `DateTime`
- **thumbnail**: `String?`
- **banner**: `String?`
- **status**: `String`
- **createdBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **goals**: `CampaignGoal[]`
- **milestones**: `CampaignMilestone[]`
- **media**: `CampaignMedia[]`
- **donations**: `CampaignDonation[]`
- **emergencyDetails**: `EmergencyCampaign?`
- **projects**: `Project[]`
- **fundAllocations**: `FundAllocation[]`
- **liveDonationFeeds**: `LiveDonationFeed[]`
- **successStories**: `SuccessStory[]`
- **campaignDonations**: `Donation[]`

### CampaignAnalytics

- **id**: `String`
- **campaignId**: `String`
- **totalRaised**: `Float`
- **donorCount**: `Int`
- **goalProgress**: `Float`
- **avgDonation**: `Float`
- **conversionRate**: `Float`
- **createdAt**: `DateTime`

### CampaignCategory

- **id**: `String`
- **name**: `String`
- **icon**: `String?`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **campaigns**: `Campaign[]`

### CampaignDonation

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **donationId**: `String`
- **donorId**: `String`
- **amount**: `Float`
- **paymentStatus**: `String`
- **createdAt**: `DateTime`

### CampaignGoal

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **goalTitle**: `String`
- **targetAmount**: `Float`
- **currentAmount**: `Float`
- **progressPercentage**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CampaignMedia

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **mediaType**: `String`
- **title**: `String`
- **fileUrl**: `String`
- **thumbnail**: `String?`
- **uploadedBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CampaignMilestone

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **title**: `String`
- **description**: `String?`
- **targetAmount**: `Float`
- **achievedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CampaignPrediction

- **id**: `String`
- **campaignId**: `String`
- **predictedAmount**: `Float`
- **predictedDonors**: `Int`
- **completionDate**: `DateTime?`
- **confidenceScore**: `Float`
- **algorithm**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`

### CaseHistory

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **caseType**: `String`
- **description**: `String`
- **assignedOfficer**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ChatMessage

- **id**: `String`
- **conversationId**: `String`
- **conversation**: `Conversation`
- **senderId**: `String`
- **message**: `String`
- **messageType**: `String`
- **attachmentUrl**: `String?`
- **readAt**: `DateTime?`
- **createdAt**: `DateTime`

### Committee

- **id**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **committeeName**: `String`
- **committeeLevel**: `CommitteeLevel`
- **description**: `String?`
- **formationDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **members**: `CommitteeMember[]`
- **committeeRoles**: `CommitteeRole[]`

### CommitteeMember

- **id**: `String`
- **committeeId**: `String`
- **committee**: `Committee`
- **memberId**: `String`
- **member**: `User`
- **designationId**: `String`
- **designation**: `Designation`
- **joiningDate**: `DateTime`
- **endDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CommitteeRole

- **id**: `String`
- **committeeId**: `String`
- **committee**: `Committee`
- **memberId**: `String`
- **member**: `User`
- **role**: `CommitteeDesignation`
- **startDate**: `DateTime`
- **endDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CommunicationLog

- **id**: `String`
- **communicationType**: `String`
- **senderId**: `String`
- **recipientId**: `String`
- **subject**: `String?`
- **message**: `String?`
- **channel**: `String`
- **status**: `String`
- **createdAt**: `DateTime`

### ComplianceAudit

- **id**: `String`
- **auditType**: `String`
- **auditor**: `String`
- **findings**: `String?`
- **auditDate**: `DateTime`
- **nextAuditDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ComplianceDocument

- **id**: `String`
- **documentName**: `String`
- **documentType**: `String`
- **version**: `String`
- **fileUrl**: `String`
- **effectiveDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Consent

- **id**: `String`
- **userId**: `String`
- **consentType**: `String`
- **isGranted**: `Boolean`
- **grantedAt**: `DateTime`
- **revokedAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ContactInformation

- **id**: `String`
- **organization**: `String`
- **email**: `String`
- **phone**: `String`
- **address**: `String?`
- **mapUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ContactMessage

- **id**: `String`
- **name**: `String`
- **email**: `String`
- **phone**: `String?`
- **subject**: `String`
- **message**: `String`
- **repliedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Conversation

- **id**: `String`
- **title**: `String?`
- **createdBy**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **participants**: `ConversationParticipant[]`
- **messages**: `ChatMessage[]`

### ConversationParticipant

- **id**: `String`
- **conversationId**: `String`
- **conversation**: `Conversation`
- **userId**: `String`
- **joinedAt**: `DateTime`
- **leftAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### CoordinatorRole

- **id**: `String`
- **coordinatorId**: `String`
- **coordinator**: `User`
- **roleId**: `String`
- **role**: `Role`
- **organizationLevel**: `OrganizationLevel`
- **divisionId**: `String?`
- **division**: `Division?`
- **districtId**: `String?`
- **district**: `District?`
- **upazilaId**: `String?`
- **upazila**: `Upazila?`
- **unionId**: `String?`
- **union**: `Union?`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### CorporateDonor

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **companyName**: `String`
- **companyRegistrationNo**: `String?`
- **tradeLicense**: `String?`
- **contactPerson**: `String?`
- **designation**: `String?`
- **website**: `String?`
- **logo**: `String?`
- **monthlyCommitment**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **donorOrganizations**: `DonorOrganization[]`

### Currency

- **id**: `String`
- **currencyCode**: `String`
- **currencyName**: `String`
- **symbol**: `String`
- **exchangeRate**: `Float`
- **isDefault**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Dashboard

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **userId**: `String`
- **isDefault**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **widgets**: `DashboardWidget[]`
- **layout**: `DashboardLayout?`

### DashboardLayout

- **id**: `String`
- **dashboardId**: `String`
- **dashboard**: `Dashboard`
- **columns**: `Int`
- **rowHeight**: `Int`
- **layoutData**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DashboardWidget

- **id**: `String`
- **dashboardId**: `String`
- **dashboard**: `Dashboard`
- **widgetType**: `String`
- **title**: `String`
- **dataSource**: `String`
- **config**: `String?`
- **positionX**: `Int`
- **positionY**: `Int`
- **width**: `Int`
- **height**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DataAccessLog

- **id**: `String`
- **userId**: `String`
- **entityType**: `String`
- **entityId**: `String`
- **action**: `String`
- **ipAddress**: `String?`
- **accessedAt**: `DateTime`
- **createdAt**: `DateTime`

### DataDeletionRequest

- **id**: `String`
- **userId**: `String`
- **requestType**: `String`
- **reason**: `String?`
- **requestedAt**: `DateTime`
- **processedAt**: `DateTime?`
- **processedBy**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DataRetentionPolicy

- **id**: `String`
- **entityType**: `String`
- **retentionPeriod**: `Int`
- **retentionUnit**: `String`
- **action**: `String`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DemandForecast

- **id**: `String`
- **category**: `String`
- **region**: `String?`
- **forecastPeriod**: `String`
- **predictedDemand**: `Float`
- **actualDemand**: `Float`
- **accuracy**: `Float`
- **createdAt**: `DateTime`

### Department

- **id**: `String`
- **departmentName**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **designations**: `Designation[]`
- **employees**: `Employee[]`

### Designation

- **id**: `String`
- **departmentId**: `String`
- **department**: `Department`
- **designationName**: `String`
- **level**: `Int`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **employees**: `Employee[]`
- **committeeMembers**: `CommitteeMember[]`

### DigitalSignature

- **id**: `String`
- **documentId**: `String`
- **documentType**: `String`
- **signedBy**: `String`
- **signatureHash**: `String`
- **algorithm**: `String`
- **isValid**: `Boolean`
- **signedAt**: `DateTime`
- **createdAt**: `DateTime`

### DistributionCampaign

- **id**: `String`
- **campaignId**: `String`
- **title**: `String`
- **distributionDate**: `DateTime`
- **location**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **schedules**: `DistributionSchedule[]`
- **records**: `DistributionRecord[]`

### DistributionCenter

- **id**: `String`
- **centerName**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **address**: `String`
- **latitude**: `Float?`
- **longitude**: `Float?`
- **capacity**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **schedules**: `DistributionSchedule[]`

### DistributionItem

- **id**: `String`
- **distributionRecordId**: `String`
- **distributionRecord**: `DistributionRecord`
- **reliefItemId**: `String`
- **reliefItem**: `ReliefItem`
- **quantity**: `Float`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DistributionRecord

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **distributionCampaignId**: `String`
- **distributionCampaign**: `DistributionCampaign`
- **packageId**: `String`
- **package**: `ReliefPackage`
- **distributedBy**: `String`
- **receivedAt**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **items**: `DistributionItem[]`
- **verifications**: `DistributionVerification[]`
- **acknowledgements**: `Acknowledgement[]`
- **feedbacks**: `BeneficiaryFeedback[]`

### DistributionSchedule

- **id**: `String`
- **distributionCampaignId**: `String`
- **distributionCampaign**: `DistributionCampaign`
- **branchId**: `String`
- **branch**: `Branch`
- **distributionCenterId**: `String`
- **distributionCenter**: `DistributionCenter`
- **scheduleDate**: `DateTime`
- **startTime**: `String`
- **endTime**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DistributionVerification

- **id**: `String`
- **distributionRecordId**: `String`
- **distributionRecord**: `DistributionRecord`
- **verificationMethod**: `String`
- **verifiedBy**: `String`
- **verificationTime**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### District

- **id**: `String`
- **divisionId**: `String`
- **division**: `Division`
- **name**: `String`
- **code**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **upazilas**: `Upazila[]`
- **branches**: `Branch[]`
- **areaAssignments**: `AreaAssignment[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **userAddresses**: `UserAddress[]`

### Division

- **id**: `String`
- **name**: `String`
- **code**: `String`
- **countryId**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **districts**: `District[]`
- **branches**: `Branch[]`
- **areaAssignments**: `AreaAssignment[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **userAddresses**: `UserAddress[]`

### Donation

- **id**: `String`
- **donationNumber**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **campaignId**: `String?`
- **campaign**: `Campaign?`
- **projectId**: `String?`
- **project**: `Project?`
- **donationTypeId**: `String`
- **donationType**: `DonationType`
- **categoryId**: `String`
- **category**: `DonationCategory`
- **amount**: `Float`
- **currency**: `String`
- **isAnonymous**: `Boolean`
- **message**: `String?`
- **paymentStatus**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **items**: `DonationItem[]`
- **payments**: `Payment[]`
- **receipts**: `DonationReceipt[]`
- **invoices**: `Invoice[]`

### DonationAnalytics

- **id**: `String`
- **period**: `String`
- **totalDonations**: `Float`
- **donorCount**: `Int`
- **avgDonation**: `Float`
- **topCampaign**: `String?`
- **growthRate**: `Float`
- **createdAt**: `DateTime`

### DonationCategory

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **icon**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **donations**: `Donation[]`

### DonationCommitment

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **campaignId**: `String?`
- **pledgedAmount**: `Float`
- **paidAmount**: `Float`
- **remainingAmount**: `Float`
- **dueDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonationInstallment

- **id**: `String`
- **scheduleId**: `String`
- **schedule**: `DonationSchedule`
- **installmentNo**: `Int`
- **amount**: `Float`
- **dueDate**: `DateTime`
- **paidDate**: `DateTime?`
- **paymentStatus**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonationItem

- **id**: `String`
- **donationId**: `String`
- **donation**: `Donation`
- **fundId**: `String`
- **fund**: `Fund`
- **amount**: `Float`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonationPrediction

- **id**: `String`
- **donorId**: `String?`
- **campaignId**: `String?`
- **predictedAmount**: `Float`
- **predictedDate**: `DateTime?`
- **confidenceScore**: `Float`
- **algorithm**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`

### DonationReceipt

- **id**: `String`
- **donationId**: `String`
- **donation**: `Donation`
- **receiptNumber**: `String`
- **receiptUrl**: `String?`
- **issuedAt**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonationSchedule

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **donationTypeId**: `String`
- **donationType**: `DonationType`
- **amount**: `Float`
- **frequency**: `String`
- **startDate**: `DateTime`
- **nextPaymentDate**: `DateTime?`
- **endDate**: `DateTime?`
- **autoRenew**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **installments**: `DonationInstallment[]`

### DonationType

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **donations**: `Donation[]`
- **schedules**: `DonationSchedule[]`

### Donor

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **donorCode**: `String`
- **donorType**: `String`
- **membershipId**: `String?`
- **registrationDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **individualProfile**: `IndividualDonor?`
- **corporateProfile**: `CorporateDonor?`
- **subscriptions**: `DonorSubscription[]`
- **commitments**: `DonationCommitment[]`
- **wallet**: `DonorWallet?`
- **certificates**: `DonorCertificate[]`
- **badges**: `DonorBadge[]`
- **activities**: `DonorActivity[]`
- **preference**: `DonorPreference?`
- **donations**: `Donation[]`
- **schedules**: `DonationSchedule[]`

### DonorActivity

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **activityType**: `String`
- **description**: `String`
- **performedAt**: `DateTime`
- **createdAt**: `DateTime`

### DonorBadge

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **badgeName**: `String`
- **badgeLevel**: `String?`
- **earnedAt**: `DateTime`
- **createdAt**: `DateTime`

### DonorCertificate

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **certificateType**: `String`
- **certificateNumber**: `String`
- **issueDate**: `DateTime`
- **downloadUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonorOrganization

- **id**: `String`
- **corporateDonorId**: `String`
- **corporateDonor**: `CorporateDonor`
- **industry**: `String?`
- **companySize**: `String?`
- **employeeCount**: `Int`
- **address**: `String?`
- **city**: `String?`
- **country**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonorPreference

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **preferredCategory**: `String?`
- **preferredCampaign**: `String?`
- **anonymousDonation**: `Boolean`
- **emailNotification**: `Boolean`
- **smsNotification**: `Boolean`
- **pushNotification**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonorSubscription

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **subscriptionType**: `String`
- **amount**: `Float`
- **billingCycle**: `String`
- **startDate**: `DateTime`
- **nextBillingDate**: `DateTime?`
- **endDate**: `DateTime?`
- **autoRenew**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonorTransaction

- **id**: `String`
- **walletId**: `String`
- **wallet**: `DonorWallet`
- **transactionType**: `String`
- **amount**: `Float`
- **referenceNo**: `String?`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### DonorWallet

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **balance**: `Float`
- **totalDonated**: `Float`
- **rewardPoints**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **transactions**: `DonorTransaction[]`

### DuplicateDetection

- **id**: `String`
- **entityType**: `String`
- **primaryId**: `String`
- **duplicateId**: `String`
- **matchScore**: `Float`
- **matchedFields**: `String[]`
- **resolvedBy**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EmailNotification

- **id**: `String`
- **notificationId**: `String`
- **notification**: `Notification`
- **recipientEmail**: `String`
- **subject**: `String`
- **body**: `String`
- **deliveryStatus**: `String`
- **sentAt**: `DateTime?`
- **createdAt**: `DateTime`

### EmailTemplate

- **id**: `String`
- **templateName**: `String`
- **subject**: `String`
- **body**: `String`
- **variables**: `String[]`
- **category**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EmergencyAlert

- **id**: `String`
- **title**: `String`
- **message**: `String`
- **alertType**: `String`
- **severity**: `String`
- **affectedArea**: `String?`
- **issuedBy**: `String`
- **resolvedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EmergencyCampaign

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **emergencyType**: `String`
- **priority**: `String`
- **affectedArea**: `String?`
- **requiredAmount**: `Float`
- **currentAmount**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Employee

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **employeeCode**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **departmentId**: `String`
- **department**: `Department`
- **designationId**: `String`
- **designation**: `Designation`
- **joiningDate**: `DateTime`
- **salary**: `Float`
- **employmentType**: `String`
- **reportingManagerId**: `String?`
- **reportingManager**: `Employee?`
- **subordinates**: `Employee[]`
- **staffRoles**: `StaffRole[]`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EncryptionKey

- **id**: `String`
- **keyName**: `String`
- **keyType**: `String`
- **publicKey**: `String?`
- **algorithm**: `String`
- **expiresAt**: `DateTime?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ErrorLog

- **id**: `String`
- **errorCode**: `String?`
- **message**: `String`
- **stackTrace**: `String?`
- **source**: `String`
- **userId**: `String?`
- **ipAddress**: `String?`
- **resolved**: `Boolean`
- **resolvedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Event

- **id**: `String`
- **eventCode**: `String`
- **title**: `String`
- **slug**: `String`
- **categoryId**: `String`
- **category**: `EventCategory`
- **description**: `String?`
- **banner**: `String?`
- **thumbnail**: `String?`
- **eventType**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **venue**: `String`
- **startDate**: `DateTime`
- **endDate**: `DateTime`
- **registrationRequired**: `Boolean`
- **maxParticipants**: `Int`
- **status**: `String`
- **createdBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **registrations**: `EventRegistration[]`
- **attendances**: `EventAttendance[]`
- **speakers**: `EventSpeaker[]`
- **volunteers**: `EventVolunteer[]`
- **schedules**: `EventSchedule[]`
- **galleries**: `EventGallery[]`

### EventAttendance

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **userId**: `String`
- **checkInTime**: `DateTime?`
- **checkOutTime**: `DateTime?`
- **attendanceStatus**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EventCategory

- **id**: `String`
- **name**: `String`
- **icon**: `String?`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **events**: `Event[]`

### EventGallery

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **albumId**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EventRegistration

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **userId**: `String`
- **registrationNumber**: `String`
- **registrationDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EventSchedule

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **title**: `String`
- **startTime**: `DateTime`
- **endTime**: `DateTime`
- **location**: `String?`
- **description**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **sessions**: `EventSession[]`

### EventSession

- **id**: `String`
- **scheduleId**: `String`
- **schedule**: `EventSchedule`
- **sessionTitle**: `String`
- **speakerId**: `String?`
- **speaker**: `EventSpeaker?`
- **duration**: `Int`
- **description**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### EventSpeaker

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **name**: `String`
- **designation**: `String?`
- **organization**: `String?`
- **photo**: `String?`
- **bio**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **sessions**: `EventSession[]`

### EventVolunteer

- **id**: `String`
- **eventId**: `String`
- **event**: `Event`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **role**: `String?`
- **assignedBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ExpenseAttachment

- **id**: `String`
- **expenseId**: `String`
- **expense**: `ProjectExpense`
- **fileName**: `String`
- **fileUrl**: `String`
- **fileType**: `String`
- **uploadedBy**: `String`
- **createdAt**: `DateTime`

### FAQ

- **id**: `String`
- **categoryId**: `String`
- **category**: `FAQCategory`
- **question**: `String`
- **answer**: `String`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### FAQCategory

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **faqs**: `FAQ[]`

### FaceVerification

- **id**: `String`
- **userId**: `String?`
- **beneficiaryId**: `String?`
- **referenceImageUrl**: `String`
- **capturedImageUrl**: `String`
- **matchScore**: `Float`
- **verificationStatus**: `String`
- **verifiedAt**: `DateTime?`
- **createdAt**: `DateTime`

### FamilyMember

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **name**: `String`
- **relationship**: `String`
- **age**: `Int`
- **occupation**: `String?`
- **monthlyIncome**: `Float`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### FieldActivity

- **id**: `String`
- **projectId**: `String`
- **activityTitle**: `String`
- **activityType**: `String`
- **location**: `String?`
- **description**: `String?`
- **performedBy**: `String`
- **activityDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **visits**: `FieldVisit[]`
- **reports**: `ActivityReport[]`

### FieldVisit

- **id**: `String`
- **activityId**: `String`
- **activity**: `FieldActivity`
- **visitedBy**: `String`
- **divisionId**: `String?`
- **districtId**: `String?`
- **upazilaId**: `String?`
- **unionId**: `String?`
- **visitDate**: `DateTime`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### FileCategory

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **maxFileSize**: `Int`
- **allowedTypes**: `String[]`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **files**: `FileStorage[]`

### FileStorage

- **id**: `String`
- **fileName**: `String`
- **originalName**: `String`
- **filePath**: `String`
- **fileUrl**: `String`
- **mimeType**: `String`
- **fileSize**: `Int`
- **categoryId**: `String?`
- **category**: `FileCategory?`
- **uploadedBy**: `String`
- **isPublic**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### FinancialAnalytics

- **id**: `String`
- **period**: `String`
- **totalIncome**: `Float`
- **totalExpense**: `Float`
- **netBalance**: `Float`
- **growthRate**: `Float`
- **createdAt**: `DateTime`

### FinancialReport

- **id**: `String`
- **reportType**: `String`
- **startDate**: `DateTime`
- **endDate**: `DateTime`
- **totalDonation**: `Float`
- **totalExpense**: `Float`
- **netBalance**: `Float`
- **generatedBy**: `String`
- **createdAt**: `DateTime`

### FollowUpVisit

- **id**: `String`
- **beneficiaryId**: `String`
- **beneficiary**: `Beneficiary`
- **visitedBy**: `String`
- **visitDate**: `DateTime`
- **remarks**: `String?`
- **nextVisitDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Footer

- **id**: `String`
- **content**: `String?`
- **copyright**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **socialLinks**: `SocialLink[]`

### FraudDetection

- **id**: `String`
- **entityType**: `String`
- **entityId**: `String`
- **riskScore**: `Float`
- **riskLevel**: `String`
- **flaggedReason**: `String?`
- **resolvedBy**: `String?`
- **resolvedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Fund

- **id**: `String`
- **fundName**: `String`
- **fundCode**: `String`
- **description**: `String?`
- **currentBalance**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **donationItems**: `DonationItem[]`
- **transfersFrom**: `FundTransfer[]`
- **transfersTo**: `FundTransfer[]`
- **allocationHistories**: `FundAllocationHistory[]`

### FundAllocation

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **projectId**: `String`
- **project**: `Project`
- **allocatedAmount**: `Float`
- **allocationDate**: `DateTime`
- **approvedBy**: `String`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **fundAllocationHistories**: `FundAllocationHistory[]`

### FundAllocationHistory

- **id**: `String`
- **fundId**: `String`
- **fund**: `Fund`
- **projectId**: `String?`
- **campaignId**: `String?`
- **allocatedAmount**: `Float`
- **allocatedBy**: `String`
- **allocationDate**: `DateTime`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **fundAllocationId**: `String?`
- **fundAllocation**: `FundAllocation?`

### FundTransfer

- **id**: `String`
- **fromFundId**: `String`
- **fromFund**: `Fund`
- **toFundId**: `String`
- **toFund**: `Fund`
- **amount**: `Float`
- **reason**: `String?`
- **approvedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### IPBlacklist

- **id**: `String`
- **ipAddress**: `String`
- **reason**: `String?`
- **blockedBy**: `String`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### IPWhitelist

- **id**: `String`
- **ipAddress**: `String`
- **description**: `String?`
- **addedBy**: `String`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### InAppNotification

- **id**: `String`
- **notificationId**: `String`
- **notification**: `Notification`
- **userId**: `String`
- **readAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### IndividualDonor

- **id**: `String`
- **donorId**: `String`
- **donor**: `Donor`
- **profession**: `String?`
- **organization**: `String?`
- **monthlyCommitment**: `Float`
- **preferredCampaign**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Integration

- **id**: `String`
- **integrationName**: `String`
- **integrationType**: `String`
- **apiUrl**: `String?`
- **apiKey**: `String?`
- **config**: `String?`
- **isActive**: `Boolean`
- **lastSyncAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Invoice

- **id**: `String`
- **invoiceNumber**: `String`
- **donationId**: `String`
- **donation**: `Donation`
- **donorId**: `String`
- **amount**: `Float`
- **tax**: `Float`
- **totalAmount**: `Float`
- **invoiceUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### KPI

- **id**: `String`
- **kpiName**: `String`
- **category**: `String`
- **targetValue**: `Float`
- **currentValue**: `Float`
- **unit**: `String?`
- **period**: `String`
- **branchId**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Language

- **id**: `String`
- **languageCode**: `String`
- **languageName**: `String`
- **isDefault**: `Boolean`
- **isRtl**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **translations**: `Translation[]`

### License

- **id**: `String`
- **licenseKey**: `String`
- **licenseType**: `String`
- **issuedTo**: `String`
- **issuedAt**: `DateTime`
- **expiresAt**: `DateTime?`
- **maxUsers**: `Int`
- **features**: `String[]`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### LiveDonationFeed

- **id**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **donorName**: `String?`
- **amount**: `Float`
- **message**: `String?`
- **isAnonymous**: `Boolean`
- **createdAt**: `DateTime`

### LoginAttempt

- **id**: `String`
- **userId**: `String?`
- **email**: `String`
- **ipAddress**: `String?`
- **userAgent**: `String?`
- **success**: `Boolean`
- **reason**: `String?`
- **createdAt**: `DateTime`

### MaintenanceMode

- **id**: `String`
- **isActive**: `Boolean`
- **message**: `String?`
- **startTime**: `DateTime?`
- **endTime**: `DateTime?`
- **activatedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Media

- **id**: `String`
- **title**: `String`
- **description**: `String?`
- **mediaType**: `String`
- **fileUrl**: `String`
- **thumbnailUrl**: `String?`
- **fileSize**: `Int`
- **mimeType**: `String?`
- **uploadedBy**: `String`
- **categoryId**: `String?`
- **category**: `MediaCategory?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **albumMedia**: `AlbumMedia[]`

### MediaActivityLog

- **id**: `String`
- **mediaId**: `String`
- **action**: `String`
- **performedBy**: `String`
- **details**: `String?`
- **createdAt**: `DateTime`

### MediaCategory

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **media**: `Media[]`

### Membership

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **membershipNumber**: `String`
- **membershipType**: `String`
- **organizationRole**: `String?`
- **joiningDate**: `DateTime`
- **expiryDate**: `DateTime?`
- **monthlyContribution**: `Float`
- **status**: `String`
- **approvedBy**: `String?`
- **approvedAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **cards**: `MembershipCard[]`
- **verifications**: `MembershipVerification[]`
- **renewals**: `MembershipRenewal[]`
- **activities**: `MembershipActivity[]`
- **payments**: `MembershipPayment[]`
- **histories**: `MembershipHistory[]`

### MembershipActivity

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **activityType**: `String`
- **description**: `String`
- **performedBy**: `String`
- **ipAddress**: `String?`
- **createdAt**: `DateTime`

### MembershipAnalytics

- **id**: `String`
- **period**: `String`
- **totalMembers**: `Int`
- **newMembers**: `Int`
- **renewalRate**: `Float`
- **totalContribution**: `Float`
- **createdAt**: `DateTime`

### MembershipCard

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **cardNumber**: `String`
- **cardType**: `String`
- **issueDate**: `DateTime`
- **expiryDate**: `DateTime?`
- **cardStatus**: `String`
- **profilePhoto**: `String?`
- **signature**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **qrCodes**: `MembershipQRCode[]`

### MembershipFee

- **id**: `String`
- **membershipType**: `String`
- **minimumAmount**: `Float`
- **maximumAmount**: `Float`
- **billingCycle**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### MembershipHistory

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **oldType**: `String?`
- **newType**: `String`
- **changedBy**: `String`
- **reason**: `String?`
- **createdAt**: `DateTime`

### MembershipPayment

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **paymentMethod**: `String`
- **amount**: `Float`
- **transactionId**: `String`
- **paymentStatus**: `String`
- **paidAt**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### MembershipQRCode

- **id**: `String`
- **membershipCardId**: `String`
- **membershipCard**: `MembershipCard`
- **qrCode**: `String`
- **barcode**: `String?`
- **verificationUrl**: `String?`
- **scanCount**: `Int`
- **lastScannedAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### MembershipRenewal

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **renewalDate**: `DateTime`
- **renewalAmount**: `Float`
- **paymentStatus**: `String`
- **nextExpiryDate**: `DateTime?`
- **processedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### MembershipVerification

- **id**: `String`
- **membershipId**: `String`
- **membership**: `Membership`
- **verificationMethod**: `String`
- **verifiedBy**: `String?`
- **verificationStatus**: `String`
- **verificationDate**: `DateTime`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Menu

- **id**: `String`
- **menuName**: `String`
- **position**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **items**: `MenuItem[]`

### MenuItem

- **id**: `String`
- **menuId**: `String`
- **menu**: `Menu`
- **parentId**: `String?`
- **parent**: `MenuItem?`
- **children**: `MenuItem[]`
- **label**: `String`
- **url**: `String?`
- **icon**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### News

- **id**: `String`
- **title**: `String`
- **slug**: `String`
- **content**: `String`
- **thumbnail**: `String?`
- **author**: `String`
- **publishedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Newsletter

- **id**: `String`
- **title**: `String`
- **subject**: `String`
- **content**: `String`
- **recipientCount**: `Int`
- **sentAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Notification

- **id**: `String`
- **templateId**: `String?`
- **template**: `NotificationTemplate?`
- **title**: `String`
- **message**: `String`
- **type**: `String`
- **priority**: `String`
- **senderId**: `String?`
- **status**: `String`
- **scheduledAt**: `DateTime?`
- **sentAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **recipients**: `NotificationRecipient[]`
- **pushDetails**: `PushNotification[]`
- **emailDetails**: `EmailNotification[]`
- **smsDetails**: `SMSNotification[]`
- **inAppDetails**: `InAppNotification[]`

### NotificationActivity

- **id**: `String`
- **notificationId**: `String`
- **action**: `String`
- **performedBy**: `String`
- **details**: `String?`
- **createdAt**: `DateTime`

### NotificationAutomation

- **id**: `String`
- **triggerEvent**: `String`
- **templateId**: `String?`
- **targetGroup**: `String?`
- **channel**: `String`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### NotificationConfiguration

- **id**: `String`
- **channel**: `String`
- **provider**: `String`
- **apiKey**: `String?`
- **config**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### NotificationRecipient

- **id**: `String`
- **notificationId**: `String`
- **notification**: `Notification`
- **userId**: `String`
- **readAt**: `DateTime?`
- **deliveredAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### NotificationTemplate

- **id**: `String`
- **templateName**: `String`
- **templateType**: `String`
- **subject**: `String?`
- **body**: `String`
- **variables**: `String[]`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **notifications**: `Notification[]`

### OCRDocumentVerification

- **id**: `String`
- **documentType**: `String`
- **documentImageUrl**: `String`
- **extractedData**: `String?`
- **confidenceScore**: `Float`
- **verificationStatus**: `String`
- **verifiedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### OfficeLocation

- **id**: `String`
- **name**: `String`
- **address**: `String`
- **phone**: `String?`
- **email**: `String?`
- **latitude**: `Float?`
- **longitude**: `Float?`
- **isHead**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### OperationalZone

- **id**: `String`
- **zoneName**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **zoneAssignments**: `ZoneAssignment[]`

### Organization

- **id**: `String`
- **organizationName**: `String`
- **organizationCode**: `String`
- **registrationNumber**: `String?`
- **logo**: `String?`
- **email**: `String?`
- **phone**: `String?`
- **website**: `String?`
- **description**: `String?`
- **foundedDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **branches**: `Branch[]`

### OrganizationActivityLog

- **id**: `String`
- **organizationId**: `String`
- **activity**: `String`
- **performedBy**: `String`
- **details**: `String?`
- **createdAt**: `DateTime`

### OrganizationHierarchy

- **id**: `String`
- **parentBranchId**: `String`
- **parentBranch**: `Branch`
- **childBranchId**: `String`
- **childBranch**: `Branch`
- **hierarchyLevel**: `Int`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### OrganizationProfile

- **id**: `String`
- **organizationId**: `String`
- **mission**: `String?`
- **vision**: `String?`
- **history**: `String?`
- **coreValues**: `String?`
- **socialLinks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Payment

- **id**: `String`
- **donationId**: `String`
- **donation**: `Donation`
- **paymentMethod**: `String`
- **paymentGatewayId**: `String`
- **paymentGateway**: `PaymentGateway`
- **amount**: `Float`
- **currency**: `String`
- **transactionId**: `String`
- **paymentStatus**: `String`
- **paidAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **transactions**: `PaymentTransaction[]`
- **webhooks**: `PaymentWebhook[]`
- **refunds**: `Refund[]`
- **logs**: `PaymentLog[]`

### PaymentConfiguration

- **id**: `String`
- **gatewayName**: `String`
- **merchantId**: `String?`
- **apiKey**: `String?`
- **secretKey**: `String?`
- **environment**: `String`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### PaymentGateway

- **id**: `String`
- **gatewayName**: `String`
- **merchantId**: `String`
- **apiKey**: `String`
- **secretKey**: `String`
- **environment**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **payments**: `Payment[]`
- **settlements**: `Settlement[]`

### PaymentLog

- **id**: `String`
- **paymentId**: `String?`
- **payment**: `Payment?`
- **event**: `String`
- **request**: `String?`
- **response**: `String?`
- **ipAddress**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`

### PaymentTransaction

- **id**: `String`
- **paymentId**: `String`
- **payment**: `Payment`
- **gatewayTransactionId**: `String`
- **gatewayResponse**: `String?`
- **amount**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### PaymentWebhook

- **id**: `String`
- **paymentId**: `String?`
- **payment**: `Payment?`
- **gateway**: `String`
- **payload**: `String`
- **verificationStatus**: `String`
- **receivedAt**: `DateTime`
- **createdAt**: `DateTime`

### Payout

- **id**: `String`
- **branchId**: `String`
- **projectId**: `String?`
- **amount**: `Float`
- **paymentMethod**: `String`
- **approvedBy**: `String?`
- **paymentStatus**: `String`
- **paidAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### PerformanceMetric

- **id**: `String`
- **metricName**: `String`
- **category**: `String`
- **value**: `Float`
- **unit**: `String?`
- **measuredAt**: `DateTime`
- **createdAt**: `DateTime`

### Permission

- **id**: `String`
- **permissionName**: `String`
- **module**: `String`
- **description**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **roles**: `RolePermission[]`

### PressRelease

- **id**: `String`
- **title**: `String`
- **slug**: `String`
- **content**: `String`
- **source**: `String?`
- **publishedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### PrivacyPolicyAcceptance

- **id**: `String`
- **userId**: `String`
- **policyVersion**: `String`
- **acceptedAt**: `DateTime`
- **ipAddress**: `String?`
- **createdAt**: `DateTime`

### Project

- **id**: `String`
- **projectCode**: `String`
- **campaignId**: `String`
- **campaign**: `Campaign`
- **projectName**: `String`
- **description**: `String?`
- **branchId**: `String`
- **branch**: `Branch`
- **startDate**: `DateTime`
- **endDate**: `DateTime`
- **projectManagerId**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **budgets**: `ProjectBudget[]`
- **expenses**: `ProjectExpense[]`
- **beneficiaries**: `ProjectBeneficiary[]`
- **volunteers**: `ProjectVolunteer[]`
- **galleries**: `ProjectGallery[]`
- **updates**: `ProjectUpdate[]`
- **timelines**: `ProjectTimeline[]`
- **fundAllocations**: `FundAllocation[]`
- **reports**: `ProjectReport[]`
- **donations**: `Donation[]`

### ProjectAnalytics

- **id**: `String`
- **projectId**: `String`
- **totalExpense**: `Float`
- **beneficiariesReached**: `Int`
- **completionRate**: `Float`
- **volunteerHours**: `Float`
- **createdAt**: `DateTime`

### ProjectBeneficiary

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **beneficiaryName**: `String`
- **phone**: `String?`
- **address**: `String?`
- **districtId**: `String?`
- **beneficiaryType**: `String?`
- **assistanceType**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ProjectBudget

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **estimatedBudget**: `Float`
- **approvedBudget**: `Float`
- **allocatedBudget**: `Float`
- **remainingBudget**: `Float`
- **approvedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ProjectCategory

- **id**: `String`
- **name**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ProjectExpense

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **expenseCategory**: `String`
- **description**: `String?`
- **amount**: `Float`
- **expenseDate**: `DateTime`
- **approvedBy**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **attachments**: `ExpenseAttachment[]`

### ProjectGallery

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **title**: `String`
- **mediaType**: `String`
- **fileUrl**: `String`
- **uploadedBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ProjectReport

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **reportTitle**: `String`
- **summary**: `String?`
- **beneficiariesCount**: `Int`
- **totalExpense**: `Float`
- **reportFile**: `String?`
- **publishedBy**: `String`
- **publishedAt**: `DateTime`
- **createdAt**: `DateTime`

### ProjectTimeline

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **event**: `String`
- **description**: `String?`
- **eventDate**: `DateTime`
- **createdBy**: `String`
- **createdAt**: `DateTime`

### ProjectUpdate

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **title**: `String`
- **description**: `String`
- **progressPercentage**: `Float`
- **publishedBy**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ProjectVolunteer

- **id**: `String`
- **projectId**: `String`
- **project**: `Project`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **assignedRole**: `String?`
- **assignedDate**: `DateTime`
- **completionStatus**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### PushNotification

- **id**: `String`
- **notificationId**: `String`
- **notification**: `Notification`
- **deviceToken**: `String`
- **payload**: `String?`
- **deliveryStatus**: `String`
- **sentAt**: `DateTime?`
- **createdAt**: `DateTime`

### QRVerification

- **id**: `String`
- **qrCode**: `String`
- **entityType**: `String`
- **entityId**: `String`
- **scannedBy**: `String?`
- **scannedAt**: `DateTime`
- **verificationStatus**: `String`
- **location**: `String?`
- **createdAt**: `DateTime`

### Referral

- **id**: `String`
- **referrerId**: `String`
- **referredUserId**: `String`
- **referralCode**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **rewards**: `ReferralReward[]`

### ReferralReward

- **id**: `String`
- **referralId**: `String`
- **referral**: `Referral`
- **rewardType**: `String`
- **rewardValue**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Refund

- **id**: `String`
- **paymentId**: `String`
- **payment**: `Payment`
- **refundAmount**: `Float`
- **refundReason**: `String?`
- **refundStatus**: `String`
- **processedBy**: `String?`
- **processedAt**: `DateTime?`
- **createdAt**: `DateTime`

### Region

- **id**: `String`
- **regionName**: `String`
- **description**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### RegionalCoordinator

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **regionName**: `String`
- **divisionId**: `String?`
- **districtId**: `String?`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ReliefItem

- **id**: `String`
- **packageId**: `String`
- **package**: `ReliefPackage`
- **itemName**: `String`
- **quantity**: `Float`
- **unit**: `String`
- **estimatedPrice**: `Float`
- **createdAt**: `DateTime`
- **distributionItems**: `DistributionItem[]`

### ReliefPackage

- **id**: `String`
- **packageName**: `String`
- **description**: `String?`
- **estimatedValue**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **items**: `ReliefItem[]`
- **distributionRecords**: `DistributionRecord[]`

### Reminder

- **id**: `String`
- **userId**: `String`
- **title**: `String`
- **message**: `String?`
- **reminderDate**: `DateTime`
- **reminderType**: `String`
- **isRecurring**: `Boolean`
- **frequency**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Report

- **id**: `String`
- **reportName**: `String`
- **reportType**: `String`
- **templateId**: `String?`
- **template**: `ReportTemplate?`
- **parameters**: `String?`
- **generatedBy**: `String`
- **fileUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **exports**: `ReportExport[]`

### ReportExport

- **id**: `String`
- **reportId**: `String`
- **report**: `Report`
- **format**: `String`
- **fileUrl**: `String`
- **fileSize**: `Int`
- **exportedBy**: `String`
- **createdAt**: `DateTime`

### ReportTemplate

- **id**: `String`
- **templateName**: `String`
- **reportType**: `String`
- **layout**: `String?`
- **fields**: `String[]`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **reports**: `Report[]`
- **scheduled**: `ScheduledReport[]`

### RiskAssessment

- **id**: `String`
- **entityType**: `String`
- **entityId**: `String`
- **riskLevel**: `String`
- **riskScore**: `Float`
- **factors**: `String?`
- **assessedBy**: `String`
- **assessedAt**: `DateTime`
- **createdAt**: `DateTime`

### Role

- **id**: `String`
- **roleName**: `String`
- **displayName**: `String`
- **description**: `String?`
- **roleType**: `RoleType`
- **priority**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **permissions**: `RolePermission[]`
- **userRoles**: `UserRole[]`
- **staffRoles**: `StaffRole[]`
- **volunteerRoles**: `VolunteerRole[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **parentRoles**: `RoleHierarchy[]`
- **childRoles**: `RoleHierarchy[]`
- **accessLogs**: `AccessLog[]`

### RoleHierarchy

- **id**: `String`
- **parentRoleId**: `String`
- **parentRole**: `Role`
- **childRoleId**: `String`
- **childRole**: `Role`
- **hierarchyLevel**: `Int`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### RolePermission

- **id**: `String`
- **roleId**: `String`
- **role**: `Role`
- **permissionId**: `String`
- **permission**: `Permission`
- **canView**: `Boolean`
- **canCreate**: `Boolean`
- **canUpdate**: `Boolean`
- **canDelete**: `Boolean`
- **canApprove**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### RouteOptimization

- **id**: `String`
- **optimizationType**: `String`
- **startLocation**: `String`
- **endLocation**: `String`
- **waypoints**: `String[]`
- **optimizedRoute**: `String?`
- **distanceKm**: `Float`
- **durationMinutes**: `Float`
- **createdAt**: `DateTime`

### SEOSetting

- **id**: `String`
- **pageUrl**: `String`
- **metaTitle**: `String?`
- **metaDescription**: `String?`
- **metaKeywords**: `String?`
- **ogTitle**: `String?`
- **ogDescription**: `String?`
- **ogImage**: `String?`
- **canonicalUrl**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SMSNotification

- **id**: `String`
- **notificationId**: `String`
- **notification**: `Notification`
- **recipientPhone**: `String`
- **message**: `String`
- **deliveryStatus**: `String`
- **sentAt**: `DateTime?`
- **createdAt**: `DateTime`

### SMSTemplate

- **id**: `String`
- **templateName**: `String`
- **message**: `String`
- **variables**: `String[]`
- **category**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ScheduledReport

- **id**: `String`
- **templateId**: `String`
- **template**: `ReportTemplate`
- **frequency**: `String`
- **recipients**: `String[]`
- **nextRunAt**: `DateTime?`
- **lastRunAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SecurityActivityLog

- **id**: `String`
- **userId**: `String?`
- **action**: `String`
- **module**: `String`
- **ipAddress**: `String?`
- **userAgent**: `String?`
- **riskLevel**: `String?`
- **details**: `String?`
- **createdAt**: `DateTime`

### SecurityConfiguration

- **id**: `String`
- **configKey**: `String`
- **configValue**: `String`
- **description**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SecurityIncident

- **id**: `String`
- **incidentType**: `String`
- **severity**: `String`
- **description**: `String`
- **affectedArea**: `String?`
- **reportedBy**: `String?`
- **resolvedBy**: `String?`
- **resolvedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Session

- **id**: `String`
- **expiresAt**: `DateTime`
- **token**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **ipAddress**: `String?`
- **userAgent**: `String?`
- **userId**: `String`
- **user**: `User`
- **impersonatedBy**: `String?`

### Settlement

- **id**: `String`
- **paymentGatewayId**: `String`
- **paymentGateway**: `PaymentGateway`
- **totalCollected**: `Float`
- **processingFee**: `Float`
- **netAmount**: `Float`
- **settlementDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Slider

- **id**: `String`
- **title**: `String`
- **description**: `String?`
- **imageUrl**: `String`
- **linkUrl**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SmartBeneficiaryMatching

- **id**: `String`
- **beneficiaryId**: `String`
- **campaignId**: `String?`
- **projectId**: `String?`
- **matchScore**: `Float`
- **matchReason**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`

### SmartCampaignRecommendation

- **id**: `String`
- **campaignId**: `String`
- **recommendation**: `String`
- **targetAudience**: `String?`
- **expectedImpact**: `Float`
- **confidenceScore**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`

### SmartDonationRecommendation

- **id**: `String`
- **donorId**: `String`
- **campaignId**: `String?`
- **recommendedAmount**: `Float?`
- **reason**: `String?`
- **confidenceScore**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`

### SmartProjectRecommendation

- **id**: `String`
- **branchId**: `String`
- **projectType**: `String`
- **recommendation**: `String`
- **expectedImpact**: `Float`
- **confidenceScore**: `Float`
- **status**: `String`
- **createdAt**: `DateTime`

### SmartScheduler

- **id**: `String`
- **scheduleName**: `String`
- **scheduleType**: `String`
- **cronExpression**: `String?`
- **startDate**: `DateTime`
- **endDate**: `DateTime?`
- **lastRunAt**: `DateTime?`
- **nextRunAt**: `DateTime?`
- **payload**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SmartVolunteerRecommendation

- **id**: `String`
- **volunteerId**: `String`
- **projectId**: `String?`
- **campaignId**: `String?`
- **matchScore**: `Float`
- **reason**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`

### SocialLink

- **id**: `String`
- **footerId**: `String?`
- **footer**: `Footer?`
- **platform**: `String`
- **url**: `String`
- **icon**: `String?`
- **sortOrder**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### StaffRole

- **id**: `String`
- **staffId**: `String`
- **staff**: `Employee`
- **roleId**: `String`
- **role**: `Role`
- **department**: `String`
- **designation**: `String`
- **joiningDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### StoryMedia

- **id**: `String`
- **storyId**: `String`
- **story**: `SuccessStory`
- **mediaType**: `String`
- **fileUrl**: `String`
- **caption**: `String?`
- **sortOrder**: `Int`
- **createdAt**: `DateTime`

### SuccessStory

- **id**: `String`
- **title**: `String`
- **slug**: `String`
- **summary**: `String?`
- **content**: `String`
- **beneficiaryId**: `String?`
- **beneficiary**: `Beneficiary?`
- **campaignId**: `String?`
- **campaign**: `Campaign?`
- **publishedBy**: `String`
- **publishedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **media**: `StoryMedia[]`

### SuperAdmin

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **permissions**: `String[]`
- **assignedBy**: `String`
- **assignedAt**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SupportTicket

- **id**: `String`
- **ticketNumber**: `String`
- **userId**: `String`
- **subject**: `String`
- **description**: `String`
- **category**: `String`
- **priority**: `String`
- **assignedTo**: `String?`
- **resolvedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **replies**: `TicketReply[]`
- **attachments**: `TicketAttachment[]`

### SystemConfiguration

- **id**: `String`
- **configKey**: `String`
- **configValue**: `String`
- **configType**: `String`
- **environment**: `String`
- **isEncrypted**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### SystemHealth

- **id**: `String`
- **serviceName**: `String`
- **status**: `String`
- **responseTime**: `Float`
- **cpuUsage**: `Float`
- **memoryUsage**: `Float`
- **diskUsage**: `Float`
- **checkedAt**: `DateTime`
- **createdAt**: `DateTime`

### SystemLog

- **id**: `String`
- **level**: `String`
- **source**: `String`
- **message**: `String`
- **metadata**: `String?`
- **createdAt**: `DateTime`

### SystemSetting

- **id**: `String`
- **settingKey**: `String`
- **settingValue**: `String`
- **category**: `String`
- **description**: `String?`
- **isPublic**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### TermsAcceptance

- **id**: `String`
- **userId**: `String`
- **termsVersion**: `String`
- **acceptedAt**: `DateTime`
- **ipAddress**: `String?`
- **createdAt**: `DateTime`

### TerritoryAssignment

- **id**: `String`
- **userId**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **divisionId**: `String?`
- **districtId**: `String?`
- **upazilaId**: `String?`
- **unionId**: `String?`
- **assignedBy**: `String`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Testimonial

- **id**: `String`
- **authorName**: `String`
- **designation**: `String?`
- **organization**: `String?`
- **photo**: `String?`
- **content**: `String`
- **rating**: `Int`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### TicketAttachment

- **id**: `String`
- **ticketId**: `String`
- **ticket**: `SupportTicket`
- **fileName**: `String`
- **fileUrl**: `String`
- **fileType**: `String`
- **createdAt**: `DateTime`

### TicketReply

- **id**: `String`
- **ticketId**: `String`
- **ticket**: `SupportTicket`
- **userId**: `String`
- **message**: `String`
- **isStaff**: `Boolean`
- **createdAt**: `DateTime`

### Translation

- **id**: `String`
- **languageId**: `String`
- **language**: `Language`
- **key**: `String`
- **value**: `String`
- **module**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### TrustedDevice

- **id**: `String`
- **userId**: `String`
- **deviceId**: `String`
- **deviceName**: `String?`
- **deviceType**: `String?`
- **fingerprint**: `String?`
- **trustedAt**: `DateTime`
- **lastUsedAt**: `DateTime?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### TwoFactorAuthentication

- **id**: `String`
- **userId**: `String`
- **method**: `String`
- **secret**: `String?`
- **isEnabled**: `Boolean`
- **verifiedAt**: `DateTime?`
- **backupCodes**: `String[]`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Union

- **id**: `String`
- **upazilaId**: `String`
- **upazila**: `Upazila`
- **name**: `String`
- **code**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **branches**: `Branch[]`
- **areaAssignments**: `AreaAssignment[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **userAddresses**: `UserAddress[]`

### Upazila

- **id**: `String`
- **districtId**: `String`
- **district**: `District`
- **name**: `String`
- **code**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **unions**: `Union[]`
- **branches**: `Branch[]`
- **areaAssignments**: `AreaAssignment[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **userAddresses**: `UserAddress[]`

### User

- **id**: `String`
- **name**: `String`
- **email**: `String`
- **emailVerified**: `Boolean`
- **image**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **role**: `String?`
- **banned**: `Boolean?`
- **banReason**: `String?`
- **banExpires**: `DateTime?`
- **sessions**: `Session[]`
- **accounts**: `Account[]`
- **userRoles**: `UserRole[]`
- **employees**: `Employee[]`
- **areaAssignments**: `AreaAssignment[]`
- **accessLogs**: `AccessLog[]`
- **adminPermissions**: `AdminPermission[]`
- **committeeMembers**: `CommitteeMember[]`
- **committeeRoles**: `CommitteeRole[]`
- **volunteerRoles**: `VolunteerRole[]`
- **coordinatorRoles**: `CoordinatorRole[]`
- **userProfile**: `UserProfile?`
- **addresses**: `UserAddress[]`
- **notificationSetting**: `UserNotificationSetting?`
- **security**: `UserSecurity?`
- **devices**: `UserDevice[]`
- **userSessions**: `UserSession[]`
- **tokens**: `UserToken[]`
- **otps**: `UserOTP[]`
- **loginHistories**: `UserLoginHistory[]`
- **membership**: `Membership?`
- **donor**: `Donor?`
- **volunteer**: `Volunteer?`
- **superAdmin**: `SuperAdmin?`
- **branchManagers**: `BranchManager[]`
- **branchStaff**: `BranchStaff[]`
- **regionalCoordinators**: `RegionalCoordinator[]`

### UserActivityAnalytics

- **id**: `String`
- **period**: `String`
- **totalLogins**: `Int`
- **activeUsers**: `Int`
- **avgSessionTime**: `Float`
- **createdAt**: `DateTime`

### UserAddress

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **countryId**: `String`
- **divisionId**: `String?`
- **division**: `Division?`
- **districtId**: `String?`
- **district**: `District?`
- **upazilaId**: `String?`
- **upazila**: `Upazila?`
- **unionId**: `String?`
- **union**: `Union?`
- **village**: `String?`
- **postCode**: `String?`
- **addressLine**: `String?`
- **latitude**: `Float?`
- **longitude**: `Float?`
- **isDefault**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserBan

- **id**: `String`
- **userId**: `String`
- **bannedBy**: `String`
- **reason**: `String`
- **bannedAt**: `DateTime`
- **expiresAt**: `DateTime?`
- **liftedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserBlockHistory

- **id**: `String`
- **userId**: `String`
- **blockedBy**: `String`
- **reason**: `String`
- **blockedAt**: `DateTime`
- **unblockedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserDevice

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **deviceId**: `String`
- **deviceName**: `String?`
- **deviceType**: `String?`
- **operatingSystem**: `String?`
- **browser**: `String?`
- **appVersion**: `String?`
- **ipAddress**: `String?`
- **lastLogin**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserLoginHistory

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **deviceId**: `String?`
- **ipAddress**: `String?`
- **location**: `String?`
- **loginTime**: `DateTime`
- **logoutTime**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### UserMessage

- **id**: `String`
- **senderId**: `String`
- **receiverId**: `String`
- **subject**: `String?`
- **message**: `String`
- **readAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### UserNotificationSetting

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **pushNotification**: `Boolean`
- **emailNotification**: `Boolean`
- **smsNotification**: `Boolean`
- **campaignNotification**: `Boolean`
- **emergencyNotification**: `Boolean`
- **newsletter**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserOTP

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **phone**: `String?`
- **otp**: `String`
- **purpose**: `String`
- **expiresAt**: `DateTime`
- **verifiedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### UserPermission

- **id**: `String`
- **userId**: `String`
- **module**: `String`
- **action**: `String`
- **isAllowed**: `Boolean`
- **grantedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserProfile

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **fatherName**: `String?`
- **motherName**: `String?`
- **occupation**: `String?`
- **organization**: `String?`
- **designation**: `String?`
- **education**: `String?`
- **bio**: `String?`
- **facebook**: `String?`
- **linkedin**: `String?`
- **website**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserRole

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **roleId**: `String`
- **role**: `Role`
- **assignedBy**: `String`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserSecurity

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **twoFactorEnabled**: `Boolean`
- **securityQuestion**: `String?`
- **securityAnswer**: `String?`
- **failedLoginAttempts**: `Int`
- **accountLocked**: `Boolean`
- **lastPasswordChanged**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### UserSession

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **deviceId**: `String?`
- **accessToken**: `String`
- **refreshToken**: `String?`
- **expiresAt**: `DateTime`
- **loginTime**: `DateTime`
- **logoutTime**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`

### UserToken

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **token**: `String`
- **tokenType**: `String`
- **expiresAt**: `DateTime`
- **isUsed**: `Boolean`
- **createdAt**: `DateTime`

### Verification

- **id**: `String`
- **identifier**: `String`
- **value**: `String`
- **expiresAt**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VersionHistory

- **id**: `String`
- **versionNo**: `String`
- **releaseDate**: `DateTime`
- **changelog**: `String?`
- **releasedBy**: `String`
- **status**: `String`
- **createdAt**: `DateTime`

### VisitorAnalytics

- **id**: `String`
- **pageUrl**: `String`
- **visitorCount**: `Int`
- **uniqueVisitors**: `Int`
- **bounceRate**: `Float`
- **avgTimeOnPage**: `Float`
- **date**: `DateTime`
- **createdAt**: `DateTime`

### Volunteer

- **id**: `String`
- **userId**: `String`
- **user**: `User`
- **volunteerCode**: `String`
- **branchId**: `String`
- **branch**: `Branch`
- **membershipId**: `String?`
- **joiningDate**: `DateTime`
- **experience**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **profile**: `VolunteerProfile?`
- **skills**: `VolunteerSkill[]`
- **availabilities**: `VolunteerAvailability[]`
- **performances**: `VolunteerPerformance[]`
- **rewards**: `VolunteerReward[]`
- **certificates**: `VolunteerCertificate[]`
- **expenses**: `VolunteerExpense[]`
- **documents**: `VolunteerDocument[]`
- **activities**: `VolunteerActivityLog[]`
- **eventVolunteers**: `EventVolunteer[]`
- **projectVolunteers**: `ProjectVolunteer[]`
- **volunteerAssignments**: `VolunteerAssignment[]`

### VolunteerActivityLog

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **activity**: `String`
- **description**: `String?`
- **performedBy**: `String`
- **createdAt**: `DateTime`

### VolunteerAnalytics

- **id**: `String`
- **period**: `String`
- **totalVolunteers**: `Int`
- **activeVolunteers**: `Int`
- **totalHoursLogged**: `Float`
- **avgAttendanceRate**: `Float`
- **createdAt**: `DateTime`

### VolunteerAnnouncement

- **id**: `String`
- **title**: `String`
- **description**: `String`
- **targetGroup**: `String?`
- **startDate**: `DateTime`
- **endDate**: `DateTime`
- **publishedBy**: `String`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerAssignment

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **campaignId**: `String?`
- **projectId**: `String?`
- **assignedBy**: `String`
- **assignedRole**: `String?`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **schedules**: `VolunteerSchedule[]`
- **tasks**: `VolunteerTask[]`

### VolunteerAttendance

- **id**: `String`
- **volunteerId**: `String`
- **scheduleId**: `String`
- **schedule**: `VolunteerSchedule`
- **checkInTime**: `DateTime?`
- **checkOutTime**: `DateTime?`
- **attendanceStatus**: `String`
- **remarks**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerAvailability

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **availableDays**: `String[]`
- **availableFrom**: `String?`
- **availableTo**: `String?`
- **isAvailable**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerCertificate

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **certificateType**: `String`
- **certificateNumber**: `String`
- **issueDate**: `DateTime`
- **certificateUrl**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerDocument

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **documentType**: `String`
- **documentName**: `String`
- **fileUrl**: `String`
- **verificationStatus**: `String`
- **uploadedAt**: `DateTime`
- **createdAt**: `DateTime`

### VolunteerExpense

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **activityId**: `String`
- **expenseType**: `String`
- **amount**: `Float`
- **description**: `String?`
- **receiptUrl**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **reimbursements**: `VolunteerReimbursement[]`

### VolunteerPerformance

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **totalAssignments**: `Int`
- **completedAssignments**: `Int`
- **attendanceRate**: `Float`
- **performanceScore**: `Float`
- **rating**: `Float`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerProfile

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **profession**: `String?`
- **organization**: `String?`
- **skills**: `String?`
- **languages**: `String?`
- **emergencyContact**: `String?`
- **bloodGroup**: `String?`
- **availability**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerReimbursement

- **id**: `String`
- **expenseId**: `String`
- **expense**: `VolunteerExpense`
- **approvedAmount**: `Float`
- **approvedBy**: `String?`
- **paymentMethod**: `String`
- **paymentStatus**: `String`
- **paidAt**: `DateTime?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerReward

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **rewardType**: `String`
- **title**: `String`
- **description**: `String?`
- **rewardDate**: `DateTime`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerRole

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `User`
- **roleId**: `String`
- **role**: `Role`
- **assignedArea**: `String`
- **responsibility**: `String`
- **startDate**: `DateTime`
- **endDate**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerSchedule

- **id**: `String`
- **volunteerId**: `String`
- **assignmentId**: `String`
- **assignment**: `VolunteerAssignment`
- **scheduleDate**: `DateTime`
- **startTime**: `String`
- **endTime**: `String`
- **location**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **attendances**: `VolunteerAttendance[]`

### VolunteerSkill

- **id**: `String`
- **volunteerId**: `String`
- **volunteer**: `Volunteer`
- **skillName**: `String`
- **skillLevel**: `String?`
- **experienceYears**: `Int`
- **verifiedBy**: `String?`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerTask

- **id**: `String`
- **assignmentId**: `String`
- **assignment**: `VolunteerAssignment`
- **title**: `String`
- **description**: `String?`
- **priority**: `String`
- **dueDate**: `DateTime?`
- **completedAt**: `DateTime?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### VolunteerTraining

- **id**: `String`
- **trainingTitle**: `String`
- **description**: `String?`
- **trainer**: `String?`
- **trainingDate**: `DateTime`
- **location**: `String?`
- **certificateAvailable**: `Boolean`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Ward

- **id**: `String`
- **wardName**: `String`
- **wardNumber**: `Int`
- **unionId**: `String?`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### Webhook

- **id**: `String`
- **webhookName**: `String`
- **url**: `String`
- **events**: `String[]`
- **secretKey**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`
- **logs**: `WebhookLog[]`

### WebhookLog

- **id**: `String`
- **webhookId**: `String`
- **webhook**: `Webhook`
- **event**: `String`
- **payload**: `String?`
- **response**: `String?`
- **statusCode**: `Int?`
- **deliveredAt**: `DateTime?`
- **createdAt**: `DateTime`

### WorkflowAutomation

- **id**: `String`
- **workflowName**: `String`
- **triggerEvent**: `String`
- **actions**: `String[]`
- **conditions**: `String?`
- **isActive**: `Boolean`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

### ZoneAssignment

- **id**: `String`
- **zoneId**: `String`
- **zone**: `OperationalZone`
- **branchId**: `String`
- **branch**: `Branch`
- **assignedDate**: `DateTime`
- **status**: `String`
- **createdAt**: `DateTime`
- **updatedAt**: `DateTime`

## 🛣️ API Routes

### `ai-engine.routes.ts`

- **POST** `/models/register`
- **POST** `/forecasts/demand`

### `ai.routes.ts`

- **POST** `/predict/donation`
- **POST** `/task/queue`

### `analytics.routes.ts`

- **POST** `/system-health/log`
- **GET** `/branch/:branchId/stats`

### `automation.routes.ts`

- **POST** `/tasks/schedule`
- **POST** `/logs/record`

### `beneficiary.routes.ts`

- **POST** `/register`
- **POST** `/assessment`

### `cms.routes.ts`

- **POST** `/pages/create`
- **POST** `/stories/publish`

### `donation.routes.ts`

- **POST** `/process`

### `event.routes.ts`

- **POST** `/schedule`
- **POST** `/attendance/check-in`

### `field-activity.routes.ts`

- **POST** `/activities/log`
- **POST** `/visits/record`

### `financial.routes.ts`

- **POST** `/funds/transfer`
- **POST** `/payments/verify`

### `governance.routes.ts`

- **POST** `/committee/create`

### `index.routes.ts`

_No explicit routes found via regex (might be using controllers directly)._

### `inventory.routes.ts`

- **POST** `/stock/update`
- **POST** `/items/distribute`

### `localization.routes.ts`

- **POST** `/currency/rate`
- **POST** `/translation/upsert`

### `media.routes.ts`

- **POST** `/upload/register`
- **GET** `/user/:userId/assets`

### `notification.routes.ts`

- **POST** `/queue`
- **GET** `/user/:userId`

### `security.routes.ts`

- **POST** `/network/whitelist`
- **POST** `/incidents/flag`

### `support.routes.ts`

- **POST** `/tickets/open`
- **POST** `/tickets/reply`

### `user.routes.ts`

- **GET** `/`

### `volunteer-logistics.routes.ts`

- **POST** `/attendance/check-in`
- **POST** `/expenses/submit`

### `volunteer.routes.ts`

- **POST** `/performance`
- **GET** `/available`

