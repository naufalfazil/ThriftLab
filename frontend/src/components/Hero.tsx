'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = true }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
      .fromTo(line1Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.2)
      .fromTo(line2Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.35)
      .fromTo(line3Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.5)
      .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8)
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.95)
      .fromTo(sideRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.9);

    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(glowRef.current, { x, y, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ready]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10 overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-thrift-accent/5 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Section number — editorial */}
      <span className="absolute top-24 right-6 lg:right-10 text-[120px] lg:text-[200px] font-bold text-thrift-border/30 leading-none select-none pointer-events-none">
        01
      </span>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-9 flex flex-col items-start">
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8 opacity-0">
            <span className="w-2 h-2 bg-thrift-accent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-text-muted">
              Drop 04 — Archive Release
            </span>
          </div>

          <div className="overflow-hidden mb-2">
            <div ref={line1Ref} className="opacity-0">
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream">
                Wear The
              </h1>
            </div>
          </div>
          <div className="overflow-hidden mb-2">
            <div ref={line2Ref} className="opacity-0">
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream">
                Unexpected
              </h1>
            </div>
          </div>
          <div className="overflow-hidden mb-10">
            <div ref={line3Ref} className="opacity-0">
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-accent">
                Archive.
              </h1>
            </div>
          </div>

          <p
            ref={descRef}
            className="text-base sm:text-lg text-thrift-text-muted max-w-lg leading-relaxed mb-10 font-light opacity-0"
          >
            Handpicked vintage streetwear, rare archives, and authenticated
            second-hand pieces designed for the bold generation. No replicas,
            pure history.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto opacity-0">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-thrift-accent text-thrift-cream text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300 group"
            >
              Explore Collection
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border border-thrift-border-light text-thrift-cream text-xs font-bold uppercase tracking-[0.15em] hover:border-thrift-cream transition-all duration-300"
            >
              Our Philosophy
            </a>
          </div>
        </div>

        <div ref={sideRef} className="lg:col-span-3 hidden lg:block opacity-0">
          <div className="border-l border-thrift-border-light pl-8 py-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted mb-3">
              Verified Authenticity
            </p>
            <p className="text-sm text-thrift-text-muted leading-relaxed">
              Every garment goes through rigorous condition rating and quality
              inspection before entering the ThriftLab archive.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-bold text-thrift-accent font-mono">40+</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted">
                Curated<br />Pieces
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
