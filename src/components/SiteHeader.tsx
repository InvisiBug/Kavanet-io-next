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
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="site-brand">
          {siteConfig.name}
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {pageLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="social-links" aria-label="Social links">
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
