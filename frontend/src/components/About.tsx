'use client';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#111111] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <p className="text-xs font-mono uppercase text-[#ff3b00] tracking-widest mb-3">
            // Our Manifesto
          </p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-8">
            Sustainable <br />
            Streetwear Culture.
          </h2>
          <p className="text-base text-[#a3a3a3] leading-relaxed mb-6">
            ThriftLab was born out of a passion for preserving fashion history. Every piece tells a story, carrying the weight of decades past without compromising modern style and individuality.
          </p>
          <p className="text-base text-[#a3a3a3] leading-relaxed">
            By choosing second-hand, you actively reduce textile waste while securing one-of-a-kind garments that mass-market fast fashion simply cannot replicate.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="p-8 bg-[#171717] border border-[#222222] flex flex-col justify-between h-64">
            <span className="text-3xl font-black font-mono text-[#ff3b00]">100%</span>
            <div>
              <h4 className="text-lg font-bold uppercase mb-1">Authentic Vintage</h4>
              <p className="text-xs text-[#888888]">Sourced directly from verified global archives.</p>
            </div>
          </div>
          <div className="p-8 bg-[#171717] border border-[#222222] flex flex-col justify-between h-64 mt-8">
            <span className="text-3xl font-black font-mono text-[#f5f5f0]">0%</span>
            <div>
              <h4 className="text-lg font-bold uppercase mb-1">Fast Fashion</h4>
              <p className="text-xs text-[#888888]">Standing against mass-produced textile waste.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}