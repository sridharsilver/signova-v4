import type { RouteObject } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import AdminLayout from "@/app/layouts/AdminLayout";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ProductsPage from "@/pages/products/products";
import ProductDetailPage from "@/pages/products/product-detail";
import TechnicalSpecsPage from "@/pages/products/technical-specs";
import KnowledgePage from "@/pages/knowledge/knowledge";
import KnowledgeDetailsPage from "@/pages/knowledge/knowledgedetails";
import CareersPage from "@/pages/careers";
import ContactPage from "@/pages/contact";
import DistributorPage from "@/pages/distributor";
import InnovationPage from "@/pages/innovation";
import InfrastructurePage from "@/pages/infrastructure";
import EventsPage from "@/pages/events";
import CropsPage from "@/pages/crops/crops";
import NutrientManagementPage from "@/pages/crops/nutrientmanagement";

function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-muted-foreground">
          The page you requested could not be found.
        </p>
      </div>
    </div>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "infrastructure", element: <InfrastructurePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "knowledge", element: <KnowledgePage /> },
      { path: "knowledge/:slug", element: <KnowledgeDetailsPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "distributor", element: <DistributorPage /> },
      { path: "innovation", element: <InnovationPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "crops", element: <CropsPage /> },
      { path: "crops/:slug/nutrients", element: <NutrientManagementPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
  {
    path: "/tech-specs/:slug",
    element: <TechnicalSpecsPage />
  }
];
