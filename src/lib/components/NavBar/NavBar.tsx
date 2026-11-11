import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SocialIconLink, OtherSitesDropdown, ThemeToggleButton } from "./components";
import { siteConfig } from "@/data";
import { useContext } from "@/lib/context";
import { getToggledTheme } from "@/lib/helpers";

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-(--header-line) bg-(--header-bg) backdrop-blur-[10px]">
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-3">
        {/* Regular Menu */}
        <div className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 max-[1100px]:grid-cols-[auto_auto]">
          <NavLink to="/" className="text-[1.1rem] font-extrabold text-(--text) no-underline">
            {siteConfig.name}
          </NavLink>

          <div className="hidden max-[1100px]:flex items-center justify-self-end gap-2">
            <div className="flex gap-2" aria-label="Social links header">
              {siteConfig.navBar.socialLinks.map((social) => (
                <SocialIconLink key={social.name} href={social.url} label={social.label} name={social.name} />
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--line) bg-(--surface) text-(--text) transition hover:border-(--accent)"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="site-header-mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
                {isMenuOpen ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>

          {/* Page Links */}
          <nav className="flex flex-wrap justify-center gap-2 max-[1100px]:hidden" aria-label="Primary navigation">
            {siteConfig.navBar.pageLinks.map((link) => (
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

            {/* Other Sites */}
            <OtherSitesDropdown />

            {/* Theme & Socials */}
            <div className="flex gap-2 max-[1100px]:hidden" aria-label="Social links">
              <ThemeToggleButton theme={theme} onToggle={() => setTheme((current) => getToggledTheme(current))} />

              {siteConfig.navBar.socialLinks.map((social) => (
                <SocialIconLink key={social.name} href={social.url} label={social.label} name={social.name} />
              ))}
            </div>
          </nav>
        </div>

        {/* Hamburger Menu */}
        <div
          id="site-header-mobile-menu"
          className={["hidden max-[1100px]:mt-3 max-[1100px]:rounded-2xl max-[1100px]:border max-[1100px]:border-(--line) max-[1100px]:bg-(--surface) max-[1100px]:p-3", isMenuOpen ? "max-[1100px]:block" : ""].join(" ")}
        >
          {/* Page Links */}
          <nav className="flex flex-col gap-2" aria-label="Primary navigation mobile">
            <div className="mb-1 flex items-center justify-between border-b border-(--line) pb-3">
              <span className="text-[0.92rem] text-(--text-muted)">Theme</span>
              <ThemeToggleButton theme={theme} onToggle={() => setTheme((current) => getToggledTheme(current))} />
            </div>

            {siteConfig.navBar.pageLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded-full border px-3 py-2 text-center text-[0.95rem] no-underline transition",
                    isActive ? "border-(--line) bg-(--surface-soft) text-(--text)" : "border-transparent text-(--text-muted) hover:border-(--line) hover:bg-(--surface-soft) hover:text-(--text)",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Other Sites */}
            <OtherSitesDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};

export type SocialIconProps = {
  name: string;
};

export default SiteHeader;
