import Link from "next/link";
import { ArrowUpRight, Globe, Layers, Smartphone, Sparkles } from "lucide-react";
import { cn } from "cn";

const services = [
  {
    icon: Globe,
    title: "Websites & Web Apps",
    desc: "Custom marketing sites, web applications, and customer portals.",
    tag: "Next.js · React",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform iOS and Android apps with native-level performance.",
    tag: "React Native",
  },
  {
    icon: Layers,
    title: "SaaS Platforms & APIs",
    desc: "Multi-tenant platforms with auth, subscriptions, and cloud backends.",
    tag: "Node · Postgres",
  },
  {
    icon: Sparkles,
    title: "UI/UX & Product Design",
    desc: "Intuitive user journeys, design systems, and clickable prototypes.",
    tag: "Figma",
  },
];

export function StudioCard({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "flex flex-col rounded-xl border bg-white shadow-[0_1px_0_rgb(15_26_23/0.04),0_24px_48px_-24px_rgb(15_26_23/0.18)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b px-6 py-5 sm:px-7">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">WebVitels Studio</p>
          <p className="text-sm text-muted-foreground">Digital product engineering & design</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-paper/80 px-3.5 py-1.5 text-xs font-medium text-foreground">
          <span className="size-2 rounded-full bg-pass" />
          <span>Available for projects</span>
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {services.map((s) => (
          <li
            key={s.title}
            className="flex items-start gap-4 px-6 py-4.5 sm:px-7 transition-colors hover:bg-paper/40"
          >
            <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-paper text-foreground">
              <s.icon className="size-5 text-foreground/80" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-base font-medium text-foreground">{s.title}</p>
                <span className="shrink-0 rounded-md bg-paper px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {s.tag}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border bg-paper/40 px-6 py-4.5 sm:px-7">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Pune, India</span>
          <span>•</span>
          <span>Working worldwide</span>
        </div>
        <Link
          href="/#services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
        >
          <span>Explore services</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </figure>
  );
}
