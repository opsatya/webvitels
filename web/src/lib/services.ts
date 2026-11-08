/**
 * Services from the previous WebVitels site, regrouped by what the client is
 * trying to do. Mobile apps and SaaS are added because the work section shows them.
 */
export type ServiceGroup = {
  id: string;
  title: string;
  intro: string;
  items: { name: string; detail: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "build",
    title: "Build the product",
    intro: "From a marketing site to a platform with logins, roles and payments.",
    items: [
      { name: "Web development", detail: "Next.js and React front ends, Node APIs, and databases chosen for the job." },
      { name: "Mobile apps", detail: "iOS and Android apps from one React Native codebase." },
      { name: "SaaS platforms", detail: "Multi-tenant apps with roles, billing hooks and admin consoles." },
      { name: "E-commerce", detail: "Stores with clear product pages, secure checkout and order tracking." },
    ],
  },
  {
    id: "design",
    title: "Design how it looks and works",
    intro: "Interfaces people understand on the first visit.",
    items: [
      { name: "UI/UX design", detail: "User flows, wireframes and a component system before code." },
      { name: "Web design", detail: "Editorial, brand-led pages that still load fast." },
      { name: "Graphic design", detail: "Logos, social assets and visual identity." },
    ],
  },
  {
    id: "grow",
    title: "Get found and keep it fast",
    intro: "Speed and search work together. We measure both.",
    items: [
      { name: "SEO", detail: "Technical SEO, structured data, local search and content structure." },
      { name: "Performance audits", detail: "Core Web Vitals measured, explained and fixed." },
    ],
  },
  {
    id: "run",
    title: "Run it after launch",
    intro: "Sites and apps that stay up, patched and secure.",
    items: [
      { name: "Hosting and SSL", detail: "AWS, Vercel or your own Linux server, with HTTPS and monitoring." },
      { name: "WordPress and Shopify", detail: "Custom themes, fixes and speed work on existing sites." },
    ],
  },
];
