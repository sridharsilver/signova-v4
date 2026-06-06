import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Atom, Download, ChevronLeft, ChevronRight, QrCode } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "@/components/common/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";
import heroProducts from "@/assets/images/heros/hero_products.png";
import { fetchProducts, fetchProductCategories, getIcon, getProductImageUrl, Product, ProductCategory } from "@/data/products";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

export default function ProductsQrPage() {
  usePageMeta({
    title: "Product QR Directory — Signova Group",
    description: "Generate and view Technical Specifications QR codes for all our products.",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [products, categories] = await Promise.all([
        fetchProducts(),
        fetchProductCategories()
      ]);
      setProductsList(products);
      setProductCategories(categories);
      setIsLoading(false);
    }
    loadData();
  }, []);

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
        item.is_active !== false &&
        (activeCategory === "all" || item.category_slug === activeCategory) &&
        (query === "" ||
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.sku?.toLowerCase().includes(query.toLowerCase()))
    );
  }, [activeCategory, query, productsList]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadQR = (product: Product, format: 'svg' | 'png') => {
    const svgElement = document.getElementById(`qr-svg-technical-${product.id}`);
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    
    // Create a labeled version
    const labelSource = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" fill="white" />
  <svg x="100" y="100" width="800" height="800">
    ${source.replace(/xmlns=\"[^\"]*\"/g, '')}
  </svg>
  <text x="500" y="60" font-family="sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="black">${product.name.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' })[c as any] || c)}</text>
  <text x="500" y="940" font-family="monospace" font-size="35" text-anchor="middle" fill="#666">${(product.sku || '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' })[c as any] || c)}</text>
  <text x="500" y="980" font-family="sans-serif" font-size="25" text-anchor="middle" fill="#999">Tech Specs</text>
</svg>`;

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(labelSource);

    if (format === 'svg') {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${product.slug}-tech-qr.svg`;
      a.click();
    } else {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.drawImage(img, 0, 0, 1000, 1000);
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${product.slug}-tech-qr.png`;
        a.click();
      };
      img.src = url;
    }
  };

  return (
    <>
      <PageHero
        eyebrow="QR Directory"
        title="Technical QR Codes"
        subtitle="Generate and download technical specification QR codes for all products."
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
                placeholder="Search products by name or SKU..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:outline-none focus:border-leaf shadow-card"
              />
            </div>
          </div>

          <div className="relative mb-8 md:mb-10 -mx-6 px-6 sm:mx-0 sm:px-0">
            {showLeftArrow && <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden z-10" />}
            {showRightArrow && <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden z-10" />}
            
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 -mt-1 z-20 size-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center md:hidden text-muted-foreground hover:text-foreground hover:border-leaf transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 -mt-1 z-20 size-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center md:hidden text-muted-foreground hover:text-foreground hover:border-leaf transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            )}
            
            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto md:flex-wrap gap-2 md:gap-3 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {productCategories.map((category) => {
                const Icon = getIcon(category.icon);
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.slug)}
                    className={`inline-flex shrink-0 items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                      activeCategory === category.slug
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "bg-card border border-border hover:border-leaf text-card-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: (index % 9) * 0.05 }}
                    className="relative group bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:shadow-leaf/10 hover:-translate-y-1 hover:border-leaf/30 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="p-4 h-full w-full outline-none flex flex-col flex-1">
                      <div className="absolute -top-12 -right-12 size-32 rounded-full bg-lime-gradient opacity-0 group-hover:opacity-20 blur-2xl transition pointer-events-none" />
                      
                      
                      {product.image_url ? (
                        <div className="relative aspect-square mb-4 rounded-xl bg-gradient-to-br from-secondary/50 to-background overflow-hidden shrink-0 group-hover:bg-secondary/80 transition-colors">
                          <img
                            src={getProductImageUrl(product.image_url)}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square rounded-xl bg-secondary/50 flex items-center justify-center mb-4 shrink-0 group-hover:bg-secondary/80 transition-colors">
                          <Atom className="size-6 text-leaf/50 group-hover:text-leaf transition-colors" />
                        </div>
                      )}
                      
                      <h3 className="text-sm font-bold leading-tight mb-4 group-hover:text-leaf transition-colors text-center line-clamp-2 px-1 text-foreground/90">
                        {product.name}
                      </h3>

                      <div className="mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="w-full py-2.5 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wide font-bold text-primary bg-primary/5 border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:shadow-md rounded-lg transition-all duration-300">
                              <QrCode className="size-3.5" />
                              Generate QR
                            </button>
                          </DialogTrigger>
                        <DialogContent className="sm:max-w-md flex flex-col items-center p-6">
                          <DialogHeader>
                            <DialogTitle className="text-center">Technical Specs QR</DialogTitle>
                            <DialogDescription className="text-center">{product.name}</DialogDescription>
                          </DialogHeader>
                          
                          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-inner border border-gray-100 my-4">
                            <QRCodeSVG 
                              id={`qr-svg-technical-${product.id}`}
                              value={`${window.location.origin}/tech-specs/${product.slug}`} 
                              size={200} 
                            />
                          </div>
                          
                          <div className="w-full bg-secondary/50 rounded-xl p-3 mb-4 flex items-center justify-between border border-border/50">
                            <span className="text-xs text-muted-foreground truncate mr-3 select-all font-mono">
                              {`${window.location.origin}/tech-specs/${product.slug}`}
                            </span>
                            <a 
                              href={`${window.location.origin}/tech-specs/${product.slug}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
                            >
                              Open
                            </a>
                          </div>

                          <div className="grid grid-cols-2 gap-3 w-full">
                            <button
                              onClick={() => downloadQR(product, 'svg')}
                              className="py-2.5 flex items-center justify-center gap-2 text-sm font-semibold border border-border rounded-xl text-foreground hover:bg-secondary/50 transition"
                            >
                              <Download className="size-4" /> SVG
                            </button>
                            <button
                              onClick={() => downloadQR(product, 'png')}
                              className="py-2.5 flex items-center justify-center gap-2 text-sm font-semibold border border-border rounded-xl text-foreground hover:bg-secondary/50 transition"
                            >
                              <Download className="size-4" /> PNG
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
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
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
