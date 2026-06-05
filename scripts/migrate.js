import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Categories Data
const productCategories = [
  { slug: "all", name: "All", icon: "Sparkles" },
  { slug: "chelated", name: "Chelated", icon: "Atom" },
  { slug: "bio", name: "Bio Stimulants", icon: "Droplets" },
  { slug: "nano", name: "Nano Tech", icon: "Sparkles" },
  { slug: "protect", name: "Protectors", icon: "Shield" },
  { slug: "organic", name: "Organic", icon: "Leaf" },
  { slug: "specialty", name: "Specialty", icon: "FlaskConical" },
];

// Products Data
const productsList = [
  {
    slug: "agrimax",
    name: "Agrimax",
    category_slug: "chelated",
    description: "Chelated micronutrient mixture — boosts uptake of N, P & K across all major crops.",
    tag: "Featured",
    image_url: "agrimax.png",
    uses: "A mixture of adequate chelating micronutrients. Agrimax F-4 is suitable for lemon, orange, cotton, paddy, mango, and vine crops. It plays a major role in enhancing the utilization of nitrogen, phosphorus, and potash in plants.",
    dosage: "2 gms. per liter of water.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-zn-12",
    name: "Signova Zn-12",
    category_slug: "chelated",
    description: "Chelated zinc 12% EDTA — corrects deficiency in paddy, citrus, vegetables.",
    tag: "Bestseller",
    image_url: "zn12.png",
    uses: "Chelated Zinc 12% EDTA corrects zinc deficiency in paddy, wheat, citrus, sugarcane and vegetables. Improves chlorophyll formation, enzyme activity and overall yield quality.",
    dosage: "1 gm per liter of water for foliar spray; 5 kg/acre for soil application.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg", "5 Kg"],
    qr_data: `Title: Zinc Gluconate Zn- 12% (Liquid)\n\nComposition: \n1. Zinc (as Zn), percent by weight (Minimum) - 12.0\n2. pH (1% solution) - 5.5 - 6.5\n3. Specific Gravity - 1.28 - 1.45\n4. Lead (as Pb), percent by weight (Minimum) - 0.003\n5. Cadmium (as Cd), percent by weight (Minimum) - 0.0025\n6. Arsenic (as As), percent by weight (Minimum) - 0.01\n\nCrops: Suitable for all crops\n\nDose: Apply 250-500 ml per acre after dilution at 2-4 ml per litre of water.`,
  },
  {
    slug: "signova-fe-12",
    name: "Signova Fe-12",
    category_slug: "chelated",
    description: "Chelated iron 12% EDTA — restores chlorophyll & green colour fast.",
    image_url: "zn12.png",
    uses: "Chelated Iron 12% EDTA cures iron chlorosis (yellowing of leaves) in citrus, grapes, pomegranate and ornamental crops. Restores deep green colour within days.",
    dosage: "1 gm per liter of water for foliar spray.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-cu-pro",
    name: "Signova Cu-Pro",
    category_slug: "chelated",
    description: "Copper EDTA for orchard nutrition & disease prep.",
    image_url: "zn12.png",
    uses: "Chelated Copper EDTA strengthens orchard crops, improves disease resistance and supports protein synthesis in vine, citrus and pomegranate plantations.",
    dosage: "1 gm per liter of water.",
    sizes: ["100 gms", "250 gms", "500 gms"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-boost",
    name: "Signova Boost",
    category_slug: "bio",
    description: "Seaweed-based bio-stimulant for vegetative & flowering boost.",
    image_url: "boost.png",
    uses: "Premium seaweed extract enriched with natural growth hormones, amino acids and trace nutrients. Promotes vegetative growth, flowering, fruit set and stress tolerance.",
    dosage: "2 ml per liter of water for foliar spray.",
    sizes: ["250 ml", "500 ml", "1 L", "5 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-roots",
    name: "Signova Roots",
    category_slug: "bio",
    description: "Humic + fulvic acid blend for stronger root architecture.",
    image_url: "boost.png",
    uses: "Humic and fulvic acid blend that improves soil structure, enhances nutrient absorption and develops a strong root system. Suitable for all crops in all soil types.",
    dosage: "2-3 ml per liter of water; or 1 L per acre via drip.",
    sizes: ["500 ml", "1 L", "5 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "nano-urea-liquid",
    name: "Nano Urea Liquid",
    category_slug: "nano",
    description: "Patented nano-nitrogen — half the dose, full the harvest.",
    tag: "New",
    image_url: "nano-urea.png",
    uses: "Nano-engineered liquid nitrogen with 4% nitrogen by weight. Delivers efficient foliar nitrogen, reduces conventional urea use by up to 50% and boosts grain quality.",
    dosage: "4 ml per liter of water; 2 sprays at active tillering & panicle stage.",
    sizes: ["500 ml", "1 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "nano-zinc",
    name: "Nano Zinc",
    category_slug: "nano",
    description: "Particle-engineered zinc for foliar precision delivery.",
    image_url: "nano-urea.png",
    uses: "Nano-particle zinc for ultra-precise foliar delivery. Corrects zinc deficiency at micro-doses with superior absorption compared to conventional chelates.",
    dosage: "2 ml per liter of water.",
    sizes: ["250 ml", "500 ml", "1 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-shield",
    name: "Signova Shield",
    category_slug: "protect",
    description: "Broad-spectrum fungicide for blight, mildew & rust.",
    image_url: "shield.png",
    uses: "Systemic broad-spectrum fungicide for control of blight, downy mildew, powdery mildew and rust in vegetables, grapes, potato and cereals.",
    dosage: "2 ml per liter of water.",
    sizes: ["100 ml", "250 ml", "500 ml", "1 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-guard",
    name: "Signova Guard",
    category_slug: "protect",
    description: "Insecticide for sucking pests in cotton & chilli.",
    image_url: "shield.png",
    uses: "Contact and systemic insecticide effective against sucking pests like aphids, jassids, whitefly and thrips in cotton, chilli, brinjal and okra.",
    dosage: "1.5 ml per liter of water.",
    sizes: ["100 ml", "250 ml", "500 ml", "1 L"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "organogold",
    name: "OrganoGold",
    category_slug: "organic",
    description: "Certified organic granule — slow-release NPK + micronutrients.",
    image_url: "organo.png",
    uses: "Certified organic granular fertilizer with slow-release NPK and full micronutrient profile. Improves soil health, microbial activity and delivers sustained nutrition.",
    dosage: "50-100 kg per acre as basal application.",
    sizes: ["1 Kg", "5 Kg", "25 Kg", "50 Kg"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "bloom-mix",
    name: "Bloom Mix",
    category_slug: "specialty",
    description: "Crop-specific NPK 13-40-13 for flower induction.",
    image_url: "bloom.png",
    uses: "Water-soluble NPK 13-40-13 specially formulated for flower induction, bud development and uniform bloom in horticultural and floricultural crops.",
    dosage: "5 gms per liter of water.",
    sizes: ["1 Kg", "5 Kg", "25 Kg"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "yield-max",
    name: "Yield Max",
    category_slug: "specialty",
    description: "Potash-rich 0-0-50 for grain filling and fruit weight.",
    image_url: "bloom.png",
    uses: "Sulphate of potash (0-0-50) ideal for grain filling, fruit weight, sugar content and shelf-life improvement in all crops.",
    dosage: "5 gms per liter of water; or 25 kg/acre via drip.",
    sizes: ["1 Kg", "5 Kg", "25 Kg"],
    qr_data: `Title: Product Technical Specifications\n\nComposition: \n1. Active Ingredients (Minimum) - Standard\n2. pH (1% solution) - Optimal Range\n3. Specific Gravity - Standard\n4. Heavy Metals - Within Permissible Limits\n\nCrops: Suitable for target crops as per label\n\nDose: Follow recommended dosage instructions provided on the package.`,
  },
];

async function migrateData() {
  console.log("Starting data migration...");

  // Insert categories
  console.log("Inserting categories...");
  const { data: catData, error: catError } = await supabase
    .from('product_categories')
    .upsert(productCategories, { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error("Error inserting categories:", catError);
    return;
  }
  console.log("Categories inserted:", catData?.length);

  // Insert products
  console.log("Inserting products...");
  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .upsert(productsList, { onConflict: 'slug' })
    .select();

  if (prodError) {
    console.error("Error inserting products:", prodError);
    return;
  }
  console.log("Products inserted:", prodData?.length);

  console.log("Migration complete!");
}

migrateData();
