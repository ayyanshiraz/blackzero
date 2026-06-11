"use client";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./styles/Loading.css";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  
  const counterRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = ``;
    };
  }, []);

  useEffect(() => {
    let percent = 0;
    let activeInterval;

    const startSlowPhase = () => {
      activeInterval = setInterval(() => {
        percent += Math.round(Math.random());
        if (percent > 91) {
          clearInterval(activeInterval);
        } else {
          setProgress(percent);
        }
      }, 400); 
    };

    activeInterval = setInterval(() => {
      if (percent <= 50) {
        percent += Math.round(Math.random() * 5);
        setProgress(Math.min(percent, 50));
      } else {
        clearInterval(activeInterval);
        startSlowPhase();
      }
    }, 100);

    const forceComplete = setTimeout(() => {
      clearInterval(activeInterval);
      setProgress(100);
    }, 4000);

    return () => {
      clearInterval(activeInterval);
      clearTimeout(forceComplete);
    };
  }, []);

  useGSAP(() => {
    if (counterRef.current) {
      const proxy = { val: parseInt(counterRef.current.innerHTML, 10) || 0 };
      gsap.to(proxy, {
        val: progress,
        duration: 0.2,
        ease: `none`,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerHTML = String(Math.round(proxy.val)).padStart(3, `0`);
          }
        }
      });
    }

    if (progress === 100) {
      setLoaded(true); 

      const tl = gsap.timeline({
        onComplete: () => setIsMounted(false),
      });

      tl.to([`.cyber-header`, `.quantum-core-container`, `.cyber-footer`], { 
          opacity: 0, 
          y: -30, 
          stagger: 0.15,
          duration: 0.7, 
          ease: `power3.inOut`,
          delay: 0.6 
        })
        .to(wrapperRef.current, {
          yPercent: -100, 
          duration: 1, 
          ease: `power4.inOut`,
        }, `-=0.2`); 
    }
  }, [progress]); 

  if (!isMounted) return null;

  return (
    <div 
      ref={wrapperRef}
      className={`cyber-loader-wrapper fixed inset-0 z-[9999] bg-[#0A0A0A] ${loaded ? `warp-drive-exit` : ``}`}
    >
      <div className={`cyber-grid`}></div>
      <div className={`cyber-vignette`}></div>

      <div className={`cyber-header`}>
        <div className={`brand-container`}>
          {/* Swapped Image for Video Element */}
          <video 
            src={`/videos/logovideo3.mp4`} 
            autoPlay 
            loop 
            muted 
            playsInline
            className={`cyber-logo`} 
          />
          <div className={`cyber-brand`}>BLACKZERO <span>//</span> SYSTEM</div>
        </div>
        <div className={`cyber-status`}>
          INITIALIZING_CORE 
          <span className={`blinking-cursor`}>_</span>
        </div>
      </div>

      <div className={`quantum-core-container`}>
        <div className={`quantum-scene`}>
          <div className={`orbital-ring ring-1`}></div>
          <div className={`orbital-ring ring-2`}></div>
          <div className={`orbital-ring ring-3`}></div>
          <div className={`orbital-ring ring-4`}></div>

          <div className={`core-percentage`}>
            <span ref={counterRef} className={`percent-number`}>
              000
            </span>
            <span className={`percent-symbol`}>%</span>
          </div>
        </div>
      </div>

      <div className={`cyber-footer`}>
        <div className={`loading-bar-container`}>
          <div 
            className={`loading-bar-fill`} 
            style={{ width: `${progress}%`, transition: `width 0.2s ease-out` }}
          ></div>
        </div>
        <div className={`loading-data-stream`}>
          <span className={`data-text`}>RENDERING_ASSETS</span>
          <span className={`data-text`}>COMPILING_MODULES</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;