import { siteConfig } from "../content/site";
import type { ServiceRequestValues } from "./consultation/validation";

function configured(value: string | null | undefined): string | null {
  const text = value?.trim();
  if (!text || /[\[\]<>\r\n]/.test(text) || /^(?:n\/?a|none|null|undefined|tbd|todo|coming soon|not configured)$/i.test(text)) return null;
  return text;
}

// International country code required; never guess from the visitor's locale.
function phoneDigits(value: string | null | undefined): string | null {
  const text = configured(value);
  if (!text || !/^\+?[1-9][\d ().-]*$/.test(text)) return null;
  const digits = text.replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) && !/^(\d)\1+$/.test(digits) ? digits : null;
}

export function phoneHref(value: string | null | undefined = siteConfig.PHONE): string | null {
  const digits = phoneDigits(value);
  return digits ? `tel:+${digits}` : null;
}

export function emailHref(value: string | null | undefined = siteConfig.EMAIL): string | null {
  const text = configured(value);
  if (!text || !/^[A-Z0-9.!#$%&'*+/=_`{|}~-]+@[A-Z0-9](?:[A-Z0-9.-]*[A-Z0-9])?\.[A-Z]{2,}$/i.test(text)) return null;
  const domain = text.split("@")[1].toLowerCase();
  if (/(^|\.)(example\.(com|org|net)|localhost)$|\.(example|test|invalid|local)$/.test(domain) || text.includes("..")) return null;
  return `mailto:${encodeURIComponent(text).replace(/%40/g, "@")}`;
}

export function whatsappHref(value: string | null | undefined = siteConfig.WHATSAPP, serviceName?: string): string | null {
  const service = configured(serviceName);
  const message = service
    ? `Hi ${siteConfig.BRAND_NAME}, I'd like to request ${service}.`
    : `Hi ${siteConfig.BRAND_NAME}, I'd like help with a service.`;
  return whatsappMessageHref(message, value);
}

function whatsappMessageHref(message: string, value: string | null | undefined = siteConfig.WHATSAPP): string | null {
  const digits = phoneDigits(value);
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
}

export type WhatsAppContext = "general" | "property-care" | "arrival-ready";

export function contextualWhatsappHref(context: WhatsAppContext = "general"): string | null {
  const messages = {
    general: `Hi ${siteConfig.BRAND_NAME}, I'd like help with a service.`,
    "property-care": `Hi ${siteConfig.BRAND_NAME}, I'd like help with Property Care.`,
    "arrival-ready": `Hi ${siteConfig.BRAND_NAME}, I'd like help preparing my home before arrival.`,
  };
  return whatsappMessageHref(messages[context]);
}

// An explicit allowlist keeps contact details and internal submission metadata
// out of the WhatsApp draft. This is generated only after an accepted request.
export function submittedRequestWhatsappHref(values: Pick<ServiceRequestValues, "fullName" | "location" | "message" | "preferredDate" | "preferredTime">): string | null {
  const date = values.preferredDate.trim();
  const time = values.preferredTime.trim();
  const preferred = [date, time].filter(Boolean).join(" at ");
  const fields = [
    ["Name", values.fullName.trim()],
    ["Location", values.location.trim()],
    ["Request", values.message.trim()],
    ["Preferred date/time", preferred ? `${preferred} (Lahore time)` : ""],
  ].filter(([, value]) => value);
  return whatsappMessageHref(`Hi ${siteConfig.BRAND_NAME}, I just submitted a service request.${fields.length ? `\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}` : ""}`);
}

export function socialHref(value: string | null | undefined, options: { allowLogin?: boolean } = {}): string | null {
  const text = configured(value);
  if (!text || /\s/.test(text)) return null;
  try {
    const url = new URL(text);
    const allowed = ["instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com", "linkedin.com", "www.linkedin.com", "tiktok.com", "www.tiktok.com"];
    if (url.protocol !== "https:" || url.username || url.password || url.port || !allowed.includes(url.hostname) || url.pathname === "/") return null;
    if (/(?:your[-_ ]|placeholder|example|replace[-_ ]|\[|\])/i.test(decodeURIComponent(url.pathname))) return null;
    // Login pages are temporary footer destinations, never business identity links.
    const loginPath = /^(?:www\.)?instagram\.com$/.test(url.hostname) ? /^\/accounts\/login\/?$/ : /^\/login\/?$/;
    if (loginPath.test(url.pathname)) return options.allowLogin ? url.href : null;
    if (url.hostname.endsWith("tiktok.com") && !/^\/@[a-z\d_.]{1,24}\/?$/i.test(url.pathname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

type ContactConfig = Record<"PHONE" | "WHATSAPP" | "EMAIL" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN", string> & { TIKTOK?: string };

export function publicContactText(value: string | null | undefined): string | null { return configured(value); }

export function getContactLinks(config: ContactConfig = siteConfig, serviceName?: string) {
  return {
    phone: phoneHref(config.PHONE), email: emailHref(config.EMAIL), whatsapp: whatsappHref(config.WHATSAPP, serviceName),
    instagram: socialHref(config.INSTAGRAM), facebook: socialHref(config.FACEBOOK), linkedin: socialHref(config.LINKEDIN),
    tiktok: socialHref(config.TIKTOK),
  };
}
