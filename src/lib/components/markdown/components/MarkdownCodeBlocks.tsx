import type { ComponentPropsWithoutRef } from "react";

export const MarkdownList = ({ ordered, ...props }: ComponentPropsWithoutRef<"ul"> & { ordered?: boolean }) => {
  const List = ordered ? "ol" : "ul";
  return <List className={ordered ? "mt-3 mb-3 list-decimal pl-5" : "mt-3 mb-3 list-disc pl-5"} {...props} />;
};

export const MarkdownListItem = (props: ComponentPropsWithoutRef<"li">) => {
  return <li className="mb-2 text-(--text-muted) last:mb-0" {...props} />;
};

export const MarkdownPre = (props: ComponentPropsWithoutRef<"pre">) => {
  return <pre className="mt-3 mb-0 overflow-x-auto rounded-xl border border-(--line) bg-[#f8f9fd] p-3" {...props} />;
};

export const MarkdownCode = ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
  return <code className={className ? `${className} rounded-md bg-[#eef1f8] px-1.5 py-0.5` : "rounded-md bg-[#eef1f8] px-1.5 py-0.5"} {...props} />;
};
