import { fieldLabels, type ServiceRequestValues } from "./validation";
import { getRequestService, getRequestPlan } from "@/lib/request-context";
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}
export const preferenceNote = "Preferred date and time are customer preferences in Lahore (Asia/Karachi), not confirmed appointments.";
export function serviceRequestEmail(values: ServiceRequestValues, serviceId?: string, submittedAt?: Date, planId?: string) {
  const service = getRequestService(serviceId);
  const plan = getRequestPlan(planId);
  const rows: string[][] = [
    ...(submittedAt ? [["Submitted (UTC)", submittedAt.toISOString()], ["Submitted (Pakistan)", new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "long", timeZone: "Asia/Karachi" }).format(submittedAt)]] : []),
    ...Object.entries(fieldLabels).filter(([field]) => values[field as keyof ServiceRequestValues]).map(([field, label]) => [field === "message" ? "Request" : label, values[field as keyof ServiceRequestValues]]),
    ...(service ? [["Service context (optional)", service.name]] : []),
    ...(plan ? [["Plan enquiry (optional)", plan.name]] : []),
  ];
  // Delivery omits a changing timestamp so the provider payload stays identical on retries.
  return {
    subject: "New Puraitmaad Service Request",
    text: "New Puraitmaad Service Request\n\n" + rows.map(([label, value]) => `${label}: ${value}`).join("\n\n") + "\n\n" + preferenceNote,
    html: `<div style="font-family:Arial,sans-serif;color:#203a32;max-width:680px"><h1 style="font-size:24px">New Puraitmaad Service Request</h1><table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => `<tr><th scope="row" style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd9cf">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #ddd9cf;overflow-wrap:anywhere">${escapeHtml(value).replace(/\r?\n/g, "<br>")}</td></tr>`).join("")}</table><p>${preferenceNote}</p></div>`,
  };
}
