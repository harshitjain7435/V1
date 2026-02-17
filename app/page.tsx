import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SolutionsSection } from "@/components/SolutionsSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "FlexiSpace - Connect with flexible warehousing solutions or monetize your warehouse space.",
  openGraph: {
    title: "FlexiSpace | Flexible Warehousing Solutions",
    description:
      "Connect with verified warehouse spaces or monetize your unused capacity.",
    url: "https://warehousemarketplace.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <SolutionsSection />
      <CTASection />
    </>
  );
}
