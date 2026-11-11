import { useEffect, type RefObject } from "react";
import { NavLink } from "react-router-dom";
import { siteConfig } from "@/data";
import { useContext } from "@/lib/context";
import { getToggledTheme } from "@/lib/helpers";
import { Dropdown, ThemeToggleButton } from "./";
import QRCode from "./qr-code.png";

type HamburgerProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  menuRef: RefObject<HTMLDivElement | null>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  mobileMenuRef: RefObject<HTMLDivElement | null>;
};

const Hamburger = ({ isMenuOpen, setIsMenuOpen, menuRef, menuButtonRef, mobileMenuRef }: HamburgerProps) => {
  const { theme, setTheme } = useContext();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (menuButtonRef.current?.contains(target) || mobileMenuRef.current?.contains(target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen, menuButtonRef, mobileMenuRef, setIsMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]); // Location.pathname is used to close the menu when navigating to a new page

  return (
    <div
      ref={menuRef}
      id="site-header-mobile-menu"
      className={[
        "absolute left-0 right-0 top-full z-50 hidden max-[1100px]:overflow-visible max-[1100px]:rounded-b-2xl max-[1100px]:border max-[1100px]:border-(--line) max-[1100px]:bg-(--surface) max-[1100px]:p-3 max-[1100px]:shadow-[0_12px_30px_rgba(12,21,43,0.14)]",
        isMenuOpen ? "max-[1100px]:block" : "",
      ].join(" ")}
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
        <Dropdown title="Other Sites">
          <div className="absolute left-1/2 z-50 mt-2 min-w-48 -translate-x-1/2 rounded-xl border border-(--line) bg-(--surface) p-2 shadow-[0_12px_30px_rgba(12,21,43,0.14)]">
            <ul className="m-0 list-none p-0">
              {siteConfig.navBar.otherSites.map((site) => (
                <li key={site.url}>
                  <a href={site.url} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-center text-[0.9rem] text-(--text-muted) no-underline transition hover:bg-(--surface-soft) hover:text-(--text)">
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Dropdown>

        <Dropdown title="Qr Code">
          <div className="absolute left-1/2 z-50 mt-2 min-w-75 -translate-x-1/2 rounded-xl border border-(--line) bg-(--surface) p-2 shadow-[0_12px_30px_rgba(12,21,43,0.14)]">
            <img src={QRCode} alt="QR code" className="w-full" />
          </div>
        </Dropdown>
      </nav>
    </div>
  );
};

export default Hamburger;
