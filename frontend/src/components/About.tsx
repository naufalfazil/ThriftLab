'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
          duration: 1.2,
          ease: 'power4.out',
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
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          delay: 0.15,
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 bg-[#f0ece5] border-t border-thrift-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-accent mb-6 block">
          {'// Manifesto Kami'}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
          <div ref={leftRef} className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.88] mb-8 text-thrift-cream">
              Kultur <br />
              Streetwear <br />
              Berkelanjutan.
            </h2>
            <div className="w-16 h-px bg-thrift-accent mb-8" />
            <div className="space-y-5 text-thrift-text-muted leading-relaxed max-w-xl">
              <p>
                ThriftLab lahir dari dedikasi untuk menjaga warisan sejarah fashion. 
                Setiap potong pakaian membawa ceritanya sendiri, mewariskan karakter dari dekade 
                yang telah berlalu tanpa mengorbankan identitas gaya modern Anda.
              </p>
              <p>
                Dengan memilih pakaian <span className="italic">second-hand</span>, Anda secara aktif 
                menekan limbah tekstil sekaligus mengamankan koleksi eksklusif yang tidak akan 
                pernah bisa direplikasi oleh industri <span className="italic">fast fashion</span>.
              </p>
            </div>
          </div>

          <div ref={rightRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="border border-thrift-border p-6 flex flex-col justify-between h-52 sm:h-60 bg-white">
              <span className="text-4xl font-bold font-mono text-thrift-accent">100%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Otentik & Kurasi
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Diperoleh dari arsip global terverifikasi.
                </p>
              </div>
            </div>
            <div className="border border-thrift-border p-6 flex flex-col justify-between h-52 sm:h-60 bg-white sm:mt-8">
              <span className="text-4xl font-bold font-mono text-thrift-cream">0%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Fast Fashion
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Menolak keras limbah produksi tekstil massal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-thrift-border border border-thrift-border">
          <div className="bg-white p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">40+</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Arsip Pilihan</p>
          </div>
          <div className="bg-white p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">8</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Kategori Utama</p>
          </div>
          <div className="bg-white p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">9/10</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Kualitas Kondisi</p>
          </div>
          <div className="bg-white p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">1-of-1</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Edisi Eksklusif</p>
          </div>
        </div>
      </div>
    </section>
  );
}
