import { services } from "@/content/services";
export const requestDestination = "/contact#request-service";
export function getRequestService(raw: unknown) {
  return typeof raw === "string" ? services.find(service => service.id === raw) : undefined;
}
export function serviceRequestHref(serviceId?: string) {
  const service = getRequestService(serviceId);
  return service ? `/contact?service=${encodeURIComponent(service.id)}#request-service` : requestDestination;
}
