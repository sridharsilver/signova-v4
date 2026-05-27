import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { stories } from "@/data/home";

export function TestimonialsSection() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">
            Farmer Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            Yields that speak{" "}
            <span className="text-gradient">for themselves</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition aspect-[3/4]"
            >
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
                <Quote className="size-8 text-lime opacity-80" />
                <div>
                  <p className="text-base mb-5 leading-relaxed">"{s.quote}"</p>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-sm text-lime">{s.crop}</div>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="size-3.5 fill-lime text-lime" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
