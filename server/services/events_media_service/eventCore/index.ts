import * as eventCategoryPrimary_service from "./eventCategoryPrimary.service";
import * as eventCategorySecondary_service from "./eventCategorySecondary.service";
import * as eventPrimary_service from "./eventPrimary.service";
import * as eventSecondary_service from "./eventSecondary.service";
import * as eventRegistration_service from "./eventRegistration.service";
import * as eventAttendance_service from "./eventAttendance.service";
import * as eventSpeaker_service from "./eventSpeaker.service";
import * as eventVolunteer_service from "./eventVolunteer.service";
import * as eventSchedule_service from "./eventSchedule.service";
import * as eventSession_service from "./eventSession.service";
import * as eventGallery_service from "./eventGallery.service";

export const eventCoreService = {
  ...eventCategoryPrimary_service,
  ...eventCategorySecondary_service,
  ...eventPrimary_service,
  ...eventSecondary_service,
  ...eventRegistration_service,
  ...eventAttendance_service,
  ...eventSpeaker_service,
  ...eventVolunteer_service,
  ...eventSchedule_service,
  ...eventSession_service,
  ...eventGallery_service,
};
