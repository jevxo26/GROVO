import { Router } from "express";
import { volunteerCoreController } from "../controllers/volunteer_controller/volunteerCore.controller";
import { volunteerOpsController } from "../controllers/volunteer_controller/volunteerOps.controller";
import { volunteerRewardsController } from "../controllers/volunteer_controller/volunteerRewards.controller";

const router = Router();

// Core
router.post("/volunteers", volunteerCoreController.createVolunteer);
router.get("/volunteers", volunteerCoreController.getAllVolunteers);
router.post(
  "/volunteer-profiles",
  volunteerCoreController.createVolunteerProfile,
);
router.post("/volunteer-skills", volunteerCoreController.createVolunteerSkill);
router.post(
  "/volunteer-availabilities",
  volunteerCoreController.createVolunteerAvailability,
);
router.post(
  "/volunteer-documents",
  volunteerCoreController.createVolunteerDocument,
);
router.post(
  "/volunteer-activity-logs",
  volunteerCoreController.createVolunteerActivityLog,
);

// Operations & Field Work
router.post(
  "/volunteer-assignments",
  volunteerOpsController.createVolunteerAssignment,
);
router.post(
  "/volunteer-schedules",
  volunteerOpsController.createVolunteerSchedule,
);
router.post(
  "/volunteer-attendances",
  volunteerOpsController.createVolunteerAttendance,
);
router.post("/volunteer-tasks", volunteerOpsController.createVolunteerTask);
router.post("/field-activities", volunteerOpsController.createFieldActivity);
router.post("/field-visits", volunteerOpsController.createFieldVisit);
router.post("/activity-reports", volunteerOpsController.createActivityReport);
router.post(
  "/beneficiary-verifications",
  volunteerOpsController.createBeneficiaryVerification,
);

// Performance, Rewards & Training
router.post(
  "/volunteer-performances",
  volunteerRewardsController.createVolunteerPerformance,
);
router.post(
  "/volunteer-rewards",
  volunteerRewardsController.createVolunteerReward,
);
router.post(
  "/volunteer-certificates",
  volunteerRewardsController.createVolunteerCertificate,
);
router.post(
  "/volunteer-expenses",
  volunteerRewardsController.createVolunteerExpense,
);
router.post(
  "/volunteer-reimbursements",
  volunteerRewardsController.createVolunteerReimbursement,
);
router.post(
  "/volunteer-announcements",
  volunteerRewardsController.createVolunteerAnnouncement,
);
router.post(
  "/volunteer-trainings",
  volunteerRewardsController.createVolunteerTraining,
);

export const volunteerRoutes = router;
