import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LightboxHost, PageShell } from "@/lib/components";
import { ContextProvider } from "@/lib/context";
import { AboutPage, CategoryPage, ProjectPage, NotFoundPage } from "@/lib/pages";
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

export default App;
