import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import { VitalsMonitor } from "@/components/marketing/vitals-monitor";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/lib/site";

const stack = ["Next.js", "React", "React Native", "Node.js", "MongoDB", "PostgreSQL", "AWS"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="container-x grid gap-12 pt-28 pb-16 md:pt-36 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-40 lg:pb-24">
        <div className="lg:col-span-7">
          {/* No entrance animation on the headline: it is the LCP element. */}
          <p className="text-kicker text-muted-foreground">Product studio in Pune, India</p>

          <h1 id="hero-title" className="text-display mt-6">
            Software built to pass the vitals.
          </h1>

          <p className="text-lead mt-7 max-w-xl text-muted-foreground">
              We design and build websites, mobile apps and SaaS platforms. Before anything ships,
              we check it against the numbers Google uses to judge speed and stability. The panel
              here is doing that to this page, live.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/work">See our work</Link>
            </Button>
          </div>
        </div>

        <Reveal delay={0.15} y={16} className="lg:col-span-5">
          <VitalsMonitor />
        </Reveal>
      </div>

      <div className="container-x pb-14 md:pb-20">
        <div className="flex flex-col gap-3 border-t pt-6 md:flex-row md:items-baseline md:gap-8">
          <p className="shrink-0 text-sm font-medium">What we build with</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-[0.9375rem] text-muted-foreground">
            {stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
