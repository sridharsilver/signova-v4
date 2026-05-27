import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import lab from "@/assets/images/lab.jpg";
import leaves from "@/assets/images/leaves.jpg";

export function AboutPreviewSection() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-lime-gradient opacity-20 blur-3xl rounded-3xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <img
              src={lab}
              alt="Signova research lab"
              loading="lazy"
              className="rounded-3xl object-cover h-72 w-full shadow-card"
            />
            <img
              src={leaves}
              alt="Healthy crop leaves"
              loading="lazy"
              className="rounded-3xl object-cover h-72 w-full mt-12 shadow-card"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-4">
            About Signova
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Two decades of growing{" "}
            <span className="text-gradient">India's harvests</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Established in 2004, Signova Group is a science-led agri-tech
            company developing micronutrients, bio-stimulants, and protection
            chemistries that help farmers grow more — sustainably.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our mission is simple: put world-class crop science in the hands of
            every Indian farmer, backed by ISO-certified manufacturing and a
            250-strong field expert team.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Read our story <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
