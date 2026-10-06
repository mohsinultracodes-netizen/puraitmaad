import type { ServiceRequestState } from "@/lib/consultation/validation";
import { fieldLabels, type FieldName } from "@/lib/consultation/validation";
export function RequestFeedback({ state, pending, whatsappHref }: { state: ServiceRequestState; pending: boolean; whatsappHref?: string | null }) {
  const errors = Object.entries(state.errors).filter(([, message]) => Boolean(message)) as [FieldName, string][];
  const unique = errors.filter(([,message], index) => errors.findIndex(([,other]) => message === other) === index);
  if (pending) return <p>Sending...</p>;
  if (state.status === "success") return <><h3>Request received.</h3><p>{state.message}</p></>;
  if (state.status === "error") return <><h3>Something went wrong.</h3><p>{whatsappHref ? <>Please try again or <a href={whatsappHref}>contact us directly on WhatsApp</a>.</> : state.message}</p></>;
  if (state.status === "invalid") return <><p>{state.message}</p><ul>{unique.map(([field,message]) => <li key={field}><a href={`#${field}`}>{fieldLabels[field]}: {message}</a></li>)}</ul></>;
  return null;
}
