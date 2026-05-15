"use client";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const counterRef = useRef(null);

  // 1. The Asset Tracker
  useEffect(() => {
    const assets = [
      `/videos/rrr2.mp4`,
      `/images/circle-text.svg`,
      `/images/play.svg`,
    ];

    let loadedCount = 0;
    let isForcedComplete = false;

    const updateProgress = () => {
      // Prevent updating if the fallback timer already forced completion
      if (isForcedComplete) return; 
      
      loadedCount++;
      const currentProgress = Math.round((loadedCount / assets.length) * 100);
      setProgress(currentProgress);
    };

    // FAIL-SAFE: Force complete after 4 seconds no matter what
    const fallbackTimer = setTimeout(() => {
      if (loadedCount < assets.length) {
        isForcedComplete = true;
        setProgress(100);
      }
    }, 4000);

    if (assets.length === 0) {
      setProgress(100);
      return;
    }

    assets.forEach((src) => {
      if (src.match(/\.(png|jpe?g|svg|webp|gif)$/i)) {
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
        img.onerror = updateProgress; 
      } 
      else if (src.match(/\.(mp4|webm|ogg)$/i)) {
        const video = document.createElement(`video`);
        video.src = src;
        video.muted = true;
        video.playsInline = true;
        
        // Use loadeddata instead of canplaythrough for mobile compatibility
        video.onloadeddata = updateProgress;
        video.onerror = updateProgress;
        video.onstalled = updateProgress; // Fires if the browser throttles the download
        
        // Explicitly call load() to encourage mobile browsers to fetch metadata
        video.load(); 
      }
      else {
        updateProgress();
      }
    });

    // Cleanup the timer if the component unmounts early
    return () => clearTimeout(fallbackTimer);
  }, []);

  // 2. The GSAP Animations
  useGSAP(() => {
    gsap.to(counterRef.current, {
      innerHTML: progress + `%`,
      duration: 0.5,
      snap: { innerHTML: 1 }, 
      ease: `power2.out`,
    });

    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => setIsMounted(false),
      });

      tl.to(`.loader-content`, { 
          opacity: 0, 
          y: -30, 
          duration: 0.8, 
          delay: 0.4, 
          ease: `power3.inOut` 
        })
        .to(`.preloader-container`, {
          yPercent: -100, 
          duration: 1.2,
          ease: `power4.inOut`,
        }, `-=0.2`);
    }
  }, [progress]); 

  if (!isMounted) return null;

  return (
    <div className={`preloader-container fixed inset-0 z-[9999] bg-[#111111] flex flex-col items-center justify-center`}>
      <div className={`loader-content flex flex-col items-center gap-6`}>
        <h1 className={`text-white text-4xl md:text-6xl font-bold tracking-widest uppercase`}>
          BlackZero
        </h1>
        
        <div className={`w-48 md:w-64 col-center gap-3`}>
          <div className={`w-full h-[2px] bg-white/20 relative overflow-hidden rounded-full`}>
            <div 
              className={`absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out`}
              style={{ width: progress + `%` }}
            />
          </div>
          <span ref={counterRef} className={`text-white/70 text-sm font-mono`}>
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;