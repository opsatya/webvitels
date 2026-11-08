import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container, Section, SectionHeading, StatusPill } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites, mobile apps and SaaS platforms built by WebVitels, including Xumo Fitness and our own product, LocalKart.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40" spacing={false}>
        <Container className="pb-12 md:pb-16">
          <SectionHeading
            as="h1"
            title="Work"
            description="Client projects, our own products and what is on the bench right now. Every status here is current."
          />
        </Container>
      </Section>

      <Section spacing={false} className="pb-24 md:pb-32">
        <Container className="flex flex-col">
          {work.map((w) => (
            <article
              key={w.id}
              id={w.id}
              aria-labelledby={`${w.id}-title`}
              className="grid scroll-mt-24 gap-8 border-t py-12 md:py-16 lg:grid-cols-12 lg:gap-10"
            >
              <div className="flex flex-col gap-5 lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <StatusPill status={w.status} />
                  <span className="text-sm text-muted-foreground">{w.kind}</span>
                </div>
                <h2 id={`${w.id}-title`} className="text-section">
                  {w.name}
                </h2>
                <p className="text-lead">{w.summary}</p>
                <p className="text-muted-foreground">{w.detail}</p>
                {w.note && <p className="text-sm font-medium">{w.note}</p>}
                <ul aria-label="Built with" className="flex flex-wrap gap-2 pt-1">
                  {w.stack.map((s) => (
                    <li key={s} className="rounded-md border px-2.5 py-1 text-sm text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
                {w.href && (
                  <Button asChild variant="outline" className="mt-2 self-start">
                    <a href={w.href} target="_blank" rel="noopener noreferrer">
                      {w.href.includes("github.com") ? "View code on GitHub" : "Visit the live site"}
                      <ArrowUpRight />
                    </a>
                  </Button>
                )}
              </div>

              <div className="lg:col-span-7">
                {w.image ? (
                  <div
                    className={`relative overflow-hidden rounded-xl border bg-white ${w.image.tightCrop ? "aspect-square sm:aspect-[5/4]" : "aspect-[16/10]"}`}
                  >
                    <Image
                      src={w.image.src}
                      alt={w.image.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: w.image.position }}
                    />
                  </div>
                ) : (
                  <div className="dark flex aspect-[16/10] flex-col justify-end rounded-xl bg-background p-6 text-foreground sm:p-8">
                    <p className="text-sm text-muted-foreground">No public screens yet</p>
                    <p className="mt-2 max-w-md font-display text-2xl font-semibold tracking-tight">
                      {w.status === "Architecture"
                        ? "Data model and system design are done. Interface work starts next."
                        : "The API is in active development. Screens follow the first release."}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading title="Have a project like these?" />
          <Button asChild size="lg">
            <Link href="/contact">Start a project</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
