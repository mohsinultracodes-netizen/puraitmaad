"use server";
import { validateServiceRequest, requestFailure, type ServiceRequestState } from "@/lib/consultation/validation";
import { deliverServiceRequest } from "@/lib/consultation/delivery";
import { getRequestService, getRequestPlan } from "@/lib/request-context";
export async function requestService(_previous: ServiceRequestState, formData: FormData): Promise<ServiceRequestState> {
  const failure: ServiceRequestState = { status: "error", errors: {}, message: requestFailure };
  const honeypot = formData.getAll("website");
  if (honeypot.length > 1 || honeypot.some(value => typeof value !== "string" || value.trim())) return failure;
  const { values, errors } = validateServiceRequest(formData);
  if (Object.keys(errors).length) return { status: "invalid", errors, message: "Please review the fields below." };
  const identity = formData.getAll("submissionId"), context = formData.getAll("serviceId"), planContext = formData.getAll("planId");
  if ([identity, context, planContext].some(entries => entries.length > 1 || entries.some(value => typeof value !== "string"))) return failure;
  const submissionId = (identity[0] as string | undefined) || "";
  if (submissionId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return failure;
  const service = getRequestService(context[0]);
  const plan = getRequestPlan(planContext[0]);
  try { return { ...await deliverServiceRequest(values, submissionId, service?.id, plan?.id), errors: {} }; }
  catch { return failure; }
}
