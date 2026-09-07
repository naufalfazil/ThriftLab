'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 bg-[#0c0c0c] border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div ref={leftRef} className="lg:col-span-7">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff3b00] mb-4">
            // Our Manifesto
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] leading-[0.92] mb-8">
            Sustainable <br />
            Streetwear <br />
            Culture.
          </h2>
          <div className="space-y-5 text-[#888] leading-relaxed max-w-xl">
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
          <div className="border border-[#1a1a1a] p-6 flex flex-col justify-between h-56 sm:h-64 bg-[#111]">
            <span className="text-4xl font-bold font-mono text-[#ff3b00]">100%</span>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-tight mb-1">
                Authentic Vintage
              </h4>
              <p className="text-[11px] text-[#666]">
                Sourced from verified global archives.
              </p>
            </div>
          </div>
          <div className="border border-[#1a1a1a] p-6 flex flex-col justify-between h-56 sm:h-64 bg-[#111] mt-8">
            <span className="text-4xl font-bold font-mono text-[#f5f5f0]">0%</span>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-tight mb-1">
                Fast Fashion
              </h4>
              <p className="text-[11px] text-[#666]">
                Against mass-produced textile waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
