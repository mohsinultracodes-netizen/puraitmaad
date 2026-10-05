"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";

export function NavigationItems() {
  const pathname = usePathname();
  return navigation.map((item) => (
    <li key={item.href}>
      {item.available ? (
        <Link href={item.href} className="navigation-link" aria-current={pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "page" : undefined}>{item.label}</Link>
      ) : (
        <span className="navigation-link unavailable" aria-disabled="true">
          {item.label}<span className="sr-only"> (coming soon)</span>
        </span>
      )}
    </li>
  ));
}
