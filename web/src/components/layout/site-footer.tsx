import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/brand/social-icons";
import { serviceGroups } from "@/lib/services";
import { links, nav, site } from "@/lib/site";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.social.github, Icon: GitHubIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "X", href: site.social.x, Icon: XIcon },
];

export function SiteFooter() {
  const services = serviceGroups.flatMap((g) => g.items.map((i) => i.name)).slice(0, 7);

  return (
    <footer className="dark bg-background text-foreground">
      <div className="container-x grid gap-12 border-t border-border py-16 md:grid-cols-12 md:py-20">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Logo />
          <p className="max-w-xs text-muted-foreground">
            A product studio in Pune building websites, mobile apps and SaaS platforms.
          </p>
          <ul className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterList title="Studio" className="md:col-span-2">
          {[...nav, { label: "Contact", href: "/contact" }].map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="hover:text-foreground">
                {n.label}
              </Link>
            </li>
          ))}
        </FooterList>

        <FooterList title="Services" className="md:col-span-3">
          {services.map((s) => (
            <li key={s}>
              <Link href="/#services" className="hover:text-foreground">
                {s}
              </Link>
            </li>
          ))}
        </FooterList>

        <FooterList title="Get in touch" className="md:col-span-3">
          <li>
            <a href={links.mail} className="hover:text-foreground">
              {site.email}
            </a>
          </li>
          <li>
            <a href={links.tel} className="hover:text-foreground">
              {site.phone.display}
            </a>
          </li>
          <li>
            <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              WhatsApp
            </a>
          </li>
          <li className="pt-2">
            <address className="not-italic">
              {site.address.lines.join(", ")}
              <br />
              {site.address.city} {site.address.postalCode}
            </address>
          </li>
        </FooterList>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} WebVitels. All rights reserved.</p>
        <p>Built with Next.js and checked against Core Web Vitals.</p>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="font-sans text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem] text-muted-foreground">{children}</ul>
    </div>
  );
}
