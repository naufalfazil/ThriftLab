'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  sold: number;
  createdAt: string;
  details: {
    size: string;
    condition: string;
    description: string;
  };
}

export default function Showcase() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/products/best-sellers`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setFeatured(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || featured.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [featured]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setDragging(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  if (featured.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div ref={headingRef} className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-12 opacity-0 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Pilihan Editor'}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
            Koleksi Unggulan
          </h2>
        </div>
        <Link
          href="/collection"
          className="text-[10px] font-mono uppercase tracking-wider text-thrift-accent hover:underline hidden sm:block"
        >
          Lihat Semua &rarr;
        </Link>
      </div>

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex gap-4 sm:gap-6 px-6 lg:px-10 overflow-x-auto no-scrollbar cursor-grab select-none"
        style={{ scrollBehavior: dragging ? 'auto' : 'smooth' }}
      >
        {featured.map((item) => (
          <Link
            key={item.id}
            href={`/collection/${item.id}`}
            className="group relative w-[260px] sm:w-[380px] lg:w-[450px] shrink-0"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-thrift-border">
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-thrift-accent text-[9px] font-mono uppercase tracking-wider text-white">
                Unggulan
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-accent">
                  {item.subcategory}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-white mt-1 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold font-mono text-white">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  <div className="w-8 h-8 border border-white/40 flex items-center justify-center group-hover:bg-thrift-accent group-hover:border-thrift-accent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
