import { supabase } from "@/lib/supabase";
import { Atom, Shield, Sparkles, Droplets, Leaf, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category_slug: string;
  description: string;
  tag?: string;
  image_url?: string;
  uses?: string;
  dosage?: string;
  sizes?: string[];
  tech_title?: string;
  tech_composition?: string;
  tech_crops?: string;
  tech_dose?: string;
};

export type ProductCategory = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description?: string;
};

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Atom,
  Droplets,
  Shield,
  Leaf,
  FlaskConical,
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Sparkles;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data as Product[];
};

export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  const { data, error } = await supabase.from('product_categories').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data as ProductCategory[];
};

export const getProductImageUrl = (filename?: string) => {
  if (!filename) return undefined;
  if (filename.startsWith('http')) return filename;
  
  // Assuming the user uploads images to a 'products' bucket with the same filename.
  // Until then, this might break if the bucket isn't public or images aren't there.
  // The user will be instructed to create the bucket and upload the images.
  const { data } = supabase.storage.from('products').getPublicUrl(filename);
  return data.publicUrl;
};
