import {
  Atom,
  Shield,
  Sparkles,
  Droplets,
  Leaf,
  FlaskConical,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import agrimax from "@/assets/images/products/agrimax.png";
import zn12 from "@/assets/images/products/zn12.png";
import boost from "@/assets/images/products/boost.png";
import nanoUrea from "@/assets/images/products/nano-urea.png";
import shield from "@/assets/images/products/shield.png";
import organo from "@/assets/images/products/organo.png";
import bloom from "@/assets/images/products/bloom.png";

export type Product = {
  slug: string;
  name: string;
  cat: string;
  desc: string;
  tag?: string;
  image?: string;
  uses?: string;
  dosage?: string;
  sizes?: string[];
  qrData?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export const productCategories: ProductCategory[] = [
  { id: "all", name: "All", icon: Sparkles },
  { id: "chelated", name: "Chelated", icon: Atom },
  { id: "bio", name: "Bio Stimulants", icon: Droplets },
  { id: "nano", name: "Nano Tech", icon: Sparkles },
  { id: "protect", name: "Protectors", icon: Shield },
  { id: "organic", name: "Organic", icon: Leaf },
  { id: "specialty", name: "Specialty", icon: FlaskConical },
];

export const productsList: Product[] = [
  {
    slug: "agrimax",
    name: "Agrimax",
    cat: "chelated",
    desc: "Chelated micronutrient mixture — boosts uptake of N, P & K across all major crops.",
    tag: "Featured",
    image: agrimax,
    uses: "A mixture of adequate chelating micronutrients. Agrimax F-4 is suitable for lemon, orange, cotton, paddy, mango, and vine crops. It plays a major role in enhancing the utilization of nitrogen, phosphorus, and potash in plants.",
    dosage: "2 gms. per liter of water.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-zn-12",
    name: "Signova Zn-12",
    cat: "chelated",
    desc: "Chelated zinc 12% EDTA — corrects deficiency in paddy, citrus, vegetables.",
    tag: "Bestseller",
    image: zn12,
    uses: "Chelated Zinc 12% EDTA corrects zinc deficiency in paddy, wheat, citrus, sugarcane and vegetables. Improves chlorophyll formation, enzyme activity and overall yield quality.",
    dosage:
      "1 gm per liter of water for foliar spray; 5 kg/acre for soil application.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg", "5 Kg"],
    qrData: `Title: Zinc Gluconate Zn- 12% (Liquid)

Composition: 
(i) Zinc (as Zn), percent by weight (Minimum) - 12.0
(ii) pH (1% solution) - 5.5 - 6.5
(iii) Specific Gravity - 1.28 - 1.45
(iv) Lead (as Pb), percent by weight (Minimum) - 0.003
(v) Cadmium (as Cd), percent by weight (Minimum) - 0.0025
(vi) Arsenic (as As), percent by weight (Minimum) - 0.01

Crops: Suitable for all crops

Dose: Apply 250-500 ml per acre after dilution at 2-4 ml per litre of water.`,
  },
  {
    slug: "signova-fe-12",
    name: "Signova Fe-12",
    cat: "chelated",
    desc: "Chelated iron 12% EDTA — restores chlorophyll & green colour fast.",
    image: zn12,
    uses: "Chelated Iron 12% EDTA cures iron chlorosis (yellowing of leaves) in citrus, grapes, pomegranate and ornamental crops. Restores deep green colour within days.",
    dosage: "1 gm per liter of water for foliar spray.",
    sizes: ["100 gms", "250 gms", "500 gms", "1 Kg"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-cu-pro",
    name: "Signova Cu-Pro",
    cat: "chelated",
    desc: "Copper EDTA for orchard nutrition & disease prep.",
    image: zn12,
    uses: "Chelated Copper EDTA strengthens orchard crops, improves disease resistance and supports protein synthesis in vine, citrus and pomegranate plantations.",
    dosage: "1 gm per liter of water.",
    sizes: ["100 gms", "250 gms", "500 gms"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-boost",
    name: "Signova Boost",
    cat: "bio",
    desc: "Seaweed-based bio-stimulant for vegetative & flowering boost.",
    image: boost,
    uses: "Premium seaweed extract enriched with natural growth hormones, amino acids and trace nutrients. Promotes vegetative growth, flowering, fruit set and stress tolerance.",
    dosage: "2 ml per liter of water for foliar spray.",
    sizes: ["250 ml", "500 ml", "1 L", "5 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-roots",
    name: "Signova Roots",
    cat: "bio",
    desc: "Humic + fulvic acid blend for stronger root architecture.",
    image: boost,
    uses: "Humic and fulvic acid blend that improves soil structure, enhances nutrient absorption and develops a strong root system. Suitable for all crops in all soil types.",
    dosage: "2-3 ml per liter of water; or 1 L per acre via drip.",
    sizes: ["500 ml", "1 L", "5 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "nano-urea-liquid",
    name: "Nano Urea Liquid",
    cat: "nano",
    desc: "Patented nano-nitrogen — half the dose, full the harvest.",
    tag: "New",
    image: nanoUrea,
    uses: "Nano-engineered liquid nitrogen with 4% nitrogen by weight. Delivers efficient foliar nitrogen, reduces conventional urea use by up to 50% and boosts grain quality.",
    dosage:
      "4 ml per liter of water; 2 sprays at active tillering & panicle stage.",
    sizes: ["500 ml", "1 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "nano-zinc",
    name: "Nano Zinc",
    cat: "nano",
    desc: "Particle-engineered zinc for foliar precision delivery.",
    image: nanoUrea,
    uses: "Nano-particle zinc for ultra-precise foliar delivery. Corrects zinc deficiency at micro-doses with superior absorption compared to conventional chelates.",
    dosage: "2 ml per liter of water.",
    sizes: ["250 ml", "500 ml", "1 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-shield",
    name: "Signova Shield",
    cat: "protect",
    desc: "Broad-spectrum fungicide for blight, mildew & rust.",
    image: shield,
    uses: "Systemic broad-spectrum fungicide for control of blight, downy mildew, powdery mildew and rust in vegetables, grapes, potato and cereals.",
    dosage: "2 ml per liter of water.",
    sizes: ["100 ml", "250 ml", "500 ml", "1 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "signova-guard",
    name: "Signova Guard",
    cat: "protect",
    desc: "Insecticide for sucking pests in cotton & chilli.",
    image: shield,
    uses: "Contact and systemic insecticide effective against sucking pests like aphids, jassids, whitefly and thrips in cotton, chilli, brinjal and okra.",
    dosage: "1.5 ml per liter of water.",
    sizes: ["100 ml", "250 ml", "500 ml", "1 L"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "organogold",
    name: "OrganoGold",
    cat: "organic",
    desc: "Certified organic granule — slow-release NPK + micronutrients.",
    image: organo,
    uses: "Certified organic granular fertilizer with slow-release NPK and full micronutrient profile. Improves soil health, microbial activity and delivers sustained nutrition.",
    dosage: "50-100 kg per acre as basal application.",
    sizes: ["1 Kg", "5 Kg", "25 Kg", "50 Kg"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "bloom-mix",
    name: "Bloom Mix",
    cat: "specialty",
    desc: "Crop-specific NPK 13-40-13 for flower induction.",
    image: bloom,
    uses: "Water-soluble NPK 13-40-13 specially formulated for flower induction, bud development and uniform bloom in horticultural and floricultural crops.",
    dosage: "5 gms per liter of water.",
    sizes: ["1 Kg", "5 Kg", "25 Kg"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
  {
    slug: "yield-max",
    name: "Yield Max",
    cat: "specialty",
    desc: "Potash-rich 0-0-50 for grain filling and fruit weight.",
    image: bloom,
    uses: "Sulphate of potash (0-0-50) ideal for grain filling, fruit weight, sugar content and shelf-life improvement in all crops.",
    dosage: "5 gms per liter of water; or 25 kg/acre via drip.",
    sizes: ["1 Kg", "5 Kg", "25 Kg"],
    qrData: `Title: Product Technical Specifications

Composition: 
(i) Active Ingredients (Minimum) - Standard
(ii) pH (1% solution) - Optimal Range
(iii) Specific Gravity - Standard
(iv) Heavy Metals - Within Permissible Limits

Crops: Suitable for target crops as per label

Dose: Follow recommended dosage instructions provided on the package.`,
  },
];
