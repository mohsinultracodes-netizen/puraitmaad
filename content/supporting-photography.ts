import { photography } from "./photography";

// Independent crops: these slots do not alter the approved homepage.
export const supportingPhotography = {
  services: { asset: photography.servicesHero.asset, position: "50% 60%", replacement: "Approved premium home/lifestyle detail in natural daylight; current local residence image is an interim choice." },
  property: { asset: photography.propertyHealth.asset, position: "30% 65%", replacement: "Optional maintained residence and garden in daylight, without an implied client ownership claim." },
  about: { asset: photography.about.asset, position: "50% 60%", replacement: "Optional quiet architecture or planting detail in softer daylight." },
  membership: { asset: photography.overseasOwners.asset, position: "55% 50%", replacement: "Optional premium linen, greenery or calm interior detail." },
  process: { asset: null, position: "50% 50%", replacement: "Optional subtle home/lifestyle coordination detail; intentional typography is used until approved." },
  contact: { asset: null, position: "50% 50%", replacement: "Optional understated interior detail; no photograph is needed beside the form." },
};
export type SupportingPhotoKey = keyof typeof supportingPhotography;
