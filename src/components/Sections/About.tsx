"use client";

import { useEffect, useRef } from 'react';
import { gsap, registerGSAP, ScrollTrigger } from '@/utils/gsap';
import { SplitText } from 'gsap/SplitText';
import RotatingText from '../Animations/RotateText';
import FadeContent from '../Animations/FadeContent';
import profileImage from "@/assets/profile.jpeg";
import Image from 'next/image';
import TiltCard from '../Animations/TiltCard';

gsap.registerPlugin(SplitText);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gradientRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);
  const splitTextsRef = useRef<{ split: SplitText; element: HTMLElement }[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const gradient = gradientRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
    const paragraphs = paragraphsRef.current;

    if (!section || !title || !content || !gradient) return;

    // Split text for paragraphs
    paragraphs.forEach((p) => {
      if (!p) return;
      
      // Create split text instance
      const split = new SplitText(p, { 
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word"
      });
      
      // Store the split instance and element for cleanup
      splitTextsRef.current.push({ split, element: p });
      
      // Set initial color for all characters
      gsap.set(split.chars, { color: "#9CA3AF" }); // gray-400

      // Create animation for each paragraph
      gsap.to(split.chars, {
        color: "#FFFFFF", // white
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.to(split.chars, {
              color: "#FFFFFF",
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(split.chars, {
              color: "#9CA3AF",
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.out"
            });
          }
        }
      });
    });

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Enhanced title animation with split text effect
    tl.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Gradient line animation
    tl.fromTo(
      gradient,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Content animation with stagger effect
    tl.fromTo(
      content.querySelectorAll('h3'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Parallax effect for the section
    gsap.to(section, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Enhanced hover animations for cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 * index,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(145, 94, 255, 0.3)',
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          duration: 0.4,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Clean up SplitText instances
      splitTextsRef.current.forEach(({ split, element }) => {
        split.revert();
        // Reset the element's text content to its original state
        if (element) {
          element.innerHTML = element.textContent || '';
        }
      });
    };
  }, []);

  return (
      <section 
      ref={sectionRef} 
      id="about" 
      className="py-24 bg-black-200 min-h-4/5 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(145, 94, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div 
            ref={gradientRef} 
            className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"
          />
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full lg:max-w-6xl mx-auto">
       
        {/* Image Section */}
          <div className="w-full flex justify-center items-center mx-auto">
            <TiltCard className="mx-auto">
              <Image 
                src={profileImage} 
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Profile"
                className="rounded-3xl shadow-lg w-full max-w-[320px] sm:max-w-[400px] object-cover aspect-square border-4 border-purple-600 hover:scale-105 transition-transform duration-300"
              />
            </TiltCard>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="col-span-1 md:col-span-2 space-y-6 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-blue-400">
              Full Stack Developer | Creative Problem Solver
            </h3>
            <p className="leading-relaxed text-lg text-gray-300">
              I'm a passionate full-stack developer with a knack for turning ideas into functional, elegant web applications.
              With a deep understanding of both frontend and backend technologies, I focus on building experiences that are
              not just visually appealing, but also fast, accessible, and user-friendly.
            </p>
            <p className="leading-relaxed text-lg text-gray-300">
              My journey began with curiosity and quickly evolved into a career rooted in continuous learning and creativity. 
              Whether it's building scalable APIs, designing intuitive interfaces, or solving complex problems — I enjoy crafting
              solutions that create real-world impact.
            </p>
    
            <FadeContent>
              <div className="relative w-full flex flex-col sm:flex-row justify-center md:justify-start gap-4 items-center mt-6">
                <span className="font-black lg:text-[64px] sm:text-[50px] text-[40px] lg:leading-[70px] text-[#915EFF]">
                  I'm
                </span>
                <RotatingText
                  texts={[
                    'a Creative Thinker',
                    'a Problem Solver',
                    'Client-Focused',
                    'Adaptable & Fast Learner',
                    'Detail-Oriented'
                  ]}
                  mainClassName="w-full text-center md:text-start sm:w-auto px-6 py-3 font-bold text-xl sm:text-2xl shadow-lg shadow-[#915EFF] bg-gradient-to-r from-[#915EFF] to-[#6B46C1] text-white overflow-hidden rounded-xl transform hover:scale-105 transition-transform duration-300"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
      
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 