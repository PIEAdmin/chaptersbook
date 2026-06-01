import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  stars: number;
  tag: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I gave my grandma a book of stories about her life for her 80th birthday. She cried. I cried. Everyone cried. Chapters made something I could never have written on my own.",
    name: "Maria T.",
    role: "Granddaughter, Ohio",
    avatar: "MT",
    stars: 5,
    tag: "Solo Book",
  },
  {
    quote: "Our whole team contributed memories about our colleague who retired after 30 years. The AI stitched it into a proper narrative — it felt like a real book, not a slideshow.",
    name: "James K.",
    role: "Manager, London",
    avatar: "JK",
    stars: 5,
    tag: "Group Book",
  },
  {
    quote: "I wrote a story for my daughter about the year she was born. The warm tone option made it sound exactly how I imagined — gentle and timeless. She'll read it to her kids one day.",
    name: "Priya S.",
    role: "New mom, San Francisco",
    avatar: "PS",
    stars: 5,
    tag: "Solo Book",
  },
  {
    quote: "As a teacher, I had my students each contribute a chapter about what they learned this year. Parents were blown away at graduation. We're doing it every year from now on.",
    name: "Ms. Chen",
    role: "5th Grade Teacher, Austin",
    avatar: "MC",
    stars: 5,
    tag: "Group Book",
  },
  {
    quote: "I was skeptical AI could do this well. I was very wrong. The questions it asked were thoughtful, and the draft it produced needed almost no editing. Absolutely worth it.",
    name: "David R.",
    role: "Author & Dad, New York",
    avatar: "DR",
    stars: 5,
    tag: "Solo Book",
  },
  {
    quote: "Created a memorial book for my dad with stories from 14 family members across 4 countries. Chapters handled everything. It arrived printed just in time for the anniversary.",
    name: "Keiko N.",
    role: "Daughter, Tokyo",
    avatar: "KN",
    stars: 5,
    tag: "Group Book",
  },
];

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  const prev = () => { setAutoplay(false); setActive(a => (a - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAutoplay(false); setActive(a => (a + 1) % testimonials.length); };

  const t = testimonials[active];

  return (
    <section className="py-20 lg:py-28 bg-[#0F1B2D] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A847]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B2635]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-[#D4A847] uppercase tracking-[0.2em] mb-3">Stories about stories</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FAF7F2] leading-tight">
            Readers. Writers. <span className="italic text-[#D4A847]">Believers.</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-1 mb-6">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4A847] text-[#D4A847]" />
            ))}
            <span className="ml-2 text-xs font-semibold bg-[#D4A847]/20 text-[#D4A847] px-2 py-0.5 rounded-full">{t.tag}</span>
          </div>
          <blockquote className="font-display text-xl md:text-2xl text-[#FAF7F2] italic leading-relaxed mb-8">
            "{t.quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#D4A847]/20 flex items-center justify-center font-bold text-[#D4A847] text-sm flex-shrink-0">
              {t.avatar}
            </div>
            <div>
              <div className="font-semibold text-[#FAF7F2]">{t.name}</div>
              <div className="text-sm text-[#FAF7F2]/50">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/50 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); setActive(i); }}
                className={`rounded-full transition-all ${i === active ? 'w-6 h-2 bg-[#D4A847]' : 'w-2 h-2 bg-[#FAF7F2]/20 hover:bg-[#FAF7F2]/40'}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/50 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
