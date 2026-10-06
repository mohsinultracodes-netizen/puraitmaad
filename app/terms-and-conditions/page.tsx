import { LegalPage } from "@/components/sections/legal-page";
import { legalDrafts } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
const page = legalDrafts.terms;
export const metadata = pageMetadata(page.title, page.description, "/terms-and-conditions");
export default function DraftPage() { return <LegalPage {...page} draft />; }
