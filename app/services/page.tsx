import Link from "next/link";
import { ScrollReveals } from "@/components/ui/scroll-reveals";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { RequestClosing, SupportingPage } from "@/components/sections/supporting/editorial";
import { ServicesHero, ServicesShowcase } from "@/components/sections/services/services-opening";
import { serviceCategories, specialRequestInvitation } from "@/content/services";
import { SubServiceCards } from "@/components/sections/services/sub-service-cards";
import { ServiceDetailsDialog } from "@/components/sections/services/service-details-dialog";
import { requestDestination } from "@/lib/request-context";
export const metadata = pageMetadata("Services", "Practical home, property, personal and business assistance in Lahore. Tell Puraitmaad what needs to be handled.", "/services");
export default function ServicesPage() {
  return <SupportingPage className="sp-services"><ScrollReveals scope=".sp-services" /><ServicesHero /><ServicesShowcase />
    <ServiceDetailsDialog>{serviceCategories.map((category,index) => { return <section className="sp-section sp-category" key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}><Container className="sp-editorial-grid sd-category-layout"><div className="sp-category-intro"><p className="eyebrow">0{index+1} / Our services</p><h2 data-scroll-reveal id={`${category.id}-heading`}>{category.name}</h2><p data-scroll-reveal>{category.description}</p>{category.id === "property-care" && <Link href="/services/property-care">Explore Property Care <span aria-hidden="true">&nbsp;&#8594;</span></Link>}</div><div><SubServiceCards category={category.id} /><Link className="sp-category-request" href={requestDestination}>Tell us what you need <span aria-hidden="true">&#8594;</span></Link></div></Container></section>; })}</ServiceDetailsDialog>
    <RequestClosing title="Not sure who to call?" label="Tell Us What You Need"><p>Tell us what you need and we&apos;ll help figure out the next step.</p><p>{specialRequestInvitation}</p></RequestClosing>
  </SupportingPage>;
}
