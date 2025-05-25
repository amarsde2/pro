'use client'
import { useEffect } from 'react';
import { gsap, registerGSAP } from '@/utils/gsap';

const Loader = () => {
  useEffect(() => {
    registerGSAP();
    // Animate the loader elements
    gsap.to('.loader-circle', {
      scale: 1.2,
      opacity: 0,
      duration: 1,
      repeat: -1,
      ease: 'power2.inOut',
      stagger: 0.2
    });

    gsap.to('.loader-text', {
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative">
        {/* Animated circles */}
        <div className="flex justify-center gap-4">
          <div className="loader-circle w-4 h-4 bg-blue-500 rounded-full"></div>
          <div className="loader-circle w-4 h-4 bg-purple-500 rounded-full"></div>
          <div className="loader-circle w-4 h-4 bg-pink-500 rounded-full"></div>
        </div>
        
        {/* Loading text */}
        <div className="loader-text mt-6 text-center text-white text-lg font-medium">
           Warming up the engines...
        </div>

        {/* Decorative gradient blur */}
        <div className="absolute -inset-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Loader;
