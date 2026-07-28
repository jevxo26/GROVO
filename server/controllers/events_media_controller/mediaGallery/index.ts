import * as mediaCategory_controller from "./mediaCategory.controller";
import * as media_controller from "./media.controller";
import * as album_controller from "./album.controller";
import * as albumMedia_controller from "./albumMedia.controller";
import * as mediaActivityLog_controller from "./mediaActivityLog.controller";

export const mediaGalleryController = {
  ...mediaCategory_controller,
  ...media_controller,
  ...album_controller,
  ...albumMedia_controller,
  ...mediaActivityLog_controller,
};
