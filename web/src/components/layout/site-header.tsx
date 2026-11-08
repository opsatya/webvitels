"use client";

import { cn } from "cn";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links, nav, primaryCta, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-border bg-paper/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-18">
        <Link href="/" aria-label="WebVitels home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.9375rem] font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex md:h-10 md:px-4">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full bg-paper p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="flex h-16 items-center px-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
          <Logo />
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-4">
          <ul className="flex flex-col">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href} className="border-b">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block py-4 font-display text-3xl font-semibold tracking-tight [font-stretch:85%]"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t p-5">
          <SheetClose asChild>
            <Button asChild size="lg" className="w-full">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          </SheetClose>
          <Button asChild variant="outline" size="lg" className="w-full">
            <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Message us on WhatsApp
            </a>
          </Button>
          <p className="pt-1 text-sm text-muted-foreground">
            <a href={links.mail} className="underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
