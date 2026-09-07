'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  details: {
    size: string;
    condition: string;
    description: string;
  };
}

export default function Showcase() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const picks = [0, 3, 11, 7].map((i) => data[i]).filter(Boolean);
        setFeatured(picks);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !trackRef.current || featured.length === 0) return;

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
      if (totalScroll > 0) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [featured]);

  if (featured.length === 0) return null;

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

      <div ref={trackRef} className="flex gap-4 sm:gap-6 px-6 lg:px-10 w-max">
        {featured.map((item) => (
          <div
            key={item.id}
            className="group relative w-[260px] sm:w-[380px] lg:w-[450px] shrink-0 cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#ff3b00] text-[9px] font-mono uppercase tracking-wider text-[#f5f5f0]">
                Featured
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff3b00]">
                  {item.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#f5f5f0] mt-1 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold font-mono text-[#f5f5f0]">
                    Rp {item.price.toLocaleString('id-ID')}
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
