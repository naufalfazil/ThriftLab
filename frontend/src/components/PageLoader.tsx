'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none';
        onComplete();
      },
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counter.val));
      },
    })
      .to(textRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power3.in',
      }, '+=0.1')
      .to(progressRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.6')
      .to(loaderRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.9,
        ease: 'power4.inOut',
      }, '-=0.3');
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f0e8]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div ref={textRef} className="overflow-hidden">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.04em] uppercase text-thrift-cream">
          Thrift<span className="text-thrift-accent">Lab</span>
        </h1>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="w-40 h-[1px] bg-thrift-border relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-thrift-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="text-xs font-mono text-thrift-text-muted tabular-nums w-8">{progress}</span>
      </div>

      <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-text-muted">
        Arsip Terpilih
      </p>
    </div>
  );
}
