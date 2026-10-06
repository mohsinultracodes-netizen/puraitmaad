// Compatibility adapter for the existing route; the product source is membership.ts.
// Remove this adapter only after the new page and redirects have been verified.
import { membershipPlans, membershipScope } from "./membership";

export const stewardshipPlans = membershipPlans.map((plan) => ({
  id: plan.id, name: plan.name, description: plan.description,
  pricingLabel: plan.pricingLabel, coreFeatures: plan.inclusions,
  cta: plan.cta.label,
}));

export const benefitScope = [
  { title: "An agreed scope", description: membershipScope },
  { title: "Before your return", description: "Pre-arrival support can coordinate property checks, cleaning and household preparation. Timing and tasks are agreed in advance." },
];

export const propertyCheck = {
  pricingLabel: "Request a tailored estimate.",
  features: ["Agreed property checks", "Observations and follow-up", "Coordination of approved work"],
};

export const stewardshipFee = {
  features: ["Agreed coordination", "Communication", "Scheduled checks where included", "Verification of approved work where appropriate"],
  steps: ["Understand the request", "Agree the scope", "Obtain approval", "Coordinate the work", "Verify where appropriate", "Close the request"],
};
