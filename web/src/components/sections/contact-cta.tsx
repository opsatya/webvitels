import { ContactDetails } from "@/components/marketing/contact-details";
import { EnquiryForm } from "@/components/marketing/enquiry-form";
import { Container, Section, SectionHeading } from "@/components/marketing/primitives";

export function ContactCta() {
  return (
    <Section id="contact" tone="dark" aria-labelledby="contact-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            id="contact-title"
            title="Tell us what you're building."
            description="A rough idea is enough. We'll come back with questions, a rough timeline and next steps."
          />
          <ContactDetails />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm />
        </div>
      </Container>
    </Section>
  );
}
