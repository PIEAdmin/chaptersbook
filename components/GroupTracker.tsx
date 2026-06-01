import React from 'react';
import { Check, Clock, Link as LinkIcon, Copy } from 'lucide-react';
import { useToast } from './Toast';

const contributors = [
  { name: 'Sarah M.',  status: 'done',    initial: 'S', color: '#8B2635' },
  { name: 'James K.', status: 'done',    initial: 'J', color: '#D4A847' },
  { name: 'Maya P.',  status: 'done',    initial: 'M', color: '#6B8F71' },
  { name: 'David L.', status: 'done',    initial: 'D', color: '#0F1B2D' },
  { name: 'Aisha R.', status: 'done',    initial: 'A', color: '#8B2635' },
  { name: 'Tom W.',   status: 'done',    initial: 'T', color: '#D4A847' },
  { name: 'Priya S.', status: 'done',    initial: 'P', color: '#6B8F71' },
  { name: 'Marcus B.',status: 'done',    initial: 'M', color: '#0F1B2D' },
  { name: 'Lily C.',  status: 'pending', initial: 'L', color: '#0F1B2D' },
  { name: 'Noah F.',  status: 'pending', initial: 'N', color: '#0F1B2D' },
];

const GroupTracker: React.FC = () => {
  const { toast } = useToast();
  const done = contributors.filter(c => c.status === 'done').length;
  const total = 20;
  const pct = (done / total) * 100;

  const copyLink = () => {
    navigator.clipboard?.writeText('https://chaptersbook.com/c/mrs-thompson-tribute-x9k2');
    toast.success('Invitation link copied to clipboard');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0F1B2D] text-[#FAF7F2] relative overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-[#D4A847] uppercase tracking-[0.2em] mb-3">Group Mode Dashboard</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Track every <span className="italic text-[#D4A847]">contribution</span> in real time
          </h2>
          <p className="mt-5 text-lg text-[#FAF7F2]/70">
            One link. Send to anyone. Watch the book come together.
          </p>
        </div>

        <div className="bg-[#FAF7F2] text-[#0F1B2D] rounded-3xl p-8 lg:p-10 book-shadow max-w-4xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8B2635] mb-1">Active Group Book</div>
              <h3 className="font-display text-3xl font-bold">Mrs. Thompson's Retirement Tribute</h3>
              <p className="text-[#0F1B2D]/60 mt-1">25 years of teaching · From her former students</p>
            </div>
            <button className="px-5 py-2.5 rounded-full bg-[#0F1B2D] text-[#FAF7F2] font-semibold text-sm hover:bg-[#1a2b45] transition-colors">
              Compile Book →
            </button>
          </div>

          {/* Shareable link */}
          <div className="flex items-center gap-3 bg-white border border-[#0F1B2D]/10 rounded-xl p-3 mb-8">
            <LinkIcon className="w-5 h-5 text-[#D4A847] flex-shrink-0 ml-1" />
            <code className="flex-1 text-sm text-[#0F1B2D]/80 truncate">chaptersbook.com/c/mrs-thompson-tribute-x9k2</code>
            <button onClick={copyLink} className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#D4A847]/15 text-sm font-semibold text-[#0F1B2D] inline-flex items-center gap-1.5 transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-end justify-between mb-2">
              <div>
                <span className="font-display text-4xl font-bold text-[#0F1B2D]">{done}</span>
                <span className="font-display text-2xl text-[#0F1B2D]/40"> of {total}</span>
                <span className="ml-3 text-sm text-[#0F1B2D]/60">have answered</span>
              </div>
              <div className="text-sm font-semibold text-[#6B8F71]">{pct.toFixed(0)}% complete</div>
            </div>
            <div className="h-3 bg-[#0F1B2D]/8 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#D4A847,#6B8F71)' }} />
            </div>
          </div>

          {/* Avatars */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {contributors.map((c, i) => (
              <div key={i} className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-sm ${c.status === 'pending' ? 'opacity-30 grayscale' : ''}`}
                  style={{ backgroundColor: c.color }}
                  title={c.name}
                >
                  {c.initial}
                </div>
                {c.status === 'done' ? (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#6B8F71] flex items-center justify-center border-2 border-white">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#FAF7F2] flex items-center justify-center border-2 border-[#0F1B2D]/20">
                    <Clock className="w-3 h-3 text-[#0F1B2D]/40" />
                  </div>
                )}
              </div>
            ))}
            {Array.from({ length: total - contributors.length }).map((_, i) => (
              <div key={`empty-${i}`} className="w-12 h-12 rounded-full bg-[#0F1B2D]/5 border-2 border-dashed border-[#0F1B2D]/15" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupTracker;
