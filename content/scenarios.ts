export const scenarioDisclosure = "Illustrative example — actual case studies will be added as available.";

export type IllustrativeScenario = {
  id: string;
  kind: "illustrative";
  label: string;
  title: string;
  disclosure: string;
  scopeNote: string;
};

export const comingHomeScenario = {
  id: "coming-home", kind: "illustrative", label: "Illustrative scenario",
  title: "We're coming home Friday.", disclosure: scenarioDisclosure,
  scopeNote: "Example sequence only. Timing and work depend on the agreed scope and availability.",
  timeline: [
    { when: "72 HOURS BEFORE", action: "Property inspection" },
    { when: "48 HOURS BEFORE", action: "Cleaning + repairs" },
    { when: "24 HOURS BEFORE", action: "AC + garden + groceries" },
    { when: "ARRIVAL", action: "Final inspection" },
    { when: "HOME", action: "Everything ready." },
  ],
  ending: "One message. Multiple details. One team coordinating everything.",
} satisfies IllustrativeScenario & { timeline: { when: string; action: string }[]; ending: string };

export const homePreparationScenario = {
  id: "dha-home-preparation", kind: "illustrative", label: "SAMPLE SCENARIO",
  title: "DHA Lahore — Home Preparation", disclosure: scenarioDisclosure,
  scopeNote: "A hypothetical request, subject to agreed scope and availability.",
  requirement: "Family returning from overseas in 48 hours.",
  coordination: ["Deep cleaning", "AC servicing", "Gardening", "Grocery stocking", "Linen preparation", "Minor plumbing", "Final inspection"],
  result: "Home prepared before arrival.",
} satisfies IllustrativeScenario & { requirement: string; coordination: string[]; result: string };
