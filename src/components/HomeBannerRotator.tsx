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
    <section className="home-banner" aria-label="Rotating project highlights">
      <img src={banners[activeIndex].src} alt={banners[activeIndex].alt} />

      {totalBanners > 1 ? (
        <div className="home-banner-dots" aria-label="Banner selection">
          {banners.map((banner, index) => (
            <button key={banner.src} type="button" className={index === activeIndex ? "banner-dot is-active" : "banner-dot"} onClick={() => setActiveIndex(index)} aria-label={`Show banner ${index + 1}`} aria-pressed={index === activeIndex} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
