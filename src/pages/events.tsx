import { PageHero } from "@/components/layout/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";
import { EventGallery } from "@/components/events/EventGallery";
import heroImage from "@/assets/images/heros/hero_innovation.png"; // reusing a hero image

function EventsPage() {
  usePageMeta({
    title: "Company Events — Signova Group",
    description: "Explore Signova Group's latest conferences, exhibitions, and farmer meetings.",
  });

  return (
    <>
      <PageHero
        eyebrow="Media & Gallery"
        title="Company Events"
        subtitle="Explore our latest conferences, exhibitions, and farmer meetings across the country."
        image={heroImage}
      />
      <EventGallery />
    </>
  );
}

export default EventsPage;
