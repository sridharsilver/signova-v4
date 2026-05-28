import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Atom, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { PageHero } from "@/components/common/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";
import heroProducts from "@/assets/images/heros/hero_products.png";
import { productsList, productCategories } from "@/data/products";

export default function ProductsPage() {
  usePageMeta({
    title: "Products & Services — Signova Group",
    description:
      "Explore Signova's range of chelated micronutrients, bio-stimulants, nano-tech products, crop protectors and organic solutions.",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      setTimeout(checkScroll, 350); // Check again after animation completes
    }
  };

  const setActiveCategory = (catId: string) => {
    setCurrentPage(1);
    setSearchParams(prev => {
      if (catId === "all") {
        prev.delete("category");
      } else {
        prev.set("category", catId);
      }
      return prev;
    }, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(
      (item) =>
        (activeCategory === "all" || item.cat === activeCategory) &&
        (query === "" ||
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase())),
    );
  }, [activeCategory, query]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <PageHero
        eyebrow="Products & Services"
        title="A complete crop nutrition portfolio"
        subtitle="300+ products across micronutrients, bio-stimulants, nano-tech, protectors and organic solutions."
        image={heroProducts}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:outline-none focus:border-leaf shadow-card"
              />
            </div>
          </div>

          <div className="relative mb-8 md:mb-10 -mx-6 px-6 sm:mx-0 sm:px-0">
            {/* Fade effect edges */}
            {showLeftArrow && <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden z-10" />}
            {showRightArrow && <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden z-10" />}
            
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 -mt-1 z-20 size-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center md:hidden text-muted-foreground hover:text-foreground hover:border-leaf transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="size-4" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 -mt-1 z-20 size-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center md:hidden text-muted-foreground hover:text-foreground hover:border-leaf transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="size-4" />
              </button>
            )}
            
            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto md:flex-wrap gap-2 md:gap-3 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex shrink-0 items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-card"
                      : "bg-card border border-border hover:border-leaf text-card-foreground"
                  }`}
                >
                  <category.icon className="size-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (index % 9) * 0.05 }}
                  className="relative group bg-card rounded-3xl shadow-card hover:shadow-glow hover:-translate-y-1 transition overflow-hidden"
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="block p-7 h-full w-full outline-none"
                  >
                    <div className="absolute -top-16 -right-16 size-40 rounded-full bg-lime-gradient opacity-10 group-hover:opacity-30 blur-2xl transition" />
                    {product.tag && (
                      <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-lime-gradient text-charcoal z-10">
                        {product.tag}
                      </div>
                    )}
                    {product.image ? (
                      <div className="relative aspect-square md:aspect-[4/5] mb-5 rounded-2xl bg-gradient-to-br from-secondary to-background overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="size-12 rounded-2xl bg-secondary grid place-items-center mb-5">
                        <Atom className="size-5 text-leaf" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-leaf transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {product.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              No products match your search.
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-5" />
              </button>
              
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className={`size-10 rounded-full text-sm font-semibold transition-colors ${
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card border border-border hover:border-leaf hover:text-leaf text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Next page"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
          <div className="mt-16 flex justify-center pb-8">
            <a
              href="/signova-products-template.csv"
              download
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-leaf hover:underline transition-colors"
            >
              <Download className="size-3" />
              Download Bulk Upload CSV Template
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
