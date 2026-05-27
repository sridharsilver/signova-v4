import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import lab from "@/assets/images/lab.jpg";
import products from "@/assets/images/products.jpg";

export function InnovationSection() {
  return (
    <section className="relative py-32 bg-charcoal text-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0">
        <img
          src={lab}
          alt="Lab"
          loading="lazy"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-lime font-semibold mb-4">
            Innovation Lab
          </div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Research that grows{" "}
            <span className="text-gradient">tomorrow's harvest</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
            Our 30+ scientist R&D centre develops chelation chemistries, nano
            formulations, and bio-stimulants with rigorous quality control and
            ISO 9001:2015 certification.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "ISO Certified", v: "9001:2015" },
              { k: "Patents Filed", v: "12+" },
              { k: "Field Trials", v: "500+" },
              { k: "Quality Tests", v: "Daily" },
            ].map((x) => (
              <div key={x.k} className="glass-dark rounded-2xl p-5">
                <div className="text-2xl font-bold text-gradient">{x.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/60 mt-1">
                  {x.k}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/innovation"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-2xl bg-lime-gradient text-charcoal font-semibold"
          >
            Inside our R&D <ArrowRight className="size-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-lime-gradient opacity-30 blur-3xl rounded-full" />
          <img
            src={products}
            alt="Premium product range"
            loading="lazy"
            className="relative rounded-3xl shadow-glow"
          />
        </motion.div>
      </div>
    </section>
  );
}
