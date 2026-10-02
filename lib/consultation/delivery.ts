import type { ConsultationValues } from "./validation";

export type DeliveryResult =
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

// Server-only call site. No storage, logging or external delivery is configured.
// A future adapter must return success only after delivery has been accepted.
export async function deliverConsultation(values: ConsultationValues): Promise<DeliveryResult> {
  void values;
  return { status: "unavailable", message: "Online enquiry delivery is being prepared. Please check back soon." };
}
