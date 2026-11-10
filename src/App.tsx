import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage, CategoryPage, ProjectPage, NotFoundPage } from "@/lib/pages";
import { LightboxHost, PageShell, ScrollToTop } from "@/lib/components";
import { ContextProvider } from "@/lib/context";
import HomePage from "@/lib/pages/HomePage";
import AppConfig from "./lib/components/appConfig";

function App() {
  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}

export default App;
