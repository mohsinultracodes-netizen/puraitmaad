import { fieldLabels, type ConsultationValues } from "./validation";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function consultationEmail(values: ConsultationValues, submittedAt = new Date()) {
  const rows = [
    ["Submitted (UTC)", submittedAt.toISOString()],
    ["Submitted (Pakistan)", new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "long", timeZone: "Asia/Karachi" }).format(submittedAt)],
    ...Object.entries(fieldLabels).map(([field, label]) => {
      const value = values[field as keyof ConsultationValues];
      return [label, (Array.isArray(value) ? value.join(", ") : value) || "Not provided"];
    }),
  ];
  return {
    subject: `New Pur Aitmaad Consultation Enquiry — ${values.fullName}`,
    text: "New Pur Aitmaad consultation enquiry\n\n" + rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: `<div style="font-family:Arial,sans-serif;color:#292b27;max-width:680px"><h1 style="font-size:24px">New consultation enquiry</h1><p>Pur Aitmaad · Property Stewardship &amp; Management</p><table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => `<tr><th scope="row" style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #d7d2c6">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #d7d2c6;overflow-wrap:anywhere">${escapeHtml(value).replace(/\r?\n/g, "<br>")}</td></tr>`).join("")}</table></div>`,
  };
}
