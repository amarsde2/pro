'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap, registerGSAP } from '@/utils/gsap';

export default function HeroText({
  parts = [
    { text: "Hi, I'm ", className: 'text-white' },
    { text: 'Amar Kumar', className: 'text-[#915EFF]' },
  ],
}) {
  const headingRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures only runs client-side

    registerGSAP();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const delayAnimation = () => {
      const chars = headingRef.current?.querySelectorAll('.char');
      if (!chars) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          ease: 'power3.out',
          duration: 0.3,
        }
      );
    };

    // Wait until browser is idle (if available) to prevent blocking LCP
    if ('requestIdleCallback' in window) {
      requestIdleCallback(delayAnimation, { timeout: 1000 });
    } else {
      setTimeout(delayAnimation, 500); // Fallback
    }
  }, []);

  return (
    <span ref={headingRef} className="inline-block">
      {parts.map((part, i) => (
        <span key={i} className={part.className}>
          {[...part.text].map((char, j) => (
            <span
              key={`${i}-${j}`}
              className={`char inline-block opacity-0 transition-opacity duration-300`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
