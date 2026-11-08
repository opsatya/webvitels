/**
 * Single source of truth for studio details.
 * Address, phone, email and social handles come from the previous webvitels.com
 * structured data (client/src/utils/seoUtils.js). Verify social URLs before launch.
 */
export const site = {
  name: "WebVitels",
  url: "https://webvitels.com",
  description:
    "WebVitels is a product studio in Pune. We design and build websites, mobile apps and SaaS platforms, and check every release against Core Web Vitals.",
  email: "webvitels@gmail.com",
  phone: { display: "+91 77090 03064", e164: "+917709003064", wa: "917709003064" },
  address: {
    lines: ["98/4 Sun City, Charholi"],
    city: "Pimpri Chinchwad",
    region: "Maharashtra",
    postalCode: "412105",
    country: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/webvitels",
    instagram: "https://www.instagram.com/webvitels",
    x: "https://www.twitter.com/webvitels",
    github: "https://github.com/opsatya",
  },
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Process", href: "/#process" },
  { label: "Studio", href: "/#studio" },
] as const;

export const primaryCta = { label: "Start a project", href: "/contact" } as const;

export const links = {
  tel: `tel:${site.phone.e164}`,
  mail: `mailto:${site.email}`,
  whatsapp: (text = "Hi WebVitels, I'd like to talk about a project.") =>
    `https://wa.me/${site.phone.wa}?text=${encodeURIComponent(text)}`,
};
