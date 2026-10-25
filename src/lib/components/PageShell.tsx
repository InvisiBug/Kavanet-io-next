import { useEffect, useState, type MouseEventHandler, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "@/lib/components/SiteHeader";

export function PageShell({ children }: PropsWithChildren) {
  const location = useLocation();
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const isLightboxEnabledRoute = location.pathname !== "/";

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  useEffect(() => {
    if (location.pathname === "/") {
      setLightboxImage(null);
    }
  }, [location.pathname]);

  const handleImageClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isLightboxEnabledRoute) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const image = target.closest("img");

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    if (image.dataset.noLightbox === "true") {
      return;
    }

    const src = image.currentSrc || image.src;

    if (!src) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setLightboxImage({
      src,
      alt: image.alt || "Expanded image preview",
    });
  };

  return (
    <div
      className={["min-h-screen bg-[radial-gradient(circle_at_88%_2%,#ffe9c7_0%,transparent_34%),radial-gradient(circle_at_8%_100%,#dff9f6_0%,transparent_30%),var(--bg)]", isLightboxEnabledRoute ? "lightbox-enabled" : ""].join(" ")}
      onClickCapture={handleImageClick}
    >
      <SiteHeader />
      <main className="mx-auto w-[min(1120px,calc(100%-2rem))] px-0 pt-5 pb-12 max-[680px]:w-[min(1120px,calc(100%-1rem))]">{children}</main>

      {lightboxImage ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(11,17,30,0.9)] p-4" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setLightboxImage(null)}>
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-black/60"
            aria-label="Close image preview"
            onClick={() => setLightboxImage(null)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            data-no-lightbox="true"
            className="max-h-[88vh] max-w-[min(96vw,1300px)] rounded-xl border border-white/25 bg-black object-contain shadow-[0_20px_65px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}

interface LightboxImage {
  src: string;
  alt: string;
}
