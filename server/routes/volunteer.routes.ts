import { Router } from "express";
import { volunteerCoreController } from "../controllers/volunteer_controller/volunteerCore.controller";
import { volunteerOpsController } from "../controllers/volunteer_controller/volunteerOps.controller";
import { volunteerRewardsController } from "../controllers/volunteer_controller/volunteerRewards.controller";

const router = Router();

// ==================== 1. VOLUNTEER CORE ROUTES ====================
// 1. Volunteer
router.post("/volunteers", volunteerCoreController.createVolunteer);
router.get("/volunteers", volunteerCoreController.getAllVolunteers);
router.get("/volunteers/:id", volunteerCoreController.getVolunteerById);
router.patch("/volunteers/:id", volunteerCoreController.updateVolunteer);
router.delete("/volunteers/:id", volunteerCoreController.deleteVolunteer);

// 2. VolunteerProfile
router.post("/volunteer-profiles", volunteerCoreController.createVolunteerProfile);
router.get("/volunteer-profiles", volunteerCoreController.getAllVolunteerProfiles);
router.get("/volunteer-profiles/:id", volunteerCoreController.getVolunteerProfileById);
router.patch("/volunteer-profiles/:id", volunteerCoreController.updateVolunteerProfile);
router.delete("/volunteer-profiles/:id", volunteerCoreController.deleteVolunteerProfile);

// 3. VolunteerSkill
router.post("/volunteer-skills", volunteerCoreController.createVolunteerSkill);
router.get("/volunteer-skills", volunteerCoreController.getAllVolunteerSkills);
router.get("/volunteer-skills/:id", volunteerCoreController.getVolunteerSkillById);
router.patch("/volunteer-skills/:id", volunteerCoreController.updateVolunteerSkill);
router.delete("/volunteer-skills/:id", volunteerCoreController.deleteVolunteerSkill);

// 4. VolunteerAvailability
router.post("/volunteer-availabilities", volunteerCoreController.createVolunteerAvailability);
router.get("/volunteer-availabilities", volunteerCoreController.getAllVolunteerAvailabilities);
router.get("/volunteer-availabilities/:id", volunteerCoreController.getVolunteerAvailabilityById);
router.patch("/volunteer-availabilities/:id", volunteerCoreController.updateVolunteerAvailability);
router.delete("/volunteer-availabilities/:id", volunteerCoreController.deleteVolunteerAvailability);

// 20. VolunteerDocument
router.post("/volunteer-documents", volunteerCoreController.createVolunteerDocument);
router.get("/volunteer-documents", volunteerCoreController.getAllVolunteerDocuments);
router.get("/volunteer-documents/:id", volunteerCoreController.getVolunteerDocumentById);
router.patch("/volunteer-documents/:id", volunteerCoreController.updateVolunteerDocument);
router.delete("/volunteer-documents/:id", volunteerCoreController.deleteVolunteerDocument);

// 21. VolunteerActivityLog
router.post("/volunteer-activity-logs", volunteerCoreController.createVolunteerActivityLog);
router.get("/volunteer-activity-logs", volunteerCoreController.getAllVolunteerActivityLogs);
router.get("/volunteer-activity-logs/:id", volunteerCoreController.getVolunteerActivityLogById);
router.delete("/volunteer-activity-logs/:id", volunteerCoreController.deleteVolunteerActivityLog);


// ==================== 2. VOLUNTEER OPERATIONS & FIELD WORK ROUTES ====================
// 5. VolunteerAssignment
router.post("/volunteer-assignments", volunteerOpsController.createVolunteerAssignment);
router.get("/volunteer-assignments", volunteerOpsController.getAllVolunteerAssignments);
router.get("/volunteer-assignments/:id", volunteerOpsController.getVolunteerAssignmentById);
router.patch("/volunteer-assignments/:id", volunteerOpsController.updateVolunteerAssignment);
router.delete("/volunteer-assignments/:id", volunteerOpsController.deleteVolunteerAssignment);

// 6. VolunteerSchedule
router.post("/volunteer-schedules", volunteerOpsController.createVolunteerSchedule);
router.get("/volunteer-schedules", volunteerOpsController.getAllVolunteerSchedules);
router.get("/volunteer-schedules/:id", volunteerOpsController.getVolunteerScheduleById);
router.patch("/volunteer-schedules/:id", volunteerOpsController.updateVolunteerSchedule);
router.delete("/volunteer-schedules/:id", volunteerOpsController.deleteVolunteerSchedule);

// 7. VolunteerAttendance
router.post("/volunteer-attendances", volunteerOpsController.createVolunteerAttendance);
router.get("/volunteer-attendances", volunteerOpsController.getAllVolunteerAttendances);
router.get("/volunteer-attendances/:id", volunteerOpsController.getVolunteerAttendanceById);
router.patch("/volunteer-attendances/:id", volunteerOpsController.updateVolunteerAttendance);
router.delete("/volunteer-attendances/:id", volunteerOpsController.deleteVolunteerAttendance);

// 8. VolunteerTask
router.post("/volunteer-tasks", volunteerOpsController.createVolunteerTask);
router.get("/volunteer-tasks", volunteerOpsController.getAllVolunteerTasks);
router.get("/volunteer-tasks/:id", volunteerOpsController.getVolunteerTaskById);
router.patch("/volunteer-tasks/:id", volunteerOpsController.updateVolunteerTask);
router.delete("/volunteer-tasks/:id", volunteerOpsController.deleteVolunteerTask);

