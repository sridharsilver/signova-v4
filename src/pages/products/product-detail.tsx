import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Atom, Beaker, Package, Leaf, QrCode, Download, Home, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { fetchProducts, fetchProductCategories, getProductImageUrl, Product, ProductCategory } from "@/data/products";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // MOCK AUTH: In the future, this will check if the user is an admin
  const isAdmin = true;

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  const product = productsList.find((p) => p.slug === slug);
  const currentIndex = productsList.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? productsList[currentIndex - 1] : null;
  const nextProduct = currentIndex < productsList.length - 1 && currentIndex !== -1 ? productsList[currentIndex + 1] : null;
  
  const category = productCategories.find(c => c.slug === product?.category_slug);

  usePageMeta({
    title: product
      ? `${product.name} — Signova Group`
      : "Product Not Found — Signova Group",
    description: product ? (product.uses || product.description) : "The requested product was not found.",
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div className="text-xl font-semibold">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-card hover:bg-primary/90 transition"
          >
            <ArrowLeft className="size-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[calc(100vh-80px)] flex flex-col pt-24 xl:pt-32">
      {/* Enhanced Breadcrumbs */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-4 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center" aria-label="Home">
                  <Home className="size-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/products?category=${category.slug}`}
                      className="truncate max-w-[80px] sm:max-w-none inline-block align-bottom hover:text-foreground transition-colors"
                      title={category.name}
                    >
                      {category.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-leaf">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1 flex flex-col justify-start pb-10">
        <div className="max-w-5xl lg:max-w-6xl mx-auto w-full px-6 sm:px-8 pt-2 pb-4 sm:pt-4">
        
        <div className="relative w-full">
          {prevProduct && (
            <Link
              to={`/products/${prevProduct.slug}`}
              className="absolute -left-4 sm:-left-5 top-[40%] lg:top-1/2 -translate-y-1/2 z-30 size-8 sm:size-10 rounded-full bg-secondary/80 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-leaf hover:bg-secondary hover:scale-105 transition-all shadow-sm"
              aria-label="Previous product"
            >
              <ChevronLeft className="size-4 sm:size-5" strokeWidth={2} />
            </Link>
          )}
          {nextProduct && (
            <Link
              to={`/products/${nextProduct.slug}`}
              className="absolute -right-4 sm:-right-5 top-[40%] lg:top-1/2 -translate-y-1/2 z-30 size-8 sm:size-10 rounded-full bg-secondary/80 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-leaf hover:bg-secondary hover:scale-105 transition-all shadow-sm"
              aria-label="Next product"
            >
              <ChevronRight className="size-4 sm:size-5" strokeWidth={2} />
            </Link>
          )}

          <div className="bg-card rounded-3xl sm:rounded-[2.5rem] shadow-card overflow-hidden grid lg:grid-cols-2 lg:gap-4 xl:gap-8 border border-border/50 h-auto lg:h-[600px] xl:h-[700px]">
          <div className="bg-gradient-to-br from-secondary to-background relative min-h-[350px] sm:min-h-[400px] lg:min-h-0 lg:h-full group overflow-hidden">
            <div className="absolute inset-0 bg-lime-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 sm:size-64 lg:size-72 bg-lime-gradient/20 blur-[80px] sm:blur-[100px] rounded-full" />
            
            {product.image_url ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                src={getProductImageUrl(product.image_url)}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-4 sm:p-8 z-10 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="size-32 sm:size-40 rounded-2xl sm:rounded-3xl bg-lime-gradient grid place-items-center relative z-10 shadow-glow mx-auto mt-[10%]">
                <Atom className="size-12 sm:size-16 text-charcoal" />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 lg:p-10 xl:p-10 flex flex-col justify-start relative overflow-y-auto overflow-x-hidden lg:min-h-0 lg:h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="absolute -top-40 -right-40 size-[300px] sm:size-[500px] rounded-full bg-lime-gradient opacity-5 blur-2xl sm:blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              {product.tag && (
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold bg-lime-gradient text-charcoal shadow-sm">
                  {product.tag}
                </div>
              )}
              {category && (
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-secondary border border-border text-muted-foreground flex items-center gap-1 sm:gap-1.5">
                  <category.icon className="size-3 sm:size-3.5" />
                  {category.name}
                </div>
              )}
            </div>
            
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Product Details - Fixed to bottom */}
            <div className="space-y-5 mt-auto">
              {product.uses && (
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-leaf mb-1.5">
                    <Leaf className="size-4" />
                    Benefits & Uses
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.uses}
                  </p>
                </div>
              )}

              {product.dosage && (
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-leaf mb-1.5">
                    <Beaker className="size-4" />
                    Recommended Dosage
                  </div>
                  <p className="text-sm text-foreground/90 font-medium">
                    {product.dosage}
                  </p>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-leaf mb-2">
                    <Package className="size-4" />
                    Available Sizes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold bg-secondary/80 border border-border text-foreground/90 shadow-sm whitespace-nowrap"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>


      </div>
      </div>
    </div>
  );
}
