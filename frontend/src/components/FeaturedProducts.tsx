'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const categories = [
  'Semua',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Accessories',
];

function ProductSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-thrift-border/30 border border-thrift-border ${featured ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
      <div className="w-full h-full bg-thrift-border/40 animate-pulse" />
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link href={`/collection/${product.id}`} className="group relative flex flex-col">
      <div className="relative overflow-hidden bg-thrift-border aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />

        <span className="absolute top-4 left-4 text-[10px] font-mono text-white/70 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider text-white">
          {product.details.condition}
        </span>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center border border-white/40 bg-black/40 backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
            {product.subcategory} &middot; {product.details.size}
          </p>
          <h3 className="text-[15px] font-semibold uppercase tracking-tight text-thrift-text truncate">
            {product.name}
          </h3>
        </div>
        <span className="shrink-0 text-[15px] font-bold font-mono text-thrift-cream">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
      </div>

      <span className="mt-3 block h-px w-full bg-thrift-border relative overflow-hidden">
        <span className="absolute inset-0 bg-thrift-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      </span>
    </Link>
  );
}

function FeaturedCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/${product.id}`} className="group relative flex flex-col lg:row-span-2">
      <div className="relative overflow-hidden bg-thrift-border aspect-[4/5] lg:aspect-auto lg:h-full">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-6 left-6 flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/70">01</span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-accent">
            Pilihan Utama
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/70 mb-2">
              {product.subcategory} &middot; {product.details.size} &middot; {product.details.condition}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-[-0.02em] text-white leading-none mb-2">
              {product.name}
            </h3>
            <span className="text-lg font-bold font-mono text-white">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-thrift-accent group-hover:bg-white transition-colors duration-300">
            <ArrowUpRight className="w-5 h-5 text-white group-hover:text-thrift-accent transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (selected === 'Semua') return products;
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
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
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
          scrollTrigger: { trigger: tabsRef.current, start: 'top 85%' },
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
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
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
        <div ref={headingRef} className="mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Stok & Arsip Terpilih'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
              Temuan Terbaru
            </h2>
            <Link
              href="/collection"
              className="text-[10px] font-mono uppercase tracking-wider text-thrift-accent hover:underline shrink-0"
            >
              Lihat Semua &rarr;
            </Link>
          </div>
        </div>

        <div
          ref={tabsRef}
          className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 mb-12 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.12em] border transition-all duration-300 shrink-0 cursor-pointer ${
                selected === cat
                  ? 'bg-thrift-accent border-thrift-accent text-white'
                  : 'border-thrift-border text-thrift-text-muted hover:border-thrift-border-light hover:text-thrift-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            <ProductSkeleton featured />
            {Array.from({ length: 7 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 border border-thrift-border bg-thrift-surface">
            <p className="text-sm text-thrift-text-muted font-mono mb-2">
              Gagal memuat produk.
            </p>
            <p className="text-xs text-thrift-text-muted mb-6">
              Pastikan server backend berjalan di port 5000.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs uppercase tracking-widest text-thrift-accent hover:underline cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-thrift-border bg-thrift-surface">
            <p className="text-sm text-thrift-text-muted font-mono mb-2">
              Tidak ada produk ditemukan di kategori ini.
            </p>
            <button
              onClick={() => setSelected('Semua')}
              className="text-xs uppercase tracking-widest text-thrift-accent hover:underline mt-2 cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-16"
          >
            {filtered.slice(0, 9).map((product, idx) =>
              idx === 0 ? (
                <FeaturedCard key={product.id} product={product} />
              ) : (
                <ProductCard key={product.id} product={product} index={idx} />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
