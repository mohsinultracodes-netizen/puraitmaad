import { services, serviceCategories, type Service } from "./services";
import { servicePhotography, type ServicePhotoKey } from "./service-photography";

/** Only catalog examples are published as inclusions; unspecified scope needs owner review. */
const subjects: Partial<Record<string, ServicePhotoKey>> = {
  "vendor-coordination": "renovationCoordination",
};

// All thirty-two prepared sub-service subjects supersede older assignments.
const newSubjects: Partial<Record<string, { filename: string; alt: string }>> = {
  gardening: { filename: "service-gardening-outdoor-care.webp", alt: "Gardener trimming planting beside a modern residence." },
  "ac-appliances": { filename: "service-ac-appliance-repairs.webp", alt: "Technician working on an open wall-mounted air-conditioning unit." },
  electrical: { filename: "service-electrical.webp", alt: "Technician adjusting residential electrical controls." },
  plumbing: { filename: "service-plumbing.webp", alt: "Technician working on fittings beneath a bathroom basin." },
  cleaning: { filename: "service-cleaning.webp", alt: "Person cleaning a stone table in a residential living room." },
  renovation: { filename: "service-renovation-coordination.webp", alt: "Two people reviewing drawings and material samples in a residential interior." },
  restocking: { filename: "service-fridge-restocking.webp", alt: "Person organizing fresh groceries in an open refrigerator." },
  "property-maintenance": { filename: "service-property-maintenance.webp", alt: "Person checking an exterior light while holding a tablet beside a residence." },
  "property-inspections": { filename: "service-property-inspections.webp", alt: "Person recording observations with a tablet in a residential interior." },
  "pre-arrival": { filename: "service-pre-arrival-preparation.webp", alt: "Person preparing bed linen in a residential bedroom." },
  deliveries: { filename: "service-deliveries.webp", alt: "A parcel being handed over at a residential entrance." },
  carpentry: { filename: "service-carpentry.webp", alt: "Carpenter adjusting timber cabinetry in a residential interior." },
  painting: { filename: "service-painting.webp", alt: "Painter applying a roller to an ivory wall in a residential interior." },
  "pest-control": { filename: "service-pest-control.webp", alt: "Provider applying a treatment around a residential doorway." },
  "post-travel": { filename: "service-post-travel-checks.webp", alt: "Person checking a window while holding a tablet in a residential interior." },
  "property-repairs": { filename: "service-property-repairs.webp", alt: "Technician adjusting a door fitting while another works on an interior wall." },
  pickups: { filename: "service-pickups.webp", alt: "A garment bag being handed over at a residential entrance." },
  shopping: { filename: "service-shopping.webp", alt: "Person organizing grocery purchases on a kitchen counter." },
  returns: { filename: "service-returns.webp", alt: "Person preparing a parcel and paperwork for an item return." },
  gifts: { filename: "service-gifts.webp", alt: "Person arranging ribbon on a wrapped gift with other gifts nearby." },
  documents: { filename: "service-documents.webp", alt: "Person organizing documents in a folder at a residential desk." },
  "event-preparation": { filename: "service-event-preparation.webp", alt: "People arranging flowers and place settings for an evening gathering." },
  "special-requests": { filename: "service-special-requests.webp", alt: "Two people discussing a tablet in a residential sitting room." },
  "office-services": { filename: "service-office-services.webp", alt: "Person organizing paperwork at a desk in a modern office." },
  "business-repairs": { filename: "service-workplace-repairs.webp", alt: "Technician adjusting a door handle in an office." },
  "business-cleaning": { filename: "service-workplace-cleaning.webp", alt: "Person wiping a conference table in a modern office." },
  supplies: { filename: "service-supplies.webp", alt: "Person organizing stationery and supplies on office shelving." },
  furniture: { filename: "service-furniture.webp", alt: "Two people positioning chairs beside an office desk." },
  "business-ac": { filename: "service-workplace-ac.webp", alt: "Technician servicing an open wall-mounted air-conditioning unit in an office." },
  "site-visits": { filename: "service-site-visits.webp", alt: "Person reviewing an office space while holding a tablet." },
  "business-electrical": { filename: "service-workplace-electrical.webp", alt: "Technician on a stepladder working on an office ceiling light while another person holds a tablet." },
  "business-plumbing": { filename: "service-workplace-plumbing.webp", alt: "Technician working on exposed pipe fittings beneath an office washbasin." },
};

export const businessSupportOverviewPhoto = {
  src: "/images/services/service-business-support.webp", width: 1536, height: 1024,
  alt: "Two people reviewing a tablet and documents at a desk in a modern office.",
  position: "50% 50%",
};

export type ServiceDetails = {
  service: Service;
  categoryTitle: string;
  detailedDescription: string;
  inclusions: readonly string[];
  inclusionsNeedReview: boolean;
  photo: { src: string; width: number; height: number; alt: string; position: string } | null;
  contextualPhoto: boolean;
};

export const serviceDetails: readonly ServiceDetails[] = services.map(service => {
  const subject = subjects[service.id];
  const replacement = newSubjects[service.id];
  const photo = replacement ? {
    src: `/images/services/${replacement.filename}`, width: 1536, height: 1024,
    alt: replacement.alt, position: "50% 50%",
  } : subject ? servicePhotography[subject] : null;
  return {
    service,
    categoryTitle: serviceCategories.find(category => category.id === service.category)!.name,
    detailedDescription: `${service.description} Tell us about the requirement, location and preferred timing. We clarify the details before confirming whether we can coordinate the appropriate next step.`,
    inclusions: service.examples,
    inclusionsNeedReview: service.examples.length === 0,
    photo,
    contextualPhoto: !replacement && !subject,
  };
});

export const serviceCoordination = [
  "Tell us what needs to be handled; you don't need to identify the right professional.",
  "We clarify the requirement, discuss the relevant scope and cost, and arrange appropriate help where available.",
  "We coordinate agreed communication, timing and access, keeping you informed and confirming completion where appropriate.",
] as const;
