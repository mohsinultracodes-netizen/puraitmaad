import type { ServiceCategory } from "./services";

// Genuine WebP masters retain the supplied dimensions and subject mapping.
// Next's image optimizer creates responsive delivery variants at request time.
function photo(filename: string, alt: string, position = "50% 50%") {
  return { src: `/images/property/${filename}`, width: 1536, height: 1024, alt, position };
}

export const servicePhotography = {
  gardening: photo("service-gardening.webp", "Garden maintenance at a residential property", "40% 50%"),
  appliances: photo("service-appliance-repair.webp", "Technicians installing a built-in kitchen appliance"),
  // These two supplied filenames depict the opposite subjects. Map by content.
  homeRepairs: photo("service-smart-home.webp", "Plumber carrying out a bathroom repair", "55% 50%"),
  electrical: photo("service-home-repairs.webp", "Technician working on residential smart-home controls", "55% 50%"),
  renovationCoordination: photo("vendor-coordination.png", "Illustrative project coordination: two people review a tablet beside drawings, tools and a service van."),
  restocking: photo("service-restocking.webp", "Home pantry being checked and organized"),
  housekeeping: photo("service-housekeeping.webp", "Housekeeper preparing a bedroom"),
  cleaning: photo("service-deep-cleaning.webp", "Professional cleaning in a residential living room", "40% 50%"),
  propertyCare: photo("service-property-care.webp", "Property representative inspecting a residence", "35% 50%"),
  carCare: photo("service-car-care.webp", "Vehicle being cleaned at a residence"),
  personalAssistance: photo("service-personal-assistance.webp", "Personal delivery being handed over at a residence", "40% 50%"),
} as const;
export type ServicePhotoKey = keyof typeof servicePhotography;

// Keep the approved featured service selection, titles, descriptions and links.
export const featuredServicePhotography: Partial<Record<string, ServicePhotoKey>> = {
  gardening: "gardening",
  "ac-appliances": "appliances",
  renovation: "renovationCoordination",
  restocking: "restocking",
  "property-maintenance": "propertyCare",
  "office-services": "electrical",
};

export const categoryPhotography: Partial<Record<ServiceCategory, ServicePhotoKey>> = {
  "home-care": "cleaning",
  "property-care": "housekeeping",
  "personal-assistance": "personalAssistance",
};
