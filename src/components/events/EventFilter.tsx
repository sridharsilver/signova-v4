import { EventCategory, eventCategories } from "@/data/events";

interface EventFilterProps {
  activeCategory: EventCategory;
  onSelect: (category: EventCategory) => void;
}

export function EventFilter({ activeCategory, onSelect }: EventFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10 justify-center">
      {eventCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
            activeCategory === category
              ? "bg-primary text-primary-foreground shadow-card"
              : "bg-card border border-border hover:border-leaf text-card-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
