import { HomepageHero, FeaturedServices } from "@/components/sections/home/homepage-opening";
import { ManagedProcess, EmotionalValue } from "@/components/sections/home/homepage-process";
import { PropertyAndBusiness, ComingHomeStory, ProblemLedRequest } from "@/components/sections/home/homepage-care";
import { MembershipAndPrivate, VendorCare, SampleScenario, CustomerStories } from "@/components/sections/home/homepage-membership";
import { HomepageRequest, HomepageClosing } from "@/components/sections/home/homepage-request";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import "./homepage.css";

const homeMetadata = pageMetadata(site.descriptor, site.description, "/");
export const metadata = {
  ...homeMetadata,
  title: { absolute: `${site.name} | ${site.descriptor}` },
  openGraph: { ...homeMetadata.openGraph, title: `${site.name} | ${site.descriptor}` },
};

export default function Home() {
  return (
    <div className="puraitmaad-home">
      <HomepageHero />
      <FeaturedServices />
      <ManagedProcess />
      <EmotionalValue />
      <PropertyAndBusiness />
      <ComingHomeStory />
      <ProblemLedRequest />
      <MembershipAndPrivate />
      <VendorCare />
      <SampleScenario />
      <CustomerStories />
      <HomepageRequest />
      <HomepageClosing />
    </div>
  );
}
