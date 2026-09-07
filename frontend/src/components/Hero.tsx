'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff3b00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#171717] border border-[#222222] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff3b00] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#a3a3a3]">
              Drop 04 // Archive Release
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
          >
            Second-Hand <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b00] to-[#ff8800]">
              Elegance.
            </span>
          </h1>

          <p
            ref={subRef}
            className="text-base sm:text-lg text-[#a3a3a3] max-w-xl font-normal leading-relaxed mb-10"
          >
            Handpicked vintage streetwear, rare archives, and authenticated second-hand pieces designed for the bold generation. No replicas, pure history.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <a
              href="#shop"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#ff3b00] text-[#f5f5f0] font-bold uppercase tracking-wider hover:bg-[#e03400] transition-all group"
            >
              <span>Explore Collection</span>
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#333333] text-[#f5f5f0] font-bold uppercase tracking-wider hover:border-[#f5f5f0] transition-all"
            >
              Our Philosophy
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col justify-end">
          <div className="p-6 bg-[#171717] border border-[#222222]">
            <p className="text-xs font-mono uppercase text-[#888888] mb-2">Verified Authenticity</p>
            <p className="text-sm text-[#f5f5f0] leading-relaxed">
              Every garment goes through rigorous condition rating and quality inspection before entering the ThriftLab archive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}