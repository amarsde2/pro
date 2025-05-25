"use client";
import { useState, useRef, useEffect } from 'react';
import { gsap, registerGSAP } from '@/utils/gsap';
import Link from 'next/link';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const getRecaptchaToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) return reject("reCAPTCHA not loaded");
  
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: "submit" })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  async function getHMACSignature(path: string) {
    const res = await fetch('/api/hmac-sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
  
    const data = await res.json();
    return data.signature;
  }


  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const form = formRef.current;
    const input = inputRef.current;
    const button = buttonRef.current;
    const success = successRef.current;

    if (!section || !form || !input || !button || !success) return;

    // Create timeline for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate section elements
    tl.fromTo(
      section.querySelectorAll('h2, p'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    )
    .fromTo(
      form,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Input focus animation
    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    try {
      const token = await getRecaptchaToken();
   

      const signature = await getHMACSignature('/api/newsletter');

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-signature': signature,
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setIsSuccess(true);
      setEmail('');

      // Animate success message
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 mix-blend-screen text-white overflow-hidden" 
      id="newsletter"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Stay in the Loop
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscribe to our newsletter for the latest tech trends, project updates, and exclusive insights.
          </p>

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 relative"
          >
            <div className="flex-1 relative group">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-medium text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Success Message */}
          {isSuccess && (
            <div 
              ref={successRef}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
            >
              🎉 Thanks for subscribing! We'll keep you updated.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Additional Info */}
          <p className="mt-6 text-sm text-gray-400">
            By subscribing, you agree to our{' '}
            <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/terms-conditions" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;