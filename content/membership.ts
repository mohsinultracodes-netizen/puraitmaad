export type MembershipPlan = {
  id: "essential" | "premium" | "private";
  name: string;
  description: string;
  pricingLabel: string;
  inclusions: readonly string[];
  scopeNote: string;
  cta: { label: string; context: string };
};

export const membershipPricing = "Speak to us for a tailored plan.";
export const membershipScope = "Support, scheduling and inclusions are agreed for your needs before work begins. External vendor costs and materials are quoted separately.";
export const membershipSection = {
  label: "Our plans",
  heading: "Choose Your Plan",
  subtitle: "Thoughtful care, tailored to your needs.",
  cta: "Request Info",
  invitation: "Contact us to explore the plan that best fits your needs.",
};

export const membershipPlans: readonly MembershipPlan[] = [
  {
    id: "essential", name: "Essential", description: "For occasional ongoing support.", pricingLabel: membershipPricing,
    inclusions: ["Maintenance coordination", "Cleaning coordination", "Scheduled property checks"],
    scopeNote: membershipScope, cta: { label: "Ask About Membership", context: "Essential membership" },
  },
  {
    id: "premium", name: "Premium", description: "For households needing regular coordination.", pricingLabel: membershipPricing,
    inclusions: ["Maintenance and cleaning coordination", "Gardening coordination", "Vendor management", "Monthly reports where agreed"],
    scopeNote: membershipScope, cta: { label: "Ask About Membership", context: "Premium membership" },
  },
  {
    id: "private", name: "Private", description: "For customers wanting highly personalized support.", pricingLabel: membershipPricing,
    inclusions: ["Personalized ongoing coordination", "Home and property support", "Pre-arrival preparation", "Priority communication where agreed"],
    scopeNote: membershipScope, cta: { label: "Ask About Membership", context: "Private membership" },
  },
];
