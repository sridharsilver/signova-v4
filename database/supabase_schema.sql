-- Supabase Schema Migration: Signova v4 Products
-- Updated to include product_categories and a dedicated technical_data table

-- 1. Create Product Categories Table
CREATE TABLE public.sg4_product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  icon_name VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE public.sg4_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.sg4_product_categories(id) ON DELETE SET NULL,
  slug VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR,
  image_url VARCHAR,
  uses TEXT,
  dosage TEXT,
  sizes TEXT[] DEFAULT '{}', -- PostgreSQL Array for holding sizes
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Product Technical Data Table
-- We separate this so the main products table stays lightweight.
CREATE TABLE public.sg4_product_technical_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.sg4_products(id) ON DELETE CASCADE UNIQUE NOT NULL,
  composition JSONB, -- Store structured data like {"Zinc": "12.0", "pH": "5.5 - 6.5"}
  heavy_metals JSONB, -- Store data like {"Lead": "0.003", "Cadmium": "0.0025"}
  crops_suitable TEXT,
  recommended_dose TEXT,
  raw_qr_text TEXT, -- Fallback for the raw formatted string if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.sg4_product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sg4_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sg4_product_technical_data ENABLE ROW LEVEL SECURITY;

-- 5. Create Public Read Policies
CREATE POLICY "Enable read access for all users" ON public.sg4_product_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for active products" ON public.sg4_products FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for tech data" ON public.sg4_product_technical_data FOR SELECT USING (true);

-- 6. Auto-update 'updated_at' timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sg4_products_updated_at
    BEFORE UPDATE ON public.sg4_products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sg4_tech_data_updated_at
    BEFORE UPDATE ON public.sg4_product_technical_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
