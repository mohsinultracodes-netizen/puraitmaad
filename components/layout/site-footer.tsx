import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NavigationItems } from "@/components/navigation/navigation-items";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand-name">{site.name}</Link>
            <p className="footer-descriptor">{site.descriptor}</p>
            <p className="footer-tagline">{site.tagline}</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow">Explore</p>
            <ul className="footer-navigation"><NavigationItems /></ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>{site.descriptor}</p>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </Container>
    </footer>
  );
}
