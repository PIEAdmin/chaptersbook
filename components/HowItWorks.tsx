import React from 'react';
import { MessageCircleQuestion, ImagePlus, BookOpen } from 'lucide-react';

const steps = [
  {
    num: '01', icon: MessageCircleQuestion,
    title: 'Answer Questions',
    desc: 'AI asks the right questions for your recipient — tailored to your relationship and the moment you want to capture.',
    color: '#D4A847',
  },
  {
    num: '02', icon: ImagePlus,
    title: 'Upload Photos',
    desc: 'Drag and drop memories right into your story. Our editor automatically lays them out beautifully.',
    color: '#8B2635',
  },
  {
    num: '03', icon: BookOpen,
    title: 'Get Your Book',
    desc: 'AI ghostwrites in your chosen tone. You download a print-ready file — or order a real hardcover.',
    color: '#6B8F71',
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAF7F2]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">How It Works</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
          Three simple steps to a <span className="italic">timeless</span> book
        </h2>
        <p className="mt-5 text-lg text-[#0F1B2D]/70">
          No writing skill required. No layout struggles. Just memories in, beautiful book out.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#D4A847]/0 via-[#0F1B2D]/15 to-[#8B2635]/0" />
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative bg-white rounded-2xl p-8 border border-[#0F1B2D]/8 hover:border-[#D4A847]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${step.color}18` }}>
                  <Icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <span className="font-display text-5xl font-bold text-[#0F1B2D]/8">{step.num}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0F1B2D] mb-3">{step.title}</h3>
              <p className="text-[#0F1B2D]/70 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
