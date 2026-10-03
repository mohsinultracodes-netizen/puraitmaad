import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { NavigationItems } from "@/components/navigation/navigation-items";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { BrandLogo } from "@/components/ui/brand-logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <div className="header-top">
          <Link href="/" className="wordmark" aria-label={`${site.name} — Home`}>
            <BrandLogo placement="header" />
          </Link>
          <nav className="desktop-navigation" aria-label="Main navigation">
            <ul><NavigationItems /></ul>
          </nav>
          <div className="desktop-consultation">
            <ButtonLink href="/contact#consultation" prefetch={false}>Request Consultation</ButtonLink>
          </div>
          <MobileNavigation>
            <ul><NavigationItems /></ul>
            <ButtonLink href="/contact#consultation" prefetch={false}>Request Consultation</ButtonLink>
          </MobileNavigation>
        </div>
      </Container>
    </header>
  );
}
