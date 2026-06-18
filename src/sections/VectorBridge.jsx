"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import SkillsPhilosophy from "./SkillsPhilosophy";

function ease(t) {
    const p1x = 0.76, p1y = 0, p2x = 0.24, p2y = 1;
    const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
    const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
    let s = t;
    for (let i = 0; i < 8; i++) {
        const ex = ((ax * s + bx) * s + cx) * s - t;
        const dx = (3 * ax * s + 2 * bx) * s + cx;
        if (Math.abs(dx) < 1e-7) break;
        s -= ex / dx;
    }
    return ((ay * s + by) * s + cy) * s;
}

const VectorBridge = () => {
    const sectionRef = useRef(null);
    const bridgeLineRef = useRef(null);
    const portalRectRef = useRef(null);
    const portalInnerRef = useRef(null);
    const svgContainerRef = useRef(null);
    const sectionTopRef = useRef(0);
    const totalLineLenRef = useRef(0);
    const rafRef = useRef(0);
    const [ready, setReady] = useState(false);

    // Helper function to safely get responsive dimensions without causing SSR Hydration Mismatches
    const getRectDimensions = useCallback(() => {
        if (typeof window === 'undefined') return { w: 340, h: 220, mobile: false };
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const mobile = vw < 1024;
        return {
            w: mobile ? Math.min(240, vw * 0.6) : 340,
            h: mobile ? Math.min(160, vh * 0.25) : 220,
            mobile, vw, vh
        };
    }, []);

    const measure = useCallback(() => {
        const { w: curW, h: curH, mobile, vw, vh } = getRectDimensions();

        if (sectionRef.current) {
            sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        }

        // Apply dimensions safely via refs (Bypasses Next.js SSR mismatch issues entirely)
        if (portalRectRef.current) {
            portalRectRef.current.style.width = `${curW}px`;
            portalRectRef.current.style.height = `${curH}px`;
            portalRectRef.current.style.marginLeft = `-${curW / 2}px`;
            portalRectRef.current.style.marginTop = `-${curH / 2}px`;
        }

        let newPath = '';
        if (!mobile) {
            // Desktop curved tracking line
            const endX = vw / 2 - curW / 2;
            const endY = vh / 2;
            const startX = vw * 0.02; 
            const startY = -vh * 0.2; 
            const cpX = vw * 0.02;
            const cpY = endY; 
            newPath = `M ${startX},${startY} Q ${cpX},${cpY} ${endX},${endY}`;
        } else {
            // FIX: Clean, straight vertical line dropping from top center on mobile
            const endX = vw / 2;
            const endY = vh / 2 - curH / 2;
            const startX = vw / 2;
            const startY = -vh * 0.15;
            newPath = `M ${startX},${startY} L ${endX},${endY}`;
        }

        if (bridgeLineRef.current) {
            bridgeLineRef.current.setAttribute('d', newPath);
            try {
                const len = bridgeLineRef.current.getTotalLength();
                if (len > 0) totalLineLenRef.current = len;
            } catch (_) { }
        }

        if (portalInnerRef.current && sectionRef.current) {
            const innerHeightPx = portalInnerRef.current.scrollHeight;
            const runway = mobile ? vh * 0.8 : vh * 1.2;
            const totalRequiredHeight = runway + innerHeightPx;
            sectionRef.current.style.height = `${totalRequiredHeight}px`;
            sectionRef.current.style.minHeight = `${totalRequiredHeight}px`;
        }
        setReady(true);
    }, [getRectDimensions]);

    useEffect(() => {
        // Using a ResizeObserver guarantees we always know exactly where the section is, 
        // even if images load late above it!
        const resizeObserver = new ResizeObserver(() => measure());
        resizeObserver.observe(document.body);
        
        requestAnimationFrame(() => { measure(); setTimeout(measure, 150); });
        
        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, [measure]);

    useLenis(({ scroll }) => {
        if (!ready) return;
        cancelAnimationFrame(rafRef.current);
        
        rafRef.current = requestAnimationFrame(() => {
            const line = bridgeLineRef.current;
            const box = portalRectRef.current;
            const inner = portalInnerRef.current;
            const svgCont = svgContainerRef.current;
            const totalLen = totalLineLenRef.current;

            if (!box || !inner) return;

            const { w: curW, h: curH, mobile, vw, vh } = getRectDimensions();
            const localScroll = scroll - sectionTopRef.current;

            if (line && svgCont && totalLen > 0) {
                const drawProgress = Math.min(Math.max((localScroll + vh) / vh, 0), 1);
                line.style.strokeDasharray = `${totalLen}`;
                line.style.strokeDashoffset = `${(totalLen - (drawProgress * totalLen)).toFixed(1)}`;
            }

            if (localScroll < -vh * 0.35) {
                box.style.visibility = 'hidden';
                box.style.opacity = '0';
            } else {
                box.style.visibility = 'visible';
                box.style.opacity = '1';
            }

            const expansionRunway = mobile ? vh * 0.8 : vh * 1.2;

            if (localScroll <= 0) {
                box.style.position = 'absolute';
                box.style.top = '50vh';
                box.style.transform = `translate3d(0, 0, 0) scale(1)`;
                if (svgCont) { svgCont.style.position = 'absolute'; svgCont.style.top = '0'; }
                inner.style.transform = `scale(1)`;
                box.style.overflow = 'hidden';
                if (line) line.style.opacity = '1';
            } else {
                const expansionProgress = Math.min(Math.max(localScroll / expansionRunway, 0), 1);

                if (expansionProgress < 1) {
                    box.style.position = 'fixed';
                    box.style.top = '50%';
                    if (svgCont) { svgCont.style.position = 'fixed'; svgCont.style.top = '0'; }
                    box.style.overflow = 'hidden';
                } else {
                    box.style.position = 'absolute';
                    box.style.top = `${expansionRunway + vh / 2}px`;
                    if (svgCont) { svgCont.style.position = 'absolute'; svgCont.style.top = `${expansionRunway}px`; }
                    box.style.overflow = 'visible';
                }

                const e = ease(expansionProgress);
                const scaleX = 1 + e * (vw / curW - 1);
                const scaleY = 1 + e * (vh / curH - 1);

                box.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
                inner.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

                const bOpacity = Math.max(0, 1 - e / 0.5);
                box.style.borderWidth = bOpacity < 0.01 ? '0px' : '2px';
                box.style.borderColor = `rgba(0,0,0,${bOpacity.toFixed(3)})`;

                if (line) {
                    const lineOpacity = 1 - Math.min(expansionProgress * 4, 1);
                    line.style.opacity = Math.max(0, lineOpacity).toFixed(3);
                }
            }
        });
    });

    return (
        <section ref={sectionRef} className={`relative bg-transparent text-black`} style={{ minHeight: `320vh` }}>
            <div id={`philosophy`} style={{ position: `absolute`, top: `120vh`, left: 0, height: `1px`, width: `1px`, pointerEvents: `none` }} />
            
            <div ref={svgContainerRef} style={{ position: `absolute`, top: 0, left: 0, width: `100vw`, height: `100vh`, pointerEvents: `none`, zIndex: 10, willChange: `transform, top, position` }}>
                <svg width={`100%`} height={`100%`} style={{ overflow: `visible` }}>
                    {/* Used Tailwind classes for stroke width instead of inline react state to prevent SSR crash */}
                    <path ref={bridgeLineRef} fill={`none`} stroke={`#fff`} strokeLinecap={`round`} className={`stroke-[4px] lg:stroke-[10px]`} style={{ strokeDasharray: `99999`, strokeDashoffset: `99999`, willChange: `opacity` }} />
                </svg>
            </div>

            {/* Removed inline width/height here; they are now safely injected after mount by JS */}
            <div ref={portalRectRef} style={{ position: `absolute`, top: `50vh`, left: `50%`, background: `white`, border: `2px solid white`, visibility: `hidden`, opacity: 0, zIndex: 50, overflow: `hidden`, transformOrigin: `center center` }}>
                <div ref={portalInnerRef} style={{ position: `absolute`, top: `50%`, left: `50%`, width: `100vw`, height: `100vh`, marginLeft: `-50vw`, marginTop: `-50vh`, display: `flex`, alignItems: `center`, justifyContent: `center`, transformOrigin: `center center` }}>
                    <div style={{ width: `100%`, height: `100%` }}>
                        <SkillsPhilosophy />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VectorBridge;