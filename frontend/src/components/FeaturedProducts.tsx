'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  details: {
    size: string;
    condition: string;
    description: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const categories = [
  'All',
  'Flannel',
  'Denim',
  'Hoodie',
  'T-Shirt',
  'Crewneck',
  'Jacket',
  'Varsity',
];

function ProductSkeleton() {
  return (
    <div className="bg-[#111] border border-[#1a1a1a]">
      <div className="aspect-[3/4] bg-[#161616] animate-pulse" />
      <div className="p-5">
        <div className="h-3 bg-[#1a1a1a] w-16 mb-3 animate-pulse" />
        <div className="h-4 bg-[#1a1a1a] w-3/4 mb-4 animate-pulse" />
        <div className="h-3 bg-[#1a1a1a] w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (selected === 'All') return products;
    return products.filter((p) => p.category.toLowerCase() === selected.toLowerCase());
  }, [selected, products]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || error) return;

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
        tabsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error]);

  useEffect(() => {
    if (loading || error || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filtered, loading, error]);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff3b00] mb-4">
            {"// Curated Stock & Archives"}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em]">
              Latest Finds
            </h2>
            <p className="text-sm text-[#666] max-w-xs">
              Filter through our extensive archives by category.
            </p>
          </div>
        </div>

        <div ref={tabsRef} className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 mb-14 -mx-6 px-6 lg:mx-0 lg:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.15em] border transition-all duration-300 shrink-0 ${
                selected === cat
                  ? 'bg-[#ff3b00] text-[#f5f5f0] border-[#ff3b00]'
                  : 'bg-transparent text-[#777] border-[#222] hover:border-[#555] hover:text-[#ccc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 border border-[#1a1a1a] bg-[#0e0e0e]">
            <p className="text-sm text-[#666] font-mono mb-2">
              Unable to load products.
            </p>
            <p className="text-xs text-[#555] mb-6">
              Make sure the backend server is running on port 3001.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs uppercase tracking-widest text-[#ff3b00] hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-[#1a1a1a] bg-[#0e0e0e]">
            <p className="text-sm text-[#666] font-mono mb-2">
              No products found in this category.
            </p>
            <button
              onClick={() => setSelected('All')}
              className="text-xs uppercase tracking-widest text-[#ff3b00] hover:underline mt-2"
            >
              View All
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group bg-[#0e0e0e] border border-[#1a1a1a] hover:border-[#333] transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#0a0a0a]/80 text-[9px] font-mono uppercase tracking-wider text-[#aaa]">
                    {product.category}
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#ff3b00] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#f5f5f0]" />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#555] mb-2">
                    <span>{product.details.size}</span>
                    <span className="text-[#ff3b00]">
                      {product.details.condition}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-tight text-[#eee] group-hover:text-[#ff3b00] transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-[#f5f5f0]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
