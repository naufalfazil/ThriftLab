'use client';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222222] pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#222222]">
          <div className="md:col-span-6">
            <a href="#" className="text-2xl font-black tracking-tighter uppercase">
              Thrift<span className="text-[#ff3b00]">Lab</span>
            </a>
            <p className="text-sm text-[#888888] max-w-sm mt-4">
              Curated second-hand apparel and vintage streetwear archives for the conscious generation.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f5f5f0] mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-[#a3a3a3]">
              <li><a href="#home" className="hover:text-[#f5f5f0] transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-[#f5f5f0] transition-colors">Shop</a></li>
              <li><a href="#categories" className="hover:text-[#f5f5f0] transition-colors">Categories</a></li>
              <li><a href="#about" className="hover:text-[#f5f5f0] transition-colors">About</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f5f5f0] mb-4">Archives</h4>
            <p className="text-sm text-[#a3a3a3] mb-4">Get notified on our weekly drop schedule.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#171717] border border-[#333333] px-4 py-2 text-sm text-[#f5f5f0] focus:outline-none focus:border-[#ff3b00] w-full"
              />
              <button className="bg-[#ff3b00] px-4 text-sm font-bold uppercase hover:bg-[#e03400] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888]">
          <p>© {new Date().getFullYear()} ThriftLab. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 font-mono">SMK Taruna Bhakti Student Project</p>
        </div>
      </div>
    </footer>
  );
}