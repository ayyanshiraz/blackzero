"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import "./styles/Loading.css";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  const counterRef = useRef(null);
  const wrapperRef = useRef(null);
  const progressRef = useRef(0);
  const resolvedRef = useRef(false);

  // Smooth counter display via RAF
  const displayedRef = useRef(0);
  const updateCounter = useCallback((target) => {
    const step = () => {
      const diff = target - displayedRef.current;
      if (Math.abs(diff) < 0.5) {
        displayedRef.current = target;
      } else {
        displayedRef.current += diff * 0.12; 
      }
      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(displayedRef.current)).padStart(3, "0");
      }
    };
    return step;
  }, []);

  // Exit animation calls onComplete when fully gone
  const runExit = useCallback(() => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    displayedRef.current = 100;
    if (counterRef.current) counterRef.current.textContent = "100";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMounted(false);
        if (onComplete) onComplete();
      },
    });

    tl.to([".cyber-header", ".quantum-core-container", ".cyber-footer"], {
      opacity: 0,
      y: -24,
      stagger: 0.08,
      duration: 0.55,
      ease: "power3.inOut",
    })
      .to(
        wrapperRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.15"
      );
  }, [onComplete]);

  // Forces a strict 60 second load time
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let rafId;
    const duration = 60000; // 60 seconds in milliseconds
    const startTime = Date.now();

    // Calculate progress smoothly over exactly one minute
    const tick = () => {
      const elapsed = Date.now() - startTime;
      let currentProgress = (elapsed / duration) * 100;

      if (currentProgress >= 100) {
        currentProgress = 100;
      }

      progressRef.current = currentProgress;
      const rounded = Math.round(progressRef.current);
      setProgress(rounded);
      updateCounter(rounded)();

      if (currentProgress < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        runExit();
      }
    };
    
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, [runExit, updateCounter]);

  if (!isMounted) return null;

  return (
    <div
      ref={wrapperRef}
      className="cyber-loader-wrapper"
    >
      <div className="cyber-grid" />
      <div className="cyber-vignette" />

      <div className="cyber-header">
        <div className="brand-container">
          {/* Replaced video with image element */}
          <img
            src="/videos/bz.png"
            alt="Logo"
            className="cyber-logo"
          />
        </div>
      </div>

      <div className="quantum-core-container">
        <div className="quantum-scene">
          <div className="orbital-ring ring-1" />
          <div className="orbital-ring ring-2" />
          <div className="orbital-ring ring-3" />
          <div className="orbital-ring ring-4" />
          <div className="core-percentage">
            <span ref={counterRef} className="percent-number">000</span>
            <span className="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <div className="cyber-footer">
        <div className="loading-bar-container">
          <div
            className="loading-bar-fill"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;