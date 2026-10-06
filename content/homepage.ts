import type { ServiceIconKey } from "./services";

/** New homepage copy. Service, membership and scenario details live in their shared catalogs. */
export const homepage = {
  requestHref: "#request-service",
  hero: {
    eyebrow: "Premium home & lifestyle services",
    lines: ["Your problem →", "our responsibility."],
    description: "From home maintenance to everyday assistance, Puraitmaad takes care of what needs to be done — so you can focus on what matters.",
    imageNote: "More time for what matters.",
  },
  principles: [
    { label: "Trusted Professionals", icon: "house" },
    { label: "Quality Assured", icon: "wrench" },
    { label: "Reliable Coordination", icon: "calendar" },
    { label: "Dedicated Support", icon: "clipboard" },
  ] satisfies { label: string; icon: ServiceIconKey }[],
  services: {
    heading: "Comprehensive support for your home, office & more.",
    description: "Whether it's a quick fix or ongoing support, our team coordinates trusted professionals so you don't have to.",
  },
  difference: {
    heading: "You don't need another list of numbers.",
    description: "An electrician. An AC technician. A cleaner, a gardener, a contractor. You shouldn't have to spend your day finding and chasing them all.",
    promise: ["One request.", "One point of contact.", "One team managing the details."],
  },
  process: [
    { title: "You Ask", label: "Ask", description: "Tell us what needs to be handled." },
    { title: "We Source", label: "We arrange", description: "We identify the appropriate professional, service or solution." },
    { title: "We Coordinate", label: "We manage", description: "We coordinate timing, access, communication and the work." },
    { title: "We Verify", label: "We verify", description: "Where appropriate, we confirm completion and check the result." },
    { title: "Done", label: "Done", description: "You receive confirmation and relevant details." },
  ],
  emotional: {
    heading: ["You live your life.", "We handle the rest."],
    description: "Your time belongs to the people and things you care about. We take practical responsibilities off your plate, from the small interruptions to the jobs with a dozen moving parts.",
    points: ["One point of contact", "Coordinated professionals", "Clear communication", "Less time chasing people", "Support for homes, properties & businesses"],
  },
  property: {
    eyebrow: "Property care",
    heading: ["Your property,", "even when you're away."],
    description: "Your home shouldn't stop being looked after because you're not there. For time abroad, frequent travel or another property in Lahore, we coordinate the care you agree with us.",
    support: ["Routine inspections", "Vacant-house checks", "Pre-arrival preparation", "Post-travel checks", "Cleaning & gardening", "Repairs & appliance servicing", "Groceries & restocking", "Utility/vendor coordination", "Renovation supervision"],
    cta: "Take Care of My Property",
  },
  business: {
    eyebrow: "Business support",
    heading: ["Your business.", "Our backup."],
    description: "Give your team one reliable point of contact for the practical work that keeps your workplace running.",
    support: ["Office maintenance", "AC / electrical / plumbing", "Cleaning", "Furniture & supplies", "Repairs & site visits", "Vendor coordination", "Recurring maintenance"],
    contexts: "For offices, clinics, boutiques, restaurants, schools and other workplaces — subject to the support we can arrange.",
    cta: "Talk to Us About Business Support",
  },
  scope: "Support is arranged around your location, needs and agreed scope.",
  unsure: { heading: "Not sure what you need?", description: "That's okay. Tell us what happened and we'll help figure out the next step.", cta: "Tell Us What Happened" },
  membership: { heading: ["A house manager —", "without employing one."], description: "For customers who need ongoing support, Puraitmaad can provide recurring home and property coordination." },
  private: {
    heading: ["Private assistance,", "thoughtfully managed."],
    description: "For customers who prefer not to manage the details themselves, Private offers a more personal relationship and ongoing coordination, shaped around an agreed scope.",
    example: "Coming home could mean cleaning, AC, groceries, the garden, linen and repairs — brought together through one conversation.",
  },
  trust: {
    heading: "People we send to your home matter.",
    description: "Reliability, communication, workmanship and service history guide the network we are building. We aim to understand the work, choose appropriate help and stay involved through completion.",
    note: "Depending on the work, our approach may include references, experience review and feedback. We discuss the arrangements for your request before work begins.",
    principles: ["Clear expectations", "Thoughtful coordination", "Follow-through"],
  },
  request: {
    heading: "Need something handled?",
    description: "Tell us what you need. We'll take it from there.",
    panelTitle: "One conversation. A clear next step.",
    panelDescription: "You don't need a list of instructions or the name of a trade. Start with what's happening, and we'll discuss what we can coordinate.",
    next: ["We review your request.", "We discuss the practical details.", "We agree the scope before work begins."],
  },
  closing: { heading: ["Ready for a simpler,", "stress-free life?"], description: "Tell us what you need — we'll take it from there." },
};
