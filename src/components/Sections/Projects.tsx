"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Folder from '../Animations/Folder';
import TiltCard from '../Animations/TiltCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';

const FaReadme = dynamic(() => import('react-icons/fa').then(mod => mod.FaReadme));



const Projects = ({ projects }: { projects: any[]}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!section) return;

    // Cards animation
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
    <section ref={sectionRef} id="projects" className="py-20  bg-black-200 mix-blend-screen text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link href={`/project/${project.slug}`} key={project.slug}>
            <TiltCard key={project.title} tiltMaxAngleX={10} tiltMaxAngleY={10} transitionProps={{ duration: 300, ease: "power2.out" }}>
              <div key={project.title} ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative rounded-xl overflow-hidden  transition-all duration-300"
            >
                {/* Project Image */}

            
                <div className="relative h-64 p-6 overflow-hidden">
                  <Image src={project.image[0]} alt={project.title} width={450} height={70}
                    className="object-contain shadow-lg shadow-blue-500 transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className='flex items-center gap-4'>
                    <Folder size={1} color="#00d8ff" className="w-10 h-10" />
                    <h3 className="text-2xl font-semibold text-blue-400 mb-2">{project.title}</h3>
                  </div>
                 
                  <p className="text-gray-400 mt-2">{project.short}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project?.technologies?.slice(0, 4).map((tech: string, index: number) => (  
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-2">
                  <div className="mt-8 text-center">         
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="z-100 px-8 py-3 flex flex-row gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      >
                        Read More  <FaReadme className='mt-1'/>
                      </motion.button> 
                    </div>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </TiltCard>
            </Link>
           
          ))}
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

export default Projects;