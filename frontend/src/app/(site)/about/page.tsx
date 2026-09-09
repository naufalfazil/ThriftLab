'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Tentang</span>
        </nav>

        <div className="mb-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Tentang Kami'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-8">
            Budaya <br />
            Streetwear <br />
            Berkelanjutan.
          </h1>
          <div className="w-16 h-px bg-thrift-accent mb-8" />
          <p className="text-lg text-thrift-text-muted max-w-2xl leading-relaxed">
            ThriftLab lahir dari dedikasi untuk menjaga warisan sejarah fashion.
            Setiap potong pakaian membawa ceritanya sendiri, mewariskan karakter dari dekade
            yang telah berlalu tanpa mengorbankan identitas gaya modern Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-thrift-text-muted leading-relaxed">
              <p>
                Dengan memilih pakaian <span className="italic">second-hand</span>, Anda secara aktif
                menekan limbah tekstil sekaligus mengamankan koleksi eksklusif yang tidak akan
                pernah bisa direplikasi oleh industri <span className="italic">fast fashion</span>.
              </p>
              <p>
                Kami percaya bahwa fashion yang baik adalah fashion yang memiliki cerita.
                Setiap flannel vintage, setiap denim jacket, setiap hoodie yang telah menemani
                pemiliknya melalui petualangan — semua itu memiliki nilai yang tidak bisa
                diukur oleh harga semata.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="border border-thrift-border p-6 flex flex-col justify-between h-52 bg-[#f5f0e8]">
              <span className="text-4xl font-bold font-mono text-thrift-accent">100%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Otentik & Terpilih
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Diperoleh dari arsip global terverifikasi.
                </p>
              </div>
            </div>
            <div className="border border-thrift-border p-6 flex flex-col justify-between h-52 bg-[#f5f0e8] sm:mt-8">
              <span className="text-4xl font-bold font-mono text-thrift-cream">0%</span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-tight mb-1 text-thrift-cream">
                  Fast Fashion
                </h4>
                <p className="text-[11px] text-thrift-text-muted">
                  Menolak keras limbah produksi tekstil massal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-thrift-border border border-thrift-border mb-20">
          <div className="bg-[#f5f0e8] p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">40+</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Arsip Pilihan</p>
          </div>
          <div className="bg-[#f5f0e8] p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">8</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Kategori Utama</p>
          </div>
          <div className="bg-[#f5f0e8] p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-cream font-mono">9/10</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Kualitas Kondisi</p>
          </div>
          <div className="bg-[#f5f0e8] p-6 sm:p-8 text-center">
            <span className="text-2xl sm:text-3xl font-bold text-thrift-accent font-mono">1-of-1</span>
            <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Edisi Eksklusif</p>
          </div>
        </div>

        <div className="border-t border-thrift-border pt-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Pelajari Lebih Lanjut'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/about/story"
              className="group border border-thrift-border p-8 hover:border-thrift-border-light transition-all duration-500 flex flex-col justify-between min-h-[200px]"
            >
              <h3 className="text-2xl font-bold uppercase tracking-tight text-thrift-cream">
                Our Story
              </h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-thrift-accent mt-4 group-hover:gap-3 transition-all duration-300">
                Baca Cerita Kami
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
            <Link
              href="/about/sustainability"
              className="group border border-thrift-border p-8 hover:border-thrift-border-light transition-all duration-500 flex flex-col justify-between min-h-[200px]"
            >
              <h3 className="text-2xl font-bold uppercase tracking-tight text-thrift-cream">
                Sustainability
              </h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-thrift-accent mt-4 group-hover:gap-3 transition-all duration-300">
                Filosofi Kami
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
