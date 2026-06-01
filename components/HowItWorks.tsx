import React, { useState } from 'react';
import { MessageCircleQuestion, ImagePlus, BookOpen, Upload, Wand2, Download } from 'lucide-react';

type Mode = 'ai' | 'upload';

const aiSteps = [
  {
    num: '01', icon: MessageCircleQuestion,
    title: 'Answer Smart Questions',
    desc: 'AI asks the right questions for your occasion — tailored to the recipient, your relationship, and the moment you want to capture. Retirement, baby shower, pastor's anniversary — every occasion has its own guided flow.',
    color: '#D4A847',
  },
  {
    num: '02', icon: ImagePlus,
    title: 'Add Photos & Memories',
    desc: 'Drag in your favourite photos. Invite others to contribute their own memories and stories. Our editor lays everything out beautifully — no design skills needed.',
    color: '#8B2635',
  },
  {
    num: '03', icon: BookOpen,
    title: 'Get Your Book',
    desc: 'AI ghostwrites in your chosen tone in under 90 seconds. Download a print-ready PDF, share a digital link, or order a real hardcover. Your story, beautifully bound.',
    color: '#6B8F71',
  },
];

const uploadSteps = [
  {
    num: '01', icon: Upload,
    title: 'Upload Your Draft',
    desc: 'Already written a tribute, a letter, or a life story? Upload your Word doc, Google Doc, PDF, or plain text — any format works.',
    color: '#D4A847',
  },
  {
    num: '02', icon: Wand2,
    title: 'AI Polishes & Structures',
    desc: 'Our AI reads your draft, cleans up the prose, organises it into chapters, and applies professional formatting — while keeping your words and voice intact.',
    color: '#8B2635',
  },
  {
    num: '03', icon: Download,
    title: 'Download a Beautiful Book',
    desc: 'Get a professionally laid-out PDF (or Word / ePub) ready to print or share. Your story, transformed from rough notes to a keepsake.',
    color: '#6B8F71',
  },
];

const HowItWorks: React.FC = () => {
  const [mode, setMode] = useState<Mode>('ai');
  const steps = mode === 'ai' ? aiSteps : uploadSteps;

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">How It Works</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Three steps to a <span className="italic">timeless</span> book
          </h2>
          <p className="mt-5 text-lg text-[#0F1B2D]/70">
            No writing skills required. No layout struggles. Just memories in, beautiful book out.
          </p>

          {/* Mode toggle */}
          <div className="mt-8 inline-flex items-center gap-1 bg-[#0F1B2D]/6 rounded-full p-1">
            <button
              onClick={() => setMode('ai')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'ai' ? 'bg-white text-[#0F1B2D] shadow-sm' : 'text-[#0F1B2D]/50 hover:text-[#0F1B2D]'}`}
            >
              ✨ AI Writes It For Me
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'upload' ? 'bg-white text-[#0F1B2D] shadow-sm' : 'text-[#0F1B2D]/50 hover:text-[#0F1B2D]'}`}
            >
              📤 I Have a Draft
            </button>
          </div>
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
};

export default HowItWorks;
