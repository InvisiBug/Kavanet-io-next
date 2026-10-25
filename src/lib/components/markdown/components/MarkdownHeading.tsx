import type { ComponentPropsWithoutRef } from "react";

interface MarkdownHeadingProps extends ComponentPropsWithoutRef<"h1"> {
  level: 1 | 2 | 3;
}

export const MarkdownHeading = ({ level, className: _className, ...props }: MarkdownHeadingProps) => {
  const Heading = `h${level}` as const;
  const headingClassName = level === 1 ? "mt-4 mb-2 text-3xl font-bold first:mt-0" : level === 2 ? "mt-4 mb-2 text-2xl font-semibold first:mt-0" : "mt-4 mb-2 text-xl font-semibold first:mt-0";

  return <Heading className={headingClassName} {...props} />;
};
