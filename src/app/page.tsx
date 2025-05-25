import dynamic from 'next/dynamic';

const SmoothScroller = dynamic(() => import('@/components/SmoothScroller'));
const ParallaxBackground = dynamic(() => import('@/components/Animations/ParallaxBackground'));
const SplashCursor = dynamic(() => import('@/components/Animations/SplashCursor'));
const ScrollProgress = dynamic(() => import('@/components/Animations/ScrollProgress'));
const Lighting = dynamic(() => import('@/components/Animations/Lighting'));
const ParticleRender = dynamic(() => import('@/components/Animations/ParticleRender'));


import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Projects from '@/components/Sections/Projects';
import WorkExperience from '@/components/Sections/WorkExperience';
import Contact from '@/components/Sections/Contact';
import Testimonials from '../components/Sections/Testimonials';
import Newsletter from '@/components/Sections/Newsletter';
import Blogs from '../components/Sections/Blogs';
import Services from '../components/Sections/Services';
import TechStack from '@/components/Sections/TechStack';
import Speciality from '@/components/Sections/Speciality';
import Work from '@/components/Sections/Work';
import { getAllProjects } from "@/utils/content/project";
import  {getAllPosts} from "@/utils/content/post";

export default function Home() {
 
  const projects = getAllProjects();
  const blogs = getAllPosts();

  return (
    <main className='relative'>
      <SmoothScroller />
      <ParallaxBackground />
      <SplashCursor />
      <ScrollProgress />
      <Lighting />
      <ParticleRender />
      <main className="relative">
        <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-gray-900/70 to-black/80 pointer-events-none z-10" />
        <div className="relative z-10">
          <Hero />
          <About />
          <Speciality />
          <TechStack />
          <Services />
          <Work />
          <Projects projects={projects} />
          <WorkExperience />
          <Blogs blogPosts={blogs} />
          <Testimonials />
          <Contact />
          <Newsletter />
        </div>
      </main>
    </main>
  );
}