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
    quote: "My husband just retired after 31 years. I used Chapters to collect stories from 24 colleagues. The book made the whole room cry — including him. I'll never forget that moment.",
    name: "Patricia H.",
    role: "Wife & Organiser, Atlanta",
    avatar: "PH",
    stars: 5,
    tag: "Retirement Gift",
  },
  {
    quote: "I made a pregnancy journey book for my sister's baby shower. She didn't know what it was until she opened it and started reading. The whole table went silent. Best gift I've ever given.",
    name: "Deja M.",
    role: "Sister, Chicago",
    avatar: "DM",
    stars: 5,
    tag: "Baby Shower",
  },
  {
    quote: "Our congregation surprised our pastor on his 20th anniversary with a book from 60 members. Each person contributed a story. The AI wove it into one beautiful narrative. He still reads from it on Sundays.",
    name: "Elder James R.",
    role: "Church Elder, Houston",
    avatar: "JR",
    stars: 5,
    tag: "Pastor's Anniversary",
  },
  {
    quote: "As an HR director, I was looking for something beyond a card. We now create a Chapters book for every 10-year work anniversary. The employees love it. It's become part of our culture.",
    name: "Renata O.",
    role: "HR Director, Fortune 500",
    avatar: "RO",
    stars: 5,
    tag: "Corporate Gift",
  },
  {
    quote: "I had 40 pages of rough notes about my grandmother's life. Chapters polished it into the most beautiful tribute book. My family ordered 12 printed copies for Christmas gifts.",
    name: "Marcus L.",
    role: "Grandson, New Orleans",
    avatar: "ML",
    stars: 5,
    tag: "Upload & Polish",
  },
  {
    quote: "Our school uses Chapters at the end of every year. Each class creates a book together — students contribute stories, the AI ties them together. Parents at graduation are blown away every time.",
    name: "Principal Chen",
    role: "Elementary School, Austin",
    avatar: "PC",
    stars: 5,
    tag: "School Use",
  },
];

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive(a => (a + 1) % testimonials.length), 5500);
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
            Real people. Real <span className="italic text-[#D4A847]">moments.</span>
          </h2>
          <p className="mt-4 text-[#FAF7F2]/50 text-lg">From retirement parties to baby showers, churches to corporations.</p>
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
