'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts, getCategories, type CategoryGroup } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setCategories(getCategories(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Kategori</span>
        </nav>

        <div className="mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Jelajahi Berdasarkan Gaya'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
              Kategori
            </h1>
            <p className="text-sm text-thrift-text-muted max-w-xs sm:text-right">
              Temukan potongan yang sesuai dengan gaya Anda.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-thrift-border/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group relative overflow-hidden bg-thrift-border border border-thrift-border hover:border-thrift-border-light transition-all duration-500 ${
                  idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
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
                      <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                        {cat.name}
                      </h2>
                    </div>
                    <div className="w-10 h-10 border border-white/40 flex items-center justify-center group-hover:bg-thrift-accent group-hover:border-thrift-accent transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
