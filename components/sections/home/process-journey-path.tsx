/** One unbroken curve per responsive composition; no arrow controls or animation. */
export function ProcessJourneyPath() {
  const variants = [
    { name: "desktop", viewBox: "0 0 1200 220", d: "M90 115 C245 12 395 12 585 113 S916 214 1115 108" },
    { name: "tablet", viewBox: "0 0 720 680", d: "M80 118 C175 25 211 186 331 121 S510 34 603 115 C710 190 719 313 610 370 S170 370 230 465 S366 535 485 475" },
    { name: "mobile", viewBox: "0 0 350 1400", d: "M175 90 C285 127 327 207 294 285 S33 401 105 450 S323 595 285 661 S36 792 110 830 S323 971 280 1058 S60 1190 175 1310" },
  ];
  return variants.map(({ name, viewBox, d }) => <svg key={name} className={`hp-process-path hp-process-path-${name}`} viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false" pointerEvents="none">
    <path d={d} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
  </svg>);
}
