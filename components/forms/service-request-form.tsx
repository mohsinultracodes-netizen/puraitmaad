"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { requestService } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { emptyValues, initialState, fieldLabels, fieldLimits, getLahoreDate, validateServiceRequest, type FieldName, type ServiceRequestState, type ServiceRequestValues } from "@/lib/consultation/validation";
import { submittedRequestWhatsappHref } from "@/lib/contact-links";
import { getRequestService, getRequestPlan } from "@/lib/request-context";
import { RequestFeedback } from "./request-feedback";
import "./service-request.css";

export function ServiceRequestForm({ serviceId, planId, whatsappHref }: { serviceId?: string; planId?: string; whatsappHref?: string | null }) {
  const service = getRequestService(serviceId);
  const plan = getRequestPlan(planId);
  const [serverState, action, pending] = useActionState(requestService, initialState);
  const [clientState, setClientState] = useState<ServiceRequestState | null>(null);
  const [submittedValues, setSubmittedValues] = useState<ServiceRequestValues | null>(null);
  const [values, setValues] = useState({ ...emptyValues, message: `${plan ? `I'd like information about the ${plan.name} plan. ` : ""}${service ? `I'd like help with ${service.name}. ` : ""}` });
  // Static homepage HTML may outlive today's date. Refresh on focus, without a
  // server/client date mismatch; both validators still enforce the current Lahore day.
  const [today, setToday] = useState("");
  const summary = useRef<HTMLDivElement>(null), identity = useRef<HTMLInputElement>(null);
  const lock = useRef(false), attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const state = clientState ?? serverState;
  useEffect(() => { if (!pending) lock.current = false; }, [pending, serverState]);
  useEffect(() => { if (serverState.status !== "idle") summary.current?.focus(); }, [serverState]);
  function update(field: FieldName, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (state.status === "invalid") {
      const errors = { ...state.errors, [field]: undefined };
      if (field === "phone" || field === "email") {
        const data = new FormData();
        for (const [name, entry] of Object.entries(nextValues)) data.set(name, entry);
        const contactErrors = validateServiceRequest(data).errors;
        errors.phone = contactErrors.phone;
        errors.email = contactErrors.email;
      }
      setClientState(Object.values(errors).some(Boolean) ? { ...state, errors } : initialState);
    }
  }
  function describedBy(field: FieldName, hint?: string) {
    return [hint, state.errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;
  }
  function field(name: FieldName, control: ReactNode, note: string) {
    return <div className={`request-field request-field-${name}`}><label htmlFor={name}>{fieldLabels[name]} <span className="field-optional">{note}</span></label>{control}{state.errors[name] && <p id={`${name}-error`} className="field-error">{state.errors[name]}</p>}</div>;
  }
  function input(name: Exclude<FieldName, "message">, options: InputHTMLAttributes<HTMLInputElement>, note: string, hint?: string) {
    return field(name, <input {...options} id={name} name={name} maxLength={fieldLimits[name]} value={values[name]} onChange={event => update(name, event.target.value)} aria-invalid={Boolean(state.errors[name])} aria-describedby={describedBy(name, hint)} />, note);
  }
  return <form className="service-request-form" action={action} noValidate aria-busy={pending} onReset={event => event.preventDefault()} onSubmit={event => {
    if (pending || lock.current || state.status === "success") { event.preventDefault(); return; }
    const validated = validateServiceRequest(new FormData(event.currentTarget));
    if (Object.keys(validated.errors).length) {
      event.preventDefault();setClientState({ status: "invalid", errors: validated.errors, message: "Please review the fields below." });requestAnimationFrame(() => summary.current?.focus());return;
    }
    const fingerprint = JSON.stringify([validated.values, service?.id, plan?.id]);
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) attempt.current = { fingerprint, id: crypto.randomUUID() };
    if (identity.current) identity.current.value = attempt.current.id;
    setSubmittedValues({ ...validated.values });
    lock.current = true;setClientState(null);
  }}>
    <input ref={identity} type="hidden" name="submissionId" defaultValue="" />
    {service && <input type="hidden" name="serviceId" value={service.id} />}
    {plan && <input type="hidden" name="planId" value={plan.id} />}
    <div className="consultation-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={160} /></div>
    <div ref={summary} tabIndex={-1} className={`form-feedback feedback-${state.status}`} aria-live="polite" aria-atomic="true">
      <RequestFeedback state={state} pending={pending} whatsappHref={whatsappHref} submittedWhatsappHref={state.status === "success" && submittedValues ? submittedRequestWhatsappHref(submittedValues) : null} />
    </div>
    <fieldset className="request-fields" disabled={pending || state.status === "success"}>
      <legend className="sr-only">Your service request</legend>
      <p className="request-one-time">One-time requests don&apos;t require membership.</p>
      {plan && <p className="request-plan-context">Plan enquiry: <strong>{plan.name}</strong></p>}
      <div className="request-grid">
        {input("fullName", { type: "text", required: true, autoComplete: "name", placeholder: "Your name" }, "(required)")}
        {input("phone", { type: "tel", inputMode: "tel", required: !values.email.trim(), autoComplete: "tel", placeholder: "+92 XXX XXXXXXX" }, "(phone or email)", "request-contact-hint")}
        {input("email", { type: "email", inputMode: "email", required: !values.phone.trim(), autoComplete: "email", placeholder: "you@example.com", autoCapitalize: "none", spellCheck: false }, "(phone or email)", "request-contact-hint")}
        {input("location", { type: "text", required: true, autoComplete: "address-level2", placeholder: "DHA, Gulberg, Cantt, etc." }, "(required)")}
      </div>
      <p id="request-contact-hint" className="request-hint">Give us a phone / WhatsApp number or email. One is enough.</p>
      {field("message", <textarea id="message" name="message" required rows={5} maxLength={fieldLimits.message} value={values.message} onChange={event => update("message", event.target.value)} placeholder="Tell us what needs to be done..." aria-invalid={Boolean(state.errors.message)} aria-describedby={describedBy("message", "request-privacy-hint")} />, "(required)")}
      <div className="request-grid request-preferences">
        {input("preferredDate", { type: "date", min: today || undefined, onFocus: () => setToday(getLahoreDate()) }, "(optional)", "request-preferences-hint")}
        {input("preferredTime", { type: "time", step: 60 }, "(optional)", "request-preferences-hint")}
      </div>
      <p id="request-preferences-hint" className="request-hint">Preferences use Lahore time. We&apos;ll agree the timing with you; this isn&apos;t a confirmed appointment.</p>
      <p id="request-privacy-hint" className="request-hint">Please leave out passwords, access codes, financial details and exact street addresses.</p>
      <p className="request-hint request-consent">Sending this request allows Puraitmaad to contact you about it. Read our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
      <Button type="submit" loading={pending} loadingLabel="Sending...">Send Request <span aria-hidden="true">→</span></Button>
    </fieldset>
    {state.status === "success" && <Button variant="text" onClick={() => { setClientState(initialState);setValues({ ...emptyValues });setSubmittedValues(null);attempt.current = null;if(identity.current)identity.current.value = "";requestAnimationFrame(() => document.getElementById("fullName")?.focus()); }}>Send another request</Button>}
  </form>;
}
