import { links, site } from "@/lib/site";

export const projectTypes = [
  { id: "website", label: "Website" },
  { id: "mobile-app", label: "Mobile app" },
  { id: "saas", label: "SaaS platform" },
  { id: "ecommerce", label: "Online store" },
  { id: "speed-seo", label: "Speed or SEO fix" },
  { id: "not-sure", label: "Not sure yet" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s-]{10,15}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (input.name.trim().length < 2) e.name = "Enter your name so we know who to reply to.";
  if (!EMAIL.test(input.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (input.phone.trim() && !PHONE.test(input.phone.trim()))
    e.phone = "Enter a phone number with 10 to 15 digits, or leave it blank.";
  if (!projectTypes.some((t) => t.id === input.type)) e.type = "Choose what you want to build.";
  if (input.message.trim().length < 10) e.message = "Add a sentence or two about the project.";
  if (input.message.length > 2000) e.message = "Keep the message under 2,000 characters.";
  return e;
}

/** Composes the enquiry as text for WhatsApp and email hand-off. */
export function composeEnquiry(input: EnquiryInput) {
  const type = projectTypes.find((t) => t.id === input.type)?.label ?? input.type;
  const phone = input.phone.trim();
  const text = [
    "New project enquiry",
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    `Project: ${type}`,
    "",
    input.message.trim(),
  ].join("\n");

  return {
    whatsappUrl: links.whatsapp(text),
    mailUrl: `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${type}`)}&body=${encodeURIComponent(text)}`,
  };
}
