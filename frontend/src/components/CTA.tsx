'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        btnRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-thrift-border"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between">
        <div ref={textRef} className="max-w-2xl mb-12 md:mb-0">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-accent mb-6 block">
            {'// Amankan Sekarang'}
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.86] mb-8 text-thrift-cream">
            Temukan <br />
            Karakter <br />
            Barumu.
          </h2>

          <div className="w-16 h-px bg-thrift-accent mb-8" />

          <p className="text-sm text-thrift-text-muted max-w-md leading-relaxed">
            Rilis arsip terbaru setiap minggu. Setiap potongan pakaian hanya tersedia satu buah — jadilah yang pertama atau kehilangan kesempatan selamanya.
          </p>
        </div>

        <Link
          ref={btnRef}
          href="/collection"
          className="inline-flex items-center gap-3 px-10 py-5 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-thrift-accent-warm transition-all duration-500 group"
        >
          Eksplor Katalog
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
