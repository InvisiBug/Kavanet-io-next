import { useEffect, useRef } from "react";
import p5 from "p5";

export type SketchFactory = (p: p5) => void;

interface P5CanvasProps {
  sketch: SketchFactory;
  className?: string;
}

export function P5Canvas({ sketch, className }: P5CanvasProps) {
  const canvasRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRootRef.current) {
      return;
    }

    const instance = new p5(sketch, canvasRootRef.current);

    return () => {
      instance.remove();
    };
  }, [sketch]);

  return (
    <div className={className}>
      <div ref={canvasRootRef} className="p5-canvas-host" />
    </div>
  );
}
