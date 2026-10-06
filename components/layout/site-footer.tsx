import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigation, primaryCta, site, siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { getContactLinks } from "@/lib/contact-links";
import { BrandLogo } from "@/components/ui/brand-logo";

export function SiteFooter() {
  const links = getContactLinks();
  const contacts = [
    { label: "Phone", href: links.phone },
    { label: "WhatsApp", href: links.whatsapp },
    { label: "Email", href: links.email },
  ].filter((item) => item.href !== null);
  const socials = [
    { label: "Instagram", href: links.instagram },
    { label: "Facebook", href: links.facebook },
    { label: "LinkedIn", href: links.linkedin },
  ].filter((item) => item.href !== null);
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label={`${site.name} — Home`}><BrandLogo placement="footer" /></Link>
            <p className="footer-business-name">{site.name}</p>
            <p className="footer-descriptor">Premium home, property &amp; business assistance.</p>
            <p className="footer-tagline">{site.secondaryBrandLine}</p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">{navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>
          <section aria-labelledby="footer-services">
            <h2 className="footer-heading" id="footer-services">Services</h2>
            <ul className="footer-labels">{serviceCategories.map((category) => <li key={category.id}>{category.name}</li>)}</ul>
          </section>
          <section aria-labelledby="footer-contact">
            <h2 className="footer-heading" id="footer-contact">Contact</h2>
            <p className="footer-location">{siteConfig.CITY}</p>
            {contacts.length > 0 && <ul className="footer-links">{contacts.map((item) => <li key={item.label}><a href={item.href!}>{item.label}</a></li>)}</ul>}
            <Link className="footer-request" href={primaryCta.href} prefetch={false}>{primaryCta.label}<span aria-hidden="true"> →</span></Link>
            {socials.length > 0 && <nav className="footer-social" aria-label="Social accounts"><h2 className="footer-heading">Follow us</h2><ul className="footer-links">{socials.map((item) => <li key={item.label}><a href={item.href!} rel="noopener noreferrer">{item.label}</a></li>)}</ul></nav>}
          </section>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <nav aria-label="Legal"><Link href="/privacy-policy">Privacy Policy</Link></nav>
        </div>
      </Container>
    </footer>
  );
}
