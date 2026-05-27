import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Atom,
  Shield,
  Sparkles,
  Droplets,
  Leaf,
  FlaskConical,
} from "lucide-react";

import { categories } from "@/data/home";

export function ProductCategoriesSection() {
  return (
    <section className="py-28 bg-secondary/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-96 rounded-full bg-lime/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">
            What We Make
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            Product <span className="text-gradient">Categories</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div
                className={`absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br ${c.grad} opacity-10 group-hover:opacity-30 blur-2xl transition`}
              />
              <div
                className={`relative size-14 rounded-2xl bg-gradient-to-br ${c.grad} grid place-items-center mb-6 shadow-lg`}
              >
                <c.icon className="size-6 text-white" />
              </div>
              <h3 className="relative text-xl font-bold mb-3">{c.title}</h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed mb-6">
                {c.desc}
              </p>
              <Link
                to="/products"
                className="relative inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
              >
                Learn more <ChevronRight className="size-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
