'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = [
  'Vintage Flannel',
  'Rare Archives',
  'Second-Hand',
  'Streetwear',
  'Authentic',
  'Curated',
  'Sustainable',
  'One-of-a-Kind',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth / 2;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="py-6 border-y border-[#1a1a1a] overflow-hidden select-none">
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-[clamp(1rem,2.5vw,1.5rem)] font-bold uppercase tracking-[-0.02em] text-[#222]">
              {item}
            </span>
            <span className="w-2 h-2 bg-[#ff3b00] opacity-40 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
