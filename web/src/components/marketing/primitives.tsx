import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

type Tone = "light" | "dark" | "white";

const toneClass: Record<Tone, string> = {
  light: "bg-background text-foreground",
  dark: "dark bg-background text-foreground",
  white: "bg-white text-foreground",
};

/** Page section with consistent vertical rhythm. `tone="dark"` scopes dark tokens. */
export function Section({
  tone = "light",
  spacing = true,
  className,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; spacing?: boolean }) {
  return (
    <section
      className={cn("relative", toneClass[tone], spacing && "section-y", className)}
      {...props}
    />
  );
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-x", className)} {...props} />;
}

/**
 * Heading block. `kicker` is a short sentence-case line that adds information
 * (never a decorative label); omit it when the heading speaks for itself.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  id,
  className,
  as: Heading = "h2",
}: {
  kicker?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {kicker && <p className="text-kicker text-muted-foreground">{kicker}</p>}
      <Heading id={id} className="text-section">
        {title}
      </Heading>
      {description && <p className="text-lead max-w-xl text-muted-foreground">{description}</p>}
    </div>
  );
}

const statusTone = {
  Live: "bg-pass",
  "In build": "bg-warn",
  Architecture: "bg-sky-500",
  Prototype: "bg-foreground/40",
} as const;

/** Project status with a coloured dot. Colour mirrors the vitals ratings. */
export function StatusPill({
  status,
  className,
}: {
  status: keyof typeof statusTone;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span
        aria-hidden
        className={cn("size-2 rounded-full", statusTone[status], status === "In build" && "animate-pulse")}
      />
      {status}
    </span>
  );
}
