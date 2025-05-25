"use client";

import { useEffect, useRef } from 'react';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';
import TiltCard from '../Animations/TiltCard';
import { experiences } from '@/utils/constant';

const WorkExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!section || !timeline) return;

    // Timeline animation
    gsap.fromTo(
      timeline,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    // Cards animation
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          y: 30
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
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
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-black-200 mix-blend-screen text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div 
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1  lg:bg-gradient-to-b from-blue-500 to-purple-600 h-full"
            style={{ transformOrigin: 'top' }}
          />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              
              <div
                key={exp.company}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black" />

                {/* Content card */}
                 <div className={`w-full md:w-1/2 lg:w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <TiltCard key={exp.company} tiltMaxAngleX={10} tiltMaxAngleY={10} transitionProps={{ duration: 300, ease: "power2.out" }}>
                      <div className="rounded-xl p-6 shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mr-4">
                            <span className="text-2xl">🏢</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-blue-400">{exp.company}</h3>
                            <p className="text-gray-400">{exp.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span className="mr-4">📅 {exp.duration}</span>
                          <span>📍 {exp.location}</span>
                        </div>

                        <ul className="space-y-2 mb-4">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </div>      
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
};

export default WorkExperience;