import { ContactCta } from "@/components/sections/contact-cta";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Studio } from "@/components/sections/studio";
import { Workshop } from "@/components/sections/workshop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Workshop />
      <Services />
      <Products />
      <Process />
      <Studio />
      <ContactCta />
    </>
  );
}
