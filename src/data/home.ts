import {
  ArrowRight,
  PlayCircle,
  Atom,
  Shield,
  Sparkles,
  Droplets,
  Leaf,
  FlaskConical,
} from "lucide-react";

import sliderPaddy from "@/assets/Slider/slider-paddy.jpg";
import sliderChilli from "@/assets/Slider/Slider-chilli.jpg";
import sliderCotton from "@/assets/Slider/Slider-cotton.jpg";
import sliderImage3 from "@/assets/Slider/Slider-image3.jpg";
import sliderImage21 from "@/assets/Slider/Slider-image21.jpg";
import farmer from "@/assets/images/farmer.jpg";
import leaves from "@/assets/images/leaves.jpg";
import heroFarm from "@/assets/images/hero-farm.jpg";
import lab from "@/assets/images/lab.jpg";

export const slides = [
  {
    bgImage: sliderImage21,
    eyebrow: "Supporting Indian Farmers Since 2004",
    titlePre: "Empowering ",
    titleHighlight: "India's Harvests",
    titlePost: " with Science",
    desc: "Trusted by 100,000+ farmers across 22 states. Delivering advanced crop science directly to fields.",
    ctas: [
      {
        text: "Explore Products",
        path: "/products",
        isPrimary: true,
        icon: ArrowRight,
      },
      {
        text: "Become a Distributor",
        path: "/distributor",
        isPrimary: false,
        icon: PlayCircle,
      },
    ],
  },
  {
    bgImage: sliderPaddy,
    eyebrow: "Paddy Crop Nutrition",
    titlePre: "Maximize ",
    titleHighlight: "Paddy Yields",
    titlePost: " & Tillering",
    desc: "Correct zinc and magnesium deficiencies, restore deep leaf color, and boost grain filling.",
    ctas: [
      {
        text: "Paddy Solutions",
        path: "/crops",
        isPrimary: true,
        icon: ArrowRight,
      },
      {
        text: "Product Catalog",
        path: "/products",
        isPrimary: false,
        icon: PlayCircle,
      },
    ],
  },
  {
    bgImage: sliderChilli,
    eyebrow: "Chilli Crop Nutrition",
    titlePre: "Boost ",
    titleHighlight: "Chilli Flowering",
    titlePost: " & Pungency",
    desc: "Stage-wise nutrition schedules to secure high fruit setting, deep color, and strong disease resistance.",
    ctas: [
      {
        text: "Chilli Solutions",
        path: "/crops",
        isPrimary: true,
        icon: ArrowRight,
      },
      {
        text: "Talk to an Expert",
        path: "/contact",
        isPrimary: false,
        icon: PlayCircle,
      },
    ],
  },
  {
    bgImage: sliderCotton,
    eyebrow: "Cotton Crop Nutrition",
    titlePre: "Optimize ",
    titleHighlight: "Cotton Boll Weight",
    titlePost: " & Quality",
    desc: "Enhance square retention, maximize boll size, and produce premium-grade lint fibers.",
    ctas: [
      {
        text: "Cotton Solutions",
        path: "/crops",
        isPrimary: true,
        icon: ArrowRight,
      },
      {
        text: "Dealer Network",
        path: "/distributor",
        isPrimary: false,
        icon: PlayCircle,
      },
    ],
  },
  {
    bgImage: sliderImage3,
    eyebrow: "Specialty Horticulture",
    titlePre: "Premium Solutions for ",
    titleHighlight: "Horticulture",
    titlePost: " Crops",
    desc: "Water-soluble specialty NPKs and chelated micronutrients tailored for greenhouse and orchard crops.",
    ctas: [
      {
        text: "All Crop Solutions",
        path: "/crops",
        isPrimary: true,
        icon: ArrowRight,
      },
      {
        text: "Inside our R&D",
        path: "/innovation",
        isPrimary: false,
        icon: PlayCircle,
      },
    ],
  },
];

export const stats = [
  { n: 100000, s: "+", l: "Happy Farmers" },
  { n: 3000, s: "+", l: "Dealers" },
  { n: 300, s: "+", l: "Products" },
  { n: 250, s: "+", l: "Experts" },
];

export const categories = [
  {
    icon: Atom,
    title: "Chelated Micronutrients",
    desc: "EDTA-chelated nutrients for maximum absorption.",
    grad: "from-leaf to-deep",
  },
  {
    icon: Shield,
    title: "Crop Protectors",
    desc: "Advanced protection against pests and diseases.",
    grad: "from-deep to-charcoal",
  },
  {
    icon: Sparkles,
    title: "Nano Technology",
    desc: "Next-gen nano formulations for precision farming.",
    grad: "from-lime to-leaf",
  },
  {
    icon: Droplets,
    title: "Bio Stimulants",
    desc: "Natural growth boosters for stronger crops.",
    grad: "from-leaf to-lime",
  },
  {
    icon: Leaf,
    title: "Organic Solutions",
    desc: "Certified organic inputs for sustainable yield.",
    grad: "from-deep to-leaf",
  },
  {
    icon: FlaskConical,
    title: "Specialty Fertilizers",
    desc: "Crop-specific blends developed by our R&D team.",
    grad: "from-charcoal to-deep",
  },
];

export const stories = [
  {
    name: "Ramesh Patel",
    crop: "Cotton • Gujarat",
    quote:
      "Yield jumped 32% in one season after switching to Signova micronutrients.",
    img: farmer,
  },
  {
    name: "Lakshmi Devi",
    crop: "Chilli • Andhra Pradesh",
    quote: "Healthier plants, deeper colour, and a buyer waiting at the gate.",
    img: farmer,
  },
  {
    name: "Suresh Kumar",
    crop: "Paddy • Telangana",
    quote: "The team's field guidance is what truly sets Signova apart.",
    img: farmer,
  },
];

export const articles = [
  {
    tag: "Nutrition",
    title: "Why zinc deficiency silently caps your paddy yield",
    img: leaves,
  },
  {
    tag: "Guide",
    title: "A 7-step micronutrient plan for chilli farmers",
    img: heroFarm,
  },
  {
    tag: "Innovation",
    title: "Nano urea: smaller particle, bigger harvest",
    img: lab,
  },
];
