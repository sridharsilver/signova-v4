import { usePageMeta } from "@/hooks/use-page-meta";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { CropsSection } from "@/components/home/CropsSection";
import { InnovationSection } from "@/components/home/InnovationSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { DistributorCtaSection } from "@/components/home/DistributorCtaSection";
import { KnowledgeSection } from "@/components/home/KnowledgeSection";

export default function HomePage() {
  usePageMeta({
    title: "Signova Group — Redefining Crop Nutrition with Science",
    description:
      "Trusted by 100,000+ farmers. Premium micronutrients, bio-stimulants & nano-tech crop solutions made in India.",
  });

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreviewSection />
      <ProductCategoriesSection />
      <CropsSection />
      <InnovationSection />
      <TestimonialsSection />
      <DistributorCtaSection />
      <KnowledgeSection />
    </>
  );
}
