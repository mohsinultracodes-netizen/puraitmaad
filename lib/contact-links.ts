import { siteConfig } from "../content/site";

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
  const digits = phoneDigits(value);
  if (!digits) return null;
  const service = configured(serviceName);
  const message = service
    ? `Hi ${siteConfig.BRAND_NAME}, I'd like to request ${service}.`
    : `Hi ${siteConfig.BRAND_NAME}, I'd like help with a service.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function socialHref(value: string | null | undefined): string | null {
  const text = configured(value);
  if (!text || /\s/.test(text)) return null;
  try {
    const url = new URL(text);
    const allowed = ["instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com", "linkedin.com", "www.linkedin.com"];
    if (url.protocol !== "https:" || url.username || url.password || url.port || !allowed.includes(url.hostname) || url.pathname === "/") return null;
    if (/(?:your[-_ ]|placeholder|example|replace[-_ ]|\[|\])/i.test(decodeURIComponent(url.pathname))) return null;
    return url.href;
  } catch {
    return null;
  }
}

type ContactConfig = Record<"PHONE" | "WHATSAPP" | "EMAIL" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN", string>;

export function getContactLinks(config: ContactConfig = siteConfig) {
  return {
    phone: phoneHref(config.PHONE), email: emailHref(config.EMAIL), whatsapp: whatsappHref(config.WHATSAPP),
    instagram: socialHref(config.INSTAGRAM), facebook: socialHref(config.FACEBOOK), linkedin: socialHref(config.LINKEDIN),
  };
}
