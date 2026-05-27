import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/home";

export function KnowledgeSection() {
  return (
    <section className="py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">
              Knowledge Centre
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Insights from the{" "}
              <span className="text-gradient">field & lab</span>
            </h2>
          </div>
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 text-primary font-semibold"
          >
            All articles <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <Link
              key={i}
              to="/knowledge"
              className="group block bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-leaf font-semibold mb-3">
                  {a.tag}
                </div>
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition">
                  {a.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
