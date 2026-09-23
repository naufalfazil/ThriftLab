'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = [
  'Flannel Vintage',
  'Arsip Langka',
  'Second-Hand',
  'Streetwear',
  'Otentik',
  'Terpilih',
  'Berkelanjutan',
  'Satu-satunya',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth / 2;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="py-5 border-y border-thrift-border overflow-hidden select-none bg-thrift-surface">
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-[clamp(0.875rem,2vw,1.25rem)] font-bold uppercase tracking-[-0.01em] text-thrift-border-light">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-thrift-accent/30 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
