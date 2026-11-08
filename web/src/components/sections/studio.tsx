import Image from "next/image";

import { Container, Section, SectionHeading } from "@/components/marketing/primitives";

/**
 * Facts come from the founder's portfolio (satya-portfolio/app/_data).
 * Add team members to `people` as real profiles become available.
 */
const people = [
  {
    name: "Satyajeet Singh",
    role: "Full-stack engineer",
    image: "/images/work/satya.jpeg",
    bio: "Builds across the stack: React and React Native front ends, Node and Fastify APIs, PostgreSQL and MongoDB, deployed on AWS.",
  },
];

const facts = [
  { label: "Based in", value: "Pimpri Chinchwad, Pune" },
  { label: "Recognition", value: "2nd runner-up, TalentFarm.ai hackathon at DYPDPU" },
  { label: "Education", value: "MCA, Savitribai Phule Pune University" },
  { label: "Working with", value: "Local businesses, startups and founders" },
];

export function Studio() {
  return (
    <Section id="studio" tone="white" aria-labelledby="studio-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            id="studio-title"
            title="A small studio. You talk to the people writing the code."
            description="No account managers in between. The engineer who builds your product is on your calls, in your WhatsApp group and responsible for it after launch."
          />
          <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="border-t py-4">
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          {people.map((p) => (
            <figure key={p.name} className="flex flex-col gap-5">
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl bg-paper">
                <Image
                  src={p.image}
                  alt={`Portrait of ${p.name}`}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption>
                <p className="text-title">{p.name}</p>
                <p className="text-muted-foreground">{p.role}</p>
                <p className="mt-3 max-w-md text-[0.9375rem] text-muted-foreground">{p.bio}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
