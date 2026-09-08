'use client';

import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#ede8df] border-t border-thrift-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-20">
          <div className="md:col-span-5">
            <a href="#home" className="inline-block">
              <span className="text-xl font-bold tracking-[-0.03em] uppercase text-thrift-cream">
                Thrift<span className="text-thrift-accent">Lab</span>
              </span>
            </a>
            <p className="text-sm text-thrift-text-muted max-w-xs mt-4 leading-relaxed">
              Pakaian second-hand terpilih dan arsip streetwear vintage untuk
              generasi yang sadar akan gaya.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted mb-5">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', href: '#home' },
                { label: 'Koleksi', href: '#shop' },
                { label: 'Kategori', href: '#categories' },
                { label: 'Tentang', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-thrift-text-muted hover:text-thrift-cream transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted mb-5">
              Tetap Terupdate
            </h4>
            <p className="text-sm text-thrift-text-muted mb-4">
              Dapatkan notifikasi jadwal rilis mingguan kami.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors w-full"
              />
              <button className="bg-thrift-accent px-5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-thrift-accent-warm transition-colors flex items-center gap-1 cursor-pointer">
                Gabung
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-thrift-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-thrift-text-muted">
          <p>&copy; {new Date().getFullYear()} ThriftLab. Hak cipta dilindungi.</p>
          <p className="font-mono uppercase tracking-widest">
            SMK Taruna Bhakti — Proyek Siswa
          </p>
        </div>
      </div>
    </footer>
  );
}
