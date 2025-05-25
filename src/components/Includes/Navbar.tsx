"use client";
import React, { useState } from 'react'
import GooeyNav from '../Animations/NavItem';
import logo from "@/assets/logo.png";
import Image from 'next/image';
import { menuItems } from '@/utils/constant';
import Link from 'next/link';

const NavItems = ({ onClick = () => {} }) => (
  <GooeyNav
    items={menuItems}
    particleCount={15}
    particleDistances={[90, 10]}
    particleR={100}
    initialActiveIndex={0}
    animationTime={600}
    timeVariance={300}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
  />
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-black-400 border-b border-black-300 sticky top-0 z-30 backdrop-blur-[20px]">
      <div className="flex items-center justify-between sm:px-10 px-5 h-16">
        {/* Logo/Title */}
        <Link href="/#home" className="text-white text-2xl font-extrabold font-generalsans flex flex-row items-center">
          <Image src={logo} alt='amaraiverse logo' width={50} />
          Amaraiverse
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex">
            <NavItems />
        </nav>
  
        {/* Hamburger Icon (Mobile) */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Nav Sidebar */}
      <div className={`relative left-0 right-0  transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden block ${menuOpen ? 'h-auto py-4' : 'max-h-0 py-0'} sm:hidden`}> 
        <NavItems onClick={() => setMenuOpen(false)} />
      </div>
    </nav>
  )
}

export default Navbar