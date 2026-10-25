import type { MouseEvent } from "react";
import type { LightboxImage } from "@/lib/types";

export const extractLightboxImageFromClick = (event: MouseEvent<HTMLDivElement>): LightboxImage | null => {
  const pathname = window.location.pathname;
  const isLightboxEnabledRoute = pathname !== "/";

  if (!isLightboxEnabledRoute) {
    return null;
  }

  const clickTarget = event.target;

  if (!(clickTarget instanceof HTMLElement)) {
    return null;
  }

  if (clickTarget.closest('[data-lightbox-modal="true"]')) {
    return null;
  }

  const imageElement = clickTarget.closest("img");

  if (!(imageElement instanceof HTMLImageElement)) {
    return null;
  }

  if (imageElement.dataset.noLightbox === "true") {
    return null;
  }

  const src = imageElement.currentSrc || imageElement.src;

  if (!src) {
    return null;
  }

  const linkAncestor = imageElement.closest("a");

  if (linkAncestor) {
    event.preventDefault();
    event.stopPropagation();
  }

  return {
    src,
    alt: imageElement.alt?.trim() || "Expanded image preview",
  };
};
