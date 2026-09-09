'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

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

      const data = await res.json();

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="page-name"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Nama <span className="text-thrift-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="page-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="page-email"
                    className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                  >
                    Email <span className="text-thrift-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="page-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="page-subject"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Subjek
                </label>
                <input
                  type="text"
                  id="page-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                  placeholder="Perihal pesan Anda"
                />
              </div>
              <div>
                <label
                  htmlFor="page-message"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Pesan <span className="text-thrift-accent">*</span>
                </label>
                <textarea
                  id="page-message"
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
        </div>
      </div>
    </section>
  );
}
