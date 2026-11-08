import { LogoWordmark } from "@/components/brand/logo";
import { Container, Section, SectionHeading } from "@/components/marketing/primitives";
import { site } from "@/lib/site";

const facts = [
  { label: "Based in", value: `${site.address.city}, Pune` },
  { label: "What we build", value: "Websites, mobile apps, SaaS platforms and online stores" },
  { label: "Stack", value: "React, Next.js, React Native, Node, MongoDB and PostgreSQL on AWS" },
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
            description="No account managers in between. The engineers who build your product are on your calls, in your WhatsApp group and responsible for it after launch."
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

        <figure className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8 lg:self-end">
          <div className="grid aspect-square w-full max-w-60 place-items-center rounded-full border bg-paper">
            <LogoWordmark className="text-lg" />
          </div>
          <figcaption>
            <p className="text-title">{site.name}</p>
            <p className="text-muted-foreground">Product studio, Pune</p>
            <p className="mt-3 max-w-md text-[0.9375rem] text-muted-foreground">
              Websites, mobile apps and SaaS platforms, designed and built by the same small team and checked
              against Core Web Vitals on every release.
            </p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
