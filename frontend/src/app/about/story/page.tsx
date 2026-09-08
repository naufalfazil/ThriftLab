import Link from 'next/link';

export default function StoryPage() {
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
          <span className="text-thrift-cream">Our Story</span>
        </nav>

        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Our Story'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.04em] leading-[0.88] text-thrift-cream mb-8">
            Perjalanan <br />
            ThriftLab.
          </h1>
          <div className="w-16 h-px bg-thrift-accent mb-10" />

          <div className="space-y-8 text-thrift-text-muted leading-relaxed text-[15px]">
            <p>
              ThriftLab bermula dari sebuah keyakinan sederhana: pakaian bekas bukan berarti
              kehilangan nilai. Justru sebaliknya — setiap goresan, setiap pudaran warna, setiap
              lipatan cerita pada kain bercerita tentang perjalanan yang telah dilalui.
            </p>

            <p>
              Kami memulai dari kecintaan terhadap fashion vintage dan frustrasi terhadap
              industri fast fashion yang terus menghasilkan limbah. Kami melihat potensi
              dalam setiap potong pakaian yang telah ada — bahwa keindahan bisa ditemukan
              dalam hal yang sudah ada.
            </p>

            <p>
              Dengan teliti kami memilih setiap item yang masuk ke arsip ThriftLab. Tidak ada
              kompromi pada kualitas. Setiap flannel, denim, hoodie, dan crewneck melalui
              proses inspeksi ketat untuk memastikan hanya yang terbaik yang sampai ke tangan Anda.
            </p>

            <p>
              Hari ini, ThriftLab bukan sekadar tempat membeli pakaian bekas. Ini adalah
              pergerakan — sebuah pernyataan bahwa gaya dan keberlanjutan bisa berjalan
              berdampingan. Bahwa fashion yang baik tidak harus mengorbankan planet.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-px bg-thrift-border border border-thrift-border">
            <div className="bg-[#f5f0e8] p-6 text-center">
              <span className="text-2xl font-bold text-thrift-accent font-mono">2024</span>
              <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Tahun Berdiri</p>
            </div>
            <div className="bg-[#f5f0e8] p-6 text-center">
              <span className="text-2xl font-bold text-thrift-cream font-mono">40+</span>
              <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Koleksi</p>
            </div>
            <div className="bg-[#f5f0e8] p-6 text-center">
              <span className="text-2xl font-bold text-thrift-accent font-mono">100%</span>
              <p className="text-[10px] uppercase tracking-[0.15em] text-thrift-text-muted mt-2">Otentik</p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="/about/sustainability"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-thrift-accent hover:underline"
            >
              Baca tentang Sustainability kami &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
