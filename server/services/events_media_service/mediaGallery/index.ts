import * as mediaCategory_service from "./mediaCategory.service";
import * as media_service from "./media.service";
import * as album_service from "./album.service";
import * as albumMedia_service from "./albumMedia.service";
import * as mediaActivityLog_service from "./mediaActivityLog.service";

export const mediaGalleryService = {
  ...mediaCategory_service,
  ...media_service,
  ...album_service,
  ...albumMedia_service,
  ...mediaActivityLog_service,
};
