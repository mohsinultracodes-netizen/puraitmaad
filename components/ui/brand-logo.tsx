import Image from "next/image";
import logo from "@/public/images/aitmaad-logo-web.png";

export function BrandLogo({ placement }: { placement: "header" | "footer" }) {
  return <Image
    src={logo}
    alt="AITMAAD — Pur Aitmaad Property Stewardship & Management"
    className={`brand-logo brand-logo-${placement}`}
    sizes={placement === "header" ? "(min-width: 1200px) 88px, (min-width: 768px) 104px, 96px" : "180px"}
    preload={placement === "header"}
  />;
}
