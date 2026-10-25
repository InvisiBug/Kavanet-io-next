import type { ComponentPropsWithoutRef } from "react";

export const MarkdownImage = ({ className, ...props }: ComponentPropsWithoutRef<"img">) => {
  return <img {...props} className={className ?? "mx-auto mt-3 mb-4 block w-full max-w-160 rounded-xl border border-(--line) bg-[#f8f9fd]"} />;
};
