'use client';

import { useState, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Toast from '@/components/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password) {
        setToast('Mohon isi email dan password.');
        return;
      }
      setToast('Fitur login sedang dalam tahap pengembangan.');
      setEmail('');
      setPassword('');
    },
    [email, password]
  );

  return (
    <>
      <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <div className="w-full max-w-md">
            {/* Brand */}
            <div className="text-center mb-10">
              <h1 className="text-lg font-bold tracking-[-0.03em] uppercase text-thrift-cream">
                Thrift<span className="text-thrift-accent">Lab</span>
              </h1>
            </div>

            {/* Heading */}
            <div className="text-center mb-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
                {'// Sign In'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-[-0.04em] text-thrift-cream mb-4">
                Welcome back.
              </h2>
              <div className="w-16 h-px bg-thrift-accent mx-auto mb-6" />
              <p className="text-sm text-thrift-text-muted leading-relaxed">
                Sign in to continue your ThriftLab journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                  placeholder="nama@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f5f0e8] border border-thrift-border px-4 py-3 pr-12 text-sm text-thrift-cream placeholder:text-thrift-text-muted focus:outline-none focus:border-thrift-accent transition-colors"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-thrift-text-muted hover:text-thrift-cream transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300 cursor-pointer"
              >
                Login
              </button>
            </form>

            {/* Register link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-thrift-text-muted">
                Belum punya akun?{' '}
                <span className="text-thrift-accent font-medium cursor-pointer hover:text-thrift-accent-warm transition-colors">
                  Daftar
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
