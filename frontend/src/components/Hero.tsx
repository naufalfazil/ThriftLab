'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = true }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }, 0)
      .fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3)
      .fromTo(line1Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.4)
      .fromTo(line2Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.55)
      .fromTo(line3Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.95)
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)
      .fromTo(sideRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.85);

    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(glowRef.current, { x, y, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ready]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 lg:px-10 overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-thrift-accent/[0.04] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div
          ref={lineRef}
          className="w-full h-px bg-thrift-border mb-10 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-9 flex flex-col items-start">
            <div ref={badgeRef} className="inline-flex items-center gap-3 mb-10 opacity-0">
              <span className="w-8 h-px bg-thrift-accent" />
              {/* <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-text-muted">
                Est. 2024 — Thrift Fashion
              </span> */}
            </div>

            <div className="overflow-hidden mb-1">
              <div ref={line1Ref} className="opacity-0">
                <h1 className="text-[clamp(3rem,8.5vw,8rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream">
                  Jual
                </h1>
              </div>
            </div>
            <div className="overflow-hidden mb-1">
              <div ref={line2Ref} className="opacity-0">
                <h1 className="text-[clamp(3rem,8.5vw,8rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream">
                  Dan Beli
                </h1>
              </div>
            </div>
            <div className="overflow-hidden mb-12">
              <div ref={line3Ref} className="opacity-0">
                <h1 className="text-[clamp(3rem,8.5vw,8rem)] font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-accent">
                  Pakaian Bekas
                </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 items-start">
              <p
                ref={descRef}
                className="text-sm sm:text-base text-thrift-text-muted max-w-sm leading-relaxed font-light opacity-0"
              >
                Streetwear vintage pilihan, arsip langka, dan potongan second-hand
                otentik yang dirancang untuk generasi berani. Tanpa replika,
                murni sejarah.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-thrift-accent text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300 group"
                >
                  Jelajahi Koleksi
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-thrift-border-light text-thrift-cream text-[11px] font-bold uppercase tracking-[0.15em] hover:border-thrift-cream transition-all duration-300"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
          </div>

          <div ref={sideRef} className="lg:col-span-3 hidden lg:block opacity-0 mt-4">
            <div className="border-l border-thrift-border-light pl-8 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted mb-3">
                Keaslian Terjamin
              </p>
              <p className="text-[13px] text-thrift-text-muted leading-relaxed">
                Setiap pakaian melewati penilaian kondisi ketat dan inspeksi
                kualitas sebelum memasuki arsip ThriftLab.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-3xl font-bold text-thrift-accent font-mono">40+</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted">
                  Koleksi<br />Pilihan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
