import { NavLink } from "react-router-dom";
import { siteConfig } from "@/siteConfig";

const pageLinks = [
  { to: "/personal-projects", label: "Personal Projects" },
  { to: "/community-projects", label: "Community Projects" },
  { to: "/system-simulations", label: "System Simulations" },
  { to: "/about", label: "About / CV" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(216,222,235,0.8)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[10px]">
      <div className="mx-auto grid min-h-[4.25rem] w-[min(1120px,calc(100%-2rem))] grid-cols-[auto_1fr_auto] items-center gap-3 max-[920px]:grid-cols-1 max-[920px]:py-3">
        <NavLink to="/" className="text-[1.1rem] font-extrabold text-[var(--text)] no-underline max-[920px]:justify-self-center max-[680px]:justify-self-start">
          {siteConfig.name}
        </NavLink>

        <nav className="flex flex-wrap justify-center gap-2 max-[680px]:justify-start" aria-label="Primary navigation">
          {pageLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "rounded-full border px-3 py-1.5 text-[0.92rem] no-underline transition",
                  isActive ? "border-[var(--line)] bg-[var(--surface)] text-[var(--text)]" : "border-transparent text-[var(--text-muted)] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--text)]",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-3 max-[920px]:justify-self-center max-[680px]:w-full max-[680px]:justify-start" aria-label="Social links">
          <a className="font-semibold text-[var(--text-muted)] no-underline hover:text-[var(--text)]" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="font-semibold text-[var(--text-muted)] no-underline hover:text-[var(--text)]" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
