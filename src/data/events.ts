import farmerImage from "@/assets/images/farmer.jpg";
import heroFarmImage from "@/assets/images/hero-farm.jpg";
import labImage from "@/assets/images/lab.jpg";
import leavesImage from "@/assets/images/leaves.jpg";
import productsImage from "@/assets/images/products.jpg";
import vsnNaiduImage from "@/assets/images/vsn-naidu.jpg";

export type EventCategory =
  | "All"
  | "Conferences"
  | "Exhibitions"
  | "Farmer Meetings"
  | "CSR Activities"
  | "Training";

export interface CompanyEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  image: string;
}

export const eventCategories: EventCategory[] = [
  "All",
  "Conferences",
  "Exhibitions",
  "Farmer Meetings",
  "CSR Activities",
  "Training",
];

export const companyEvents: CompanyEvent[] = [
  {
    id: "evt-1",
    title: "Annual Global Agri-Tech Conference 2026",
    category: "Conferences",
    date: "March 15, 2026",
    image: vsnNaiduImage,
  },
  {
    id: "evt-2",
    title: "National Farmer Connect Summit",
    category: "Farmer Meetings",
    date: "February 28, 2026",
    image: farmerImage,
  },
  {
    id: "evt-3",
    title: "International Crop Solutions Exhibition",
    category: "Exhibitions",
    date: "January 12, 2026",
    image: productsImage,
  },
  {
    id: "evt-4",
    title: "Advanced Soil Analysis Training",
    category: "Training",
    date: "December 05, 2025",
    image: labImage,
  },
  {
    id: "evt-5",
    title: "Village Water Conservation Drive",
    category: "CSR Activities",
    date: "November 18, 2025",
    image: leavesImage,
  },
  {
    id: "evt-6",
    title: "Modern Farming Techniques Workshop",
    category: "Farmer Meetings",
    date: "October 22, 2025",
    image: heroFarmImage,
  },
  {
    id: "evt-7",
    title: "Signova R&D Facility Tour",
    category: "Training",
    date: "September 10, 2025",
    image: labImage,
  },
  {
    id: "evt-8",
    title: "Agri-Input Expo Mumbai",
    category: "Exhibitions",
    date: "August 04, 2025",
    image: productsImage,
  },
];
