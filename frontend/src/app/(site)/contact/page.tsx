'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Contact</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
              {'// Contact'}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-8">
              Hubungi <br />
              Kami.
            </h1>
            <div className="w-16 h-px bg-thrift-accent mb-8" />
            <p className="text-sm text-thrift-text-muted leading-relaxed max-w-md mb-12">
              Punya pertanyaan tentang produk kami atau ingin bekerja sama?
              Jangan ragu untuk menghubungi kami.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-thrift-border flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-thrift-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                    Email
                  </p>
                  <p className="text-sm text-thrift-cream">hello@thriftlab.id</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-thrift-border flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-thrift-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                    Telepon
                  </p>
                  <p className="text-sm text-thrift-cream">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-thrift-border flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-thrift-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
                    Lokasi
                  </p>
                  <p className="text-sm text-thrift-cream">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                  placeholder="Perihal pesan Anda"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300 cursor-pointer"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
