/** Owner-editable PUBLIC information. Keep unknown values in brackets.
 * Use lib/contact-links.ts to build links. Never put email secrets here.
 */
export const siteConfig = {
  BRAND_NAME: "Puraitmaad",
  TAGLINE: "Your problem → our responsibility.",
  SECONDARY_BRAND_LINE: "Done For You.",
  PHONE: "[YOUR PHONE]",
  WHATSAPP: "[YOUR WHATSAPP NUMBER]",
  EMAIL: "[YOUR EMAIL]",
  // Temporary login destinations approved by the owner; replace with profile URLs.
  INSTAGRAM: "https://www.instagram.com/accounts/login/",
  FACEBOOK: "https://www.facebook.com/login/",
  TIKTOK: "https://www.tiktok.com/login",
  LINKEDIN: "[YOUR LINKEDIN URL]",
  ADDRESS: "[YOUR BUSINESS ADDRESS]",
  CITY: "Lahore, Pakistan",
  DOMAIN: "https://puraitmaad.com",
  BUSINESS_HOURS: "[BUSINESS HOURS]",
  SERVICE_AREAS: "[SERVICE AREAS]",
} as const;

// Compatibility view for existing pages and canonical-domain handling.
export const site = {
  name: siteConfig.BRAND_NAME,
  url: siteConfig.DOMAIN,
  descriptor: "Premium Home, Property & Business Assistance",
  tagline: siteConfig.TAGLINE,
  secondaryBrandLine: siteConfig.SECONDARY_BRAND_LINE,
  description: "Premium managed home, property and business assistance in Lahore. Tell Puraitmaad what you need and we'll coordinate the rest.",
};

// Enable destinations as supporting pages are implemented.
export const navigation = [
  { label: "Home", href: "/", available: true },
  { label: "Services", href: "/services", available: true },
  { label: "How It Works", href: "/how-it-works", available: true },
  { label: "About", href: "/about", available: true },
  { label: "Contact", href: "/contact", available: true },
] as const;

export const primaryCta = { label: "Request a Service", href: "/contact#request-service" } as const;
