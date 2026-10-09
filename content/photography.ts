import type { StaticImageData } from "next/image";
import homeHeroImage from "@/public/images/property/home-hero.png";
import servicesHeroImage from "@/public/images/property/services-hero.png";
import propertyInspectionImage from "@/public/images/property/property-inspection.png";
import propertyHealthImage from "@/public/images/property/property-health.png";
import overseasOwnersImage from "@/public/images/property/overseas-owners.png";
import arrivalReadyImage from "@/public/images/property/arrival-ready.png";
import careClearScopeImage from "@/public/images/property/care-clear-scope.png";
import vendorCoordinationImage from "@/public/images/property/vendor-coordination.png";
import vehicleReadinessImage from "@/public/images/property/vehicle-readiness.png";
import aboutImage from "@/public/images/property/about.png";
import heroPuraitmaadImage from "@/public/images/property/hero-puraitmaad.webp";

type ApprovedPhotography = {
  src: StaticImageData;
  /** Describe the approved photograph itself, without unverified ownership claims. */
  alt: string;

};

type PhotographySlot = {
  purpose: string;
  recommendedDimensions: readonly [number, number];
  aspectRatio: string;
  altDirection: string;
  publicPath: `/images/property/${string}`;
  sizes: string;
  objectPosition: string;
  asset: ApprovedPhotography | null;
};

const editorialSizes = "(min-width: 1440px) 560px, (min-width: 768px) 46vw, 92vw";

/**
 * Add approved files under public/images/property/, then statically import them here.
 * Set the relevant asset to { src: importedImage, alt: verifiedDescription }.
 * Paths below identify the approved public files; static imports supply dimensions.
 * A null asset keeps the existing placeholder; no browser requests a missing file.
 */
export const photography: Record<
  "homeHero" | "servicesHero" | "propertyInspection" | "propertyHealth" |
  "overseasOwners" | "arrivalReady" | "about" | "careClearScope" |
  "preventiveMaintenance" | "vendorCoordination" | "vehicleReadiness",
  PhotographySlot
