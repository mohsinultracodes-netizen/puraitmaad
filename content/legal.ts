export const legalDraftLabel = "Draft — pending business/legal review";
export const legalNavigation = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/service-disclaimer", label: "Service Disclaimer" },
] as const;
export type LegalSection = { id: string; title: string; paragraphs: readonly string[]; items?: readonly string[]; note?: string };
export const legalDrafts = {
  terms: { title: "Terms & Conditions", description: "A draft overview of Puraitmaad coordination services, agreed scope, customer information and practical arrangements.", sections: [
    { id: "nature", title: "The service", paragraphs: ["Puraitmaad coordinates practical home, property, personal and business assistance. Third-party professionals or providers may perform specialist work. A request starts a discussion; it does not automatically confirm acceptance or an appointment."] },
    { id: "scope", title: "Scope, availability and cost", paragraphs: ["The relevant scope, estimate and pricing should be discussed and agreed where applicable. Availability may depend on location, provider circumstances and the work requested. Payments or charges follow the arrangements agreed for the specific request."] },
    { id: "information", title: "Information and access", paragraphs: ["Customers should provide useful, accurate information and discuss any access or permission needed for agreed work. Preferred dates and times help explain the request; timing needs confirmation."] },
    { id: "use", title: "Reasonable use", paragraphs: ["Requests should concern legitimate practical needs. Do not use the form to send abusive content, unnecessary sensitive information or requests for unlawful activity."] },
    { id: "review", title: "Before final terms are adopted", paragraphs: ["These terms remain pending business and professional legal review. Final arrangements should be communicated and agreed for the specific request."] },
  ] },
  cancellation: { title: "Cancellation Policy", description: "A draft overview of cancellation and rescheduling discussions for Puraitmaad service requests.", sections: [
    { id: "changes", title: "Changing a request", paragraphs: ["If you need to cancel or reschedule, tell Puraitmaad about the request and the change needed. The practical handling should be discussed for that request."] },
    { id: "circumstances", title: "What may affect the arrangement", paragraphs: ["Cancellation or rescheduling handling may depend on the service, provider commitments, work already arranged, materials already purchased and the agreed scope. Those details need confirmation rather than a single assumed rule."] },
    { id: "agreement", title: "Terms for the specific request", paragraphs: ["Applicable cancellation and rescheduling arrangements should be communicated and agreed for the specific request. Please discuss these details when arranging the work."] },
    { id: "review", title: "Business and legal review", paragraphs: ["Final cancellation and rescheduling terms remain pending business and professional legal review."] },
  ] },
  disclaimer: { title: "Service Disclaimer", description: "A draft explanation of Puraitmaad coordination, service availability, specialist work and illustrative examples.", sections: [
    { id: "coordination", title: "Coordination and specialist work", paragraphs: ["Puraitmaad coordinates practical services and assistance. Third-party professionals or providers may perform specialist work. Work requiring particular qualifications or licensing should be carried out by appropriately qualified providers where required."] },
    { id: "confirmation", title: "Availability and confirmation", paragraphs: ["Availability depends on the request, location and provider circumstances. Estimates and scope may require confirmation. A preferred date or time is not an automatically confirmed appointment."] },
    { id: "examples", title: "Illustrative examples", paragraphs: ["Website scenarios demonstrate how a request could be coordinated. They are examples, not client case studies, promises of exact timing or guarantees of an outcome."] },
    { id: "review", title: "Business and legal review", paragraphs: ["This explanatory draft remains pending business and professional legal review. Any final conditions should be communicated before work is agreed."] },
  ] },
} satisfies Record<string, { title: string; description: string; sections: readonly LegalSection[] }>;
