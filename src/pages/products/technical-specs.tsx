import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { productsList } from "@/data/products";
import logo from "@/assets/images/signova-logo.png";

export default function TechnicalSpecsPage() {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = productsList.find((p) => p.slug === slug);

  usePageMeta({
    title: product
      ? `${product.name} Technical Specifications`
      : "Technical Specifications Not Found",
    description: "Detailed chemical composition and technical data.",
  });

  if (!product || !product.qrData) {
    return (
      <div className="min-h-screen bg-white p-4">
        <p className="text-sm text-gray-800 font-medium">Data Not Available</p>
      </div>
    );
  }

  const paragraphs = product.qrData.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="min-h-[100dvh] bg-green-50 p-4 sm:p-6 flex flex-col justify-center items-center">
      <div className="flex justify-center mb-6 w-full max-w-md mx-auto">
        <img src={logo} alt="Signova Group" className="h-10 object-contain" />
      </div>
      <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 font-['Inter']">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-black mb-1 leading-tight text-center">
          {product.name}
        </h1>
        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-6 pb-2 border-b border-gray-200 text-center">
          Technical Specifications
        </div>

        <div className="space-y-0.5 font-sans">
          {paragraphs.map((para, index) => {
            if (para.includes(":") && !para.startsWith("(")) {
              const [title, ...rest] = para.split(":");
              return (
                <div key={index} className="mt-4 mb-2 first:mt-0">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">
                    {title.trim()}
                  </h3>
                  <p className="text-sm text-gray-700 leading-normal">
                    {rest.join(":").trim()}
                  </p>
                </div>
              );
            }
            return (
              <p key={index} className="text-sm text-gray-700 leading-normal">
                {para}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
