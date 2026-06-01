import React from 'react';

const outlets = [
  { name: 'TechCrunch', quote: '"The easiest way to create a keepsake book"' },
  { name: 'Product Hunt', quote: '🏆 #1 Product of the Day' },
  { name: 'Forbes', quote: '"A gift that outlasts any subscription"' },
  { name: 'The Verge', quote: '"AI finally does something truly personal"' },
  { name: 'Fast Company', quote: '"The future of family storytelling"' },
];

const PressBar: React.FC = () => (
  <section className="py-10 bg-[#0F1B2D] border-b border-[#FAF7F2]/5">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#FAF7F2]/40 mb-8">
        As featured in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {outlets.map(o => (
          <div key={o.name} className="flex flex-col items-center gap-1 group">
            <span className="font-display font-bold text-xl text-[#FAF7F2]/30 group-hover:text-[#FAF7F2]/70 transition-colors tracking-tight">
              {o.name}
            </span>
            <span className="hidden group-hover:block text-xs text-[#D4A847]/80 italic text-center max-w-[180px] leading-snug">
              {o.quote}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PressBar;
