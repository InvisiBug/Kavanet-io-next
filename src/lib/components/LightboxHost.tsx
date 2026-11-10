import { useEffect, useState, type PropsWithChildren } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { extractLightboxImageFromClick, getLightboxImageAtIndex } from "@/lib/helpers";
import type { LightboxImage } from "@/lib/types";

const LightboxHost = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const lightboxIndex = searchParams.get("lightbox");
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  const closeLightbox = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("lightbox");
    setSearchParams(nextSearchParams, { replace: true });
  };

  useEffect(() => {
    if (lightboxIndex === null) {
      setLightboxImage(null);
      return;
    }

    const index = Number(lightboxIndex) - 1;

    if (!Number.isInteger(index) || index < 0) {
      setLightboxImage(null);
      return;
    }

    setLightboxImage(getLightboxImageAtIndex(index));
  }, [lightboxIndex, location.pathname]);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.delete("lightbox");
        setSearchParams(nextSearchParams, { replace: true });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage, searchParams, setSearchParams]);

  return (
    <div
      onClickCapture={(event) => {
        const lightboxCandidate = extractLightboxImageFromClick(event);

        if (lightboxCandidate) {
          const nextSearchParams = new URLSearchParams(searchParams);
          nextSearchParams.set("lightbox", String(lightboxCandidate.index + 1));
          setSearchParams(nextSearchParams);
        }
      }}
    >
      {children}

      {lightboxImage ? (
        <div
          data-lightbox-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(11,17,30,0.9)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            className="absolute cursor-pointer right-4 top-4 rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:border-white hover:text-white"
            onClick={closeLightbox}
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
  );
};

export default LightboxHost;
