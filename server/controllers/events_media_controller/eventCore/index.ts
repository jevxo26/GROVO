import * as eventCategory_controller from "./eventCategory.controller";
import * as event_controller from "./event.controller";
import * as eventRegistration_controller from "./eventRegistration.controller";
import * as eventAttendance_controller from "./eventAttendance.controller";
import * as eventSpeaker_controller from "./eventSpeaker.controller";
import * as eventVolunteer_controller from "./eventVolunteer.controller";
import * as eventSchedule_controller from "./eventSchedule.controller";
import * as eventSession_controller from "./eventSession.controller";
import * as eventGallery_controller from "./eventGallery.controller";

export const eventCoreController = {
  ...eventCategory_controller,
  ...event_controller,
  ...eventRegistration_controller,
  ...eventAttendance_controller,
  ...eventSpeaker_controller,
  ...eventVolunteer_controller,
  ...eventSchedule_controller,
  ...eventSession_controller,
  ...eventGallery_controller,
};
