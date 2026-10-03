"use server";

import { validateConsultation } from "@/lib/consultation/validation";
import type { ConsultationState } from "@/lib/consultation/validation";
import { deliverConsultation } from "@/lib/consultation/delivery";

export async function requestConsultation(_previous: ConsultationState, formData: FormData): Promise<ConsultationState> {
  const honeypot = formData.getAll("website");
  if (honeypot.length > 1 || honeypot.some((value) => typeof value !== "string" || value.trim())) {
    return { status: "error", errors: {}, message: "Your enquiry could not be submitted. Please try again later." };
  }
  const { values, errors } = validateConsultation(formData);
  if (Object.keys(errors).length) return { status: "invalid", errors, message: "Please review the fields below." };
  try {
    const result = await deliverConsultation(values);
    return { ...result, errors: {} };
  } catch {
    return { status: "error", errors: {}, message: "Your enquiry could not be delivered. Please try again later." };
  }
}
