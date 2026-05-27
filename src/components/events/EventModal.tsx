import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyEvent } from "@/data/events";

interface EventModalProps {
  event: CompanyEvent | null;
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-3xl border-0 bg-transparent shadow-2xl">
        {event && (
          <div className="bg-card flex flex-col">
            <div className="relative w-full aspect-video bg-black">
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-lime-gradient text-charcoal">
                  {event.category}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {event.date}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
                {event.title}
              </DialogTitle>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
