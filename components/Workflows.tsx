import React, { useState } from 'react';
import { Feather, Users } from 'lucide-react';

const soloSteps = [
  'Choose Solo Mode',
  'Select recipient type (child, grandchild, teacher, future self, other)',
  'AI generates 8–25 targeted questions',
  'Answer questions + upload photos as you go',
  'Select tone (warm, funny, formal, inspirational) and length',
  'Choose output format (PDF, Word, KDP)',
  'AI ghostwrites the complete book (30–90 seconds)',
  'Preview — edit text, move photos, adjust chapters',
  'Download your file(s)',
  'Optional: Order professional printing',
];

const groupSteps = [
  'Choose Group Mode',
  'Enter recipient name and occasion',
  'Write optional invitation message',
  'AI generates 6–10 contributor questions',
  'Customize questions if desired',
  'Platform generates unique shareable link',
  'Send link via email, text, Slack, WhatsApp',
  'Each contributor answers + uploads optional photos (no account needed)',
  'Creator tracks real-time progress (e.g., "8 of 20 have answered")',
  'Creator clicks "Compile Book"',
  'AI sorts, groups, ghostwrites transitions — one seamless book',
  'Select tone, length, output format',
  'Preview, edit, add master photos',
  'Download or order professional printing',
];

const Workflows: React.FC = () => {
  const [tab, setTab] = useState<'solo' | 'group'>('solo');
  const steps = tab === 'solo' ? soloSteps : groupSteps;
  const accent = tab === 'solo' ? '#D4A847' : '#8B2635';

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">The Process</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            A guided path to your <span className="italic">finished book</span>
          </h2>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#FAF7F2] rounded-full p-1.5 border border-[#0F1B2D]/8">
            <button
              onClick={() => setTab('solo')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all inline-flex items-center gap-2 ${tab === 'solo' ? 'bg-[#0F1B2D] text-[#FAF7F2] shadow-md' : 'text-[#0F1B2D]/70 hover:text-[#0F1B2D]'}`}
            >
              <Feather className="w-4 h-4" />Solo Mode · 10 Steps
            </button>
            <button
              onClick={() => setTab('group')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all inline-flex items-center gap-2 ${tab === 'group' ? 'bg-[#0F1B2D] text-[#FAF7F2] shadow-md' : 'text-[#0F1B2D]/70 hover:text-[#0F1B2D]'}`}
            >
              <Users className="w-4 h-4" />Group Mode · 14 Steps
            </button>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-[#0F1B2D]/10 via-[#0F1B2D]/20 to-[#0F1B2D]/10" />
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-start gap-5 animate-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
                <div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg flex-shrink-0 shadow-md"
                  style={{ backgroundColor: accent, color: tab === 'solo' ? '#0F1B2D' : '#FAF7F2' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 bg-[#FAF7F2] border border-[#0F1B2D]/8 rounded-xl px-5 py-4 hover:border-[#0F1B2D]/20 transition-colors">
                  <p className="text-[#0F1B2D] font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflows;
