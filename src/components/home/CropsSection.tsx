import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { crops } from "@/data/crops";

export function CropsSection() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">
              Crop Solutions
            </div>
            <h2 className="text-4xl md:text-6xl font-bold max-w-2xl">
              Tailored science for{" "}
              <span className="text-gradient">every crop</span>
            </h2>
          </div>
          <Link
            to="/crops"
            className="inline-flex items-center gap-2 text-primary font-semibold"
          >
            View all crops <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {crops.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition duration-300">
                <Link
                  to="/crops"
                  className="absolute inset-0 z-0"
                  aria-label={`View all crop solutions for ${c.name}`}
                />
                {/* Background Image */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Nutrient Management Link */}
                <div className="absolute top-4 right-4 z-10">
                  <Link
                    to={`/crops/${c.slug}/nutrients`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur border border-white/10 text-[10px] font-semibold tracking-wide text-white/90 shadow-sm hover:bg-lime hover:text-charcoal transition-all duration-300"
                  >
                    <Leaf className="size-3.5" />
                    Nutrient Management
                  </Link>
                </div>

                {/* Content Overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-left z-10">
                  <span className="text-[10px] font-semibold text-white/65 tracking-wider mb-1 uppercase leading-snug">
                    {c.note}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                    {c.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
