"use client";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import RobotModel from "../components/RobotModel";

// FIX: Hotspot is now a stateful component so it registers mobile taps!
const Hotspot = ({ position, title, desc, align = `right` }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation(); // Prevents the click from passing through the canvas
    setIsOpen(!isOpen);
  };

  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div 
        className={`relative cursor-pointer flex items-center justify-center`}
        onClick={handleToggle}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
      >
        
        {/* The Glowing Dot */}
        <div className={`relative flex items-center justify-center w-8 h-8`}>
          <div className={`absolute w-full h-full bg-red-600 rounded-full animate-ping opacity-70`}></div>
          <div className={`absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_2px_rgba(220,38,38,0.8)]`}></div>
          <div className={`absolute w-5 h-5 border border-red-500 rounded-full`}></div>
        </div>

        {/* The Popup Box (Now controlled by isOpen state instead of group-hover) */}
        <div 
          className={`absolute flex items-center transition-all duration-500 ease-out pointer-events-none
            ${isOpen ? `opacity-100` : `opacity-0`}
            ${align === `right` ? `left-4 flex-row` : `right-4 flex-row-reverse`}
          `}
        >
          {/* Connector Line */}
          <div 
            className={`h-[1px] from-red-600 to-transparent transition-all duration-500 delay-100
              ${isOpen ? `w-8 md:w-16` : `w-0`}
              ${align === `right` ? `bg-gradient-to-r` : `bg-gradient-to-l`}
            `}
          ></div>
          
          {/* Text Container */}
          <div className={`w-48 md:w-56 backdrop-blur-md bg-black/60 border border-white/10 p-3 md:p-4 rounded-lg shadow-2xl transform transition-transform duration-500 delay-150
            ${isOpen ? `scale-100` : `scale-95`}
            ${align === `right` ? `ml-2 text-left` : `mr-2 text-right`}
          `}>
            <h4 className={`text-red-500 font-bold text-xs md:text-sm tracking-widest uppercase mb-1`}>{title}</h4>
            <p className={`text-white/80 text-[10px] md:text-xs font-mono leading-relaxed`}>{desc}</p>
          </div>
        </div>

      </div>
    </Html>
  );
};

const TechCoreSection = () => {
  const [time, setTime] = useState(`00:00:00:00`);
  const [hexData, setHexData] = useState(`0x0000`);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener(`resize`, checkMobile);
    return () => window.removeEventListener(`resize`, checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setTime(
        `${d.getHours().toString().padStart(2, `0`)}:${d.getMinutes().toString().padStart(2, `0`)}:${d.getSeconds().toString().padStart(2, `0`)}:${d.getMilliseconds().toString().substring(0, 2)}`
      );
      setHexData(`0x` + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(4, `0`));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`nutrition-section bg-transparent h-full w-full relative z-10 overflow-hidden`}>

      <div className={`absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between font-mono text-white/50 text-xs md:text-sm select-none`}>
        
        <div className={`flex justify-between items-start w-full`}>
          <div className={`flex items-center gap-4`}>
            <div className={`relative w-16 h-16 md:w-24 md:h-24`}>
              <svg className={`absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-50`} viewBox={`0 0 100 100`}>
                <circle cx={`50`} cy={`50`} r={`48`} fill={`none`} stroke={`currentColor`} strokeWidth={`1`} strokeDasharray={`10 5`} />
              </svg>
              <svg className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_4s_linear_infinite_reverse] opacity-70`} viewBox={`0 0 100 100`}>
                <circle cx={`50`} cy={`50`} r={`48`} fill={`none`} stroke={`currentColor`} strokeWidth={`2`} strokeDasharray={`30 10 5 10`} />
              </svg>
              <div className={`absolute inset-0 flex items-center justify-center text-[10px] text-red-500 font-bold tracking-widest animate-pulse`}>
                REC
              </div>
            </div>
            <div>
              <p className={`tracking-widest text-white/80 font-bold`}>SYS.INIT_</p>
              <p className={`opacity-60`}>COORD: 31.5204° N, 74.3587° E</p>
            </div>
          </div>

          <div className={`text-right`}>
            <p className={`tracking-widest text-red-500 font-bold mb-1`}>TARGET LOCKED</p>
            <p className={`w-24 ml-auto text-white/80`}>{time}</p>
            <div className={`flex gap-[2px] justify-end mt-2`}>
              <div className={`w-1 h-3 bg-red-500 animate-pulse`}></div>
              <div className={`w-1 h-6 bg-white/50 animate-pulse`} style={{ animationDelay: `75ms` }}></div>
              <div className={`w-1 h-4 bg-white/50 animate-pulse`} style={{ animationDelay: `150ms` }}></div>
              <div className={`w-1 h-7 bg-white/50 animate-pulse`} style={{ animationDelay: `300ms` }}></div>
              <div className={`w-1 h-2 bg-white/50 animate-pulse`} style={{ animationDelay: `450ms` }}></div>
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-end w-full`}>
          <div>
            <p className={`text-red-500 font-bold mb-1 tracking-widest`}>OVERRIDE_</p>
            <p className={`tracking-widest opacity-70`}>
              <span className={`text-white`}>{hexData}</span> : DATA_STREAM
            </p>
            <div className={`w-24 h-px bg-white/30 mt-3`}></div>
          </div>

          <div className={`flex flex-col items-end gap-2`}>
            <p className={`tracking-widest opacity-60`}>V. 4.0.1</p>
            <svg width={`40`} height={`40`} viewBox={`0 0 100 100`} className={`opacity-50`}>
              <path d={`M 0 50 L 30 50 M 70 50 L 100 50 M 50 0 L 50 30 M 50 70 L 50 100`} stroke={`currentColor`} strokeWidth={`2`} />
              <circle cx={`50`} cy={`50`} r={`10`} fill={`none`} stroke={`currentColor`} strokeWidth={`1`} />
            </svg>
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 z-[5] pointer-events-none flex justify-center items-center`}>
        <div className={`w-full h-full pointer-events-auto`}>
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <Environment preset={`city`} />
            
            <Suspense fallback={null}>
              <group scale={isMobile ? 0.6 : 1} position={isMobile ? [0, -1.5, 0] : [0, 0, 0]}>
                <RobotModel scale={15.5} position={[0, -11, 0]} />

                <Hotspot 
                  position={[0.6, 4.0, 2.8]}
                  title={`Cognitive Core`} 
                  desc={`Advanced AI analytics integration for real time market adaptation.`}
                  align={`right`}
                />

                <Hotspot 
                  position={[0, 1.0, 3.8]} 
                  title={`Power Matrix`} 
                  desc={`Centralized architecture delivering scalable web solutions.`}
                  align={`left`}
                />

                <Hotspot 
                  position={[3.2, -0.8, 1.5]} 
                  title={`Kinetic Drive`} 
                  desc={`Immersive visual design engine powering next generation interfaces.`}
                  align={`right`}
                />

                <Hotspot 
                  position={[-3.2, -0.8, 1.5]} 
                  title={`Data Router`} 
                  desc={`High performance routing system for instant data delivery.`}
                  align={`left`}
                />
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>

    </section>
  );
};

export default TechCoreSection;