import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LightboxHost, PageShell } from "@/lib/components";
import { ContextProvider } from "@/lib/context";
import { AboutPage, CategoryPage, ProjectPage, NotFoundPage, Community, Personal, Simulations } from "@/lib/pages";
import HomePage from "@/lib/pages/HomePage";
import AppConfig from "./appConfig";

function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

function AppContent() {
  return (
    <AppConfig>
      <LightboxHost>
        <BrowserRouter>
          <ScrollToTop />
          <PageShell>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutPage />} />

              <Route path="/personal" element={<CategoryPage category="personal" />} />
              <Route path="/community" element={<CategoryPage category="community" />} />
              <Route path="/simulations" element={<CategoryPage category="simulations" />} />

              <Route path="/:category/:projectSlug" element={<ProjectPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageShell>
        </BrowserRouter>
      </LightboxHost>
    </AppConfig>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default App;
