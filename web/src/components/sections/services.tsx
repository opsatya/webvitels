import Link from "next/link";

import { Container, Section, SectionHeading } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { serviceGroups } from "@/lib/services";

export function Services() {
  return (
    <Section id="services" aria-labelledby="services-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="services-title"
            title="What we do"
            description="One team from first sketch to running in production, so nothing gets lost between a designer, a developer and a hosting company."
          />
          <Button asChild variant="outline" className="mt-8">
            <Link href="/contact">Ask about a project</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-14 lg:col-span-8 lg:gap-16">
          {serviceGroups.map((g) => (
            <div key={g.id}>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-title">{g.title}</h3>
                <p className="text-[0.9375rem] text-muted-foreground sm:text-right">{g.intro}</p>
              </div>
              <ul className="mt-5 border-b">
                {g.items.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-1 border-t py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
