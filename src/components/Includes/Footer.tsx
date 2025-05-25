"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap, registerGSAP } from '@/utils/gsap';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/assets/logo.png"

const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram));
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn));
const FaYoutube = dynamic(() => import('react-icons/fa').then(mod => mod.FaYoutube));
const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub));


const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const footer = footerRef.current;
    const links = linksRef.current.filter((link): link is HTMLDivElement => link !== null);
    const social = socialRef.current;
    const wave = waveRef.current;

    if (!footer || !social || !wave) return;

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Wave animation
    gsap.to(wave, {
      x: "100%",
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Footer entrance animation
    tl.fromTo(
      footer,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Social icons animation
    tl.fromTo(
      social.querySelectorAll('a'),
      {
        scale: 0,
        opacity: 0,
        rotation: -180
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.8"
    );

    // Links animation with stagger
    links.forEach((link, index) => {
      tl.fromTo(
        link.querySelectorAll('li'),
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.4"
      );
    });

    // Hover animations for social icons
    social.querySelectorAll('a').forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-gradient-to-b from-black-200 to-black-300 text-white overflow-hidden z-20"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(145, 94, 255, 0.15) 0%, transparent 50%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.98))
        `
      }}
    >
      {/* Animated Wave Background */}
      <div 
        ref={waveRef}
        className="absolute top-0 left-0 w-[200%] h-full opacity-10"
        style={{
          background: 'repeating-linear-gradient(45deg, #915EFF 0%, #6B46C1 50%, #915EFF 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Amaraiverse
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Full-stack developer passionate about creating beautiful and functional web applications.
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
                    aria-label={social.name}
                    className={`w-12 h-12 rounded-xl bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-2xl text-blue-400 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                    >
                      {social.icon}
                </Link>
              ))}
           </div>
          </div>

          {/* Quick Links */}
          <div ref={(el) => { linksRef.current[0] = el; }} className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((link) => (
                <li key={link} className="group">
                  <Link
                    href={`/#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 transform group-hover:scale-100 group-hover:bg-blue-500 transition-transform duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div ref={(el) => { linksRef.current[1] = el; }} className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                'Front-end Development',
                'Back-end Development',
                'API Development',
                'Cloud Solutions',
                'Technical Consulting'
              ].map((service) => (
                <li key={service} className="group">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors flex items-center cursor-pointer">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 transform  group-hover:scale-100 group-hover:bg-blue-500 transition-transform duration-300" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={(el) => { linksRef.current[2] = el; }} className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300 group">
                <span className="mr-3 text-xl">📧</span>
                <Link href="mailto:eramarinfo@gmail.com" className="hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform">
                  eramarinfo@gmail.com
                </Link>
              </li>
              <li className="flex items-center text-gray-300 group">
                <span className="mr-3 text-xl">📱</span>
                <Link href="tel:+1234567890" className="hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform">
                  +91 9685079691, 7225916951
                </Link>
              </li>
              <li className="flex items-center text-gray-300 group">
                <span className="mr-3 text-xl">📍</span>
                <span className="group-hover:translate-x-1 transition-transform">Gwalior, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} amaraiverse. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[{title:'Privacy Policy', 'link':'/privacy-policy'}, {title:'Terms of Service', 'link':'/terms-conditions'}, {title:'Sitemap', 'link':'/sitemap'}].map((link) => (
                <Link
                  key={link.title}
                  href={`${link.link}`}
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
    </footer>
  );
};

export default Footer;