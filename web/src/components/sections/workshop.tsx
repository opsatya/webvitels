import { cn } from "cn";

import { Container, Section, SectionHeading } from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/reveal";
import { buildLog, formatDate } from "@/lib/build-log";

const typeTone: Record<string, string> = {
  feat: "text-pass",
  fix: "text-warn",
  chore: "text-muted-foreground",
  Shipped: "text-pass",
};

/** Splits "feat(api): message" into its type, scope and message for display. */
function parse(message: string) {
  const m = message.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.*)$/);
  return m ? { type: m[1], scope: m[2], text: m[3] } : { type: undefined, scope: undefined, text: message };
}

export function Workshop() {
  const projects = new Set(buildLog.map((c) => c.project)).size;

  return (
    <Section id="workshop" tone="dark" aria-labelledby="workshop-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="workshop-title"
            kicker="From our repositories"
            title="Work in progress, in public."
            description="These are real commits from the last few weeks. Small changes, reviewed and shipped often, is how every project here gets built, including yours."
          />
          <p className="mt-8 text-sm text-muted-foreground">
            {buildLog.length} recent changes across {projects} projects
          </p>
        </div>

        <ol className="flex flex-col lg:col-span-7" aria-label="Recent commits">
          {buildLog.map((c, i) => {
            const { type, scope, text } = parse(c.message);
            return (
              <li key={`${c.date}-${i}`}>
                <Reveal delay={Math.min(i * 0.05, 0.35)} y={12}>
                  <div className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1 border-t py-4 sm:grid-cols-[5rem_9rem_1fr] sm:gap-x-6">
                    <time dateTime={c.date} className="text-sm text-muted-foreground">
                      {formatDate(c.date)}
                    </time>
                    <p className="text-sm font-medium">{c.project}</p>
                    <p className="col-span-2 font-mono text-[0.875rem] leading-relaxed text-foreground/85 sm:col-span-1">
                      {type && (
                        <span className={cn(typeTone[type] ?? "text-muted-foreground")}>
                          {type}
                          {scope && <span className="text-muted-foreground">({scope})</span>}
                          {": "}
                        </span>
                      )}
                      {text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
