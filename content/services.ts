import type { PhotographySlotName } from "./photography";

export const serviceCategories = [
  { id: "home-care", name: "Home Care", description: "Practical care for your home and everyday systems." },
  { id: "property-care", name: "Property Care", description: "Agreed oversight and preparation, whether you're here or away." },
  { id: "personal-assistance", name: "Personal Assistance", description: "Help coordinating everyday tasks and legitimate special requests." },
  { id: "business-support", name: "Business Support", description: "One point of contact for the practical needs of your workplace." },
] as const;
export type ServiceCategory = typeof serviceCategories[number]["id"];
export const serviceIconKeys = ["leaf", "wrench", "house", "fridge", "shield", "office", "spark", "water", "brush", "clean", "package", "clipboard", "calendar", "truck", "gift", "document"] as const;
export type ServiceIconKey = typeof serviceIconKeys[number];
export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  examples: readonly string[];
  icon: ServiceIconKey;
  imageKey?: PhotographySlotName;
  scopeNote: string;
  cta: { label: string; context: string };
};

export const serviceScope = "We confirm whether we can coordinate your request, agree the scope and estimate, and verify completion where appropriate. Specialist work is carried out by the relevant provider.";
export const specialRequestInvitation = "If you don't see what you need, ask us. We'll let you know if we can coordinate it.";

// Shared defaults keep all entries editable without duplicating scope/CTA copy.
function service(id: string, category: ServiceCategory, name: string, description: string, icon: ServiceIconKey, examples: readonly string[] = [], imageKey?: PhotographySlotName): Service {
  return { id, category, name, description, icon, examples, ...(imageKey ? { imageKey } : {}), scopeNote: serviceScope, cta: { label: "Request a Service", context: name } };
}

export const services: readonly Service[] = [
  service("gardening", "home-care", "Gardening & Outdoor Care", "Lawn care, plant maintenance, landscaping & more.", "leaf", ["Lawn care", "Plant maintenance", "Landscaping"]),
  service("ac-appliances", "home-care", "AC & Appliance Repairs", "AC, fans, electronics, and everyday appliance fixes.", "wrench", ["AC servicing", "Fan repairs", "Appliance servicing"]),
  service("electrical", "home-care", "Electrical", "Coordinate appropriate help with household electrical work.", "spark"),
  service("plumbing", "home-care", "Plumbing", "Arrange help with leaks, fittings and household plumbing.", "water"),
  service("carpentry", "home-care", "Carpentry", "Coordinate repairs and agreed woodwork around the home.", "wrench"),
  service("painting", "home-care", "Painting", "Arrange painting work with the scope and preparation agreed first.", "brush"),
  service("cleaning", "home-care", "Cleaning", "Coordinate routine or deeper cleaning around your needs.", "clean"),
  service("pest-control", "home-care", "Pest Control", "Arrange a suitable provider for a pest-control assessment and agreed treatment.", "shield"),
  service("renovation", "property-care", "Renovation Coordination", "From planning to execution, we manage it all.", "house", ["Planning coordination", "Vendor scheduling", "Renovation supervision"], "vendorCoordination"),
  service("restocking", "property-care", "Fridge & Restocking", "Get your home stocked and ready before you return.", "fridge", ["Groceries", "Household supplies"]),
  service("property-maintenance", "property-care", "Property Maintenance", "Keep your home or empty property in top condition.", "shield", ["Vacant-house checks", "Repairs", "Utility/vendor coordination"], "propertyHealth"),
  service("property-inspections", "property-care", "Property Inspections", "Arrange checks of visible condition and agreed property systems.", "clipboard", ["Routine inspections", "Vacant-property checks"], "propertyInspection"),
  service("pre-arrival", "property-care", "Pre-arrival Preparation", "Coordinate checks, cleaning and agreed preparation before you arrive.", "house", ["Cleaning", "AC and garden checks", "Linen preparation"], "arrivalReady"),
  service("post-travel", "property-care", "Post-travel Checks", "Arrange property checks and follow-up after travel.", "clipboard"),
  service("property-repairs", "property-care", "Property Repairs", "Coordinate agreed repairs and follow through with the relevant providers.", "wrench"),
  service("shopping", "personal-assistance", "Shopping", "Coordinate agreed purchases and practical shopping needs.", "package"),
  service("pickups", "personal-assistance", "Pickups", "Arrange collection of agreed items.", "truck"),
  service("deliveries", "personal-assistance", "Deliveries", "Coordinate delivery details and timing.", "truck"),
  service("returns", "personal-assistance", "Returns", "Help coordinate eligible item returns with the supplier.", "package"),
  service("gifts", "personal-assistance", "Gifts", "Coordinate gift purchasing, preparation and delivery as agreed.", "gift"),
  service("documents", "personal-assistance", "Documents", "Help with agreed document collection and delivery.", "document", ["Collection", "Delivery; no legal representation"]),
  service("event-preparation", "personal-assistance", "Event Preparation", "Coordinate practical preparation for a gathering or event.", "calendar"),
  service("special-requests", "personal-assistance", "Special Requests", "Tell us what you need; we'll confirm whether we can coordinate it.", "clipboard", ["Errands", "Other legitimate practical requests"]),
  service("office-services", "business-support", "Office Services", "Repairs, setup & support for your workspace.", "office", ["Office maintenance", "Recurring maintenance", "Workspace setup"]),
  service("business-repairs", "business-support", "Workplace Repairs", "Coordinate repairs that help keep your workplace running.", "wrench"),
  service("business-cleaning", "business-support", "Workplace Cleaning", "Arrange cleaning around your workplace needs.", "clean"),
  service("supplies", "business-support", "Supplies", "Coordinate agreed workplace supplies and restocking.", "package"),
  service("furniture", "business-support", "Furniture", "Arrange help with workplace furniture and related practical work.", "office"),
  service("business-ac", "business-support", "Workplace AC", "Coordinate air-conditioning servicing and repairs.", "wrench"),
  service("business-electrical", "business-support", "Workplace Electrical", "Arrange appropriate electrical specialists for agreed work.", "spark"),
  service("business-plumbing", "business-support", "Workplace Plumbing", "Coordinate plumbing help for the workplace.", "water"),
  service("site-visits", "business-support", "Site Visits", "Arrange visits to understand practical needs and follow up on work.", "clipboard"),
  service("vendor-coordination", "business-support", "Vendor Coordination", "Manage timing, access and communication with agreed providers.", "calendar"),
];

export const featuredServiceIds = ["gardening", "ac-appliances", "renovation", "restocking", "property-maintenance", "office-services"] as const;
export const featuredServices = featuredServiceIds.map((id) => {
  const entry = services.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing featured service: ${id}`);
  return entry;
});

export function servicesForCategory(category: ServiceCategory): readonly Service[] {
  return services.filter((entry) => entry.category === category);
}
