import Link from "next/link";

import { Container, Section, SectionHeading } from "@/components/marketing/primitives";
import { WorkTile } from "@/components/marketing/work-tile";
import { Button } from "@/components/ui/button";
import { workById } from "@/lib/work";

/**
 * Bento sized by importance, not by symmetry:
 *  - Xumo (live client work) leads, LocalKart (our product) runs tall beside it
 *  - two text tiles for work without public screens
 *  - two smaller screenshots close the grid
 */
export function SelectedWork() {
  return (
    <Section id="work" tone="white" aria-labelledby="work-title">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-title"
            kicker="Client work, our own products, and what is on the bench"
            title="Selected work"
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/work">All projects</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <WorkTile
            work={workById("xumo")}
            className="md:col-span-2 lg:col-span-8"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
          <WorkTile
            work={workById("localkart")}
            className="md:col-span-2 lg:col-span-4 lg:row-span-2"
            imageClassName="aspect-square sm:aspect-[5/4] lg:aspect-auto lg:flex-1 lg:min-h-[28rem]"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <WorkTile work={workById("fitness-platform")} variant="ink" className="lg:col-span-4" />
          <WorkTile work={workById("legalbridge")} variant="paper" className="lg:col-span-4" />
          <WorkTile
            work={workById("algo-trading")}
            className="lg:col-span-6"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          />
          <WorkTile
            work={workById("cinemasync")}
            className="lg:col-span-6"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      </Container>
    </Section>
  );
}
