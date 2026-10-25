import type { ComponentPropsWithoutRef } from "react";

export const MarkdownLink = ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className="font-semibold text-(--accent) underline decoration-(--accent)/40 underline-offset-3 transition hover:text-(--text) hover:decoration-(--text)"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
