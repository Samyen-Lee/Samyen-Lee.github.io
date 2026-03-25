"use client";

import { useRef, useEffect, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ConstellationBg({ isVisible = true }: { isVisible?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const lastFrameTime = useRef<number>(0);

  const init = useCallback(() => {
    const count = 60;
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  const draw = useCallback((time: number) => {
    if (time - lastFrameTime.current < 33) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameTime.current = time;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);
    const stars = starsRef.current;
    const connectionDist = 0.15;

    for (const star of stars) {
      star.x += star.vx;
      star.y += star.vy;
      if (star.x < 0 || star.x > 1) star.vx *= -1;
      if (star.y < 0 || star.y > 1) star.vy *= -1;
    }

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(stars[i].x * w, stars[i].y * h);
          ctx.lineTo(stars[j].x * w, stars[j].y * h);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(147, 197, 253, 0.5)";
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isVisible) {
      animRef.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, isVisible]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
}
