import type { MouseEvent } from "react";
import type { LightboxImage } from "@/lib/types";

const getLightboxImageElements = (): HTMLImageElement[] => Array.from(document.querySelectorAll("img")).filter((imageElement) => imageElement.dataset.noLightbox !== "true" && !imageElement.closest('[data-lightbox-modal="true"]'));

const createLightboxImage = (imageElement: HTMLImageElement, index: number): LightboxImage | null => {
  const src = imageElement.currentSrc || imageElement.src;

  if (!src) {
    return null;
  }

  return {
    src,
    alt: imageElement.alt?.trim() || "Expanded image preview",
    index,
    id: btoa(new URL(src, window.location.href).href).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  };
};

export const getLightboxImageAtIndex = (index: number): LightboxImage | null => {
  const imageElement = getLightboxImageElements()[index];
  return imageElement ? createLightboxImage(imageElement, index) : null;
};

export const getLightboxImageById = (id: string): LightboxImage | null => {
  if (/^\d+$/.test(id)) {
    return getLightboxImageAtIndex(Number(id) - 1);
  }

  try {
    const base64 = id.replace(/-/g, "+").replace(/_/g, "/");
    const imageUrl = new URL(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    const imageElement = getLightboxImageElements().find((element) => new URL(element.currentSrc || element.src, window.location.href).href === imageUrl.href);

    if (!imageElement) {
      return null;
    }

    return createLightboxImage(imageElement, getLightboxImageElements().indexOf(imageElement));
  } catch {
    return null;
  }
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
