'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    tl.to(barRef.current, {
      width: '100%',
      duration: 0.8,
      ease: 'power2.inOut',
    })
      .to(textRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f5f5f0]"
    >
      <div className="overflow-hidden mb-4">
        <h1
          ref={textRef}
          className="text-4xl md:text-6xl font-black tracking-widest uppercase"
        >
          Thrift<span className="text-[#ff3b00]">Lab</span>
        </h1>
      </div>
      <div className="w-48 h-[2px] bg-[#222222] relative overflow-hidden">
        <div ref={barRef} className="absolute left-0 top-0 h-full w-0 bg-[#ff3b00]" />
      </div>
      <p className="mt-4 text-xs tracking-widest text-[#888888] uppercase">Curated Archives</p>
    </div>
  );
}