import React, { useState } from 'react';
import { Download, Edit3, Check } from 'lucide-react';
import { useToast } from './Toast';

export interface GeneratedChapter {
  number: number;
  title: string;
  prose: string;
}

export interface GeneratedBook {
  title: string;
  subtitle?: string;
  dedication?: string;
  chapters: GeneratedChapter[];
}

interface BookEditorProps {
  book: GeneratedBook;
  onChange: (book: GeneratedBook) => void;
}

const BookEditor: React.FC<BookEditorProps> = ({ book, onChange }) => {
  const { toast } = useToast();
  const [activeIdx, setActiveIdx] = useState(0);
  const [editingTitle, setEditingTitle] = useState(false);

  const updateChapter = (idx: number, patch: Partial<GeneratedChapter>) => {
    onChange({ ...book, chapters: book.chapters.map((c, i) => (i === idx ? { ...c, ...patch } : c)) });
  };

  const updateBook = (patch: Partial<GeneratedBook>) => onChange({ ...book, ...patch });

  const active = book.chapters[activeIdx];

  const exportText = () => {
    const text = [
      book.title,
      book.subtitle ? `\n${book.subtitle}` : '',
      book.dedication ? `\n\n${book.dedication}\n` : '',
      '',
      ...book.chapters.map(c => `\n\nChapter ${c.number} — ${c.title}\n\n${c.prose}`),
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Manuscript downloaded');
  };

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-4 h-full min-h-0">
      {/* Chapter list */}
      <div className="bg-[#FAF7F2] rounded-2xl p-3 border border-[#0F1B2D]/8 overflow-y-auto max-h-[60vh] lg:max-h-none">
        <div className="text-[10px] uppercase tracking-wider font-bold text-[#8B2635] px-2 py-1.5">Chapters</div>
        <div className="space-y-1">
          {book.chapters.map((c, i) => (
            <button
              key={i} onClick={() => setActiveIdx(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${activeIdx === i ? 'bg-white shadow-sm border border-[#D4A847]/40' : 'hover:bg-white/60'}`}
            >
              <div className="text-[10px] font-bold text-[#0F1B2D]/40 uppercase tracking-wider">Ch. {c.number}</div>
              <div className="font-display font-bold text-sm text-[#0F1B2D] leading-tight line-clamp-2">{c.title}</div>
            </button>
          ))}
        </div>
        <button
          onClick={exportText}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2] text-xs font-semibold transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export Manuscript
        </button>
      </div>

      {/* Page */}
      <div className="bg-white rounded-2xl border border-[#0F1B2D]/8 overflow-y-auto max-h-[60vh] lg:max-h-[65vh] book-shadow">
        <div className="px-6 py-8 lg:px-12 lg:py-12 max-w-3xl mx-auto">
          {activeIdx === 0 && (
            <div className="mb-10 pb-8 border-b border-[#0F1B2D]/10 text-center">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B2635] mb-3">A Chapters Book</div>
              {editingTitle ? (
                <input
                  autoFocus value={book.title}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditingTitle(false); }}
                  onChange={e => updateBook({ title: e.target.value })}
                  className="font-display text-4xl font-bold text-[#0F1B2D] text-center w-full bg-transparent border-b-2 border-[#D4A847] focus:outline-none"
                />
              ) : (
                <h1 onClick={() => setEditingTitle(true)} className="font-display text-4xl font-bold text-[#0F1B2D] cursor-text hover:bg-[#D4A847]/8 rounded px-2 py-1 transition-colors">
                  {book.title}
                </h1>
              )}
              {book.subtitle && <p className="font-display italic text-lg text-[#8B2635] mt-2">{book.subtitle}</p>}
              {book.dedication && <p className="font-display italic text-[#0F1B2D]/70 mt-6 text-base">{book.dedication}</p>}
            </div>
          )}

          {active && (
            <>
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B2635] mb-3 flex items-center gap-2">
                Chapter {active.number}
                <Edit3 className="w-3 h-3 opacity-50" />
                <span className="text-[#0F1B2D]/40 normal-case tracking-normal italic font-normal">click to edit</span>
              </div>
              <input
                value={active.title}
                onChange={e => updateChapter(activeIdx, { title: e.target.value })}
                className="w-full font-display text-3xl lg:text-4xl font-bold text-[#0F1B2D] italic mb-8 bg-transparent border-b border-transparent hover:border-[#0F1B2D]/15 focus:border-[#D4A847] focus:outline-none transition-colors"
              />
              <textarea
                value={active.prose}
                onChange={e => updateChapter(activeIdx, { prose: e.target.value })}
                rows={18}
                className="w-full font-serif text-[#0F1B2D]/90 leading-[1.85] text-base lg:text-[17px] bg-transparent focus:outline-none resize-none whitespace-pre-wrap"
              />
              <div className="mt-4 flex items-center gap-2 text-xs text-[#6B8F71]">
                <Check className="w-3.5 h-3.5" /> Changes saved automatically
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookEditor;
