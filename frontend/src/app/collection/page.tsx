'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, type Product } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

const categoryFilters = [
  'Semua',
  'Flannel',
  'Denim',
  'Hoodie',
  'T-Shirt',
  'Crewneck',
  'Jacket',
  'Varsity',
  'Windbreaker',
  'Fleece',
];

function ProductSkeleton() {
  return (
    <div className="bg-thrift-border/30 border border-thrift-border aspect-[3/4]">
      <div className="w-full h-full bg-thrift-border/40 animate-pulse" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/${product.id}`} className="group relative flex flex-col">
      <div className="relative overflow-hidden bg-thrift-border aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider text-white">
          {product.details.condition}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center border border-white/40 bg-black/40 backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
            {product.category} &middot; {product.details.size}
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

function CollectionContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (filterParam) {
      const match = categoryFilters.find(
        (c) => c.toLowerCase() === filterParam.toLowerCase()
      );
      if (match) setSelected(match);
    }
  }, [filterParam]);

  const filtered = useMemo(() => {
    if (selected === 'Semua') return products;
    return products.filter(
      (p) => p.category.toLowerCase() === selected.toLowerCase()
    );
  }, [selected, products]);

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Koleksi</span>
        </nav>

        <div className="mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Semua Koleksi'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
              Koleksi
            </h1>
            <p className="text-sm text-thrift-text-muted max-w-xs sm:text-right">
              {products.length} produk pilihan dari arsip kami.
            </p>
          </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 mb-12 -mx-6 px-6 lg:mx-0 lg:px-0">
          {categoryFilters.map((cat) => (
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
            {Array.from({ length: 8 }).map((_, i) => (
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-16">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-14">
              <div className="h-12 w-48 bg-thrift-border/40 animate-pulse mb-4" />
              <div className="h-8 w-32 bg-thrift-border/40 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <CollectionContent />
    </Suspense>
  );
}
