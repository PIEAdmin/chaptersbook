import React from 'react';
import { Feather, Users, ArrowRight, Check } from 'lucide-react';

interface TwoModesProps {
  onStartSolo: () => void;
  onStartGroup: () => void;
}

const TwoModes: React.FC<TwoModesProps> = ({ onStartSolo, onStartGroup }) => {
  const soloUses = [
    'Parent writing to a child',
    'Grandparent sharing life stories',
    'Student journaling a milestone',
    'Letter to your future self',
  ];
  const groupUses = [
    'Class surprising a teacher',
    'Employees honoring a retiring CEO',
    'Family celebrating a milestone birthday',
    'Sports team commemorating a season',
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0F1B2D] text-[#FAF7F2] relative overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4A847]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-[#D4A847] uppercase tracking-[0.2em] mb-3">Choose Your Mode</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            One voice. Or <span className="italic text-[#D4A847]">many</span>.
          </h2>
          <p className="mt-5 text-lg text-[#FAF7F2]/70">
            Whether it's deeply personal or a collective tribute, Chapters has the right path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Solo */}
          <div id="solo-mode" className="group relative bg-[#0F1B2D] border-2 border-[#D4A847] rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all" style={{ boxShadow: undefined }}>
            <div className="absolute -top-4 left-8 bg-[#D4A847] text-[#0F1B2D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Solo Mode</div>
            <div className="w-16 h-16 rounded-2xl bg-[#D4A847]/15 flex items-center justify-center mb-6">
              <Feather className="w-8 h-8 text-[#D4A847]" />
            </div>
            <h3 className="font-display text-3xl font-bold mb-2">One Voice, One Legacy</h3>
            <p className="text-[#FAF7F2]/70 mb-6">A deeply personal book, written entirely by you with AI guidance.</p>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4A847]/80 mb-3">Perfect for</div>
            <ul className="space-y-2 mb-8">
              {soloUses.map(use => (
                <li key={use} className="flex items-center gap-2.5 text-[#FAF7F2]/85">
                  <Check className="w-4 h-4 text-[#D4A847] flex-shrink-0" />
                  <span className="text-sm">{use}</span>
                </li>
              ))}
            </ul>
            <button onClick={onStartSolo} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold transition-all">
              Start Writing <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Group */}
          <div id="group-mode" className="group relative bg-[#0F1B2D] border-2 border-[#8B2635] rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all">
            <div className="absolute -top-4 left-8 bg-[#8B2635] text-[#FAF7F2] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Group Mode</div>
            <div className="w-16 h-16 rounded-2xl bg-[#8B2635]/20 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-[#8B2635]" />
            </div>
            <h3 className="font-display text-3xl font-bold mb-2">Many Voices, One Tribute</h3>
            <p className="text-[#FAF7F2]/70 mb-6">Invite contributors via link. AI weaves them into one seamless book.</p>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8B2635]/90 mb-3">Perfect for</div>
            <ul className="space-y-2 mb-8">
              {groupUses.map(use => (
                <li key={use} className="flex items-center gap-2.5 text-[#FAF7F2]/85">
                  <Check className="w-4 h-4 text-[#8B2635] flex-shrink-0" />
                  <span className="text-sm">{use}</span>
                </li>
              ))}
            </ul>
            <button onClick={onStartGroup} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8B2635] hover:bg-[#6f1d2a] text-[#FAF7F2] font-semibold transition-all">
              Create Group Book <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoModes;
