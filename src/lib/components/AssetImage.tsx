import type { ComponentPropsWithoutRef } from "react";
import { getProjectImageSrc } from "@/lib/helpers";

interface AssetImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  imagePath?: string | null;
  alt: string;
}

const AssetImage = ({ imagePath, ...imageProps }: AssetImageProps) => {
  const normalizedImagePath = imagePath?.startsWith("@/") ? `/src/${imagePath.slice(2)}` : imagePath; //* 🌀:1
  const isDirectUrl = normalizedImagePath?.startsWith("https://") || normalizedImagePath?.startsWith("data:") || normalizedImagePath?.includes("/assets/");
  console.log("🚀 ~ AssetImage ~ isDirectUrl:", isDirectUrl);

  const resolvedSrc = normalizedImagePath ? (isDirectUrl ? normalizedImagePath : getProjectImageSrc(normalizedImagePath)) : null;
  console.log("🚀 ~ AssetImage ~ resolvedSrc:", resolvedSrc);

  if (!imagePath) {
    console.warn("AssetImage: No imagePath provided.");
    return null;
  }

  return resolvedSrc ? <img {...imageProps} src={resolvedSrc} /> : null;
};

export default AssetImage;
