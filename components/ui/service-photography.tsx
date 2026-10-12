import Image from "next/image";
import { servicePhotography, type ServicePhotoKey } from "@/content/service-photography";
import "./service-photography.css";

export function ServicePhotography({ image, sizes, reveal = false }: { image: ServicePhotoKey; sizes: string; reveal?: boolean }) {
  const photo = servicePhotography[image];
  return <div className="service-image-frame" data-scroll-reveal={reveal ? "image" : undefined}><Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes={sizes} loading="lazy" style={{ objectFit: "cover", objectPosition: photo.position }} /></div>;
}
