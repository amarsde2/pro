"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../Animations/TiltCard';
import { services } from '@/utils/constant';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !cards.length) return;

    // Animate section title
    gsap.fromTo(
      section.querySelector('.section-title'),
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
          start: "top 70%"
        }
      }
    );

    // Animate cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-black-200 mix-blend-screen text-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            My Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to help bring your digital vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          
          {services.map((service, index) => (
            <TiltCard key={service.id} tiltMaxAngleX={10} tiltMaxAngleY={10} transitionProps={{ duration: 300, ease: "power2.out" }}>
                  <motion.div
                    key={service.id}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="rounded-xl p-6  transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
            </TiltCard>
          
          ))}
        </div>
    

        {/* Call to Action */}
        <div className="mt-16 text-center">
          
          <motion.a
            href='#contact'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Services;