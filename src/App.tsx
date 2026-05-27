import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/router";
import { ScrollToTop } from "./components/common/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
