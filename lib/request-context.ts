import { services } from "@/content/services";
import { membershipPlans } from "@/content/membership";
export const requestDestination = "/contact#request-service";
export function getRequestService(raw: unknown) {
  return typeof raw === "string" ? services.find(service => service.id === raw) : undefined;
}
export function serviceRequestHref(serviceId?: string) {
  const service = getRequestService(serviceId);
  return service ? `/contact?service=${encodeURIComponent(service.id)}#request-service` : requestDestination;
}
// The proposed names remain valid enquiry aliases for the approved catalog tiers.
const planAliases: Readonly<Record<string, string>> = { signature: "premium", bespoke: "private" };
export function getRequestPlan(raw: unknown) {
  if (typeof raw !== "string") return undefined;
  const id = Object.hasOwn(planAliases, raw) ? planAliases[raw] : raw;
  return membershipPlans.find(plan => plan.id === id);
}
export function planRequestHref(planId: string) {
  const plan = getRequestPlan(planId);
  if (!plan) return requestDestination;
  const queryId = plan.id === "premium" ? "signature" : plan.id === "private" ? "bespoke" : plan.id;
  return `/contact?plan=${queryId}`;
}
