'use client';

export default function Categories() {
  const categories = [
    { name: 'Flannel & Wool', count: '12 Items', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
    { name: 'Vintage Denim', count: '15 Items', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop' },
    { name: 'Heavy Hoodies', count: '8 Items', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop' },
    { name: 'Band Tees', count: '10 Items', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <section id="categories" className="py-24 px-6 bg-[#0a0a0a] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono uppercase text-[#ff3b00] tracking-widest mb-3">
            // Categorized Archive
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative h-96 overflow-hidden bg-[#171717] border border-[#222222]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-wider">{cat.count}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-[#f5f5f0] mt-1">{cat.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}