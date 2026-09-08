'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchProducts, type Product } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-28 pb-24 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="aspect-[4/5] bg-thrift-border/40 animate-pulse" />
      <div className="flex flex-col gap-6 py-8">
        <div className="h-4 bg-thrift-border/40 animate-pulse w-1/4" />
        <div className="h-10 bg-thrift-border/40 animate-pulse w-3/4" />
        <div className="h-8 bg-thrift-border/40 animate-pulse w-1/3" />
        <div className="h-px bg-thrift-border/40 my-4" />
        <div className="h-20 bg-thrift-border/40 animate-pulse" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const found = data.find((p) => p.id === Number(id));
        if (found) {
          setProduct(found);
          setRelated(
            data
              .filter((p) => p.category === found.category && p.id !== found.id)
              .slice(0, 4)
          );
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ProductSkeleton />;

  if (notFound || !product) {
    return (
      <div className="pt-28 pb-24 px-6 lg:px-10 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-thrift-cream mb-4">
          Produk Tidak Ditemukan
        </h1>
        <p className="text-sm text-thrift-text-muted mb-8">
          Produk yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-thrift-accent hover:underline"
        >
          Kembali ke Koleksi
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-thrift-cream transition-colors">
            Koleksi
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-[4/5] bg-thrift-border overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-white">
              {product.details.condition}
            </span>
          </div>

          <div className="flex flex-col justify-center py-4">
            <Link
              href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-accent mb-4 inline-block hover:underline"
            >
              {product.category}
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-thrift-cream leading-tight mb-4">
              {product.name}
            </h1>
            <span className="text-2xl font-bold font-mono text-thrift-accent mb-8">
              Rp {product.price.toLocaleString('id-ID')}
            </span>

            <div className="w-full h-px bg-thrift-border mb-8" />

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                  Ukuran
                </p>
                <p className="text-sm text-thrift-cream font-medium">{product.details.size}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                  Kondisi
                </p>
                <p className="text-sm text-thrift-cream font-medium">{product.details.condition}</p>
              </div>
            </div>

            {product.details.description && (
              <div className="mb-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-3">
                  Deskripsi
                </p>
                <p className="text-sm text-thrift-text-muted leading-relaxed">
                  {product.details.description}
                </p>
              </div>
            )}

            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300 w-full sm:w-auto cursor-pointer">
              Tambahkan ke Keranjang
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-thrift-border pt-16">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
              {'// Produk Serupa'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-[-0.03em] text-thrift-cream mb-10">
              Lainnya di {product.category}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((item) => (
                <Link key={item.id} href={`/collection/${item.id}`} className="group flex flex-col">
                  <div className="relative overflow-hidden bg-thrift-border aspect-[4/5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="pt-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-semibold uppercase tracking-tight text-thrift-text truncate">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold font-mono text-thrift-cream">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
