import Link from "next/link";
import { navigation } from "@/content/site";

export function NavigationItems() {
  return navigation.map((item) => (
    <li key={item.href}>
      {item.available ? (
        <Link href={item.href} className="navigation-link">{item.label}</Link>
      ) : (
        <span className="navigation-link unavailable" aria-disabled="true">
          {item.label}<span className="sr-only"> (coming soon)</span>
        </span>
      )}
    </li>
  ));
}
