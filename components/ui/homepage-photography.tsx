import Image from "next/image";
import { homepagePhotography, type HomepagePhotoKey } from "@/content/photography";
import { ServiceIcon } from "./service-icon";

export function HomepagePhotography({ slot, className = "" }: { slot: HomepagePhotoKey; className?: string }) {
  const photo = homepagePhotography[slot];
  if (!photo.asset) {
    // Intentional visual fallback, not a claim that a stock photograph is a client office.
    return <div className={`hp-photo hp-office-art ${className}`} aria-hidden="true"><ServiceIcon name="office" /><span>For your working day.</span><span className="hp-office-caption">Practical support.<br />Fewer interruptions.</span></div>;
  }
  return <div className={`hp-photo ${className}`}><Image src={photo.asset.src} alt={photo.asset.alt} fill sizes={photo.sizes} style={{ objectFit: "cover", objectPosition: photo.objectPosition }} preload={slot === "hero"} loading={slot === "hero" ? undefined : "lazy"} placeholder="blur" /></div>;
}
