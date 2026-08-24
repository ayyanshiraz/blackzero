"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function SplashCursor({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: any[] = [];
    let animationFrameId: number;
    let hue = 0;

    const resize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    
    window.addEventListener("resize", resize);
    resize();

    const addPoint = (x: number, y: number) => {
      hue = (hue + 2) % 360;
      points.push({ 
        x, 
        y, 
        age: 0, 
        color: `hsl(${hue}, 100%, 60%)`,
        size: 60 + Math.random() * 40
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      addPoint(e.clientX - rect.left, e.clientY - rect.top);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;
        
        const lifeLeft = 1 - p.age / 60;
        if (lifeLeft <= 0) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeLeft, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = lifeLeft * 0.6;
        ctx.shadowBlur = 30;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      points = points.filter(p => p.age < 60);

      animationFrameId = requestAnimationFrame(render);
    };

    const parent = canvas.closest("[data-spotlight-container]") as HTMLElement;
    if (parent) {
        parent.addEventListener("mousemove", handleMouseMove);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (parent) parent.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-50", className)}
      style={{ mixBlendMode: "screen" }}
    />
  );
}