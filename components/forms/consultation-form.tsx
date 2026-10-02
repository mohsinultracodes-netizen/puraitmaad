"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { requestConsultation } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { emptyValues, initialState, fieldLabels, propertyTypes, occupancyOptions, helpOptions, validateConsultation, validateFullName } from "@/lib/consultation/validation";
import type { ConsultationState, ConsultationValues, FieldName } from "@/lib/consultation/validation";

export function ConsultationForm() {
  const [serverState, action, pending] = useActionState(requestConsultation, initialState);
  const [clientState, setClientState] = useState<ConsultationState | null>(null);
  const [values, setValues] = useState<ConsultationValues>({ ...emptyValues, help: [] });
  const summary = useRef<HTMLDivElement>(null);
  const [nameEdited, setNameEdited] = useState(false);
  const baseState = clientState ?? serverState;
  const state = { ...baseState, errors: { ...baseState.errors } };
  if (nameEdited) {
    const nameError = validateFullName(values.fullName);
    if (nameError) state.errors.fullName = nameError;
    else delete state.errors.fullName;
  }
  useEffect(() => { if (serverState.status !== "idle") summary.current?.focus(); }, [serverState]);

  function update(field: Exclude<FieldName, "help">, value: string) {
    if (field === "fullName") setNameEdited(true);
    setValues((previous) => ({ ...previous, [field]: value }));
  }
  function descriptionIds(field: FieldName, hint?: string) {
    return [hint ? `${field}-hint` : "", state.errors[field] ? `${field}-error` : ""].filter(Boolean).join(" ") || undefined;
  }
  function field(field: Exclude<FieldName, "help">, control: ReactNode, required = false, hint?: string) {
    return <div className="consultation-field"><label htmlFor={field}>{fieldLabels[field]} <span className="field-optional">{required ? "(required)" : "(optional)"}</span></label>{control}{hint && <p id={`${field}-hint`} className="field-hint">{hint}</p>}{state.errors[field] && <p id={`${field}-error`} className="field-error">{state.errors[field]}</p>}</div>;
  }
  function input(fieldName: "fullName" | "email" | "phone" | "location", type: string, maxLength: number, required: boolean, autoComplete?: string, hint?: string) {
    return field(fieldName, <input id={fieldName} name={fieldName} type={type} value={values[fieldName]} onChange={(event) => update(fieldName, event.target.value)} required={required} maxLength={maxLength} autoComplete={autoComplete} placeholder={fieldName === "location" ? "DHA Lahore, Gulberg, Raiwind, etc." : undefined} aria-invalid={Boolean(state.errors[fieldName])} aria-describedby={descriptionIds(fieldName, hint)} />, required, hint);
  }
  function select(fieldName: "propertyType" | "overseas" | "occupancy", options: readonly string[], required: boolean, hint?: string) {
    return field(fieldName, <select id={fieldName} name={fieldName} value={values[fieldName]} onChange={(event) => update(fieldName, event.target.value)} required={required} aria-invalid={Boolean(state.errors[fieldName])} aria-describedby={descriptionIds(fieldName, hint)}><option value="">{required ? "Please select" : "Select if applicable"}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>, required, hint);
  }

  return (
    <form action={action} noValidate aria-busy={pending} onSubmit={(event) => {
      const { errors } = validateConsultation(new FormData(event.currentTarget));
      if (Object.keys(errors).length) {
        event.preventDefault();
        setClientState({ status: "invalid", errors, message: "Please review the fields below." });
        requestAnimationFrame(() => summary.current?.focus());
      } else setClientState(null);
    }}>
      <p className="form-availability">Online enquiry delivery is being prepared. This form does not yet send enquiries.</p>
      <div ref={summary} tabIndex={-1} className={`form-feedback feedback-${state.status}`} aria-live="polite" aria-atomic="true">
        {pending ? <p>Submitting your request…</p> : state.message && <p>{state.message}</p>}
        {!pending && state.status === "invalid" && <ul>{(Object.keys(state.errors) as FieldName[]).map((name) => <li key={name}><a href={`#${name}`}>{fieldLabels[name]}: {state.errors[name]}</a></li>)}</ul>}
      </div>
      <fieldset className="form-fields" disabled={pending}>
        <legend className="sr-only">Your consultation details</legend>
        <div className="consultation-fields">
          {input("fullName", "text", 120, true, "name")}
          {input("email", "email", 254, true, "email")}
          {input("phone", "tel", 40, false, "tel")}
          {input("location", "text", 160, true, undefined, "City or area only. Please do not include an exact street address.")}
          {select("propertyType", propertyTypes, true, "Current launch coverage focuses on selected private properties in Lahore. Other property types are included for future enquiries and are not all currently serviced.")}
          {select("overseas", ["Yes", "No"], true)}
          {select("occupancy", occupancyOptions, false)}
        </div>
        <fieldset id="help" tabIndex={-1} className="help-options" aria-describedby={descriptionIds("help")} aria-invalid={Boolean(state.errors.help)}>
          <legend>{fieldLabels.help} <span className="field-optional">(required; choose one or more)</span></legend>
          {helpOptions.map((option, index) => <label className="checkbox-option" key={option} htmlFor={`help-${index}`}><input id={`help-${index}`} type="checkbox" name="help" value={option} checked={values.help.includes(option)} onChange={(event) => setValues((previous) => ({ ...previous, help: event.target.checked ? [...previous.help, option] : previous.help.filter((value) => value !== option) }))} />{option}</label>)}
          {state.errors.help && <p id="help-error" className="field-error">{state.errors.help}</p>}
        </fieldset>
        {field("message", <textarea id="message" name="message" rows={5} maxLength={2000} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(state.errors.message)} aria-describedby={descriptionIds("message", "sensitive")} />, false, "Please do not include passwords, alarm codes, banking information, safe combinations, or other sensitive information.")}
        <p className="form-acknowledgement">By submitting this form, you are asking Pur Aitmaad to contact you regarding your enquiry.</p>
        <p className="form-acknowledgement">Read our <Link href="/privacy-policy" className="policy-inline-link">website Privacy Policy</Link> for information handling details.</p>
        <Button type="submit" disabled={pending}>{pending ? "Submitting…" : "Request Consultation"}</Button>
      </fieldset>
    </form>
  );
}
