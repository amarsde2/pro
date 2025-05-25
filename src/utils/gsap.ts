import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export const registerGSAP = () => {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
};

export { gsap, ScrollTrigger };