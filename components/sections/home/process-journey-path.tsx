/** Cards mask these quiet curves; only the gaps reveal the connected journey. */
export function ProcessJourneyPath() {
  const variants = [
    { name: "desktop", viewBox: "0 0 1200 130", d: "M100 65 C180 28 270 28 350 65 S510 102 600 65 S760 28 850 65 S1010 102 1100 65" },
    { name: "mobile", viewBox: "0 0 350 1700", d: "M175 0 C150 170 200 340 175 510 S150 850 175 1020 S200 1360 175 1700" },
  ];
  return variants.map(({ name, viewBox, d }) => <svg key={name} className={`hp-process-path hp-process-path-${name}`} viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false" pointerEvents="none">
    <path d={d} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
  </svg>);
}
