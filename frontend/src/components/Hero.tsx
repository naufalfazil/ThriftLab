'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3)
      .fromTo(line1Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.4)
      .fromTo(line2Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.55)
      .fromTo(line3Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
      .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1)
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.15)
      .fromTo(sideRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 1);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#ff3b00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-9 flex flex-col items-start">
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-[#ff3b00]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#777]">
              Drop 04 — Archive Release
            </span>
          </div>

          <div className="overflow-hidden mb-2">
            <div ref={line1Ref}>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-[#f5f5f0]">
                Wear The
              </h1>
            </div>
          </div>
          <div className="overflow-hidden mb-2">
            <div ref={line2Ref}>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-[#f5f5f0]">
                Unexpected
              </h1>
            </div>
          </div>
          <div className="overflow-hidden mb-10">
            <div ref={line3Ref}>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-[#ff3b00]">
                Archive.
              </h1>
            </div>
          </div>

          <p
            ref={descRef}
            className="text-base sm:text-lg text-[#888] max-w-lg leading-relaxed mb-10 font-light"
          >
            Handpicked vintage streetwear, rare archives, and authenticated
            second-hand pieces designed for the bold generation. No replicas,
            pure history.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#ff3b00] text-[#f5f5f0] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#e63400] transition-all duration-300 group"
            >
              Explore Collection
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#333] text-[#f5f5f0] text-xs font-bold uppercase tracking-[0.15em] hover:border-[#f5f5f0] transition-all duration-300"
            >
              Our Philosophy
            </a>
          </div>
        </div>

        <div ref={sideRef} className="lg:col-span-3 hidden lg:block">
          <div className="border-l border-[#333] pl-8 py-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] mb-3">
              Verified Authenticity
            </p>
            <p className="text-sm text-[#aaa] leading-relaxed">
              Every garment goes through rigorous condition rating and quality
              inspection before entering the ThriftLab archive.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-bold text-[#ff3b00] font-mono">40+</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#666]">
                Curated<br />Pieces
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
