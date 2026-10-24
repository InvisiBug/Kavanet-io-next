import { useEffect, useRef, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "@/lib/data/siteData";

const pageLinks = [
  { to: "/personal-projects", label: "Personal Projects" },
  { to: "/community-projects", label: "Community Projects" },
  { to: "/system-simulations", label: "System Simulations" },
  { to: "/about", label: "About / CV" },
];

function SocialIconLink({ href, label, children }: SocialIconLinkProps) {
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
}

function OtherSitesDropdown() {
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const dropdown = dropdownRef.current;
      const target = event.target;

      if (!dropdown || !(target instanceof Node)) {
        return;
      }

      if (!dropdown.contains(target)) {
        dropdown.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  if (siteConfig.otherSites.length === 0) {
    return null;
  }

  return (
    <details ref={dropdownRef} className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-[0.92rem] text-(--text-muted) transition hover:border-(--line) hover:bg-(--surface) hover:text-(--text)">
        Other Sites
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition group-open:rotate-180" aria-hidden="true">
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.12l3.71-3.9a.75.75 0 1 1 1.08 1.04l-4.25 4.47a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" className="fill-current" />
        </svg>
      </summary>

      <div className="absolute left-0 z-50 mt-2 min-w-48 rounded-xl border border-(--line) bg-(--surface) p-2 shadow-[0_12px_30px_rgba(12,21,43,0.14)]">
        <ul className="m-0 list-none p-0">
          {siteConfig.otherSites.map((site) => (
            <li key={site.url}>
              <a href={site.url} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-[0.9rem] text-(--text-muted) no-underline transition hover:bg-(--surface-soft) hover:text-(--text)">
                {site.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(216,222,235,0.8)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[10px]">
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-3">
        <div className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 max-[920px]:grid-cols-[auto_auto]">
          <NavLink to="/" className="text-[1.1rem] font-extrabold text-(--text) no-underline">
            {siteConfig.name}
          </NavLink>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border border-(--line) bg-(--surface) text-(--text) transition hover:border-(--accent) max-[920px]:inline-flex"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-header-mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              {isMenuOpen ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>

          <nav className="flex flex-wrap justify-center gap-2 max-[920px]:hidden" aria-label="Primary navigation">
            {pageLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded-full border px-3 py-1.5 text-[0.92rem] no-underline transition",
                    isActive ? "border-(--line) bg-(--surface) text-(--text)" : "border-transparent text-(--text-muted) hover:border-(--line) hover:bg-(--surface) hover:text-(--text)",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}

            <OtherSitesDropdown />
          </nav>

          <div className="flex gap-2 max-[920px]:hidden" aria-label="Social links">
            <SocialIconLink href={siteConfig.githubUrl} label="GitHub">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.52-1.31-1.28-1.66-1.28-1.66-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.53-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.05 0 0 .96-.31 3.14 1.19a10.88 10.88 0 0 1 5.72 0c2.18-1.5 3.14-1.19 3.14-1.19.62 1.58.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.11 0 4.44-2.69 5.41-5.26 5.7.41.35.78 1.05.78 2.11v3.13c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.linkedinUrl} label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M5.34 8.34A1.67 1.67 0 1 1 5.33 5a1.67 1.67 0 0 1 .01 3.34ZM3.9 9.75h2.9V21H3.9V9.75ZM10.4 9.75h2.78v1.54h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.5 1.95 3.5 4.48V21h-2.9v-5.96c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.14V21h-2.9V9.75Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.instagramUrl} label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm-4.25 3.2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.etsyUrl} label="Etsy">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M3 3h18v4h-1.7c-.17-1.36-.92-2-2.3-2h-4.2v5.2h3.3c1.08 0 1.62-.47 1.74-1.55h1.56v5.3h-1.56c-.1-1.1-.66-1.56-1.74-1.56h-3.3V19h4.57c1.46 0 2.22-.73 2.5-2.34H21V21H3v-1.9h2.1V4.9H3V3Z" />
              </svg>
            </SocialIconLink>
          </div>
        </div>

        <div id="site-header-mobile-menu" className={["hidden max-[920px]:mt-3 max-[920px]:rounded-2xl max-[920px]:border max-[920px]:border-(--line) max-[920px]:bg-(--surface) max-[920px]:p-3", isMenuOpen ? "max-[920px]:block" : ""].join(" ")}>
          <div className="flex flex-wrap justify-center gap-2" aria-label="Social links mobile">
            <SocialIconLink href={siteConfig.githubUrl} label="GitHub">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.52-1.31-1.28-1.66-1.28-1.66-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.53-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.05 0 0 .96-.31 3.14 1.19a10.88 10.88 0 0 1 5.72 0c2.18-1.5 3.14-1.19 3.14-1.19.62 1.58.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.11 0 4.44-2.69 5.41-5.26 5.7.41.35.78 1.05.78 2.11v3.13c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.linkedinUrl} label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M5.34 8.34A1.67 1.67 0 1 1 5.33 5a1.67 1.67 0 0 1 .01 3.34ZM3.9 9.75h2.9V21H3.9V9.75ZM10.4 9.75h2.78v1.54h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.5 1.95 3.5 4.48V21h-2.9v-5.96c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.14V21h-2.9V9.75Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.instagramUrl} label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm-4.25 3.2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
              </svg>
            </SocialIconLink>

            <SocialIconLink href={siteConfig.etsyUrl} label="Etsy">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                <path d="M3 3h18v4h-1.7c-.17-1.36-.92-2-2.3-2h-4.2v5.2h3.3c1.08 0 1.62-.47 1.74-1.55h1.56v5.3h-1.56c-.1-1.1-.66-1.56-1.74-1.56h-3.3V19h4.57c1.46 0 2.22-.73 2.5-2.34H21V21H3v-1.9h2.1V4.9H3V3Z" />
              </svg>
            </SocialIconLink>
          </div>

          <nav className="mt-3 flex flex-col gap-2" aria-label="Primary navigation mobile">
            {pageLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded-full border px-3 py-2 text-[0.95rem] no-underline transition",
                    isActive ? "border-(--line) bg-(--surface-soft) text-(--text)" : "border-transparent text-(--text-muted) hover:border-(--line) hover:bg-(--surface-soft) hover:text-(--text)",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}

            <OtherSitesDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
}

interface SocialIconLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}
