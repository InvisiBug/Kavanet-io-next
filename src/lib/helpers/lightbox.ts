import type { MouseEvent } from "react";
import type { LightboxImage } from "@/lib/types";

const getLightboxImageElements = (): HTMLImageElement[] => Array.from(document.querySelectorAll("img")).filter((imageElement) => imageElement.dataset.noLightbox !== "true" && !imageElement.closest('[data-lightbox-modal="true"]'));

export const getLightboxImageAtIndex = (index: number): LightboxImage | null => {
  const imageElement = getLightboxImageElements()[index];

  if (!imageElement) {
    return null;
  }

  const src = imageElement.currentSrc || imageElement.src;

  if (!src) {
    return null;
  }

  return {
    src,
    alt: imageElement.alt?.trim() || "Expanded image preview",
    index,
  };
};

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

  const index = getLightboxImageElements().indexOf(imageElement);

  if (index < 0) {
    return null;
  }

  const linkAncestor = imageElement.closest("a");

  if (linkAncestor) {
    event.preventDefault();
    event.stopPropagation();
  }

  return getLightboxImageAtIndex(index);
};
