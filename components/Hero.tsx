import React from 'react';
import { ArrowRight, Upload, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartSolo: () => void;
  onStartGroup: () => void;
  onUpload?: () => void;
}

const occasions = [
  { emoji: '🎓', label: 'Retirement' },
  { emoji: '🍼', label: 'Baby Shower' },
  { emoji: '🤰', label: 'Pregnancy' },
  { emoji: '⛪', label: "Pastor's Anniversary" },
  { emoji: '🎂', label: 'Birthday' },
  { emoji: '💍', label: 'Wedding Gift' },
  { emoji: '🏆', label: 'Work Anniversary' },
  { emoji: '📖', label: 'Family History' },
];

const Hero: React.FC<HeroProps> = ({ onStartSolo, onStartGroup, onUpload }) => {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden paper-texture">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#D4A847]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#8B2635]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1B2D]/5 border border-[#0F1B2D]/10 text-[#0F1B2D]/70 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-[#D4A847]" />
            AI-Powered · Heirloom-Quality · Any Occasion
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F1B2D] leading-[1.05] tracking-tight">
            Turn Life's Biggest<br />
            Moments Into<br />
            <span className="italic text-[#8B2635]">Beautiful Books.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[#0F1B2D]/70 leading-relaxed max-w-xl">
            Retirement. Baby shower. Pastor's anniversary. A child's first story. Chapters guides you with the right questions and ghostwrites a stunning, print-ready keepsake — in minutes. Already have a draft? We'll polish and format it beautifully.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onStartSolo}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 8px 25px rgba(212,168,71,0.35)' }}
            >
              Start My Book — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onUpload || onStartSolo}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-transparent border-2 border-[#0F1B2D] text-[#0F1B2D] font-semibold text-base hover:bg-[#0F1B2D] hover:text-[#FAF7F2] transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload My Draft
            </button>
          </div>

          {/* Star rating row */}
          <div className="mt-8 flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 fill-[#D4A847] text-[#D4A847]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <span className="font-semibold text-[#0F1B2D] text-sm">4.9 / 5</span>
            <span className="text-[#0F1B2D]/50 text-sm">· 12,847 books created · 80+ countries</span>
          </div>

          {/* Occasion pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {occasions.map(o => (
              <span key={o.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#0F1B2D]/10 text-[#0F1B2D]/70 text-xs font-medium shadow-sm">
                {o.emoji} {o.label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="relative animate-float-slow">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/6a063b22925759ea0a87c270_1778793407022_56eddcbb.jpg"
              alt="Open book with elegant typography"
              className="w-full rounded-2xl book-shadow object-cover aspect-[16/12]"
            />
            <div className="absolute -top-6 -left-4 md:-left-8 bg-white rounded-xl px-4 py-3 shadow-xl border border-[#0F1B2D]/5 max-w-[210px]">
              <div className="text-xs font-semibold text-[#8B2635] uppercase tracking-wider">Retirement Gift</div>
              <div className="font-display text-sm text-[#0F1B2D] italic">"A legend in every chapter…"</div>
            </div>
            <div className="absolute -bottom-4 -right-4 md:-right-8 bg-[#0F1B2D] rounded-xl px-4 py-3 shadow-xl max-w-[200px]">
              <div className="text-xs font-semibold text-[#D4A847] uppercase tracking-wider">Baby Shower</div>
              <div className="font-display text-sm text-[#FAF7F2] italic">"Before you were born…"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
