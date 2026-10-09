import "server-only";
import { createHmac } from "node:crypto";
import { Resend } from "resend";
import { requestFailure, requestSuccess, validEmail, type ServiceRequestValues } from "./validation";
import { serviceRequestEmail } from "./email";
export type DeliveryResult = { status: "error" | "success"; message: string };
export async function deliverServiceRequest(values: ServiceRequestValues, submissionId = "", serviceId?: string, planId?: string): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = process.env.RESEND_TO?.trim();
  const senderAddress = from?.match(/^[^<>\r\n]+<([^<>\r\n]+)>$/)?.[1]?.trim() ?? from;
  if (!key || !from || /[\r\n]/.test(from) || !senderAddress || !validEmail(senderAddress) || !to || !validEmail(to)) return { status: "error", message: requestFailure };
  const payload = { from, to, ...(values.email ? { replyTo: values.email } : {}), ...serviceRequestEmail(values, serviceId, undefined, planId) };
  const idempotencyKey = "service-request/" + createHmac("sha256", key).update(JSON.stringify([submissionId, payload])).digest("hex");
  try {
    const resend = new Resend(key);
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data, error } = await resend.emails.send(payload, { idempotencyKey, signal: AbortSignal.timeout(15_000) });
      if (!error && data?.id) return { status: "success", message: requestSuccess };
      const retryable = error && (["application_error", "internal_server_error", "rate_limit_exceeded", "concurrent_idempotent_requests"].includes(error.name) || (error.statusCode ?? 0) >= 500 || error.statusCode === 429);
      if (!retryable || attempt === 1) break;
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  } catch { /* Never return provider errors, configuration or stack traces. */ }
  return { status: "error", message: requestFailure };
}
