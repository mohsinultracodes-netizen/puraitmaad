import Image from "next/image";

export function BrandLogo({ placement }: { placement: "header" | "footer" }) {
  return <Image
    src="/images/pur-aitmaad-logo.svg"
    width={1200}
    height={960}
    unoptimized
    alt="Pur Aitmaad — Always Looked After"
    className={`brand-logo brand-logo-${placement}`}
    sizes={placement === "header" ? "(min-width: 1024px) 120px, 108px" : "132px"}
    preload={placement === "header"}
  />;
}
