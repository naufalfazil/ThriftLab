import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-thrift-cream transition-colors">
            Tentang
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Sustainability</span>
        </nav>

        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Sustainability'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-8">
            Fashion <br />
            Berkelanjutan.
          </h1>
          <div className="w-16 h-px bg-thrift-accent mb-10" />

          <div className="space-y-8 text-thrift-text-muted leading-relaxed text-[15px]">
            <p>
              Industri fast fashion adalah salah satu poluter terbesar di dunia. Setiap tahun,
              92 juta ton limbah tekstil dihasilkan — dan angka ini terus meningkat. ThriftLab
              hadir sebagai jawaban atas krisis ini.
            </p>

            <p>
              Dengan memilih pakaian second-hand, Anda secara aktif mengurangi jejak karbon.
              Setiap item yang digunakan kembali menghemat ribuan liter air dan mencegah
              emisi karbon yang setara dengan perjalanan ratusan kilometer.
            </p>

            <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-thrift-border border border-thrift-border">
              <div className="bg-[#f5f0e8] p-8 text-center">
                <span className="text-3xl font-bold text-thrift-accent font-mono">70%</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-3">
                  Pengurangan Jejak Karbon
                </p>
              </div>
              <div className="bg-[#f5f0e8] p-8 text-center">
                <span className="text-3xl font-bold text-thrift-cream font-mono">2700L</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-3">
                  Air Hemat per Item
                </p>
              </div>
              <div className="bg-[#f5f0e8] p-8 text-center">
                <span className="text-3xl font-bold text-thrift-accent font-mono">0</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-3">
                  Limbah Produksi Baru
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold uppercase tracking-tight text-thrift-cream">
              Filosofi Kami
            </h2>

            <p>
              Kami percaya bahwa fashion yang bertanggung jawab bukan berarti mengorbankan
              gaya. Justru sebaliknya — pakaian vintage dan second-hand memiliki karakter
              yang tidak bisa direplikasi oleh produksi massal.
            </p>

            <p>
              Setiap potongan di ThriftLab dipilih untuk memastikan kualitas, keaslian, dan
              umur panjang. Kami tidak menjual fast fashion. Kami menjual warisan.
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-tight text-thrift-cream">
              Reuse. Reclaim. Reinvent.
            </h2>

            <p>
              Dengan setiap pembelian, Anda tidak hanya mendapatkan pakaian — Anda menjadi
              bagian dari pergerakan menuju fashion yang lebih bertanggung jawab. Anda
              memilih untuk mereuse alih-alih membuang, mengklaim ulang alih-alih membeli
              baru, dan menemukan kembali gaya Anda.
            </p>
          </div>

          <div className="mt-16">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-thrift-accent text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-thrift-accent-warm transition-all duration-300"
            >
              Lihat Koleksi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
