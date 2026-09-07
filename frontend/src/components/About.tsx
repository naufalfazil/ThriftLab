'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          delay: 0.15,
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 bg-thrift-cream"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section number */}
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-text-muted/60 mb-6 block">
          02 / About
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
          <div ref={leftRef} className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] leading-[0.92] mb-8 text-thrift-dark">
              Sustainable <br />
              Streetwear <br />
              Culture.
            </h2>
            <div className="space-y-5 text-thrift-text-muted leading-relaxed max-w-xl">
              <p>
                ThriftLab was born out of a passion for preserving fashion history.
                Every piece tells a story, carrying the weight of decades past
                without compromising modern style and individuality.
              </p>
              <p>
                By choosing second-hand, you actively reduce textile waste while
                securing one-of-a-kind garments that mass-market fast fashion
                simply cannot replicate.
              </p>
            </div>
          </div>

          <div ref={rightRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="border border-thrift-dark/10 p-6 flex flex-col justify-between h-52 sm:h-60 bg-thrift-dark">
              <span className="text-4xl font-bold font-mono text-thrift-accent">100%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Authentic Vintage
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Sourced from verified global archives.
                </p>
              </div>
            </div>
            <div className="border border-thrift-dark/10 p-6 flex flex-col justify-between h-52 sm:h-60 bg-thrift-dark mt-8">
              <span className="text-4xl font-bold font-mono text-thrift-cream">0%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Fast Fashion
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Against mass-produced textile waste.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-thrift-dark/10 border border-thrift-dark/10">
          <div className="bg-thrift-dark p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">40+</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Curated Pieces</p>
          </div>
          <div className="bg-thrift-dark p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">12</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Categories</p>
          </div>
          <div className="bg-thrift-dark p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">9/10</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Avg Condition</p>
          </div>
          <div className="bg-thrift-dark p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">1-of-1</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Every Piece</p>
          </div>
        </div>
      </div>
    </section>
  );
}
