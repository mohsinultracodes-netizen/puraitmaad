import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { NavigationItems } from "@/components/navigation/navigation-items";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <div className="header-top">
          <Link href="/" className="wordmark" aria-label={`${site.name} — Home`}>
            <span className="brand-name">{site.name}</span>
            <span className="brand-descriptor">{site.descriptor}</span>
          </Link>
          <div className="desktop-consultation">
            <ButtonLink href="/contact#consultation" prefetch={false}>Request Consultation</ButtonLink>
          </div>
          <MobileNavigation>
            <ul><NavigationItems /></ul>
            <ButtonLink href="/contact#consultation" prefetch={false}>Request Consultation</ButtonLink>
          </MobileNavigation>
        </div>
        <nav className="desktop-navigation" aria-label="Main navigation">
          <ul><NavigationItems /></ul>
        </nav>
      </Container>
    </header>
  );
}
