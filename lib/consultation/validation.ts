// Internal directory retained during migration; this is the general service-request schema.
export type ServiceRequestValues = {
  fullName: string; phone: string; email: string; location: string; message: string;
  preferredDate: string; preferredTime: string;
};
export type FieldName = keyof ServiceRequestValues;
export type FieldErrors = Partial<Record<FieldName, string>>;
export type ServiceRequestState = { status: "idle" | "invalid" | "error" | "success"; errors: FieldErrors; message: string };
export const emptyValues: ServiceRequestValues = { fullName: "", phone: "", email: "", location: "", message: "", preferredDate: "", preferredTime: "" };
export const initialState: ServiceRequestState = { status: "idle", errors: {}, message: "" };
export const fieldLabels: Record<FieldName, string> = { fullName: "Name", phone: "Phone / WhatsApp", email: "Email", location: "Location / Area", message: "What do you need?", preferredDate: "Preferred date", preferredTime: "Preferred time" };
export const fieldLimits = { fullName: 120, phone: 40, email: 254, location: 160, message: 4000, preferredDate: 10, preferredTime: 5 };
export const contactRequired = "Add a phone / WhatsApp number or email so we can get back to you.";
export const requestSuccess = "We'll review the details and get back to you.";
export const requestFailure = "Please try again shortly.";

export function getLahoreDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = (type: string) => parts.find(part => part.type === type)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
export function validateFullName(input: string): string | undefined {
  const name = input.trim().normalize("NFC");
  if (!name) return "Name is required.";
  if (!/^(?:\p{L}\p{M}*|[ '’\-])+$/u.test(name) || !/\p{L}/u.test(name)) return "Please enter a valid name using letters only.";
  if (Array.from(name).length < 2) return "Please enter at least 2 characters.";
  if (name.length > fieldLimits.fullName) return "Please use 120 characters or fewer.";
}
export function validEmail(value: string): boolean {
  if (value.length > 254 || /\s|[\u0000-\u001f\u007f-\u009f]/u.test(value)) return false;
  const parts = value.split("@");
  if (parts.length !== 2 || parts[0].length > 64 || !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~\-]+$/i.test(parts[0]) || parts[0].startsWith(".") || parts[0].endsWith(".") || value.includes("..")) return false;
  const labels = parts[1].split(".");
  return labels.length >= 2 && /^[a-z]{2,63}$/i.test(labels.at(-1)!) && labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}
export function validateServiceRequest(formData: FormData, now = new Date()): { values: ServiceRequestValues; errors: FieldErrors } {
  const values = { ...emptyValues }; const errors: FieldErrors = {};
  for (const field of Object.keys(emptyValues) as FieldName[]) {
    const entries = formData.getAll(field);
    if (entries.length > 1 || entries.some(entry => typeof entry !== "string")) { errors[field] = "Please provide one valid value."; continue; }
    const raw = (entries[0] as string | undefined) ?? "";
    const invalid = field === "message" ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u : /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u;
    if (invalid.test(raw)) errors[field] = "Please remove invalid characters.";
    values[field] = raw.trim().normalize("NFC");
    if (values[field].length > fieldLimits[field]) errors[field] = `Please use ${fieldLimits[field]} characters or fewer.`;
  }
  if (!errors.fullName) errors.fullName = validateFullName(values.fullName);
  if (!errors.location && (!values.location || !/\p{L}/u.test(values.location))) errors.location = "Please enter your location or area.";
  if (!errors.message && (!values.message || !/[\p{L}\p{N}]/u.test(values.message))) errors.message = "Tell us what needs to be handled.";
  if (values.email && !errors.email) {
    if (!validEmail(values.email)) errors.email = "Please enter a valid email address.";
    else { const [local, domain] = values.email.split("@"); values.email = `${local}@${domain.toLowerCase()}`; }
  }
  if (values.phone && !errors.phone) {
    const digits = values.phone.replace(/\D/g, "").replace(/^00/, "");
    if (!/^\+?[\d ().-]+$/.test(values.phone) || !/^\d{8,15}$/.test(digits) || /^(\d)\1+$/.test(digits)) errors.phone = "Please enter a valid phone number, including the country code for international numbers.";
  }
  if (!values.email && !values.phone) { errors.email ??= contactRequired; errors.phone ??= contactRequired; }
  if (values.preferredDate && !errors.preferredDate) {
    const date = values.preferredDate;
    const [year, month, day] = date.split("-").map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || year < 1900 || parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) errors.preferredDate = "Please choose a valid date.";
    else if (date < getLahoreDate(now)) errors.preferredDate = "Please choose today or a future date in Lahore.";
  }
  if (values.preferredTime && !errors.preferredTime && !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(values.preferredTime)) errors.preferredTime = "Please choose a valid time.";
  for (const field of Object.keys(errors) as FieldName[]) if (!errors[field]) delete errors[field];
  return { values, errors };
}
