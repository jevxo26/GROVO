import * as liveDonationFeed_service from "./liveDonationFeed.service";
import * as successStoryPrimary_service from "./successStoryPrimary.service";
import * as successStorySecondary_service from "./successStorySecondary.service";
import * as storyMedia_service from "./storyMedia.service";
import * as testimonial_service from "./testimonial.service";
import * as pressReleasePrimary_service from "./pressReleasePrimary.service";
import * as pressReleaseSecondary_service from "./pressReleaseSecondary.service";
import * as newsPrimary_service from "./newsPrimary.service";
import * as newsSecondary_service from "./newsSecondary.service";
import * as newsletter_service from "./newsletter.service";

export const publicEngagementService = {
  ...liveDonationFeed_service,
  ...successStoryPrimary_service,
  ...successStorySecondary_service,
  ...storyMedia_service,
  ...testimonial_service,
  ...pressReleasePrimary_service,
  ...pressReleaseSecondary_service,
  ...newsPrimary_service,
  ...newsSecondary_service,
  ...newsletter_service,
};
