'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featured = [
  { name: 'Vintage Flannel Dickies', price: 'Rp 150.000', category: 'Flannel', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop' },
  { name: 'Retro Denim Jacket', price: 'Rp 250.000', category: 'Denim', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop' },
  { name: 'Carhartt Hoodie Brown', price: 'Rp 350.000', category: 'Hoodie', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop' },
  { name: 'Vintage Varsity Jacket', price: 'Rp 400.000', category: 'Varsity', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop' },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      const totalScroll = trackRef.current!.scrollWidth - trackRef.current!.clientWidth;
      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 overflow-hidden">
      <div ref={headingRef} className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-12 opacity-0">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff3b00] mb-4">
          // Editor&apos;s Pick
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em]">
          Featured Pieces
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-6 px-6 lg:px-10 w-max">
        {featured.map((item, idx) => (
          <div
            key={idx}
            className="group relative w-[300px] sm:w-[380px] lg:w-[450px] shrink-0 cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#ff3b00] text-[9px] font-mono uppercase tracking-wider text-[#f5f5f0]">
                Featured
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff3b00]">
                  {item.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#f5f5f0] mt-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold font-mono text-[#f5f5f0]">
                    {item.price}
                  </span>
                  <div className="w-8 h-8 border border-[#555] flex items-center justify-center group-hover:bg-[#ff3b00] group-hover:border-[#ff3b00] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#f5f5f0]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
