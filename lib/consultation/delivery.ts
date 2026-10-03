import "server-only";
import { Resend } from "resend";
import type { ConsultationValues } from "./validation";
import { consultationEmail } from "./email";

export type DeliveryResult =
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export const deliveryFailure = "Your enquiry could not be submitted. Please try again later.";

export async function deliverConsultation(values: ConsultationValues): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { status: "error", message: deliveryFailure };
  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from: "Pur Aitmaad <onboarding@resend.dev>",
      to: "mohsin.ultracodes@gmail.com",
      replyTo: values.email,
      ...consultationEmail(values),
    }, { signal: AbortSignal.timeout(15_000) });
    if (error || !data?.id) return { status: "error", message: deliveryFailure };
    return { status: "success", message: "Thank you. Your consultation enquiry has been submitted." };
  } catch {
    return { status: "error", message: deliveryFailure };
  }
}
