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
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff3b00] mb-4">
            // Browse By Style
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em]">
            Categories
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat, idx) => (
            <a
              key={cat.name}
              href="#shop"
              className={`group relative overflow-hidden bg-[#111] border border-[#1a1a1a] hover:border-[#333] transition-all duration-500 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#ff3b00] uppercase tracking-[0.2em]">
                      {cat.count} {cat.count === 1 ? 'item' : 'items'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f5f5f0] mt-1">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 border border-[#444] flex items-center justify-center group-hover:bg-[#ff3b00] group-hover:border-[#ff3b00] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#f5f5f0]" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
