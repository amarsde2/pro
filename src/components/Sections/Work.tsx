"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, registerGSAP, ScrollTrigger } from '@/utils/gsap';


const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const heading = headingRef.current;
    const button = buttonRef.current;
    const availability = availabilityRef.current;

    if (!section || !heading || !button || !availability) return;

    // Create timeline for sequential animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      }
    });

    // Animate availability badge
    tl.fromTo(
      availability,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Animate heading with text reveal
    tl.fromTo(
      heading,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate button
    tl.fromTo(
      button,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-32 bg-black-200 mix-blend-screen text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Badge */}
          <div 
            ref={availabilityRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 font-medium">Available for Work</span>
          </div>

          {/* Main Heading */}
          <h1 
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let's Create Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Next Big Idea
            </span>
          </h1>

          {/* Contact Button */}
          <Link
            ref={buttonRef}
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Get in Touch
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
    </section>
  );
};

export default Work;