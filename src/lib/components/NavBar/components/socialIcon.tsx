import type { ReactNode } from "react";

const SocialIconLink = ({ href, label, children }: SocialIconLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--line) bg-(--surface) text-(--text-muted) transition hover:border-(--accent) hover:text-(--text)"
    >
      {children}
    </a>
  );
};
export default SocialIconLink;

interface SocialIconLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}