// 9. FieldActivity
router.post("/field-activities", volunteerOpsController.createFieldActivity);
router.get("/field-activities", volunteerOpsController.getAllFieldActivities);
router.get("/field-activities/:id", volunteerOpsController.getFieldActivityById);
router.patch("/field-activities/:id", volunteerOpsController.updateFieldActivity);
router.delete("/field-activities/:id", volunteerOpsController.deleteFieldActivity);

// 10. FieldVisit
router.post("/field-visits", volunteerOpsController.createFieldVisit);
router.get("/field-visits", volunteerOpsController.getAllFieldVisits);
router.get("/field-visits/:id", volunteerOpsController.getFieldVisitById);
router.patch("/field-visits/:id", volunteerOpsController.updateFieldVisit);
router.delete("/field-visits/:id", volunteerOpsController.deleteFieldVisit);

// 11. ActivityReport
router.post("/activity-reports", volunteerOpsController.createActivityReport);
router.get("/activity-reports", volunteerOpsController.getAllActivityReports);
router.get("/activity-reports/:id", volunteerOpsController.getActivityReportById);
router.patch("/activity-reports/:id", volunteerOpsController.updateActivityReport);
router.delete("/activity-reports/:id", volunteerOpsController.deleteActivityReport);

// 12. BeneficiaryVerification
router.post("/beneficiary-verifications", volunteerOpsController.createBeneficiaryVerification);
router.get("/beneficiary-verifications", volunteerOpsController.getAllBeneficiaryVerifications);
router.get("/beneficiary-verifications/:id", volunteerOpsController.getBeneficiaryVerificationById);
router.patch("/beneficiary-verifications/:id", volunteerOpsController.updateBeneficiaryVerification);
router.delete("/beneficiary-verifications/:id", volunteerOpsController.deleteBeneficiaryVerification);


// ==================== 3. VOLUNTEER PERFORMANCE, REWARDS & TRAINING ROUTES ====================
// 13. VolunteerPerformance
router.post("/volunteer-performances", volunteerRewardsController.createVolunteerPerformance);
router.get("/volunteer-performances", volunteerRewardsController.getAllVolunteerPerformances);
router.get("/volunteer-performances/:id", volunteerRewardsController.getVolunteerPerformanceById);
router.patch("/volunteer-performances/:id", volunteerRewardsController.updateVolunteerPerformance);
router.delete("/volunteer-performances/:id", volunteerRewardsController.deleteVolunteerPerformance);

// 14. VolunteerReward
router.post("/volunteer-rewards", volunteerRewardsController.createVolunteerReward);
router.get("/volunteer-rewards", volunteerRewardsController.getAllVolunteerRewards);
router.get("/volunteer-rewards/:id", volunteerRewardsController.getVolunteerRewardById);
router.patch("/volunteer-rewards/:id", volunteerRewardsController.updateVolunteerReward);
router.delete("/volunteer-rewards/:id", volunteerRewardsController.deleteVolunteerReward);

// 15. VolunteerCertificate
router.post("/volunteer-certificates", volunteerRewardsController.createVolunteerCertificate);
router.get("/volunteer-certificates", volunteerRewardsController.getAllVolunteerCertificates);
router.get("/volunteer-certificates/:id", volunteerRewardsController.getVolunteerCertificateById);
router.patch("/volunteer-certificates/:id", volunteerRewardsController.updateVolunteerCertificate);
router.delete("/volunteer-certificates/:id", volunteerRewardsController.deleteVolunteerCertificate);

// 16. VolunteerExpense
router.post("/volunteer-expenses", volunteerRewardsController.createVolunteerExpense);
router.get("/volunteer-expenses", volunteerRewardsController.getAllVolunteerExpenses);
router.get("/volunteer-expenses/:id", volunteerRewardsController.getVolunteerExpenseById);
router.patch("/volunteer-expenses/:id", volunteerRewardsController.updateVolunteerExpense);
router.delete("/volunteer-expenses/:id", volunteerRewardsController.deleteVolunteerExpense);

// 17. VolunteerReimbursement
router.post("/volunteer-reimbursements", volunteerRewardsController.createVolunteerReimbursement);
router.get("/volunteer-reimbursements", volunteerRewardsController.getAllVolunteerReimbursements);
router.get("/volunteer-reimbursements/:id", volunteerRewardsController.getVolunteerReimbursementById);
router.patch("/volunteer-reimbursements/:id", volunteerRewardsController.updateVolunteerReimbursement);
router.delete("/volunteer-reimbursements/:id", volunteerRewardsController.deleteVolunteerReimbursement);

// 18. VolunteerAnnouncement
router.post("/volunteer-announcements", volunteerRewardsController.createVolunteerAnnouncement);
router.get("/volunteer-announcements", volunteerRewardsController.getAllVolunteerAnnouncements);
router.get("/volunteer-announcements/:id", volunteerRewardsController.getVolunteerAnnouncementById);
router.patch("/volunteer-announcements/:id", volunteerRewardsController.updateVolunteerAnnouncement);
router.delete("/volunteer-announcements/:id", volunteerRewardsController.deleteVolunteerAnnouncement);

// 19. VolunteerTraining
router.post("/volunteer-trainings", volunteerRewardsController.createVolunteerTraining);
router.get("/volunteer-trainings", volunteerRewardsController.getAllVolunteerTrainings);
router.get("/volunteer-trainings/:id", volunteerRewardsController.getVolunteerTrainingById);
router.patch("/volunteer-trainings/:id", volunteerRewardsController.updateVolunteerTraining);
router.delete("/volunteer-trainings/:id", volunteerRewardsController.deleteVolunteerTraining);

export const volunteerRoutes = router;
