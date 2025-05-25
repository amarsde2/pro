"use client";

import { useEffect, useRef } from 'react';
import { gsap, registerGSAP , ScrollTrigger} from '@/utils/gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ScrollToHash from './ScrollHash';



interface projectDetailsProps {
  project: {
    title: string;
    short: string;
    category: string;
    slug: string;
    content: string;
    image: string[];
    technologies: string[]; 
    contentHtml: string;
  };
}

const ProjectDetails = ({ project }: projectDetailsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const images = project.image;


  useEffect(() => {
    registerGSAP();
    const content = contentRef.current;
    const image = imageRef.current;

    if (!content || !image) return;

    // Animate hero image
    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    // Animate content sections
    const sections = content.querySelectorAll('h1, p, ul, blockquote');

    if (sections.length > 0) {
      
      gsap.fromTo(
        sections,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 70%",
          },
        }
      );
  
    
    }
   
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <ScrollToHash/>
       <article className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={project.image[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        
        <div className="relative h-full  container mx-auto px-4 flex flex-col justify-center items-center">
          <div className="max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <div className="flex flex-row items-center justify-center">
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                   >
                     {project.category}
           
                  </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div ref={contentRef} className="prose prose-invert prose-lg max-w-none">
               {project.short}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>


          <div className='mt-12 pt-8 border-t border-gray-8000'>
              <h3 className="text-xl font-semibold mb-4">Preview</h3>
              <div className="w-full flex justify-center items-center">
                  <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={true}
                    
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={true}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="mySwiper"
                  >
                     {images.map((src, index) => (
                      <SwiperSlide key={index}>
                          <Image
                            src={src}
                            alt={`Slide ${index}`}
                            width={600}
                            height={400}
                            style={{ width: '100%', height: 'auto' }}
                          />                      </SwiperSlide>
                      ))}
                  </Swiper>
              </div>
          </div>

          <div className='mt-12 pt-8 border-t border-gray-8000'>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <div className="w-full flex justify-center items-center">
                 <div
                    className="prose prose-lg prose-invert max-w-none space-y-6"
                    dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                  />
              </div>
          </div>
  
          {/* Back to Blog */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
 
  );
};

export default ProjectDetails; 