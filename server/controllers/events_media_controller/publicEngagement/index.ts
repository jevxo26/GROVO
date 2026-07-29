import * as liveDonationFeed_controller from "./liveDonationFeed.controller";
import * as successStory_controller from "./successStory.controller";
import * as storyMedia_controller from "./storyMedia.controller";
import * as testimonial_controller from "./testimonial.controller";
import * as pressRelease_controller from "./pressRelease.controller";
import * as news_controller from "./news.controller";
import * as newsletter_controller from "./newsletter.controller";

export const publicEngagementController = {
  ...liveDonationFeed_controller,
  ...successStory_controller,
  ...storyMedia_controller,
  ...testimonial_controller,
  ...pressRelease_controller,
  ...news_controller,
  ...newsletter_controller,
};
