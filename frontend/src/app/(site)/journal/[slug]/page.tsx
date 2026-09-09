'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getArticleBySlug } from '@/lib/journal-data';

export default function JournalDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="pt-28 pb-24 px-6 lg:px-10 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-thrift-cream mb-4">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-sm text-thrift-text-muted mb-8">
          Artikel yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/journal"
          className="text-xs uppercase tracking-widest text-thrift-accent hover:underline"
        >
          Kembali ke Journal
        </Link>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/journal" className="hover:text-thrift-cream transition-colors">
            Journal
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream truncate">{article.title}</span>
        </nav>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-accent">
            {article.category}
          </span>
          <span className="text-[10px] font-mono text-thrift-text-muted">
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-thrift-cream leading-tight mb-8">
          {article.title}
        </h1>

        <div className="w-16 h-px bg-thrift-accent mb-8" />

        <div className="aspect-[16/9] bg-thrift-border overflow-hidden mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-thrift-text-muted leading-relaxed text-[15px]">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-thrift-border">
          <Link
            href="/journal"
            className="text-xs uppercase tracking-widest text-thrift-accent hover:underline"
          >
            &larr; Kembali ke Journal
          </Link>
        </div>
      </div>
    </section>
  );
}
