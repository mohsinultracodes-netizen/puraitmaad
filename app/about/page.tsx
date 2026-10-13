import { ScrollReveals } from "@/components/ui/scroll-reveals";
import { pageMetadata } from "@/lib/seo";
import { RequestClosing, SupportingPage } from "@/components/sections/supporting/editorial";
import { AboutIntroduction } from "@/components/sections/supporting/about-introduction";
export const metadata = pageMetadata("About", "Puraitmaad brings practical home, property and everyday responsibilities together under one relationship in Lahore.", "/about");
export default function AboutPage() {
 return <SupportingPage className="sp-about"><ScrollReveals scope=".sp-about" /><AboutIntroduction />
 <RequestClosing title="What would you like us to handle?" label="Tell Us What You Need" /></SupportingPage>;
}