> = {
  homeHero: {
    purpose: "Existing homepage hero: a calm architectural introduction to property stewardship.",
    recommendedDimensions: [2400, 1200],
    aspectRatio: "2 / 1",
    altDirection: "Describe the visible architecture, setting and maintained details; do not imply it is a client property.",
    publicPath: "/images/property/home-hero.png",
    sizes: "max(100vw, 184svh)",
    objectPosition: "50% 50%",
    asset: { src: homeHeroImage, alt: "Landscaped entrance to a contemporary stone residence at dusk." },
  },
  servicesHero: {
    purpose: "the Services introduction showing a well-maintained property.",
    recommendedDimensions: [1920, 1080],
    aspectRatio: "16 / 9",
    altDirection: "Describe the property exterior or interior and visible care; avoid claims about services performed.",
    publicPath: "/images/property/services-hero.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: servicesHeroImage, alt: "Contemporary residence with a pool, garden and sheltered outdoor seating at sunset." },
  },
  propertyInspection: {
    purpose: "inspection photography showing observation of property details or systems.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Identify the visible detail or system being checked; describe people only when present and approved.",
    publicPath: "/images/property/property-inspection.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: propertyInspectionImage, alt: "A person holding a tablet while observing a bright residential interior." },
  },
  propertyHealth: {
    purpose: "supporting property-condition photography; does not replace the illustrative report.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible condition or maintenance detail without diagnosing unseen issues or exposing private records.",
    publicPath: "/images/property/property-health.png",
    sizes: editorialSizes,
    objectPosition: "40% 50%",
    asset: { src: propertyHealthImage, alt: "Residence overlooking a landscaped garden and swimming pool at sunset." },
  },
  overseasOwners: {
    purpose: "local property oversight imagery supporting the Overseas Owners content.",
    recommendedDimensions: [1600, 2000],
    aspectRatio: "4 / 5",
    altDirection: "Describe the property and setting; mention Lahore only if the photograph's location is verified.",
    publicPath: "/images/property/overseas-owners.png",
    sizes: editorialSizes,
    objectPosition: "55% 50%",
    asset: { src: overseasOwnersImage, alt: "A prepared bedroom with an armchair and garden-facing glass doors." },
  },
  arrivalReady: {
    purpose: "a thoughtfully prepared interior or arrival area.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible prepared space and relevant details without promising unseen preparation work.",
    publicPath: "/images/property/arrival-ready.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: arrivalReadyImage, alt: "Illustrative arrival scene: a couple enters a residence while another person handles luggage beside a vehicle." },
  },
  about: {
    purpose: "authentic property-detail or founder-led stewardship imagery on About.",
    recommendedDimensions: [1600, 2000],
    aspectRatio: "4 / 5",
    altDirection: "Describe the actual scene; identify a founder only when their identity and publication permission are confirmed.",
    publicPath: "/images/property/about.png",
    sizes: editorialSizes,
    objectPosition: "50% 65%",
    asset: { src: aboutImage, alt: "Stone entrance steps, a timber doorway and carefully lit planting at dusk." },
  },
  careClearScope: {
    purpose: "Illustrative agreed-scope discussion supporting clear responsibilities and approvals.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible activity as illustrative; do not identify anyone as an actual client, employee or vendor.",
    publicPath: "/images/property/care-clear-scope.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: careClearScopeImage, alt: "Illustrative consultation: three people review a property checklist together beside a pool." },
  },
  preventiveMaintenance: {
    purpose: "Illustrative coordination of routine property maintenance using the approved vendor photograph.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible activity as illustrative; do not identify anyone as an actual client, employee or vendor.",
    publicPath: "/images/property/vendor-coordination.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: vendorCoordinationImage, alt: "Illustrative coordination scene: two people review a tablet with tools and a service van nearby." },
  },
  vendorCoordination: {
    purpose: "Illustrative coordination of specialist work at a property.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible activity as illustrative; do not identify anyone as an actual client, employee or vendor.",
    publicPath: "/images/property/vendor-coordination.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: vendorCoordinationImage, alt: "Illustrative coordination scene: two people review a tablet with tools and a service van nearby." },
  },
  vehicleReadiness: {
    purpose: "Illustrative basic vehicle readiness checks within an agreed service scope.",
    recommendedDimensions: [1800, 1200],
    aspectRatio: "3 / 2",
    altDirection: "Describe the visible activity as illustrative; do not identify anyone as an actual client, employee or vendor.",
    publicPath: "/images/property/vehicle-readiness.png",
    sizes: editorialSizes,
    objectPosition: "50% 50%",
    asset: { src: vehicleReadinessImage, alt: "Illustrative vehicle check: a person uses a pressure gauge at an SUV wheel." },
  },
};

export type PhotographySlotName = keyof typeof photography;

// Homepage-only crops: changing these never changes supporting-page photography.
// The office slot is deliberately empty until an approved photograph is supplied.
type HomepagePhoto = {
  asset: ApprovedPhotography | null;
  sizes: string;
  objectPosition: string;
  replacement: string;
};

export const homepagePhotography = {
  hero: {
    asset: { src: heroPuraitmaadImage, alt: "Conceptual home-service interface on a smartphone beside keys in a warm modern living room." },
    sizes: "(min-width: 1024px) max(50vw, 1010px), (min-width: 768px) 100vw, 590px",
    objectPosition: "var(--hp-hero-image-position, 50% 75%)",
    replacement: "Approved conceptual home-service image; preserve the smartphone as the primary focal point.",
  },
  difference: {
    asset: photography.about.asset,
    sizes: "(min-width: 1280px) 340px, (min-width: 768px) 32vw, 100vw",
    objectPosition: "50% 75%",
    replacement: "A quiet interior or plant detail, landscape crop.",
  },
  emotional: {
    asset: photography.overseasOwners.asset,
    sizes: "(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw",
    objectPosition: "60% 50%",
    replacement: "Optional: a natural, daylit lounge for the time-and-comfort section.",
  },
  property: {
    asset: photography.propertyHealth.asset,
    sizes: "(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw",
    objectPosition: "30% 65%",
    replacement: "Optional: an understated maintained Lahore residence and garden in daylight.",
  },
  business: {
    asset: null,
    sizes: "(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw",
    objectPosition: "50% 50%",
    replacement: "Required for a photographic treatment: an approved calm office interior, natural light, no posed staff.",
  },
} satisfies Record<string, HomepagePhoto>;

export type HomepagePhotoKey = keyof typeof homepagePhotography;
