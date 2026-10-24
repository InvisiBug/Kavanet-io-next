import { useLayoutEffect, useRef } from "react";
import p5 from "p5";

let activeP5Instance: p5 | null = null;
let activeP5Host: HTMLDivElement | null = null;

export function P5Canvas({ sketch, className }: P5CanvasProps) {
  const canvasRootRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<p5 | null>(null);

  useLayoutEffect(() => {
    const host = canvasRootRef.current;

    if (!host) {
      return;
    }

    // Keep exactly one active p5 instance globally to avoid duplicate canvases
    // during route transitions and StrictMode double-invocation.
    if (activeP5Instance) {
      activeP5Instance.remove();
      activeP5Instance = null;
    }

    if (activeP5Host && activeP5Host !== host) {
      activeP5Host.replaceChildren();
    }

    instanceRef.current?.remove();
    host.replaceChildren();

    const instance = new p5(sketch, host);
    instanceRef.current = instance;
    activeP5Instance = instance;
    activeP5Host = host;

    return () => {
      instance.remove();
      if (instanceRef.current === instance) {
        instanceRef.current = null;
      }
      if (activeP5Instance === instance) {
        activeP5Instance = null;
      }
      if (activeP5Host === host) {
        activeP5Host = null;
      }
      host.replaceChildren();
    };
  }, [sketch]);

  return (
    <div className={className}>
      <div ref={canvasRootRef} className="w-full [&>canvas]:block [&>canvas]:w-full [&>canvas]:h-auto [&>canvas]:rounded-xl [&>canvas]:border [&>canvas]:border-[rgba(216,222,235,0.9)]" />
    </div>
  );
}

export type SketchFactory = (p: p5) => void;

interface P5CanvasProps {
  sketch: SketchFactory;
  className?: string;
}
