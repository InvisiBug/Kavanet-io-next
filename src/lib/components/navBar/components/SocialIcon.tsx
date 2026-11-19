import type { FC, ReactNode } from "react";
import { Github, LinkedIn, Instagram, Etsy } from "../../Icons";

const SocialIconLink: FC<SocialIconLinkProps> = ({ href, label, name }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--line) bg-(--surface) text-(--text-muted) transition hover:border-(--accent) hover:text-(--text)"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
        <SocialIcon name={name} />
      </svg>
    </a>
  );
};
export default SocialIconLink;

const SocialIcon: FC<SocialIconProps> = ({ name }) => {
  switch (name) {
    case "github":
      return <Github />;
    case "linkedin":
      return <LinkedIn />;
    case "instagram":
      return <Instagram />;
    case "etsy":
      return <Etsy />;
  }
};

interface SocialIconLinkProps extends SocialIconProps {
  href: string;
  label: string;
}

interface SocialIconProps {
  name: string;
}
