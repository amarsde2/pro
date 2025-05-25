"use client";
import { useEffect } from "react";

const SmoothScroller = () => {
    useEffect(() => {
        // Smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            if (href) {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }
          });
        });
      }, []);
  return null;
}

export default SmoothScroller