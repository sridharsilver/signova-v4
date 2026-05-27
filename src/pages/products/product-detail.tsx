import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Atom, Beaker, Package, Leaf, QrCode, Download } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { productsList, productCategories } from "@/data/products";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = productsList.find((p) => p.slug === slug);
  const currentIndex = productsList.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? productsList[currentIndex - 1] : null;
  const nextProduct = currentIndex < productsList.length - 1 ? productsList[currentIndex + 1] : null;
  
  const category = productCategories.find(c => c.id === product?.cat);

  usePageMeta({
    title: product
      ? `${product.name} — Signova Group`
      : "Product Not Found — Signova Group",
    description: product ? product.desc : "The requested product was not found.",
  });

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
    <div className="bg-background min-h-[calc(100vh-80px)] flex flex-col pt-24 sm:pt-28 lg:pt-32">
      {/* Enhanced Breadcrumbs */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-4 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
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
                  <span className="text-muted-foreground">{category.name}</span>
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

      <div className="flex-1 flex flex-col justify-center pb-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
        <div className="bg-card rounded-3xl sm:rounded-[2.5rem] shadow-card overflow-hidden grid md:grid-cols-2 lg:gap-8 border border-border/50">
          {/* Enhanced Image Section */}
          <div className="bg-gradient-to-br from-secondary to-background grid place-items-center p-8 md:p-12 lg:p-20 relative min-h-[250px] sm:min-h-[300px] md:min-h-[500px] lg:min-h-[600px] group">
            <div className="absolute inset-0 bg-lime-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 sm:size-64 md:size-80 bg-lime-gradient/20 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full" />
            
            {product.image ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                src={product.image}
                alt={product.name}
                className="relative max-h-56 sm:max-h-72 md:max-h-[28rem] lg:max-h-[32rem] w-auto object-contain z-10 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="size-32 sm:size-40 rounded-2xl sm:rounded-3xl bg-lime-gradient grid place-items-center relative z-10 shadow-glow">
                <Atom className="size-12 sm:size-16 text-charcoal" />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="absolute -top-40 -right-40 size-[300px] sm:size-[500px] rounded-full bg-lime-gradient opacity-5 blur-2xl sm:blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
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
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
              {product.desc}
            </p>

            {/* Product Details */}
            <div className="space-y-8">
              {product.uses && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-leaf mb-2">
                    <Leaf className="size-5" />
                    Benefits & Uses
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.uses}
                  </p>
                </div>
              )}

              {product.dosage && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-leaf mb-2">
                    <Beaker className="size-5" />
                    Recommended Dosage
                  </div>
                  <p className="text-foreground/90 font-medium">
                    {product.dosage}
                  </p>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-leaf mb-3">
                    <Package className="size-5" />
                    Available Sizes
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-secondary/80 border border-border text-foreground/90 shadow-sm whitespace-nowrap"
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

        {/* Admin QR Feature */}
        {isAdmin && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Product Page QR */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-secondary border border-border text-foreground hover:bg-secondary/80 hover:border-leaf transition-all shadow-sm group">
                  <QrCode className="size-4 text-muted-foreground group-hover:text-leaf transition-colors" />
                  Generate Product QR (Admin)
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8">
                <DialogHeader>
                  <DialogTitle className="text-center mb-4">Product Page QR</DialogTitle>
                </DialogHeader>
                <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                  <QRCodeSVG 
                    id="qr-svg-product"
                    value={`${window.location.origin}/products/${product.slug}`} 
                    size={240} 
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
                  This QR code links directly to this product detail page.
                </p>
                
                <div className="w-full bg-secondary/50 rounded-xl p-3 mb-6 flex items-center justify-between border border-border/50">
                  <span className="text-xs text-muted-foreground truncate mr-3 select-all font-mono">
                    {window.location.origin}/products/{product.slug}
                  </span>
                  <Link 
                    to={`/products/${product.slug}`} 
                    target="_blank"
                    className="text-xs font-bold text-leaf hover:underline whitespace-nowrap"
                  >
                    Open
                  </Link>
                </div>
                
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => {
                      const svg = document.getElementById("qr-svg-product");
                      if (!svg) return;
                      const serializer = new XMLSerializer();
                      const source = serializer.serializeToString(svg);
                      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${product.slug}-page-qr.svg`;
                      a.click();
                    }}
                    className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Download className="size-4" /> SVG
                  </button>
                  <button
                    onClick={() => {
                      const svg = document.getElementById("qr-svg-product");
                      if (!svg) return;
                      const serializer = new XMLSerializer();
                      const source = serializer.serializeToString(svg);
                      const img = new Image();
                      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
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
                        a.download = `${product.slug}-page-qr.png`;
                        a.click();
                      };
                      img.src = url;
                    }}
                    className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-lime-gradient text-charcoal shadow-sm hover:scale-105 transition-transform"
                  >
                    <Download className="size-4" /> PNG
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Technical Specs QR */}
            {product.qrData && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-secondary border border-border text-foreground hover:bg-secondary/80 hover:border-leaf transition-all shadow-sm group">
                    <QrCode className="size-4 text-muted-foreground group-hover:text-leaf transition-colors" />
                    Generate Technical QR (Admin)
                  </button>
                </DialogTrigger>
              <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8">
                <DialogHeader>
                  <DialogTitle className="text-center mb-4">Technical Specifications QR</DialogTitle>
                </DialogHeader>
                <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                  <QRCodeSVG 
                    id="qr-svg"
                    value={`${window.location.origin}/tech-specs/${product.slug}`} 
                    size={240} 
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
                  This QR code links directly to the dedicated Technical Specifications page.
                </p>
                
                <div className="w-full bg-secondary/50 rounded-xl p-3 mb-6 flex items-center justify-between border border-border/50">
                  <span className="text-xs text-muted-foreground truncate mr-3 select-all font-mono">
                    {window.location.origin}/tech-specs/{product.slug}
                  </span>
                  <Link 
                    to={`/tech-specs/${product.slug}`} 
                    target="_blank"
                    className="text-xs font-bold text-leaf hover:underline whitespace-nowrap"
                  >
                    Open
                  </Link>
                </div>
                
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => {
                      const svg = document.getElementById("qr-svg");
                      if (!svg) return;
                      const serializer = new XMLSerializer();
                      const source = serializer.serializeToString(svg);
                      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${product.slug}-qr.svg`;
                      a.click();
                    }}
                    className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Download className="size-4" /> SVG
                  </button>
                  <button
                    onClick={() => {
                      const svg = document.getElementById("qr-svg");
                      if (!svg) return;
                      const serializer = new XMLSerializer();
                      const source = serializer.serializeToString(svg);
                      const img = new Image();
                      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
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
                        a.download = `${product.slug}-qr.png`;
                        a.click();
                      };
                      img.src = url;
                    }}
                    className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-lime-gradient text-charcoal shadow-sm hover:scale-105 transition-transform"
                  >
                    <Download className="size-4" /> PNG
                  </button>
                </div>
              </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        {/* Next / Previous Navigation */}
        {(prevProduct || nextProduct) && (
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProduct ? (
              <Link
                to={`/products/${prevProduct.slug}`}
                className="group flex items-center gap-4 p-4 pr-6 rounded-2xl hover:bg-secondary/50 transition-colors w-full sm:w-auto"
              >
                <div className="size-12 rounded-full bg-secondary border border-border grid place-items-center shrink-0 group-hover:border-leaf transition-colors">
                  <ArrowLeft className="size-5 text-muted-foreground group-hover:text-leaf transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Previous</div>
                  <div className="font-display font-semibold text-foreground group-hover:text-leaf transition-colors">{prevProduct.name}</div>
                </div>
              </Link>
            ) : <div className="hidden sm:block flex-1" />}

            {nextProduct && (
              <Link
                to={`/products/${nextProduct.slug}`}
                className="group flex items-center justify-end gap-4 p-4 pl-6 rounded-2xl hover:bg-secondary/50 transition-colors text-right w-full sm:w-auto ml-auto"
              >
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Next</div>
                  <div className="font-display font-semibold text-foreground group-hover:text-leaf transition-colors">{nextProduct.name}</div>
                </div>
                <div className="size-12 rounded-full bg-secondary border border-border grid place-items-center shrink-0 group-hover:border-leaf transition-colors">
                  <ArrowLeft className="size-5 rotate-180 text-muted-foreground group-hover:text-leaf transition-colors" />
                </div>
              </Link>
            )}
          </div>
        )}

      </div>
      </div>
    </div>
  );
}
