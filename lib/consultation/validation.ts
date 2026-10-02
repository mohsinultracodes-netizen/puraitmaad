export const propertyTypes = ["Private Residence", "Apartment", "Farmhouse", "Estate", "Commercial Property", "Office", "Resort / Hospitality", "Other"] as const;
export const occupancyOptions = ["Most of the year", "Several months each year", "Occasionally", "Usually unoccupied", "Other"] as const;
export const helpOptions = ["Regular Property Inspections", "Preventive Maintenance", "Vendor Coordination", "Property Health / Reporting", "Arrival Ready", "Vehicle Readiness", "Not Sure Yet"] as const;

export type ConsultationValues = {
  fullName: string; email: string; phone: string; location: string;
  propertyType: string; overseas: string; occupancy: string;
  help: string[]; message: string;
};
export type FieldName = keyof ConsultationValues;
export type FieldErrors = Partial<Record<FieldName, string>>;
export type ConsultationState = {
  status: "idle" | "invalid" | "unavailable" | "error" | "success";
  errors: FieldErrors;
  message: string;
};
export const emptyValues: ConsultationValues = { fullName: "", email: "", phone: "", location: "", propertyType: "", overseas: "", occupancy: "", help: [], message: "" };
export const initialState: ConsultationState = { status: "idle", errors: {}, message: "" };
export const fieldLabels: Record<FieldName, string> = { fullName: "Full Name", email: "Email", phone: "Phone / WhatsApp", location: "Property Location", propertyType: "Property Type", overseas: "Do you currently live outside Pakistan?", occupancy: "How often is the property occupied?", help: "What would you like help with?", message: "Tell us a little more" };

export function validateFullName(input: string): string | undefined {
  const name = input.trim().normalize("NFC");
  if (!name) return "Full name is required.";
  // Combining marks are allowed only with a letter, supporting accented and Unicode names.
  if (!/^(?:\p{L}\p{M}*|[ '-])+$/u.test(name) || !/\p{L}/u.test(name)) {
    return "Please enter a valid name using letters only.";
  }
  if (Array.from(name).length < 2) return "Please enter at least 2 characters.";
  if (name.length > 120) return "Please use 120 characters or fewer.";
  return undefined;
}

export function validateConsultation(formData: FormData): { values: ConsultationValues; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const values: ConsultationValues = { ...emptyValues, help: [] };
  const scalarFields = ["fullName", "email", "phone", "location", "propertyType", "overseas", "occupancy", "message"] as const;
  for (const field of scalarFields) {
    const entries = formData.getAll(field);
    if (entries.length > 1 || entries.some((entry) => typeof entry !== "string")) {
      errors[field] = "Please provide one valid value.";
      continue;
    }
    values[field] = typeof entries[0] === "string" ? entries[0].trim() : "";
  }
  const limits = { fullName: 120, email: 254, phone: 40, location: 160, propertyType: 80, overseas: 3, occupancy: 80, message: 2000 };
  for (const field of scalarFields) {
    if (field === "fullName") continue;
    if (values[field].length > limits[field]) errors[field] = `Please use ${limits[field]} characters or fewer.`;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(values[field])) errors[field] = "Please remove invalid characters.";
  }
  for (const field of ["email", "location", "propertyType", "overseas"] as const) {
    if (!values[field] && !errors[field]) errors[field] = "This field is required.";
  }
  if (!errors.fullName) {
    const nameError = validateFullName(values.fullName);
    if (nameError) errors.fullName = nameError;
  }
  if (values.location && !/\p{L}/u.test(values.location)) errors.location = "Please enter a city or area.";
  if (values.email && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && (!/^[+\d\s().-]+$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7 || values.phone.replace(/\D/g, "").length > 15)) errors.phone = "Please enter a valid phone number, including the country code where needed.";
  if (values.propertyType && !propertyTypes.some((value) => value === values.propertyType)) errors.propertyType = "Please choose a listed property type.";
  if (values.overseas && !["Yes", "No"].includes(values.overseas)) errors.overseas = "Please choose Yes or No.";
  if (values.occupancy && !occupancyOptions.some((value) => value === values.occupancy)) errors.occupancy = "Please choose a listed occupancy option.";
  const selected = formData.getAll("help");
  if (!selected.length) errors.help = "Please choose at least one option.";
  else if (selected.length > helpOptions.length || selected.some((value) => typeof value !== "string" || !helpOptions.some((option) => option === value.trim())) || new Set(selected).size !== selected.length) errors.help = "Please choose only the listed options, once each.";
  else values.help = selected.map((value) => (value as string).trim());
  return { values, errors };
}
