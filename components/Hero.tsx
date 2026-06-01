import React from 'react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartSolo: () => void;
  onStartGroup: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartSolo, onStartGroup }) => {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden paper-texture">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#D4A847]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#8B2635]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1B2D]/5 border border-[#0F1B2D]/10 text-[#0F1B2D]/70 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-[#D4A847]" />
            AI-guided. Heirloom-quality.
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F1B2D] leading-[1.05] tracking-tight">
            Your Story.<br />
            <span className="italic text-[#8B2635]">Beautifully</span> Told.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[#0F1B2D]/70 leading-relaxed max-w-xl">
            One voice. Many voices. One unforgettable book. Chapters guides you with the right questions and ghostwrites a stunning, print-ready keepsake — in minutes.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onStartSolo}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 8px 25px rgba(212,168,71,0.35)' }}
            >
              Start My Book
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onStartGroup}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-transparent border-2 border-[#0F1B2D] text-[#0F1B2D] font-semibold text-base hover:bg-[#0F1B2D] hover:text-[#FAF7F2] transition-all"
            >
              <Users className="w-4 h-4" />
              Create a Group Book
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

          {/* Social proof */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6B8F71]" />
              <span className="font-semibold text-[#0F1B2D]">Free to start</span>
              <span className="text-[#0F1B2D]/60">— no credit card</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-[#0F1B2D]/15" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4A847]" />
              <span className="text-[#0F1B2D]/70">Solo & Group modes</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-[#0F1B2D]/15" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8B2635]" />
              <span className="text-[#0F1B2D]/70">Print-ready files</span>
            </div>
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
            <div className="absolute -top-6 -left-4 md:-left-8 bg-white rounded-xl px-4 py-3 shadow-xl border border-[#0F1B2D]/5 max-w-[200px]">
              <div className="text-xs font-semibold text-[#8B2635] uppercase tracking-wider">Chapter 1</div>
              <div className="font-display text-base text-[#0F1B2D] italic">"The day you arrived…"</div>
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-[#0F1B2D] text-[#FAF7F2] rounded-xl px-4 py-3 shadow-xl max-w-[220px]">
              <div className="text-xs font-semibold text-[#D4A847] uppercase tracking-wider">AI Ghostwriter</div>
              <div className="text-sm mt-1">Generated 47 pages in 62 seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
