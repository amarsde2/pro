// components/TiltCard.js
'use client';

import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: true,
        "max-glare": 0.2,
        scale: 1.04
      });
    }

    return () => {
      if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
        (tiltRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={tiltRef} className={`card ${className}`}>
      {children}
    </div>
  );
}
