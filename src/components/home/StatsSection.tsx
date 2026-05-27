import { motion } from "framer-motion";
import { Counter } from "@/components/common/Counter";

import { stats } from "@/data/home";

export function StatsSection() {
  return (
    <section className="relative -mt-12 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass shadow-card rounded-3xl p-6 sm:p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
