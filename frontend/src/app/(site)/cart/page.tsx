'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="w-12 h-12 text-thrift-border mb-6" />
        <h1 className="text-3xl font-bold uppercase tracking-tight text-thrift-cream mb-4">
          Keranjang Kosong
        </h1>
        <p className="text-sm text-thrift-text-muted mb-8">
          Belum ada produk di keranjang Anda.
        </p>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300"
        >
          Mulai Belanja
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>
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
          <span className="text-thrift-cream">Keranjang</span>
        </nav>

        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
          {'// Keranjang Belanja'}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-8">
          Keranjang.
        </h1>
        <div className="w-16 h-px bg-thrift-accent mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="border border-thrift-border divide-y divide-thrift-border">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-6 p-6 bg-[#f5f0e8]">
                  <Link
                    href={`/collection/${item.product.id}`}
                    className="shrink-0 w-24 h-32 sm:w-28 sm:h-36 bg-thrift-border overflow-hidden"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                        {item.product.subcategory}
                      </p>
                      <Link
                        href={`/collection/${item.product.id}`}
                        className="text-sm font-semibold uppercase tracking-tight text-thrift-cream hover:text-thrift-accent transition-colors truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-sm font-bold font-mono text-thrift-accent mt-1 block">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-thrift-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-thrift-text-muted hover:text-thrift-cream transition-colors cursor-pointer"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-mono text-thrift-cream">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-thrift-text-muted hover:text-thrift-cream transition-colors cursor-pointer"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-thrift-text-muted hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Hapus dari keranjang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-thrift-border p-6 bg-[#f5f0e8] sticky top-28">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted mb-6">
                Ringkasan
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-thrift-text-muted">Subtotal ({totalItems} item)</span>
                  <span className="font-mono text-thrift-cream">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-thrift-text-muted">Pengiriman</span>
                  <span className="font-mono text-thrift-text-muted">Dihitung saat checkout</span>
                </div>
              </div>

              <div className="w-full h-px bg-thrift-border mb-6" />

              <div className="flex justify-between text-base font-bold mb-8">
                <span className="uppercase tracking-tight text-thrift-cream">Total</span>
                <span className="font-mono text-thrift-accent">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300"
              >
                Checkout
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/collection"
                className="block text-center text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-accent hover:underline mt-4"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
