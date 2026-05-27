import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";

import mfgImage from "@/assets/images/infrastructure/mfg_facility.png";
import rndImage from "@/assets/images/infrastructure/rnd_lab.png";
import qaImage from "@/assets/images/infrastructure/qa_testing.png";
import sustainableImage from "@/assets/images/infrastructure/sustainable_infra.png";
import itImage from "@/assets/images/infrastructure/it_ops.png";
import heroInfra from "@/assets/images/heros/hero_infra.png";

function Infrastructure() {
  usePageMeta({
    title: "Infrastructure & Facilities | Signova Group",
    description:
      "Signova Infrastructure boasts advanced facilities, providing top-tier agricultural solutions for optimal crop growth.",
  });

  const facilities = [
    {
      image: mfgImage,
      title: "State-of-the-Art Manufacturing",
      desc: "Advanced production facilities ensuring high-quality agricultural inputs.",
    },
    {
      image: rndImage,
      title: "Research & Development",
      desc: "Dedicated R&D labs driving agricultural innovation.",
    },
    {
      image: qaImage,
      title: "Quality Assurance",
      desc: "Rigorous testing to meet international quality standards.",
    },
    {
      image: sustainableImage,
      title: "Sustainable Practices",
      desc: "Eco-friendly infrastructure designed for sustainability.",
    },
    {
      image: itImage,
      title: "IT & Operations",
      desc: "Seamless digital integration for supply chain efficiency.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="Advanced Facilities for Agriculture"
        subtitle="Signova Infrastructure boasts advanced facilities, providing top-tier agricultural solutions for optimal crop growth."
        image={heroInfra}
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {facilities.map((fac, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col ${
                  i < 2 ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-lime-gradient mix-blend-multiply opacity-20 z-10 pointer-events-none transition-opacity group-hover:opacity-0" />
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">
                    {fac.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-lime-gradient opacity-5 mix-blend-multiply" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="text-sm font-semibold text-leaf tracking-widest uppercase mb-4">
            OUR STRENGTH
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Why Choose Signova Infrastructure
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="text-xl font-bold mb-3 text-card-foreground">
                Global Standards
              </h4>
              <p className="text-muted-foreground">
                World-class facilities built to international specifications.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3 text-card-foreground">
                Innovative Technology
              </h4>
              <p className="text-muted-foreground">
                Leveraging cutting-edge technology for agricultural excellence.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3 text-card-foreground">
                Expert Team
              </h4>
              <p className="text-muted-foreground">
                Managed by industry experts and experienced professionals.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3 text-card-foreground">
                Scalable Operations
              </h4>
              <p className="text-muted-foreground">
                Infrastructure designed to scale with growing agricultural
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Infrastructure;
