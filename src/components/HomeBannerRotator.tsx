import { useEffect, useMemo, useState } from "react";

const bannerModules = import.meta.glob("/src/assets/banners/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const banners = Object.entries(bannerModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "banner";
    const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

    return {
      src,
      alt: `${cleanName} banner image`,
    };
  });

const AUTO_ROTATE_MS = 5000;

export function HomeBannerRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalBanners = useMemo(() => banners.length, []);

  useEffect(() => {
    if (totalBanners < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % totalBanners);
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [totalBanners]);

  if (totalBanners === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_36px_rgba(12,21,43,0.08)]" aria-label="Rotating project highlights">
      <img className="block aspect-[16/7] w-full object-cover" src={banners[activeIndex].src} alt={banners[activeIndex].alt} />

      {totalBanners > 1 ? (
        <div className="flex items-center justify-center gap-2 px-3 pt-3 pb-4" aria-label="Banner selection">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              className={
                index === activeIndex
                  ? "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-[var(--accent)]"
                  : "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-slate-300"
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
