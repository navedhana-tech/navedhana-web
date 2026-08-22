import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIntroDone } from '../../lib/introContext';
import { createPolyMesh } from './polyMesh';

// Animated low-poly mesh behind the hero. Canvas2D — a few hundred filled
// triangles per frame is well within budget, and it avoids both the DOM
// cost of the same shape count in SVG and the WebGL-context/bundle-size
// weight of a three.js scene.
//
// Under prefers-reduced-motion the mesh still renders, just as a single
// static frame with no rAF loop: the visual is part of the page's identity,
// only the movement is the accessibility concern.
const PolyMeshField = () => {
  const reducedMotion = useReducedMotion();
  const introDone = useIntroDone();
  const canvasRef = useRef(null);
  const meshRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let frame = 0;
    let running = true;

    const render = (t) => {
      const mesh = meshRef.current;
      const { width, height } = sizeRef.current;
      if (!mesh || !width) return;
      mesh.update(t);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      mesh.draw(ctx);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { width, height };
      meshRef.current = createPolyMesh(width, height);
      render(0);
    };

    // Measure once up front, then keep observing. The synchronous call paints
    // immediately in the common case where layout is already settled; the
    // observer covers the case where the canvas is still 0x0 on mount (a plain
    // one-shot measure would bail there and never retry, leaving the backing
    // store at its 300x150 default and the mesh unpainted) plus later resizes.
    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);

    if (reducedMotion) {
      return () => sizeObserver.disconnect();
    }

    // Pause once the hero has scrolled out of view — this is the tallest,
    // busiest canvas on the site and the page below it is long.
    let inView = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);

    const loop = (now) => {
      if (!running) return;
      if (inView) render(now / 1000);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      sizeObserver.disconnect();
    };
  }, [reducedMotion]);

  // Masked at the bottom so the mesh dissolves into the page instead of
  // ending on a hard horizontal seam where the section stops.
  const fade = 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)';

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
      style={{ maskImage: fade, WebkitMaskImage: fade, opacity: introDone ? 1 : 0 }}
      aria-hidden="true"
    />
  );
};

export default PolyMeshField;
