import { photography } from "./photography";
import { servicePhotography } from "./service-photography";

// Independent crops: these slots do not alter the approved homepage.
export const supportingPhotography = {
  services: { asset: servicePhotography.gardening, position: servicePhotography.gardening.position, replacement: "Owner-supplied residential garden maintenance image." },
  property: { asset: servicePhotography.propertyCare, position: servicePhotography.propertyCare.position, replacement: "Owner-supplied residential property inspection image." },
  about: { asset: photography.about.asset, position: "50% 60%", replacement: "Optional quiet architecture or planting detail in softer daylight." },
  membership: { asset: photography.overseasOwners.asset, position: "55% 50%", replacement: "Optional premium linen, greenery or calm interior detail." },
  process: { asset: null, position: "50% 50%", replacement: "Optional subtle home/lifestyle coordination detail; intentional typography is used until approved." },
  contact: { asset: null, position: "50% 50%", replacement: "Optional understated interior detail; no photograph is needed beside the form." },
};
export type SupportingPhotoKey = keyof typeof supportingPhotography;
