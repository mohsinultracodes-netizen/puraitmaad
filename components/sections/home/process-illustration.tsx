import type { ReactNode } from "react";

/** Shared primitives keep the original interface objects in one visual family. */
function Panel({ x, y, width, height, dark = false, children }: {
  x: number; y: number; width: number; height: number; dark?: boolean; children?: ReactNode;
}) {
  return <g transform={`translate(${x} ${y})`} className="hp-process-floating-panel">
    <rect width={width} height={height} rx="7" fill={dark ? "var(--forest)" : "var(--surface-elevated)"} stroke={dark ? "var(--forest)" : "var(--border)"} strokeWidth=".7" />
    {children}
  </g>;
}

function Lines({ x = 14, y = 18, width = 58 }: { x?: number; y?: number; width?: number }) {
  return <g stroke="#b9c0b5" strokeWidth="2" strokeLinecap="round">
    <path d={`M${x} ${y}h${width}M${x} ${y + 10}h${width * .72}M${x} ${y + 20}h${width * .86}`} />
  </g>;
}

function Check({ x, y, radius = 10, dark = true }: { x: number; y: number; radius?: number; dark?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={radius} fill={dark ? "var(--forest)" : "#e7ece1"} />
    <path d={`m${-radius * .42} 0 ${radius * .29} ${radius * .3} ${radius * .58} ${-radius * .64}`} stroke={dark ? "var(--surface-elevated)" : "var(--forest)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

/** Decorative: the stage text supplies meaning without claims inside these interfaces. */
export function ProcessIllustration({ step }: { step: number }) {
  return <svg className="hp-process-illustration" viewBox="0 0 240 190" fill="none" aria-hidden="true" focusable="false">
    {step === 0 && <>
      <g transform="rotate(-5 117 91)"><Panel x={42} y={35} width={140} height={89}>
        <circle cx="17" cy="17" r="4" fill="var(--accent)" /><Lines x={29} y={17} width={74} />
        <path d="M15 60h61" stroke="#d5d9d0" strokeWidth="2" strokeLinecap="round" />
        <rect x="97" y="55" width="28" height="20" rx="4" fill="var(--forest)" />
        <path d="m106 65 11-5-4 11-2-5-5-1Zm5 1 6-6" stroke="var(--surface-elevated)" strokeWidth="1" strokeLinejoin="round" />
      </Panel></g>
      <Panel x={82} y={108} width={121} height={33} dark><circle cx="16" cy="16" r="3" fill="#c7d3bf" /><path d="M27 13h51M27 20h36" stroke="#dce4d9" strokeWidth="1.5" strokeLinecap="round" /><path d="m101 17 6-3-2 7-2-3-2-1" fill="var(--surface-elevated)" /></Panel>
    </>}
    {step === 1 && <>
      <g transform="rotate(-8 64 100)"><Panel x={29} y={63} width={61} height={78}><circle cx="30" cy="24" r="10" fill="#e6e9e0" /><Lines x={14} y={47} width={33} /></Panel></g>
      <g transform="rotate(7 178 92)"><Panel x={151} y={49} width={60} height={78}><circle cx="30" cy="24" r="10" fill="#e6e9e0" /><Lines x={14} y={47} width={32} /></Panel></g>
      <Panel x={82} y={34} width={79} height={105}>
        <circle cx="39" cy="29" r="15" fill="#e5eadf" /><circle cx="39" cy="26" r="5" stroke="#95a58e" /><path d="M29 38c2-8 18-8 20 0" stroke="#95a58e" strokeLinecap="round" />
        <Lines x={18} y={60} width={43} /><Check x={67} y={97} radius={12} />
      </Panel>
    </>}
    {step === 2 && <>
      <Panel x={39} y={28} width={97} height={39}>
        <rect x="12" y="9" width="22" height="22" rx="3" fill="#edf0e7" />
        <path d="M12 15h22M18 7v5M28 7v5" stroke="#91a18a" strokeWidth="1" /><path d="M18 21h3M25 21h3M18 26h3" stroke="#91a18a" strokeWidth="1.5" />
        <path d="M45 15h36M45 24h25" stroke="#b9c0b5" strokeWidth="1.5" strokeLinecap="round" />
      </Panel>
      <g className="hp-process-floating-panel">
        {[{x:52,h:46},{x:77,h:27},{x:102,h:63},{x:127,h:37},{x:152,h:52}].map(({x,h},i) => <rect key={x} x={x} y={135-h} width="16" height={h} rx="3" fill={i===2 ? "var(--forest)" : i===0 || i===4 ? "#718477" : "#bcc8b3"} />)}
      </g>
      <Panel x={170} y={33} width={39} height={39}>
        <circle cx="19.5" cy="19.5" r="12" fill="var(--forest)" />
        <path d="M13 14h13v10h-4l-4 4v-4h-5z" stroke="var(--surface-elevated)" strokeWidth="1" strokeLinejoin="round" />
        <path d="M17 18h5M17 21h3" stroke="var(--surface-elevated)" strokeWidth="1" strokeLinecap="round" />
      </Panel>
    </>}
    {step === 3 && <>
      <g transform="rotate(6 130 87)"><Panel x={83} y={35} width={91} height={109}><Lines width={59} /></Panel></g>
      <g transform="rotate(-4 110 86)"><Panel x={58} y={30} width={99} height={113}>
        <Lines x={16} y={23} width={65} /><rect x="16" y="65" width="65" height="26" rx="4" fill="#edf0e7" /><path d="M25 74h26M25 81h18" stroke="#a8b49e" strokeWidth="1.5" strokeLinecap="round" />
      </Panel></g>
      <Check x={157} y={116} radius={22} />
    </>}
    {step === 4 && <>
      <g transform="rotate(-5 110 80)"><Panel x={48} y={38} width={129} height={89} dark>
        <path d="m48 41 12 12 24-27" stroke="#f8f6f0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M43 70h43" stroke="#b9cbb2" strokeWidth="1.5" strokeLinecap="round" />
      </Panel></g>
      <Panel x={116} y={110} width={89} height={36}>
        <Check x={16} y={18} radius={7} dark={false} /><path d="M31 14h39M31 22h27" stroke="#b9c0b5" strokeWidth="1.5" strokeLinecap="round" /><circle cx="78" cy="7" r="2" fill="var(--logo-gold)" />
      </Panel>
    </>}
  </svg>;
}
