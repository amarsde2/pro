"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '../Animations/TiltCard';
import profile  from '@/assets/profile.jpeg';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';


const POSTS_PER_PAGE = 3;

const Blogs = ({blogPosts}:{blogPosts: any[]}) => {

  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const currentPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    registerGSAP();
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

  const handlePageChange = (page: number) => {
    if (isAnimating || page === currentPage) return;
    setIsAnimating(true);

    // Animate out current posts
    gsap.to(".blog-post", {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.1,
      onComplete: () => {
        setCurrentPage(page);
        // Animate in new posts
        gsap.to(".blog-post", {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          onComplete: () => setIsAnimating(false)
        });
      }
    });
  };

  return (
    <section ref={sectionRef} id="blogs" className="py-20 bg-black-200 mix-blend-screen text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the latest insights, tutorials, and updates from the world of web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
            <TiltCard key={post.title} tiltMaxAngleX={10} tiltMaxAngleY={10} transitionProps={{ duration: 300, ease: "power2.out" }}>
              <article
                key={post.title}
                className="blog-post rounded-xl overflow-hidden shadow-lg  transition-all duration-300"
              >
                <div className="relative p-6 overflow-hidden">
                  <Image src={post.banner} alt={post.title} width={450} height={70}
                          className="object-contain shadow-lg shadow-blue-500 transform group-hover:scale-110 transition-transform duration-500"
                  />     
                </div>

                <div className="p-6 space-y-4">
                    <div className="relative">
                      <span className="bg-blue-500 rounded-full px-2 py-2 text-white text-sm">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="flex mt-4 items-center">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={profile}
                          alt="Amar kumar"
                          fill
                           sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Amar kumar</p>
                        <p className="text-xs text-gray-500">  {post.publishDate && new Date(post.publishDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                      {post.title}
                    </h3>
                  
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readingTime}</span>
                      <span className='text-blue-400 hover:text-blue-300 transition-colors'>Read More → </span>
                      
                    </div>
                </div>
              </article>
            </TiltCard>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isAnimating || currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            aria-label="Previous page"
          >
            ←
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={isAnimating}
                className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isAnimating || currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            aria-label="Next page"
          >
            →
          </button>
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

export default Blogs;