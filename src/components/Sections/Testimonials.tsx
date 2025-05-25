"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Counter from '@/components/Animations/Counter';
import TiltCard from '../Animations/TiltCard';
import { testimonials } from '@/utils/constant';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';

const FaQuoteLeft = dynamic(() => import('react-icons/fa6').then(mod => mod.FaQuoteLeft));
const FaQuoteRight = dynamic(() => import('react-icons/fa6').then(mod => mod.FaQuoteRight));
const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!section) return;

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
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
          scale: 1.05,
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
    <section ref={sectionRef} id="testimonials" className="py-20 bg-black-200 mix-blend-screen text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            What people say about me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         
          {testimonials.map((testimonial, index) => (
            <TiltCard key={testimonial.name} tiltMaxAngleX={10} tiltMaxAngleY={10} transitionProps={{ duration: 300, ease: "power2.out" }}>
              <div
              key={testimonial.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="rounded-xl p-6  hover:border-blue-500 transition-all duration-300"
            >
             
              <FaQuoteLeft className="text-blue-500 text-3xl" />
                <blockquote className="text-gray-300 italic p-2">
                  {testimonial.quote}
                </blockquote>

                <FaQuoteRight className="text-blue-500 text-3xl ml-auto" />

                <div className="flex items-center mt-6 ml-2">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                    {/* <p className="text-gray-500 text-sm">{testimonial.company}</p> */}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "25", label: "Projects Completed", sign:'+'},
            { number: "10", label: "Happy Clients", sign:'+'},
            { number: "4", label: "Years Experience", sign:'+'},
            { number: "95", label: "Client Satisfaction", sign:'%'}
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
             
                <Counter
                  value={Number(stat.number)}
                  sign={stat.sign}
                  places={[10,1]}
                  fontSize={50}
                  padding={5}
                  gap={10}
                  textColor="white"
                  fontWeight={900}
                />
               
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 