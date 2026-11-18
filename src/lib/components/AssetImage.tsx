import type { ComponentPropsWithoutRef } from "react";
import { getProjectImageSrc } from "@/lib/helpers";

interface AssetImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  imagePath?: string | null;
  alt: string;
}

const AssetImage = ({ imagePath, ...imageProps }: AssetImageProps) => {
  const isDirectUrl = imagePath?.startsWith("https://") || imagePath?.startsWith("data:") || imagePath?.includes("/assets/");

  const resolvedSrc = imagePath ? (isDirectUrl ? imagePath : getProjectImageSrc(imagePath)) : null;

  if (!imagePath) {
    console.warn("AssetImage: No imagePath provided.");
    return null;
  }

  return resolvedSrc ? <img {...imageProps} src={resolvedSrc} /> : null;
};

export default AssetImage;
