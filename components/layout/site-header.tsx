import Link from "next/link";
import { primaryCta, site } from "@/content/site";
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
          <nav className="desktop-navigation" aria-label="Primary navigation">
            <ul><NavigationItems /></ul>
          </nav>
          <div className="desktop-request">
            <ButtonLink href={primaryCta.href} prefetch={false}>{primaryCta.label}<span className="shell-arrow" aria-hidden="true">→</span></ButtonLink>
          </div>
          <MobileNavigation>
            <ul><NavigationItems /></ul>
            <div className="mobile-menu-action"><ButtonLink href={primaryCta.href} tone="dark" prefetch={false}>{primaryCta.label}<span className="shell-arrow" aria-hidden="true">→</span></ButtonLink></div>
          </MobileNavigation>
        </div>
      </Container>
    </header>
  );
}
