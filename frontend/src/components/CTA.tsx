'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        btnRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <div ref={textRef}>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff3b00] mb-6">
            {"// Don't Miss Out"}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.9] mb-6">
            Find Your <br />
            Next Piece.
          </h2>
          <p className="text-sm text-[#666] max-w-md mx-auto mb-10">
            New drops every week. Each piece is one-of-a-kind — once it&apos;s gone, it&apos;s gone.
          </p>
        </div>

        <a
          ref={btnRef}
          href="#shop"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#ff3b00] text-[#f5f5f0] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#e63400] transition-all duration-300 group"
        >
          Shop Now
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
