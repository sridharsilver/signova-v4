import { motion } from "framer-motion";
import { CompanyEvent } from "@/data/events";

interface EventCardProps {
  event: CompanyEvent;
  onClick: () => void;
  index: number;
}

export function EventCard({ event, onClick, index }: EventCardProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 10) * 0.05 }}
      onClick={onClick}
      className="text-left group bg-card rounded-3xl p-5 shadow-card hover:shadow-glow hover:-translate-y-1 transition relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-lime-gradient text-charcoal z-10 shadow-sm">
        {event.category}
      </div>
      <div className="relative aspect-[4/3] mb-5 rounded-2xl overflow-hidden bg-secondary w-full">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-bold mb-3 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          {event.date}
        </p>
      </div>
    </motion.button>
  );
}
