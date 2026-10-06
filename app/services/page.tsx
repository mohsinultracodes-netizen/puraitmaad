import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, RequestClosing, ServiceList, SupportingPage } from "@/components/sections/supporting/editorial";
import { serviceCategories, servicesForCategory, specialRequestInvitation } from "@/content/services";
export const metadata = pageMetadata("Services", "Practical home, property, personal and business assistance in Lahore. Tell Puraitmaad what needs to be handled.", "/services");
export default function ServicesPage() {
  return <SupportingPage><EditorialIntro eyebrow="Our services" title={<>Comprehensive support<br />for your home, property, business &amp; everyday needs.</>} photo="services"><p>Tell us what needs to be handled. We&apos;ll help identify the appropriate next step.</p></EditorialIntro>
    {serviceCategories.map((category,index) => <section className="sp-section sp-category" key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}><Container className="sp-editorial-grid"><div className="sp-category-intro"><p className="eyebrow">0{index+1} / Our services</p><h2 id={`${category.id}-heading`}>{category.name}</h2><p>{category.description}</p>{category.id === "property-care" && <Link href="/services/property-care">Explore Property Care <span aria-hidden="true">&nbsp;&#8594;</span></Link>}</div><ServiceList items={servicesForCategory(category.id)} /></Container></section>)}
    <RequestClosing title="Not sure who to call?" label="Tell Us What You Need"><p>Tell us what you need and we&apos;ll help figure out the next step.</p><p>{specialRequestInvitation}</p></RequestClosing>
  </SupportingPage>;
}
