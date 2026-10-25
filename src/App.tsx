import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageShell } from "@/lib/components";
import { ContextProvider, useContext } from "@/lib/context";
import { extractLightboxImageFromClick } from "@/lib/helpers";
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
  const { lightboxImage, setLightboxImage } = useContext();

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage, setLightboxImage]);

  return (
    <AppConfig>
      <div
        onClickCapture={(event) => {
          const lightboxCandidate = extractLightboxImageFromClick(event);

          if (lightboxCandidate) {
            setLightboxImage(lightboxCandidate);
          }
        }}
      >
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

        {lightboxImage && window.location.pathname !== "/" ? (
          <div
            data-lightbox-modal="true"
            className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(11,17,30,0.9)] p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxImage(null);
              }
            }}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:border-white hover:text-white"
              onClick={() => setLightboxImage(null)}
            >
              Close
            </button>

            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              data-no-lightbox="true"
              data-lightbox-modal="true"
              className="max-h-[88vh] max-w-[min(96vw,1300px)] rounded-xl border border-white/25 bg-black object-contain shadow-[0_20px_65px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ) : null}
      </div>
    </AppConfig>
  );
}

export default App;
