"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { areasOfExpertise } from '@/utils/constant';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';



const Speciality = () => {
  registerGSAP();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeArea, setActiveArea] = useState<number>(1);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section on scroll
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate image change
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  }, [activeArea]);

  return (
    <section ref={sectionRef} id="speciality" className="py-20 bg-black-200  h-auto  lg:h-screen mix-blend-screen text-white relative">
      <div className="container relative mx-auto px-4 top-[20px] lg:top-[100px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Areas of Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my specialized skills and expertise in various domains of software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Accordion */}
          <div className="space-y-4">
            {areasOfExpertise.map((area) => (
              <div
                key={area.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  activeArea === area.id
                    ? 'bg-blue-500/10 border border-blue-500/20'
                    : 'bg-gray-800/50 hover:bg-gray-800/70'
                }`}
              >
                <button
                  onClick={() => setActiveArea(area.id)}
                  className="w-full p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-blue-400">
                      {area.title}
                    </h3>
                    <span className={`transform transition-transform duration-300 ${
                      activeArea === area.id ? 'rotate-180' : ''
                    }`}>
                      ↓
                    </span>
                  </div>
                </button>

                {activeArea === area.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill:any) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side - Image */}
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <div ref={imageRef} className="absolute inset-0">
              <Image
                src={areasOfExpertise.find(area => area.id === activeArea)?.image || ''}
                alt={areasOfExpertise.find(area => area.id === activeArea)?.title || ''}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
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

export default Speciality;