import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { EditorialIntro, RequestClosing, SupportingPage } from "@/components/sections/supporting/editorial";
import { membershipPlans, membershipScope } from "@/content/membership";
export const metadata = pageMetadata("Membership", "Recurring home and property assistance from Puraitmaad. Discuss Essential, Premium or Private support tailored around your needs.", "/membership");
export default function MembershipPage() {
 return <SupportingPage><EditorialIntro eyebrow="Membership" title={<>A house manager —<br />without employing one.</>} photo="membership"><p>For people who want recurring assistance with their home and property responsibilities. An ongoing relationship, with support agreed around the way you live.</p></EditorialIntro>
 <section className="sp-section" aria-label="Membership options"><Container><div className="sp-plans">{membershipPlans.map((plan,index)=><article key={plan.id} className={`sp-plan ${plan.id === "private" ? "sp-private" : ""}`} aria-labelledby={`plan-${plan.id}`}><p className="eyebrow">0{index+1} / Ongoing support</p><h2 id={`plan-${plan.id}`}>{plan.name}</h2><p>{plan.description}</p><p className="sp-plan-price">{plan.pricingLabel}</p><ul>{plan.inclusions.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><p className="sp-small sp-plans-scope">{membershipScope}</p><p className="sp-small">Need help with a single task instead? <Link className="sp-link" href="/services">Explore our services <span aria-hidden="true">&nbsp;&#8594;</span></Link></p></Container></section>
 <RequestClosing title="An arrangement that fits your home." label="Ask About Membership"><p>Tell us the kind of ongoing help you need. Mention Essential, Premium or Private if one feels appropriate; we&apos;ll discuss the scope together.</p></RequestClosing></SupportingPage>;
}
