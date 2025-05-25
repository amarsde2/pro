export {};
import { IconBaseProps } from 'react-icons';
import type { StaticImageData } from 'next/image';


declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }

  interface navLink {
    id: number;
    label: string;
    href: string;
  }
  
interface GlassIconsItem {
  icon: React.ComponentType<IconBaseProps>;
  color: string;
  label: string;
  customClass?: string;
  href: string;
}

interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}



interface AreaOfExpertise {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  skills: string[];
}


interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}



interface Project {
  title: string;
  slug?:string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  category?: string;
}



interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  logo: string;
}

}

