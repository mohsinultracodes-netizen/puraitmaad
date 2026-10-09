export type SocialPlatform = "Facebook" | "Instagram" | "TikTok" | "LinkedIn";

/** Decorative marks; the enclosing link provides the accessible platform name. */
export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    {platform === "Facebook" && <path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4C17.4 1.2 16.4 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />}
    {platform === "Instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.1" /></>}
    {platform === "TikTok" && <path d="M14 2h3c.3 2.6 1.8 4.3 4 4.7v3.1a9 9 0 0 1-4-1.3V16a6 6 0 1 1-6-6h1v3.2a3 3 0 1 0 2 2.8z" />}
    {platform === "LinkedIn" && <><circle cx="5" cy="5" r="2" /><path d="M3 9h4v12H3zm7 0h4v1.6c.8-1.3 2-1.9 3.5-1.9 3 0 3.5 2 3.5 4.8V21h-4v-6.7c0-1.4-.3-2.3-1.5-2.3-1.1 0-1.5.9-1.5 2.3V21h-4z" /></>}
  </svg>;
}
