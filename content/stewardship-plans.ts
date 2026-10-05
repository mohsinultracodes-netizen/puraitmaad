type StewardshipPlan = {
  id: string;
  name: string;
  monthly: string;
  annual: string;
  description: string;
  coreFeatures: string[];
  additional: string[];
  benefits?: { heading: string; items: string[] };
  recommended: boolean;
  cta: string;
};

export const stewardshipPlans: StewardshipPlan[] = [
  {
    id: "essential", name: "Essential", monthly: "14,500", annual: "145,000",
    description: "For homes needing dependable periodic oversight.",
    coreFeatures: ["1 scheduled property visit per month", "Property walkthrough and condition inspection", "Photo-documented visit report", "Security and access checks", "Basic utilities and systems checks", "Visible maintenance observations", "Basic preventive maintenance tracking", "Standard owner communication"],
    additional: ["Vendor coordination", "Work completion verification", "Vehicle readiness", "Arrival Ready preparation"],
    recommended: false, cta: "Request a Consultation",
  },
  {
    id: "signature", name: "Signature", monthly: "24,500", annual: "245,000",
    description: "For overseas owners and families frequently away from Lahore.",
    coreFeatures: ["2 scheduled property visits per month", "Detailed property condition inspections", "Photo-documented reports", "Security and access checks", "Utilities and systems checks", "Preventive maintenance tracking", "Limited routine vendor coordination", "Work completion verification", "Priority owner communication", "Preferential access to Arrival Ready services"],
    additional: [],
    benefits: {
      heading: "Complimentary Benefits",
      items: ["1 complimentary Arrival Ready preparation per year", "1 vehicle readiness check per month", "1 comprehensive Property Health Review per year", "1 emergency property visit per year", "Secure key holding", "Priority coordination"],
    },
    recommended: true, cta: "Request a Consultation",
  },
  {
    id: "private-stewardship", name: "Private Stewardship", monthly: "39,500", annual: "395,000",
    description: "For high-value homes requiring continuous, hands-on oversight.",
    coreFeatures: ["Weekly scheduled property visits", "Comprehensive property inspections", "Photo-documented reporting", "Security and access monitoring", "Utilities and systems oversight", "Preventive maintenance tracking", "Routine vendor coordination allowance", "Work completion verification", "Priority issue coordination", "Priority owner communication"],
    additional: [],
    benefits: {
      heading: "Private Stewardship Privileges",
      items: ["3 complimentary Arrival Ready preparations per year", "Up to 2 vehicle readiness checks per month", "2 comprehensive Property Health Reviews per year", "2 emergency property visits per year", "Secure key holding", "Priority vendor coordination", "Priority scheduling", "Pre-arrival property readiness confirmation"],
    },
    recommended: false, cta: "Request a Private Consultation",
  },
];

export const benefitScope = [
  {
    title: "Before your return",
    description: "With advance notice of your return, Private Stewardship includes a pre-arrival inspection, essential household systems checks, confirmation of the home's visible condition and coordination of approved readiness work.",
  },
  {
    title: "Within agreed allowances",
    description: "Additional Arrival Ready requests and urgent property visits may be arranged separately. Emergency visits do not include a guaranteed 24/7 response. Visit timing and coordination allowances are agreed during consultation.",
  },
  {
    title: "Readiness and preventive planning",
    description: "Vehicle readiness covers basic observations and checks during stewardship activity. Mechanical servicing, repairs, insurance, fueling, driving and workshop expenses are not included; external vehicle-related costs remain separate. Comprehensive Property Health Reviews go beyond routine visits to support preventive maintenance planning, within our property observation scope.",
  },
];

export const propertyCheck = {
  price: "7,500",
  features: ["Comprehensive property walkthrough", "Security and access check", "Basic utilities and systems check", "Visible maintenance observations", "Photographic documentation", "Written condition report", "Urgent issue notification"],
};

export const stewardshipFee = {
  features: ["Scheduled oversight", "Inspections", "Documentation", "Maintenance tracking", "Communication", "Coordination included within the selected plan", "Verification of approved work where included"],
  steps: ["Identify an issue", "Inform the owner", "Obtain approval where required", "Coordinate the work", "Verify completion", "Document the outcome"],
};
