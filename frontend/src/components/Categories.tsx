'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CategoryGroup {
  name: string;
  count: number;
  image: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const groupMap = new Map<string, { count: number; image: string }>();
        data.forEach((p) => {
          const existing = groupMap.get(p.category);
          if (existing) {
            existing.count++;
          } else {
            groupMap.set(p.category, { count: 1, image: p.image });
          }
        });
        const groups: CategoryGroup[] = Array.from(groupMap.entries())
          .map(([name, { count, image }]) => ({ name, count, image }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);
        setCategories(groups);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        gridRef.current!.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-thrift-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-text-muted/60 mb-6 block">
          03 / Kategori
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={headingRef} className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-28 self-start">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-6">
              Jelajahi <br />
              Berdasarkan <br />
              Gaya
            </h2>
            <div className="w-12 h-px bg-thrift-accent mb-6" />
            <p className="text-sm text-thrift-text-muted leading-relaxed max-w-xs">
              Koleksi terpilih yang disortir berdasarkan jenis pakaian. Temukan yang sesuai dengan gaya Anda.
            </p>
          </div>

          <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {categories.map((cat, idx) => (
              <a
                key={cat.name}
                href="#shop"
                className={`group relative overflow-hidden bg-thrift-border border border-thrift-border hover:border-thrift-border-light transition-all duration-500 ${
                  idx === 0 ? 'sm:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-thrift-accent uppercase tracking-[0.2em]">
                        {cat.count} {cat.count === 1 ? 'item' : 'item'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                        {cat.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 border border-white/40 flex items-center justify-center group-hover:bg-thrift-accent group-hover:border-thrift-accent transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
