'use client';

import Link from 'next/link';
import { articles } from '@/lib/journal-data';

function ArticleCard({ article }: { article: (typeof articles)[0] }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group flex flex-col">
      <div className="relative overflow-hidden bg-thrift-border aspect-[16/10]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-accent">
            {article.category}
          </span>
          <span className="text-[10px] font-mono text-thrift-text-muted">
            {article.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold uppercase tracking-tight text-thrift-cream group-hover:text-thrift-accent transition-colors duration-300 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-thrift-text-muted leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function JournalPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">Journal</span>
        </nav>

        <div className="mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Journal'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream">
            Journal
          </h1>
        </div>

        <Link
          href={`/journal/${featured.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 border border-thrift-border hover:border-thrift-border-light transition-all duration-500 p-4 sm:p-6"
        >
          <div className="relative overflow-hidden bg-thrift-border aspect-[16/10] lg:aspect-auto">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute top-4 left-4 px-3 py-1.5 bg-thrift-accent text-[9px] font-mono uppercase tracking-wider text-white">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-accent">
                {featured.category}
              </span>
              <span className="text-[10px] font-mono text-thrift-text-muted">
                {featured.readTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-thrift-cream group-hover:text-thrift-accent transition-colors duration-300 mb-4">
              {featured.title}
            </h2>
            <p className="text-sm text-thrift-text-muted leading-relaxed max-w-lg">
              {featured.excerpt}
            </p>
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
