import { useState, useMemo } from "react";
import { EventFilter } from "./EventFilter";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { companyEvents, EventCategory } from "@/data/events";
import { AnimatePresence, motion } from "framer-motion";

export function EventGallery() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return companyEvents;
    return companyEvents.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  const selectedEvent = useMemo(() => {
    return companyEvents.find((evt) => evt.id === selectedEventId) || null;
  }, [selectedEventId]);

  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <EventFilter
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, idx) => (
              <EventCard
                key={event.id}
                event={event}
                index={idx}
                onClick={() => setSelectedEventId(event.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            No events found for this category.
          </div>
        )}

        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEventId(null)}
        />
      </div>
    </section>
  );
}
