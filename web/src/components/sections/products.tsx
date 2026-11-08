import { Check, Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { Container, Section, SectionHeading, StatusPill } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";

/**
 * LocalKart, told through its core flow. The mini screens are coded, not
 * screenshots, and use LocalKart's own marigold (#BF5900) so the product keeps
 * its identity inside our site. Shop names and items are illustrative.
 */
const MARIGOLD = "#BF5900";

const steps = [
  {
    title: "A customer posts what they need",
    body: "No catalogue to scroll. They type a list and it goes out to shops nearby.",
  },
  {
    title: "Nearby shops send offers",
    body: "Shopkeepers reply with a price and delivery time. Requests close after 15 minutes.",
  },
  {
    title: "One tap makes it an order",
    body: "Accepting an offer locks the price and items. Payment is cash or UPI, directly to the shop.",
  },
];

export function Products() {
  return (
    <Section id="products" tone="white" aria-labelledby="products-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="products-title"
              kicker="Our own products"
              title="We build products we have to run ourselves."
              description="Running our own apps keeps us honest about what breaks in production. LocalKart is the first: a customer app, a shopkeeper app, an admin console and a real-time API."
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <StatusPill status="In build" />
              <span className="text-sm text-muted-foreground">Expo, Express, MongoDB, Socket.IO</span>
            </div>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/work#localkart">Read the case study</Link>
            </Button>
          </div>

          <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-5 rounded-xl bg-paper p-4 sm:p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-semibold" style={{ color: MARIGOLD }}>
                    {i + 1}
                  </span>
                  <h3 className="font-sans text-[0.9375rem] leading-snug font-semibold">{s.title}</h3>
                </div>
                <MiniScreen step={i} />
                <p className="text-[0.9375rem] text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-medium">Next on the bench: a platform for fitness studios</p>
          <p className="text-[0.9375rem] text-muted-foreground">
            Members, trainers, plans and front desk in one place. Currently in architecture.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function MiniScreen({ step }: { step: number }) {
  return (
    <div aria-hidden className="flex min-h-44 flex-col gap-2 rounded-lg border bg-white p-3 text-[0.8125rem] shadow-sm">
      {step === 0 && (
        <>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3.5" /> Within 2 km
          </p>
          <div className="rounded-md bg-paper p-2.5 leading-relaxed">
            Atta 5 kg, toor dal 1 kg, milk 2 L
          </div>
          <div className="mt-auto rounded-md py-2 text-center font-semibold text-white" style={{ background: MARIGOLD }}>
            Send to nearby shops
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-3.5" /> 3 offers so far
          </p>
          {[
            ["Shop A", "₹612", "20 min"],
            ["Shop B", "₹598", "35 min"],
            ["Shop C", "₹640", "15 min"],
          ].map(([name, price, eta], i) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md border px-2.5 py-2"
              style={i === 1 ? { borderColor: MARIGOLD } : undefined}
            >
              <span className="font-medium">{name}</span>
              <span className="text-muted-foreground">
                {price}, {eta}
              </span>
            </div>
          ))}
        </>
      )}
      {step === 2 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: MARIGOLD }}>
            <Check className="size-5" />
          </span>
          <p className="font-semibold">Order placed</p>
          <p className="text-muted-foreground">Shop B, ₹598, pay on delivery</p>
        </div>
      )}
    </div>
  );
}
