import { useEffect, type PropsWithChildren } from "react";
import { extractLightboxImageFromClick } from "@/lib/helpers";
import { useContext } from "@/lib/context";

const LightboxHost = ({ children }: PropsWithChildren) => {
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
    <div
      onClickCapture={(event) => {
        const lightboxCandidate = extractLightboxImageFromClick(event);

        if (lightboxCandidate) {
          setLightboxImage(lightboxCandidate);
        }
      }}
    >
      {children}

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
  );
};

export default LightboxHost;
