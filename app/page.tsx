import { Hero } from "@/components/sections/home/hero";
import { Problem } from "@/components/sections/home/problem";
import { Solution } from "@/components/sections/home/solution";
import { CoreServices } from "@/components/sections/home/core-services";
import { PropertyHealth } from "@/components/sections/home/property-health";
import { OverseasOwners } from "@/components/sections/home/overseas-owners";
import { ArrivalReady } from "@/components/sections/home/arrival-ready";
import { Privacy } from "@/components/sections/home/privacy";
import { FounderLed } from "@/components/sections/home/founder-led";
import { FinalCta } from "@/components/sections/home/final-cta";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

const homeMetadata = pageMetadata("Property Stewardship & Management", site.description, "/");
export const metadata = {
  ...homeMetadata,
  title: { absolute: `${site.name} | ${site.descriptor}` },
  openGraph: { ...homeMetadata.openGraph, title: `${site.name} | ${site.descriptor}` },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <CoreServices />
      <PropertyHealth />
      <OverseasOwners />
      <ArrivalReady />
      <Privacy />
      <FounderLed />
      <FinalCta />
    </>
  );
}
