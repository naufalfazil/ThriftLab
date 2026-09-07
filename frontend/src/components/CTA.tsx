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
      className="py-24 sm:py-32 px-6 lg:px-10 bg-thrift-cream border-t border-thrift-dark/10"
    >
      <div className="max-w-[1400px] mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-text-muted mb-6 block">
          04 / CTA
        </span>

        <div ref={textRef} className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold uppercase tracking-[-0.04em] leading-[0.86] mb-8 text-thrift-dark">
            Find Your <br />
            Next Piece.
          </h2>
          <div className="w-16 h-px bg-thrift-accent mb-8" />
          <p className="text-sm text-thrift-text-muted max-w-md mb-10 leading-relaxed">
            New drops every week. Each piece is one-of-a-kind — once it&apos;s gone, it&apos;s gone.
          </p>
        </div>

        <a
          ref={btnRef}
          href="#shop"
          className="inline-flex items-center gap-3 px-10 py-5 bg-thrift-dark text-thrift-cream text-xs font-bold uppercase tracking-[0.2em] hover:bg-thrift-accent transition-all duration-300 group"
        >
          Shop Now
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
