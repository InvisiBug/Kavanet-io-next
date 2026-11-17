import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
} from "react";
import { Link } from "react-router-dom";
import { getProjectImageSrc, getRandomProjects } from "@/lib/helpers";

const AUTO_ROTATE_MS = 5000;

const HomeBannerRotator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const pendingSwipe = useRef<number | null>(null);
  const pendingTarget = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const suppressClickTimeout = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const highlightedProjects = useMemo(() => getRandomProjects(3), []);
  const totalBanners = highlightedProjects.length;

  const startNavigation = useCallback(
    (direction: number, targetIndex: number | null = null, width = viewportRef.current?.clientWidth ?? 0) => {
      if (pendingSwipe.current !== null || totalBanners < 2) {
        return;
      }

      pendingSwipe.current = direction;
      pendingTarget.current = targetIndex;
      setIsDragging(false);
      setDragOffset(-direction * width);
    },
    [totalBanners],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || totalBanners < 2 || pendingSwipe.current !== null) {
      return;
    }

    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      swipeStart.current = null;
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    if (Math.abs(deltaX) > 8) {
      setIsDragging(true);
      setDragOffset(deltaX);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const swipeThreshold = Math.max(40, event.currentTarget.clientWidth * 0.15);
    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    suppressClick.current = true;
    if (suppressClickTimeout.current !== null) {
      window.clearTimeout(suppressClickTimeout.current);
    }
    suppressClickTimeout.current = window.setTimeout(() => {
      suppressClick.current = false;
      suppressClickTimeout.current = null;
    }, 500);

    startNavigation(deltaX < 0 ? 1 : -1, null, event.currentTarget.clientWidth);
  };

  const handlePointerCancel = () => {
    swipeStart.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTransitionEnd = (event: ReactTransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || pendingSwipe.current === null) {
      return;
    }

    const direction = pendingSwipe.current;
    const nextIndex = (activeIndex + direction + totalBanners) % totalBanners;
    setActiveIndex(nextIndex);
    if (pendingTarget.current === nextIndex || pendingTarget.current === null) {
      pendingSwipe.current = null;
      pendingTarget.current = null;
      setIsRepositioning(true);
      setDragOffset(0);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLElement>) => {
    if (!suppressClick.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
    if (suppressClickTimeout.current !== null) {
      window.clearTimeout(suppressClickTimeout.current);
      suppressClickTimeout.current = null;
    }
  };

  useEffect(() => {
    if (!isRepositioning) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => setIsRepositioning(false));
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isRepositioning]);

  useEffect(() => {
    if (totalBanners < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (swipeStart.current !== null || pendingSwipe.current !== null) {
        return;
      }

      startNavigation(1);
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
      if (suppressClickTimeout.current !== null) {
        window.clearTimeout(suppressClickTimeout.current);
      }
    };
  }, [startNavigation, totalBanners]);

  if (totalBanners === 0) {
    return null;
  }

  const slides = [
    { project: highlightedProjects[totalBanners - 1], index: totalBanners - 1, isClone: true },
    ...highlightedProjects.map((project, index) => ({ project, index, isClone: false })),
    { project: highlightedProjects[0], index: 0, isClone: true },
  ];
  const trackTransform = `translate3d(calc(${-(activeIndex + 1) * 100}% ${dragOffset < 0 ? "-" : "+"} ${Math.abs(dragOffset)}px), 0, 0)`;

  return (
    <section
      className="overflow-hidden rounded-[1.2rem] border border-(--line) bg-(--surface) shadow-[0_18px_36px_rgba(12,21,43,0.08)]"
      aria-label="Rotating project highlights"
    >
      <div
        ref={viewportRef}
        className="relative touch-pan-y overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        <div
          className={`flex w-full ${isDragging || isRepositioning ? "" : "transition-transform duration-300 ease-out"}`}
          style={{ transform: trackTransform }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map(({ project, index, isClone }, slideIndex) => {
            const imageSrc = getProjectImageSrc(project.imagePath);

            return (
              <Link
                key={`${project.slug}-${isClone ? `clone-${slideIndex}` : "slide"}`}
                to={`/${project.category}/${project.slug}`}
                className="relative block w-full shrink-0"
                aria-hidden={isClone || index !== activeIndex}
                tabIndex={!isClone && index === activeIndex ? 0 : -1}
              >
                <div className="relative grid h-60 min-h-60 content-center gap-3 px-6 py-8 text-white">
                  {imageSrc ? <img src={imageSrc} alt={`${project.title} placeholder`} className="absolute inset-0 h-full w-full object-cover" /> : null}
                  <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(20,33,61,0.92),rgba(27,82,129,0.0))]" />

                  <div className="relative z-10 grid gap-3">
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-sky-200">Project Spotlight</p>
                    <h2 className="m-0 text-3xl font-bold leading-tight">{project.title}</h2>
                    <p className="m-0 max-w-[70ch] text-slate-100/90">{project.summary}</p>
                    <div className="mt-2 inline-block w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 no-underline transition hover:bg-sky-100">View Project</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {totalBanners > 1 ? (
        <div className="flex items-center justify-center gap-2 px-3 pt-3 pb-4" role="group" aria-label="Banner navigation">
          <button
            type="button"
            className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-(--text-muted) transition hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) md:flex"
            onClick={() => startNavigation(-1)}
            aria-label="Previous project"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          {highlightedProjects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={index === activeIndex ? "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-(--accent)" : "h-2.5 w-2.5 cursor-pointer rounded-full border-0 bg-slate-300"}
              onClick={() => {
                if (index === activeIndex || pendingSwipe.current !== null) {
                  return;
                }

                const forwardDistance = (index - activeIndex + totalBanners) % totalBanners;
                const backwardDistance = (activeIndex - index + totalBanners) % totalBanners;
                startNavigation(forwardDistance <= backwardDistance ? 1 : -1, index);
              }}
              aria-label={`Show banner ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
          <button
            type="button"
            className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-(--text-muted) transition hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) md:flex"
            onClick={() => startNavigation(1)}
            aria-label="Next project"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default HomeBannerRotator;
