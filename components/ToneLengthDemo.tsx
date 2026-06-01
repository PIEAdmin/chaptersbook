import React, { useState } from 'react';
import { Heart, Smile, Briefcase, Sparkles, Upload, Image as ImageIcon, Maximize2 } from 'lucide-react';

const tones = [
  { id: 'warm',    label: 'Warm & Heartfelt',       icon: Heart,    color: '#8B2635' },
  { id: 'funny',   label: 'Funny & Playful',         icon: Smile,    color: '#D4A847' },
  { id: 'formal',  label: 'Formal & Professional',   icon: Briefcase, color: '#0F1B2D' },
  { id: 'inspire', label: 'Inspirational',           icon: Sparkles, color: '#6B8F71' },
];

const lengths = [
  { id: 'short',  label: 'Short',  pages: '10–20 pages' },
  { id: 'medium', label: 'Medium', pages: '20–40 pages' },
  { id: 'long',   label: 'Long',   pages: '40–80 pages' },
];

const layouts = [
  { id: 'full',  label: 'Full Page',    icon: Maximize2 },
  { id: 'half',  label: 'Half Page',    icon: ImageIcon },
  { id: 'grid',  label: 'Gallery Grid', icon: Upload },
];

const ToneLengthDemo: React.FC = () => {
  const [tone, setTone] = useState('warm');
  const [length, setLength] = useState('medium');
  const [layout, setLayout] = useState('full');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">AI Ghostwriting Engine</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Choose your <span className="italic">voice</span>
          </h2>
          <p className="mt-5 text-lg text-[#0F1B2D]/70">
            Dial in the tone, length, and photo layout. Then watch AI write your book in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Tone */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]/50 mb-3">Tone</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {tones.map(t => {
                  const Icon = t.icon;
                  const active = tone === t.id;
                  return (
                    <button key={t.id} onClick={() => setTone(t.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${active ? 'border-[#0F1B2D] bg-[#FAF7F2]' : 'border-[#0F1B2D]/10 hover:border-[#0F1B2D]/30 bg-white'}`}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}18` }}>
                        <Icon className="w-4 h-4" style={{ color: t.color }} />
                      </div>
                      <span className="font-medium text-[#0F1B2D] text-sm">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]/50 mb-3">Length</div>
              <div className="grid grid-cols-3 gap-3">
                {lengths.map(l => (
                  <button key={l.id} onClick={() => setLength(l.id)}
                    className={`px-4 py-4 rounded-xl border-2 transition-all text-center ${length === l.id ? 'border-[#D4A847] bg-[#D4A847]/8' : 'border-[#0F1B2D]/10 hover:border-[#0F1B2D]/30'}`}
                  >
                    <div className="font-display font-bold text-[#0F1B2D]">{l.label}</div>
                    <div className="text-xs text-[#0F1B2D]/60 mt-0.5">{l.pages}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo layout */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]/50 mb-3">Photo Layout</div>
              <div className="grid grid-cols-3 gap-3">
                {layouts.map(l => {
                  const Icon = l.icon;
                  return (
                    <button key={l.id} onClick={() => setLayout(l.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${layout === l.id ? 'border-[#8B2635] bg-[#8B2635]/8' : 'border-[#0F1B2D]/10 hover:border-[#0F1B2D]/30'}`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-[#0F1B2D]" />
                      <div className="text-xs font-semibold text-[#0F1B2D]">{l.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-2 border-dashed border-[#0F1B2D]/20 rounded-2xl p-6 text-center bg-[#FAF7F2]">
              <Upload className="w-8 h-8 mx-auto mb-2 text-[#D4A847]" />
              <div className="font-semibold text-[#0F1B2D]">Drag photos here</div>
              <div className="text-xs text-[#0F1B2D]/60 mt-1">JPG, PNG up to 25MB · 300 DPI recommended for print</div>
            </div>

            <button onClick={generate} disabled={generating}
              className="w-full px-7 py-4 rounded-full bg-[#0F1B2D] hover:bg-[#1a2b45] disabled:opacity-70 text-[#FAF7F2] font-semibold transition-all"
            >
              {generating ? 'Ghostwriting your book…' : 'Generate Sample Preview'}
            </button>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="bg-[#FAF7F2] rounded-2xl p-8 border border-[#0F1B2D]/10 book-shadow min-h-[480px] relative overflow-hidden">
                {generating && (
                  <div className="absolute inset-0 bg-[#FAF7F2]/95 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#D4A847] border-t-transparent rounded-full animate-spin" />
                      <p className="font-display text-lg text-[#0F1B2D]">Turning memories into chapters…</p>
                      <p className="text-sm text-[#0F1B2D]/60 mt-1">30–90 seconds</p>
                    </div>
                  </div>
                )}
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8B2635] mb-2">Chapter Two</div>
                <h4 className="font-display text-2xl font-bold text-[#0F1B2D] mb-4 italic">The Day You Arrived</h4>
                <p className="text-[#0F1B2D]/80 leading-relaxed font-serif text-sm">
                  <span className="font-display text-4xl float-left leading-none mr-1.5 mt-1 text-[#8B2635]">I</span>
                  t was a Tuesday in late October when the world changed. The leaves outside our window had turned the color of warm honey, and somehow it felt as though they knew. I remember the weight of you in my arms — impossibly small, impossibly perfect — and the way time seemed to slow down, just for us…
                </p>
                <div className="mt-5 h-32 rounded-lg flex items-center justify-center text-[#0F1B2D]/40 text-sm" style={{ background: 'linear-gradient(135deg,rgba(212,168,71,0.18),rgba(139,38,53,0.15))' }}>
                  [Your photo here · {layout} layout]
                </div>
                <div className="mt-4 text-xs text-[#0F1B2D]/50 italic">
                  Tone: {tones.find(t => t.id === tone)?.label} · Length: {lengths.find(l => l.id === length)?.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToneLengthDemo;
