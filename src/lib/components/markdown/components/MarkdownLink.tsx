import type { ComponentPropsWithoutRef } from "react";

const GITHUB_HOSTS = new Set(["github.com", "www.github.com"]);

export const MarkdownLink = ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
  const isExternal = /^https?:\/\//.test(href);
  let githubRepository: string | null = null;
  const instagramEmbedUrl = getInstagramEmbedUrl(href);

  if (instagramEmbedUrl) {
    return (
      <iframe
        src={instagramEmbedUrl}
        title="Instagram post"
        className="mx-auto block w-full  max-w-135 rounded-lg border border-(--line) bg-(--surface)"
        style={{ height: "680px" }}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  try {
    const url = new URL(href);
    const pathParts = url.pathname.split("/").filter(Boolean);

    if (GITHUB_HOSTS.has(url.hostname.toLowerCase()) && pathParts.length >= 2) {
      githubRepository = `${pathParts[0]}/${pathParts[1].replace(/\.git$/, "")}`;
    }
  } catch {
    // Relative links and malformed URLs use the standard markdown link renderer.
  }

  if (githubRepository) {
    return (
      <a
        href={href}
        className="my-3 flex max-w-1/3 items-center gap-3 rounded-lg border border-(--line) bg-(--surface-soft) px-3 py-2.5 text-(--text) no-underline transition hover:border-(--accent)/50 hover:bg-(--surface)"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--text) text-sm font-bold text-(--surface)" aria-hidden="true">
          GH
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{githubRepository}</span>
          <span className="block truncate text-xs text-(--text-muted)">GitHub repository</span>
        </span>
        <span className="shrink-0 text-lg text-(--text-muted)" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

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

const getInstagramEmbedUrl = (href: string): string | null => {
  try {
    const url = new URL(href);
    const pathMatch = url.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);

    if (!["instagram.com", "www.instagram.com"].includes(url.hostname.toLowerCase()) || !pathMatch) {
      return null;
    }

    return `https://www.instagram.com/${pathMatch[1]}/${pathMatch[2]}/embed/`;
  } catch {
    return null;
  }
};
