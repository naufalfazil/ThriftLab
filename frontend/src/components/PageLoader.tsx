'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      onCompleteRef.current();
      return;
    }

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
          document.body.style.overflow = '';
          onCompleteRef.current();
        },
      });

      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
        .to({}, { duration: 1.1 })
        .to(contentRef.current, {
          y: -35,
          opacity: 0,
          scale: 0.96,
          duration: 0.55,
          ease: 'power3.in',
        })
        .to(
          loaderRef.current,
          {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.1'
        );
    }, loaderRef); 

    return () => {
      document.body.style.overflow = '';
      ctx.revert(); 
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 50% 45%, #ffffff 0%, #f5f5f3 45%, #e8e8e4 100%)',
        clipPath: 'circle(100% at 50% 50%)',
      }}
    >
      <div ref={contentRef}>
        <div ref={textRef} className="overflow-hidden text-center">
          {/* PERUBAHAN DI SINI: text-thrift-surface diubah menjadi text-black */}
          <h1 className="text-5xl font-bold tracking-[-0.06em] text-black sm:text-7xl">
            Thrift<span className="text-thrift-accent">Lab</span>
          </h1>
        </div>
      </div>
    </div>
  );
}