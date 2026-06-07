import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { fetchProducts, Product } from "@/data/products";
import { useState } from "react";
import logo from "@/assets/images/signova-logo.png";

export default function TechnicalSpecsPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const products = await fetchProducts();
      setProductsList(products);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const product = productsList.find((p) => p.slug === slug);

  usePageMeta({
    title: product
      ? `${product.name} Technical Specifications`
      : "Technical Specifications Not Found",
    description: "Detailed chemical composition and technical data.",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <p className="text-sm text-gray-800 font-medium">Loading...</p>
      </div>
    );
  }

  // Check if we have new structured tech data or fallback to old qr_data
  const hasNewData = product?.tech_title || product?.tech_composition || product?.tech_crops || product?.tech_dose;
  const hasAnyData = hasNewData || product?.qr_data;

  if (!product || !hasAnyData) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <p className="text-sm text-gray-800 font-medium">Technical Data Not Available</p>
      </div>
    );
  }

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

        <div className="space-y-4 font-sans">
          {hasNewData ? (
            <>
              {product.tech_title && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Technical Title</h3>
                  <p className="text-sm text-gray-700 leading-normal">{product.tech_title}</p>
                </div>
              )}
              {product.tech_composition && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Composition</h3>
                  <ol className="text-sm text-gray-700 leading-normal list-[lower-roman] list-outside space-y-2 ml-5">
                    {product.tech_composition.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="pl-2">{line}</li>
                    ))}
                  </ol>
                </div>
              )}
              {product.tech_crops && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Suitable Crops</h3>
                  <div className="text-sm text-gray-700 leading-normal space-y-1">
                    {product.tech_crops.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
              {product.tech_dose && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Recommended Dose</h3>
                  <p className="text-sm text-gray-700 leading-normal">{product.tech_dose}</p>
                </div>
              )}
            </>
          ) : (
            // Fallback for old unmigrated qr_data
            product.qr_data?.split("\n").filter((p) => p.trim() !== "").map((para, index) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
