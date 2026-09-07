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
    <div className="bg-thrift-surface border border-thrift-border">
      <div className="aspect-[3/4] bg-thrift-dark animate-pulse" />
      <div className="p-5">
        <div className="h-3 bg-thrift-border w-16 mb-3 animate-pulse" />
        <div className="h-4 bg-thrift-border w-3/4 mb-4 animate-pulse" />
        <div className="h-3 bg-thrift-border w-1/2 animate-pulse" />
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
      className="py-24 sm:py-32 px-6 lg:px-10 border-t border-thrift-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {"// Curated Stock & Archives"}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
              Latest Finds
            </h2>
            <p className="text-sm text-thrift-text-muted max-w-xs">
              Filter through our extensive archives by category.
            </p>
          </div>
        </div>

        <div ref={tabsRef} className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1.5 mb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.12em] transition-all duration-300 shrink-0 ${
                selected === cat
                  ? 'bg-thrift-accent text-thrift-cream'
                  : 'text-thrift-text-muted hover:text-thrift-cream'
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
          <div className="text-center py-24 border border-thrift-border bg-thrift-surface">
            <p className="text-sm text-thrift-text-muted font-mono mb-2">
              Unable to load products.
            </p>
            <p className="text-xs text-thrift-text-muted mb-6">
              Make sure the backend server is running on port 3001.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs uppercase tracking-widest text-thrift-accent hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-thrift-border bg-thrift-surface">
            <p className="text-sm text-thrift-text-muted font-mono mb-2">
              No products found in this category.
            </p>
            <button
              onClick={() => setSelected('All')}
              className="text-xs uppercase tracking-widest text-thrift-accent hover:underline mt-2"
            >
              View All
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 sm:gap-5">
            {filtered.slice(0, 12).map((product, idx) => {
              const isFirst = idx === 0;
              const isThird = idx === 2;
              let gridClass = '';
              if (isFirst) gridClass = 'col-span-2 lg:col-span-5 lg:row-span-2';
              else if (isThird) gridClass = 'col-span-2 lg:col-span-7';
              else gridClass = 'col-span-1';

              return (
                <article
                  key={product.id}
                  className={`group bg-thrift-darker border border-thrift-border hover:border-thrift-border-light transition-all duration-500 cursor-pointer ${gridClass}`}
                >
                  <div className={`relative overflow-hidden bg-thrift-surface ${isFirst ? 'aspect-[3/4] lg:aspect-auto lg:h-full' : isThird ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-thrift-darker/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-thrift-darker/80 text-[9px] font-mono uppercase tracking-wider text-thrift-text-muted">
                      {product.category}
                    </div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-thrift-accent flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-thrift-cream" />
                    </div>
                    {isFirst && (
                      <div className="absolute top-4 right-4 text-[10px] font-mono text-thrift-accent uppercase tracking-widest">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-thrift-text-muted mb-2">
                      <span>{product.details.size}</span>
                      <span className="text-thrift-accent">
                        {product.details.condition}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-tight text-thrift-text group-hover:text-thrift-accent transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold font-mono text-thrift-cream">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
