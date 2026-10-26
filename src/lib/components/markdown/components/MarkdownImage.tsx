import type { ComponentPropsWithoutRef } from "react";

export const MarkdownImage = ({ className, src = "", alt = "", ...props }: ComponentPropsWithoutRef<"img">) => {
  if (/\.(mp4|webm|mov)(?:$|[?#])/i.test(src)) {
    return <video className={className ?? "mx-auto mt-3 mb-4 block w-full max-w-160 rounded-xl border border-(--line) bg-black"} src={src} controls preload="metadata" playsInline aria-label={alt || undefined} />;
  }

  return <img src={src} alt={alt} {...props} className={className ?? "mx-auto mt-3 mb-4 block w-full   rounded-xl border border-(--line) bg-[#f8f9fd]"} />;
};
