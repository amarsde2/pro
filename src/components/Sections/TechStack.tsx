"use client";

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';

const SiDjango = dynamic(() => import('react-icons/si').then(mod => mod.SiDjango));
const SiFastapi = dynamic(() => import('react-icons/si').then(mod => mod.SiFastapi));
const SiExpress = dynamic(() => import('react-icons/si').then(mod => mod.SiExpress));
const SiLaravel = dynamic(() => import('react-icons/si').then(mod => mod.SiLaravel));
const SiPython = dynamic(() => import('react-icons/si').then(mod => mod.SiPython));
const SiReact = dynamic(() => import('react-icons/si').then(mod => mod.SiReact));
const SiJavascript = dynamic(() => import('react-icons/si').then(mod => mod.SiJavascript));
const SiTypescript = dynamic(() => import('react-icons/si').then(mod => mod.SiTypescript));
const SiDocker = dynamic(() => import('react-icons/si').then(mod => mod.SiDocker));
const SiMongodb = dynamic(() => import('react-icons/si').then(mod => mod.SiMongodb));
const SiMysql = dynamic(() => import('react-icons/si').then(mod => mod.SiMysql));
const SiRedis = dynamic(() => import('react-icons/si').then(mod => mod.SiRedis));
const SiTailwindcss = dynamic(()=> import('react-icons/si').then(mod => mod.SiTailwindcss));
const DiNodejs = dynamic(() => import('react-icons/di').then(mod => mod.DiNodejs));
const RiNextjsFill = dynamic(() => import('react-icons/ri').then(mod => mod.RiNextjsFill));
const FaAws = dynamic(() => import('react-icons/fa').then(mod => mod.FaAws));

const techStack = [
  {
    name: 'Django',
    icon: <SiDjango className='w-16 h-16 text-[#05998B]'/>,
    description: 'Python Framework',
    category: 'Backend',
    color: '#05998B'  // Django green
  },
  {
    name: 'FastAPI',
    icon: <SiFastapi className='w-16 h-16 text-[#05998B]'/>,
    description: 'Python Framework',
    category: 'Backend',
    color: '#05998B'  // FastAPI teal
  },
  {
    name: 'Express.js',
    icon: <SiExpress className='w-16 h-16 text-[#339933]'/>,
    description: 'Node.js Framework',
    category: 'Backend',
    color: '#339933'  // Express black
  },
  {
    name: 'Laravel',
    icon: <SiLaravel className='w-16 h-16 text-[#FF2D20]'/>,
    description: 'PHP Framework',
    category: 'Backend',
    color: '#FF2D20'  // Laravel red
  },
  {
    name: 'Node.js',
    icon: <DiNodejs className='w-16 h-16 text-[#339933]'/>,
    description: 'JavaScript Runtime',
    category: 'Backend',
    color: '#339933'  // Node.js green
  },
  {
    name: 'Python',
    icon: <SiPython className='w-16 h-16 text-[#3776AB]'/>,
    description: 'Programming Language',
    category: 'Backend',
    color: '#3776AB'  // Python blue
  },
  {
    name: 'React',
    icon: <SiReact className='w-16 h-16 text-[#61DAFB]'/>,
    description: 'Frontend Library',
    category: 'Frontend',
    color: '#61DAFB'  // React blue
  },
  {
    name: 'Next.js',
    icon: <RiNextjsFill className='w-16 h-16 text-[#000000]'/>,
    description: 'React Full Stack Framework',
    category: 'Full Stack',
    color: '#8971f8'  // Next.js black
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript className='w-16 h-16 text-[#F7DF1E]'/>,
    description: 'Programming Language',
    category: 'Frontend',
    color: '#F7DF1E'  // JavaScript yellow
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className='w-16 h-16 text-[#3178C6]'/>,
    description: 'Typed JavaScript',
    category: 'Frontend',
    color: '#3178C6'  // TypeScript blue
  },
  {
    name: 'AWS',
    icon: <FaAws className='w-16 h-16 text-[#232F3E]'/>,
    description: 'Cloud Services',
    category: 'Cloud',
    color: '#2496ED'  // AWS dark blue
  },
  {
    name: 'Docker',
    icon: <SiDocker className='w-16 h-16 text-[#2496ED]'/>,
    description: 'Container Platform',
    category: 'DevOps',
    color: '#2496ED'  // Docker blue
  },
 
  {
    name: 'MongoDB',
    icon: <SiMongodb className='w-16 h-16 text-[#47A248]'/>,
    description: 'NoSQL Database',
    category: 'Database',
    color: '#47A248'  // MongoDB green
  },
  {
    name: 'MySQL',
    icon: <SiMysql className='w-16 h-16 text-[#4479A1]'/>,
    description: 'Relational Database',
    category: 'Database',
    color: '#4479A1'  // MySQL blue
  },
  {
    name: 'Redis',
    icon: <SiRedis className='w-16 h-16 text-[#DC382D]'/>,
    description: 'Key-value Database',
    category: 'Database',
    color: '#DC382D'  // Redis red
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className='w-16 h-16 text-[#06B6D4]'/>,
    description: 'CSS Framework',
    category: 'Frontend',
    color: '#06B6D4'  // Tailwind cyan
  }
];

const TechStack = () => {

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

    if (!section) return;

    // Create timeline for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate section title
    tl.fromTo(
      section.querySelector('.section-title'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Animate cards with stagger
    tl.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    // Hover animations for cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="tech_stack"
      className="relative py-20  mix-blend-screen text-white overflow-hidden"
    
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-gray-300 text-lg">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => { cardsRef.current[index] = el }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-gray-800/80"
              style={{
                border: `1px solid ${tech.color}20`
              }}
            >
              <div className="relative flex items-center justify-center mb-4 mx-auto transform transition-transform duration-300 group-hover:scale-110">
                {tech.icon}
              </div>
              <h3 
                className="text-xl font-semibold text-center mb-2"
                style={{ color: tech.color }}
              >
                {tech.name}
              </h3>
              <p className="text-gray-400 text-center text-sm mb-2">
                {tech.description}
              </p>
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tech.color}20`,
                  color: tech.color
                }}
              >
                {tech.category}
              </span>

              {/* Hover effect overlay */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, ${tech.color}10, transparent)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack; 