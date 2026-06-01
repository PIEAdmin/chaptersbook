import React from 'react';
import { ArrowRight } from 'lucide-react';

const rows = [
  ["I don't know what to write",          'AI asks the right questions for your recipient'],
  ["I'm not a writer",                    'AI ghostwrites in your chosen tone'],
  ["I want photos but don't know layout", 'Drag, drop, done. Beautiful layouts automatically.'],
  ["I want a real book, not just a file", 'Print-ready files + integrated printing partners'],
  ["It's just me writing",               'Solo Mode'],
  ["It's 20 of us writing for one person",'Group Mode with a simple shareable link'],
  ['I want to sell on Amazon',            'KDP export ready'],
];

const ProblemSolution: React.FC = () => (
  <section className="py-20 lg:py-28 bg-white">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Why Chapters</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
          Every excuse, <span className="italic">solved</span>
        </h2>
      </div>

      <div className="bg-[#FAF7F2] rounded-3xl p-2 border border-[#0F1B2D]/8">
        {rows.map(([problem, solution], i) => (
          <div
            key={i}
            className={`grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 px-6 py-5 rounded-2xl ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}
          >
            <div className="flex items-start gap-3">
              <span className="font-display text-xl text-[#8B2635]/40 font-bold w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-[#0F1B2D]/80 italic">"{problem}"</p>
            </div>
            <ArrowRight className="hidden md:block w-5 h-5 text-[#D4A847]" />
            <div className="md:pl-2 font-semibold text-[#0F1B2D] flex items-center gap-2">
              <span className="md:hidden text-[#D4A847]">→</span>
              {solution}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSolution;
