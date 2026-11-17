import type { ComponentPropsWithoutRef } from "react";
import { getProjectImageSrc } from "@/lib/helpers";

interface AssetImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  imagePath?: string | null;
  alt: string;
}

const AssetImage = ({ imagePath, ...imageProps }: AssetImageProps) => {
  if (!imagePath || imagePath === null) {
    return null;
  }

  const src = imagePath.startsWith("https://") ? imagePath : getProjectImageSrc(imagePath);

  return src ? <img {...imageProps} src={src} /> : null;
};

export default AssetImage;
