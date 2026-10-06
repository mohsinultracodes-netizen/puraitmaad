import type { ServiceIconKey } from "@/content/services";

const paths: Record<ServiceIconKey, string> = {
  leaf: "M12 21v-9m0 5C4 17 3 12 3 8c5 0 9 3 9 9Zm0-5c0-6 3-9 8-9 0 5-2 9-8 9Z",
  wrench: "m14 6-8 8-3 1-1 4 3 3 4-1 1-3 8-8m-4-4 1-4a6 6 0 0 1 7 7l-4 1-4-4Z",
  house: "m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8",
  fridge: "M5 2h14v20H5ZM5 10h14M8 5v2m0 6v4",
  shield: "m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5l8-3Zm-4 10 3 3 5-6",
  office: "M5 22V3h14v19M2 22h20M8 7h2m4 0h2M8 11h2m4 0h2M10 22v-7h4v7",
  spark: "m13 2-9 12h7l-1 8 10-13h-8l1-7Z",
  water: "M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Zm-3 13a3 3 0 0 0 3 3",
  brush: "m14 3 7 7-9 9-7-7 9-9Zm-5 13-5 5-2-2 5-5",
  clean: "m16 2-6 12m-3-1 7 3-2 6H2l5-9Zm-1 9 3-7M19 12v6m-3-3h6",
  package: "m3 7 9-5 9 5v10l-9 5-9-5V7Zm0 0 9 5 9-5M12 12v10M7 4l10 5",
  clipboard: "M9 4H5v18h14V4h-4M9 2h6v5H9ZM8 12h8m-8 5h8",
  calendar: "M3 5h18v17H3ZM7 2v6m10-6v6M3 10h18M7 14h3m4 0h3m-10 4h3",
  truck: "M2 5h12v12H2ZM14 10h4l4 4v3h-8M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm13 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  gift: "M3 8h18v5H3ZM5 13v9h14v-9M12 8v14M12 8C3 8 5 0 9 3l3 5Zm0 0c9 0 7-8 3-5l-3 5Z",
  document: "M5 2h9l5 5v15H5ZM14 2v6h5M8 12h8m-8 4h8",
};

// Decorative by default when the neighboring service name supplies the label.
export function ServiceIcon({ name, label, className = "" }: { name: ServiceIconKey; label?: string; className?: string }) {
  return <svg className={`service-icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}><path d={paths[name]} /></svg>;
}
