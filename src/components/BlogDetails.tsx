"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap, registerGSAP,ScrollTrigger } from '@/utils/gsap';
import Image from 'next/image';
import Link from 'next/link';
import profile from "@/assets/profile.jpeg";
import ScrollToHash from './ScrollHash';


const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram));
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn));
const FaYoutube = dynamic(() => import('react-icons/fa').then(mod => mod.FaYoutube));
const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub));


interface BlogDetailsProps {
  post: {
    title: string;
    slug: string;
    banner: string;
    publishDate: Date;
    description: string;
    readingTime: string;
    category:string;
    contentHtml: string;
  };
}

const BlogDetails = ({ post }: BlogDetailsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
    const sections = content.querySelectorAll('h3, p');

    if(sections.length > 0){
       
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
    <ScrollToHash />
    <article className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={post.banner}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="max-w-4xl">
            <span className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={profile}
                  alt="Amar kumar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Amar kumar</p>
                <p className="text-sm text-gray-400">
                  {post.publishDate && new Date(post.publishDate).toLocaleDateString()} · {post.readingTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div ref={contentRef} className="prose prose-lg prose-invert max-w-none space-y-6">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-900 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={profile}
                  alt="Amar kumar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className='space-y-4'>
                <h3 className="text-xl font-semibold mb-2">About Amar Kumar</h3>
                <p className="text-gray-400">
                   I'm a Full Stack Developer deeply passionate about Machine Learning and Artificial Intelligence.I specialize in researching and developing intelligent systems while building secure, scalable, and feature-rich applications that solve real-world problems.
                </p>
                <div  className="flex space-x-4">
                    {[
                      { name: 'github', icon: <FaGithub/>, link:'https://github.com/amarsde2', color: 'hover:bg-[#333]' },
                      { name: 'linkedin', icon:<FaLinkedinIn/>,link:'https://linkedin.com/in/amarinfo', color: 'hover:bg-[#0077B5]' },
                      { name: 'youtube', icon: <FaYoutube/>, link:'https://www.youtube.com/@amar-ai-mindset-innovation', color: 'hover:bg-[#1DA1F2]' },
                      { name: 'instagram', icon: <FaInstagram/>,link:'https://www.instagram.com/er.amark/', color: 'hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743]' }
                    ].map((social) => (
                      <Link
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-2xl text-blue-400 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
                </div>
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
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
};

export default BlogDetails; 