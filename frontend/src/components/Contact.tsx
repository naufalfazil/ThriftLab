'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail } from 'lucide-react';
import { API_URL } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.15,
        }
      );

      gsap.fromTo(
        infoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function validate(): boolean {
    if (!name.trim()) return false;
    if (!email.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return false;
    if (!message.trim()) return false;
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!validate()) {
      setStatus('error');
      setStatusMsg('Lengkapi semua field yang wajib diisi dengan format yang benar.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan.');
      }

      setStatus('success');
      setStatusMsg(data.message || 'Pesan terkirim, kami akan segera membalas.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setStatusMsg(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 lg:px-10 bg-[#ede8df] border-t border-thrift-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef}>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-thrift-accent mb-6 block">
            {'// Hubungi Kami'}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[-0.04em] leading-[0.88] mb-8 text-thrift-cream">
            Kirim <br />
            Pesan.
          </h2>

          <div className="w-16 h-px bg-thrift-accent mb-8" />

          <p className="text-sm text-thrift-text-muted leading-relaxed max-w-md mb-16">
            Punya pertanyaan tentang produk atau ingin bekerja sama?
            Isi form di bawah ini dan kami akan membalas segera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div ref={formRef} className="lg:col-span-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Nama <span className="text-thrift-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Email <span className="text-thrift-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Subjek
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                  placeholder="Perihal pesan Anda"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Pesan <span className="text-thrift-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              {status && (
                <div
                  className={`text-xs font-mono uppercase tracking-wider ${
                    status === 'success' ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
              >
                {loading ? (
                  'Mengirim...'
                ) : (
                  <>
                    Kirim Pesan
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div ref={infoRef} className="lg:col-span-5 space-y-8">
            <div className="border border-thrift-border p-6 bg-[#f5f0e8]">
              <div className="flex items-center gap-3 mb-4">
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
            </div>

            <div className="border border-thrift-border p-6 bg-[#f5f0e8]">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-3">
                Jam Operasional
              </p>
              <p className="text-sm text-thrift-cream">Senin — Jumat, 09:00 — 17:00 WIB</p>
            </div>

            <div className="border border-thrift-border p-6 bg-[#f5f0e8]">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-3">
                Lokasi
              </p>
              <p className="text-sm text-thrift-cream">Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
