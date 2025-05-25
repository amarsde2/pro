"use client";
import React, { useEffect, useRef } from 'react';
import HeroText from "@/components/Animations/HeroText";
import { gsap, registerGSAP } from '@/utils/gsap';
import { socialItems } from '@/utils/constant';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FaDownload = dynamic(() => import('react-icons/fa6').then(mod => mod.FaDownload));
const FaQuoteLeft = dynamic(() => import('react-icons/fa6').then(mod => mod.FaQuoteLeft));
const FaQuoteRight = dynamic(() => import('react-icons/fa6').then(mod => mod.FaQuoteRight));
const TbCirclesRelation = dynamic(() => import('react-icons/tb').then(mod => mod.TbCirclesRelation));
const EarthCanvas = dynamic(() => import("@/components/EarthCanvas"), { ssr: false });
const GlassIcons = dynamic(() => import("../Animations/Desk"), { ssr: false });

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      // Animate the main text
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Animate buttons
      if (buttonRef.current) {
        gsap.from(buttonRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        });
      }

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[130vh] sm:min-h-screen  mx-auto overflow-hidden" id="home" ref={heroRef}>
      {/* 3D Earth Background */}
      <div className="absolute inset-0 z-0">
         <EarthCanvas />
      </div>

      <div className="relative inset-0  top-[40px]  lg:top-[120px] max-w-7xl mx-auto sm:px-16 px-6 flex flex-col items-start space-y-6 z-10">
        <div className="flex flex-row items-start gap-2 lg:gap-5 w-full" ref={textRef}>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF] animate-pulse" />
            <div className="w-1 sm:h-80 h-60 lg:h-80 bg-gradient-to-b from-[#915EFF] to-transparent" />
          </div>
          <div className="backdrop-blur-sm bg-black/30 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full lg:w-auto">
            <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[30px] lg:leading-[98px] mt-2">
              <HeroText
                
                parts={[
                  { text: "Hi, I'm ", className: 'text-white' },
                  { text: 'Amar Kumar', className: 'text-[#915EFF]' },
                ]}
              />

            </h1>

            <p className="lg:text-[18px] sm:text-[16px] text-[14px] lg:leading-[20px] text-gray-300 mt-4">
              <cite>
                <HeroText
                  parts={[
                    { text: 'Senior Software Engineer | Full Stack Developer | Problem Solver | Content Creator', className: 'text-white' },
                  ]}
                />
              </cite>
            </p>
        
            <p className="text-[#dfd9ff] mt-8 lg:mt-12 italic lg:w-5/6 font-medium lg:text-[20px] sm:text-[18px] text-[16px] lg:leading-[40px] text-white-100">
              <FaQuoteLeft className="text-[#915EFF] h-6 lg:h-8 animate-bounce"/>
                <HeroText
                  
                    parts={[
                      { text: "I'm a Full Stack Developer deeply passionate about Machine Learning and Artificial Intelligence.I specialize in researching and developing intelligent systems while building secure, scalable, and feature-rich applications that solve real-world problems.", className: '' },
                    ]}
                />
                <FaQuoteRight className="text-[#915EFF] text-2xl h-6 lg:h-8 animate-bounce" />
            </p>  
          </div>
        </div>
          
        <div className="relative w-full flex flex-col items-center justify-center">
            <p className="text-white text-[18px] sm:text-[20px] mt-2 font-semibold">
              🚀 Let's connect and collaborate!
            </p>

            <div className="w-full max-w-2xl py-2 mx-auto h-[150px] lg:h-[100px] relative flex items-center justify-center">
                <GlassIcons items={socialItems} className="custom-class"/>
            </div>

            <div className="relative w-full flex flex-col sm:flex-row justify-center gap-4 items-center mt-8 sm:mt-24 px-4" ref={buttonRef}>

                <Link type='button' href='#contact'  className="cursor-pointer w-full sm:w-auto px-6 py-3 font-bold text-xl sm:text-2xl shadow-lg shadow-[#915EFF] bg-gradient-to-r from-[#915EFF] to-[#6B46C1] text-white overflow-hidden rounded-lg flex flex-row gap-2 items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-[#915EFF]/50 hover:shadow-xl">
                  Book a Consultation <TbCirclesRelation className="animate-spin-slow"/>
                </Link>
          
                <Link type='button' href='Amar_kumar_cv.pdf' download className="cursor-pointer w-full sm:w-auto px-6 py-3 font-bold text-xl sm:text-2xl shadow-lg shadow-[#915EFF] bg-gradient-to-r from-[#6B46C1] to-[#915EFF] text-white overflow-hidden rounded-lg flex flex-row gap-2 items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-[#915EFF]/50 hover:shadow-xl">
                  Download Resume <FaDownload className="animate-bounce"/>
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;