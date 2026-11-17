import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type TransitionEvent as ReactTransitionEvent } from "react";
import type { ProjectEntry } from "@/lib/types";

const AUTO_ROTATE_MS = 5000;

export const useHeroRotator = (projects: ProjectEntry[]) => {
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

  const totalBanners = projects.length;

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

  const selectProject = useCallback(
    (index: number) => {
      if (index === activeIndex || pendingSwipe.current !== null) {
        return;
      }

      const forwardDistance = (index - activeIndex + totalBanners) % totalBanners;
      const backwardDistance = (activeIndex - index + totalBanners) % totalBanners;
      startNavigation(forwardDistance <= backwardDistance ? 1 : -1, index);
    },
    [activeIndex, startNavigation, totalBanners],
  );

  const goToPrevious = useCallback(() => startNavigation(-1), [startNavigation]);
  const goToNext = useCallback(() => startNavigation(1), [startNavigation]);

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

  const slides =
    totalBanners === 0
      ? []
      : [
          { project: projects[totalBanners - 1], index: totalBanners - 1, isClone: true, key: "clone-before" },
          ...projects.map((project, index) => ({ project, index, isClone: false, key: `slide-${project.slug}` })),
          { project: projects[0], index: 0, isClone: true, key: "clone-after" },
        ];

  const trackTransform = `translate3d(calc(${-(activeIndex + 1) * 100}% ${dragOffset < 0 ? "-" : "+"} ${Math.abs(dragOffset)}px), 0, 0)`;

  return {
    activeIndex,
    handleClickCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTransitionEnd,
    isDragging,
    isRepositioning,
    projects,
    selectProject,
    slides,
    trackTransform,
    viewportRef,
    goToNext,
    goToPrevious,
  };
};
