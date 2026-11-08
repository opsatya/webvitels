import { Container, Section, SectionHeading } from "@/components/marketing/primitives";

/** A real sequence, so numbering is earned here. */
const steps = [
  {
    title: "Understand",
    body: "A call to learn the business, the people who will use it, and what success looks like in numbers.",
  },
  {
    title: "Design",
    body: "Flows and screens you can click through before any code. Changes are cheap at this stage.",
  },
  {
    title: "Build",
    body: "Small, reviewed changes on a staging link you can open any day. No disappearing for six weeks.",
  },
  {
    title: "Measure",
    body: "We check LCP, INP and CLS against Google's thresholds, plus accessibility and SEO basics, before launch.",
  },
  {
    title: "Run",
    body: "Hosting, SSL, backups and fixes after launch, so the site stays as fast as the day it shipped.",
  },
];

export function Process() {
  return (
    <Section id="process" aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          title="How a project runs"
          description="The same five steps whether it is a five-page site or a SaaS platform. Only the length of each step changes."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`flex flex-col gap-4 p-6 lg:min-h-72 lg:p-7 ${i === 3 ? "bg-white" : "bg-background"}`}
            >
              <span className="font-display text-sm font-semibold text-muted-foreground tabular-nums">
                Step {i + 1}
              </span>
              <h3 className="text-title">{s.title}</h3>
              <p className="text-[0.9375rem] text-muted-foreground">{s.body}</p>
              {i === 3 && (
                <ul aria-label="Thresholds we test against" className="mt-auto flex flex-col gap-1.5 pt-2 text-sm">
                  {[
                    ["LCP", "under 2.5 s"],
                    ["INP", "under 200 ms"],
                    ["CLS", "under 0.1"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center gap-2">
                      <span aria-hidden className="size-2 rounded-full bg-pass" />
                      <span className="font-medium">{k}</span>
                      <span className="text-muted-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
