import { cn } from "cn";

/**
 * Mark: a pulse trace that resolves into a pass tick, inside a rounded square.
 * The tick stroke uses the pass colour; everything else inherits currentColor.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="currentColor" />
      <path
        d="M6 17h4.5l2.5-6 3.5 12 2.5-6"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="[.dark_&]:stroke-ink"
      />
      <path
        d="M19 17l2.5 2.5L27 13"
        fill="none"
        stroke="var(--pass)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.375rem] font-semibold tracking-[-0.03em] [font-stretch:85%]">
        webvitels
      </span>
    </span>
  );
}
