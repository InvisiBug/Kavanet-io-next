import { useEffect, useRef } from "react";
import { siteConfig } from "@/data";

const OtherSitesDropdown = ({ title, children }) => {
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

  if (siteConfig.navBar.otherSites.length === 0) {
    return null;
  }

  return (
    <details ref={dropdownRef} className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-[0.92rem] text-(--text-muted) transition hover:border-(--line) hover:bg-(--surface) hover:text-(--text) max-[1100px]:w-full max-[1100px]:justify-center">
        {title}
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition group-open:rotate-180" aria-hidden="true">
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.12l3.71-3.9a.75.75 0 1 1 1.08 1.04l-4.25 4.47a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" className="fill-current" />
        </svg>
      </summary>
      {children}
    </details>
  );
};

export default OtherSitesDropdown;
