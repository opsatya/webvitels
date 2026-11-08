import type { Metadata } from "next";

import { ContactDetails } from "@/components/marketing/contact-details";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
import { Container, Section, SectionHeading } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a website, mobile app or SaaS project with WebVitels in Pune. Email, phone, WhatsApp or the enquiry form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            as="h1"
            title="Start a project"
            description="Tell us what you want to build. A rough idea is enough; we'll come back with questions, a rough timeline and next steps."
          />
          <ContactDetails />
        </div>
        <div className="rounded-xl border bg-white p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
          <EnquiryForm />
        </div>
      </Container>
    </Section>
  );
}
