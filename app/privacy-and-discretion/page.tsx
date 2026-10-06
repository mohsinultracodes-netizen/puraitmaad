import { permanentRedirect } from "next/navigation";
export default function LegacyPage() {
  permanentRedirect("/privacy-policy#privacy-and-discretion");
}
