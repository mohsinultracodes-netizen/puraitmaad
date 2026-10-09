import { HomepageHero, FeaturedServices } from "@/components/sections/home/homepage-opening";
import { ManagedProcess } from "@/components/sections/home/homepage-process";
import { PropertyCareFeature, BusinessSupportFeature, ComingHomeStory } from "@/components/sections/home/homepage-care";
import { MembershipSupportLevels, PrivateAssistanceFeature, VendorCare } from "@/components/sections/home/homepage-membership";
import { HomepageRequest, HomepageClosing } from "@/components/sections/home/homepage-request";
import { HomepageTestimonials } from "@/components/sections/home/homepage-testimonials";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import "./homepage.css";

const homeMetadata = pageMetadata(site.descriptor, site.description, "/");
export const metadata = {
  ...homeMetadata,
  title: { absolute: `${site.name} | ${site.descriptor}` },
  openGraph: { ...homeMetadata.openGraph, title: `${site.name} | ${site.descriptor}` },
  twitter: { ...homeMetadata.twitter, title: `${site.name} | ${site.descriptor}` },
};

export default function Home() {
  return (
    <div className="puraitmaad-home">
      <HomepageHero />
      <ManagedProcess />
      <FeaturedServices />
      <PropertyCareFeature />
      <ComingHomeStory />
      <MembershipSupportLevels />
      <PrivateAssistanceFeature />
      <BusinessSupportFeature />
      <VendorCare />
      <HomepageTestimonials />
      <HomepageRequest />
      <HomepageClosing />
    </div>
  );
}
