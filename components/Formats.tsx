import React from 'react';
import { FileText, FileType, BookMarked, Package } from 'lucide-react';

const formats = [
  { icon: FileText,   name: 'PDF',           tag: 'Most Popular', desc: 'Print at home, email, or share digitally',    detail: 'Beautiful ready-to-print layout with crop marks & bleed.',             color: '#D4A847' },
  { icon: FileType,   name: 'Word (.docx)',  tag: 'Editable',     desc: 'Final edits and customization',               detail: 'Fully editable template — tweak every word before sharing.',          color: '#6B8F71' },
  { icon: BookMarked, name: 'KDP (.epub)',   tag: 'Publish',      desc: 'Publish on Amazon Kindle',                    detail: 'Professional e-book format ready for Amazon KDP upload.',            color: '#8B2635' },
  { icon: Package,    name: 'Print Add-On', tag: 'Premium',      desc: 'Real hardcover or softcover book',            detail: 'Integrated print partner — shipped to your door in 7–10 days.',      color: '#0F1B2D' },
];

const Formats: React.FC = () => (
  <section id="formats" className="py-20 lg:py-28 bg-[#FAF7F2]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Output Formats</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
          Every format your story <span className="italic">deserves</span>
        </h2>
        <p className="mt-5 text-lg text-[#0F1B2D]/70">
          Download, edit, publish on Amazon, or order a real printed hardcover. You choose.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {formats.map(f => {
          const Icon = f.icon;
          return (
            <div key={f.name} className="group bg-white rounded-2xl p-7 border border-[#0F1B2D]/8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${f.color}18` }}>
                  <Icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ backgroundColor: `${f.color}18`, color: f.color }}>
                  {f.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0F1B2D] mb-1">{f.name}</h3>
              <p className="text-sm font-medium text-[#0F1B2D]/80 mb-2">{f.desc}</p>
              <p className="text-sm text-[#0F1B2D]/60 leading-relaxed">{f.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Formats;
