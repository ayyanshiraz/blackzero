"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const FlowingMenu = ({ items, speed = 10, marqueeBgColor = "#000", textColor = "text-black" }) => {
  return (
    <nav className="menu relative">
      {items.map((item, idx) => (
        <MenuItem key={idx} {...item} speed={speed} marqueeBgColor={marqueeBgColor} textColor={textColor} isFirst={idx === 0} />
      ))}
    </nav>
  );
};

const MenuItem = ({ link, text, items, speed, marqueeBgColor, textColor, isFirst }) => {
  const itemRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const [repetitions, setRepetitions] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculate = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector('.marquee__part');
      if (part) setRepetitions(Math.ceil(window.innerWidth / part.offsetWidth) + 2);
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [items]);

  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector('.marquee__part');
    if (!part) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeInnerRef.current, {
        x: -(part.offsetWidth), 
        duration: (part.offsetWidth / 200) * speed,
        ease: 'none',
        repeat: -1
      });
    }, marqueeInnerRef);
    return () => ctx.revert();
  }, [items, repetitions, speed]);

  return (
    <div className={`menu__item relative overflow-hidden h-[11vh] ${isOpen ? 'opacity-10' : ''}`} ref={itemRef} style={{ borderTop: isFirst ? 'none' : '1px solid rgba(0,0,0,1)' }}>
      <a className={`flex items-center h-full text-[3.5vh] font-black pl-[10%] uppercase ${textColor} cursor-pointer gap-6 transition-opacity`} href={link} onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
        <span>{text}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[3.5vh] h-[3.5vh]">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
      
      <div className="absolute top-0 left-0 w-full h-full translate-y-[101%] hover:translate-y-0 transition-transform duration-300 flex items-center cursor-pointer z-10" style={{ backgroundColor: marqueeBgColor }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}>
        <div className="flex whitespace-nowrap h-full items-center" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, i) => (
            <div className="flex items-center pr-[6vw] border-r-2 border-white/20 marquee__part" key={i}>
              {items.map((skill, idx) => (
                <div key={idx} className="flex items-center mx-[4vw] gap-6">
                  <img src={skill.url} alt={skill.name} className="h-[5vh] w-auto filter invert brightness-200" />
                  <span className="text-white font-sans font-bold text-[3vh] uppercase">{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;