import { LegalPage } from "@/components/sections/legal-page";
import { privacyPolicy } from "@/content/privacy-policy";
import { pageMetadata } from "@/lib/seo";
const description = "How Puraitmaad handles service-request information, email delivery, correspondence and privacy in practical coordination.";
export const metadata = pageMetadata("Privacy Policy", description, "/privacy-policy");
export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" description="How information provided through this website is handled." sections={privacyPolicy} />;
}
