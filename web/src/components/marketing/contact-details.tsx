import { Mail, MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/social-icons";
import { links, site } from "@/lib/site";

export function ContactDetails() {
  const rows = [
    { Icon: Mail, label: "Email", value: site.email, href: links.mail },
    { Icon: Phone, label: "Phone", value: site.phone.display, href: links.tel },
    { Icon: WhatsAppIcon, label: "WhatsApp", value: "Message us", href: links.whatsapp(), external: true },
  ];

  return (
    <div className="flex flex-col">
      {rows.map(({ Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-4 border-t py-4 transition-colors"
        >
          <Icon className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-4">
            <span className="text-sm text-muted-foreground sm:w-24 sm:shrink-0">{label}</span>
            <span className="font-medium break-words underline-offset-4 group-hover:underline">{value}</span>
          </span>
        </a>
      ))}
      <div className="flex items-start gap-4 border-y py-4">
        <MapPin className="mt-1 size-4 shrink-0 text-muted-foreground" />
        <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-4">
        <span className="text-sm text-muted-foreground sm:w-24 sm:shrink-0">Studio</span>
        <address className="font-medium not-italic">
          {site.address.lines.join(", ")}
          <br />
          {site.address.city}, {site.address.region} {site.address.postalCode}
        </address>
        </span>
      </div>
    </div>
  );
}
