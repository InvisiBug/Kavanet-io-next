import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageShell } from "@/lib/components/PageShell";
import { AboutPage } from "@/pages/AboutPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectPage } from "@/pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/personal-projects" element={<CategoryPage category="personal-projects" />} />
          <Route path="/community-projects" element={<CategoryPage category="community-projects" />} />
          <Route path="/system-simulations" element={<CategoryPage category="system-simulations" />} />
          <Route path="/:category/:projectSlug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}

export default App;
