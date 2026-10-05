import Image from "next/image";
import { photography, type PhotographySlotName } from "@/content/photography";
import { PhotographyPlaceholder } from "@/components/ui/photography-placeholder";

export function PropertyPhotography({ slot, loading = "lazy" }: { slot: PhotographySlotName; loading?: "lazy" | "eager" }) {
  const photo = photography[slot];
  if (!photo.asset || !photo.asset.alt.trim()) return <PhotographyPlaceholder />;

  const isHomeHero = slot === "homeHero";
  return (
    <figure className={`property-photography photography-${slot}`}>
      <div className="photography-frame" style={{ aspectRatio: photo.aspectRatio }}>
        <Image
          src={photo.asset.src}
          alt={photo.asset.alt}
          fill
          sizes={photo.sizes}
          preload={isHomeHero}
          loading={isHomeHero ? undefined : loading}
          className="property-photography-image"
          style={{ objectPosition: photo.objectPosition }}
        />
      </div>
    </figure>
  );
}
