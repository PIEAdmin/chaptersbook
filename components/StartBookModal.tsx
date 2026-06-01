import React, { useState, useMemo } from 'react';
import {
  X, Baby, Heart, Clock, GraduationCap, Sparkles, ArrowRight, Check, Users,
  Smile, Briefcase, BookOpen, AlertCircle,
} from 'lucide-react';
import { useToast } from './Toast';
import BookEditor, { GeneratedBook } from './BookEditor';

interface StartBookModalProps {
  open: boolean;
  mode: 'solo' | 'group';
  onClose: () => void;
}

const recipientOptions = [
  { id: 'child',      label: 'A Child',        icon: Baby,          color: '#D4A847', desc: 'Daughter, son, niece, nephew' },
  { id: 'grandchild', label: 'A Grandchild',   icon: Heart,         color: '#8B2635', desc: 'Sharing your legacy with the next generation' },
  { id: 'future',     label: 'Future Self',    icon: Clock,         color: '#6B8F71', desc: 'A time capsule for tomorrow' },
  { id: 'teacher',    label: 'A Teacher',      icon: GraduationCap, color: '#0F1B2D', desc: 'Honor a mentor who shaped you' },
  { id: 'other',      label: 'Someone Else',   icon: Sparkles,      color: '#8B2635', desc: 'Friend, partner, colleague, anyone' },
];

const questionsByType: Record<string, string[]> = {
  child:      ['What is the most important lesson you want them to know?', 'Describe the moment you first held them', 'What dreams do you have for their future?', 'What family traditions do you hope they carry on?', 'What makes you most proud of them?'],
  grandchild: ['What was life like when you were their age?', 'What is the greatest adventure of your life?', 'What values have shaped who you are?', 'What is the funniest family story you remember?'],
  future:     ['What is your biggest goal right now?', 'What brings you the most joy today?', 'Who are the most important people in your life?', 'What do you hope has changed in 10 years?'],
  teacher:    ['What teaching moment changed you forever?', 'Describe a student who inspired you', 'What advice would you give a first-year teacher?'],
  other:      ['How did you first meet?', 'Share your favorite memory together', 'What do you admire most about them?', 'What do you wish for them next?'],
};

const groupQuestions = [
  'How long have you known [name]?',
  'Share your favorite memory with [name]',
  "What's one word that describes [name]?",
  'What has [name] taught you?',
  'What do you admire most about [name]?',
];

const tones = [
  { id: 'warm',    label: 'Warm & Heartfelt',     icon: Heart,     color: '#8B2635' },
  { id: 'funny',   label: 'Funny & Playful',       icon: Smile,     color: '#D4A847' },
  { id: 'formal',  label: 'Formal & Professional', icon: Briefcase, color: '#0F1B2D' },
  { id: 'inspire', label: 'Inspirational',         icon: Sparkles,  color: '#6B8F71' },
];

const lengths = [
  { id: 'short',  label: 'Short',  pages: '10–20 pages · ~4 chapters' },
  { id: 'medium', label: 'Medium', pages: '20–40 pages · ~5 chapters' },
  { id: 'long',   label: 'Long',   pages: '40–80 pages · ~6 chapters' },
];

// ── Mock AI book generation ──────────────────────────────────────────────────

type ToneKey = 'warm' | 'funny' | 'formal' | 'inspire';

const chapterTemplates: Record<ToneKey, { title: string; intro: string }[]> = {
  warm: [
    { title: 'The Day Everything Changed',     intro: 'There are moments in life that divide time into before and after.' },
    { title: 'What You Mean to Me',            intro: 'Words feel small when I try to describe the place you hold in my heart.' },
    { title: 'Lessons Only You Could Teach',   intro: 'Not all wisdom comes from books or classrooms.' },
    { title: 'Memories I Carry Like Gold',     intro: 'Some memories are so vivid they feel less like the past and more like a second home.' },
    { title: 'Dreams I Hold for You',          intro: 'If I could gift you anything, it would not be a thing at all.' },
    { title: 'What the World Looks Like, Loving You', intro: 'To love someone the way I love you changes everything.' },
  ],
  funny: [
    { title: "Let's Start with the Embarrassing Part", intro: 'Every great story has a moment where someone trips on something symbolic.' },
    { title: 'The Questionable Decisions',     intro: 'History will judge us, but probably not as harshly as we deserve.' },
    { title: "Things I'd Never Admit Out Loud", intro: 'This book is the one place I can be honest without being interrupted.' },
    { title: 'The Time I Was Definitely Right', intro: 'This chapter is very short, because it only happened once.' },
    { title: "Why You're Weird (In the Best Way)", intro: 'Normal is overrated. We both know this.' },
    { title: 'The Part Where I Actually Get Sentimental', intro: "Don't worry, this doesn't last long." },
  ],
  formal: [
    { title: 'A Tribute to a Remarkable Life', intro: 'It is with deep respect and admiration that I set these words to paper.' },
    { title: 'The Values That Define You',     intro: 'Character is not claimed — it is demonstrated, day after day, in quiet and in crisis alike.' },
    { title: 'Contributions That Will Endure', intro: 'Some legacies are built of stone. Yours is built of something more lasting.' },
    { title: 'The Wisdom You Have Shared',    intro: 'Great mentors do not simply transfer knowledge — they ignite something.' },
    { title: 'In Recognition of Everything',  intro: 'This acknowledgment is incomplete, as all such acknowledgments must be.' },
    { title: 'Looking Forward With Gratitude', intro: 'The future is shaped by what we carry from the past.' },
  ],
  inspire: [
    { title: 'The Journey Begins Here',        intro: 'Every great adventure starts with a single, almost imperceptible decision.' },
    { title: 'The Strength You Discovered',   intro: 'We are tested not so we can fail, but so we can discover what we are made of.' },
    { title: 'The People Who Made You',       intro: 'No one rises alone. Behind every remarkable person is a constellation of people who believed first.' },
    { title: 'What You Have Already Overcome', intro: 'Courage is not the absence of fear — it is the decision that something else matters more.' },
    { title: 'The Vision That Pulls You Forward', intro: 'Purpose is not found. It is built, piece by piece, from everything you love and everything you have lost.' },
    { title: 'Your Next Chapter',             intro: 'And now, as one chapter closes, another opens. The page is blank. The story is yours.' },
  ],
};

const buildProse = (intro: string, answer: string, name: string, tone: ToneKey): string => {
  const lines: Record<ToneKey, string> = {
    warm:    `${intro}\n\n${name}, I want to share something that has stayed with me: ${answer.trim() || 'there are certain truths that only become visible in hindsight'}.\n\nThese are not just words. They are a piece of everything I feel when I think of you — the warmth, the gratitude, the simple and profound love that doesn't need a special occasion to exist. I hope you read these lines and feel it.\n\nSome things are too important to be left unspoken. That is why I wrote them here — so they would last longer than a conversation, longer than memory itself, long enough to find you exactly when you need them most.`,
    funny:   `${intro}\n\nSo here is the thing, ${name}: ${answer.trim() || 'there is a story here that absolutely needs to be on record'}.\n\nI am not going to pretend that is not a little ridiculous. But that is kind of the point. The best stories — the ones worth putting in a book — are never the polished ones. They are the ones where someone laughed at the wrong moment or said exactly the right wrong thing.\n\nAnd yet, somehow, in all the chaos, something real happened. Something worth remembering. That is what this chapter is about.`,
    formal:  `${intro}\n\nIn reflecting on this, it becomes clear that ${answer.trim() || 'the mark of a truly remarkable person is what they leave in others'}.\n\nThis observation speaks to the larger truth of who you are and what you have built. It is the kind of thing that deserves to be recorded — not merely remembered — because the people who come after us deserve to understand the full measure of a distinguished life.\n\nHistory does not always remember the quiet acts of courage. This book is a small effort to change that.`,
    inspire: `${intro}\n\n${name}, consider this: ${answer.trim() || 'every moment of stillness contains the seed of something extraordinary'}.\n\nIn that, there is an entire philosophy. A quiet revolution. The kind of truth that does not arrive with fanfare — it arrives in the middle of an ordinary day, and afterwards nothing is quite the same.\n\nHold onto that. Let it pull you forward. The next chapter of your story has not been written yet, and that is the most exciting thing in the world.`,
  };
  return lines[tone] || lines.warm;
};

const generateWithAI = async (params: {
  mode: string; recipientType: string; recipientName: string; occasion: string;
  qa: { question: string; answer: string }[]; tone: string; length: string;
}): Promise<GeneratedBook> => {
  // Try real AI via serverless function first
  try {
    const res = await fetch('/.netlify/functions/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.title && data.chapters) return data as GeneratedBook;
    }
  } catch (_) {
    // fall through to local generation
  }

  // Local fallback (demo quality) if function unavailable
  await new Promise(r => setTimeout(r, 2800));
  const name = params.recipientName || 'You';
  const tone = (params.tone as ToneKey) in chapterTemplates ? (params.tone as ToneKey) : 'warm';
  const numChapters = ({ short: 4, medium: 5, long: 6 }[params.length] ?? 5);
  const templates = chapterTemplates[tone].slice(0, numChapters);
  const answered = params.qa.filter(p => p.answer.trim().length > 5);
  const chapters = templates.map((tmpl, i) => {
    const qa = answered[i] ?? answered[i % Math.max(answered.length, 1)];
    return { number: i + 1, title: tmpl.title, prose: buildProse(tmpl.intro, qa?.answer ?? '', name, tone) };
  });
  const titleMap: Record<string, string> = {
    child: `For ${name}: A Letter From My Heart`, grandchild: `For ${name}: Stories Across the Years`,
    future: `Dear Future Me: A Letter From ${new Date().getFullYear()}`, teacher: `In Honor of ${name}: A Tribute`, other: `A Story for ${name}`,
  };
  const dedicationMap: Record<ToneKey, string> = {
    warm: `With all my love — written just for ${name}.`, funny: `To ${name} — who will probably roast me about this later.`,
    formal: `Presented with deep respect and admiration for ${name}.`, inspire: `For ${name} — may every next chapter be better than the last.`,
  };
  return {
    title: params.mode === 'group' ? `A Tribute Book for ${name}` : (titleMap[params.recipientType] ?? `A Book for ${name}`),
    subtitle: params.occasion || undefined, dedication: dedicationMap[tone], chapters,
  };
};

// ── Component ────────────────────────────────────────────────────────────────

type Phase = 'recipient' | 'questions' | 'tone' | 'generating' | 'preview' | 'save';

const StartBookModal: React.FC<StartBookModalProps> = ({ open, mode, onClose }) => {
  const { toast } = useToast();
  const [phase, setPhase] = useState<Phase>('recipient');
  const [recipientType, setRecipientType] = useState('child');
  const [recipientName, setRecipientName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [invitation, setInvitation] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [tone, setTone] = useState('warm');
  const [length, setLength] = useState('medium');
  const [book, setBook] = useState<GeneratedBook | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const questions = useMemo(() => {
    if (mode === 'group') {
      const n = recipientName || '[name]';
      return groupQuestions.map(q => q.replace(/\[name\]/g, n));
    }
    return questionsByType[recipientType] || [];
  }, [mode, recipientType, recipientName]);

  const reset = () => {
    setPhase('recipient'); setRecipientType('child'); setRecipientName(''); setOccasion('');
    setInvitation(''); setAnswers({}); setCurrentQ(0); setTone('warm'); setLength('medium');
    setBook(null); setEmail(''); setGenError(null);
  };

  const handleClose = () => { reset(); onClose(); };
  const answeredCount = Object.values(answers).filter((a): a is string => typeof a === 'string' && a.trim().length > 5).length;

  const goToQuestions = () => {
    if (mode === 'group') {
      if (!recipientName.trim()) { toast.error('Please enter a recipient name'); return; }
      if (!occasion.trim())      { toast.error('Please enter the occasion');       return; }
    }
    setPhase('questions'); setCurrentQ(0);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) { setCurrentQ(c => c + 1); }
    else {
      if (answeredCount === 0) { toast.error('Please answer at least one question'); return; }
      setPhase('tone');
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ(c => c - 1); else setPhase('recipient');
  };

  const generate = async () => {
    setPhase('generating'); setGenError(null);
    try {
      const qa = questions.map((q, i) => ({ question: q, answer: answers[i] || '' })).filter(p => p.answer.trim().length > 0);
      const result = await generateWithAI({ mode, recipientType, recipientName, occasion, qa, tone, length });
      setBook(result); setPhase('preview');
      toast.success('Your book is ready ✨');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Generation failed';
      setGenError(msg);
      toast.error("Couldn't generate the book — try again");
    }
  };

  const finish = async () => {
    if (!email || !email.includes('@')) { toast.error('Please enter a valid email'); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    toast.success('Your book is saved to your library');
    setSubmitting(false);
    handleClose();
  };

  if (!open) return null;

  const phaseInfo: Record<Phase, { num: number; total: number; title: string }> = {
    recipient:  { num: 1, total: 5, title: mode === 'solo' ? 'Who is this book for?' : 'Who are we celebrating?' },
    questions:  { num: 2, total: 5, title: `Question ${currentQ + 1} of ${questions.length}` },
    tone:       { num: 3, total: 5, title: 'Set the tone & length' },
    generating: { num: 4, total: 5, title: 'Ghostwriting your book…' },
    preview:    { num: 4, total: 5, title: 'Your book — edit anything you like' },
    save:       { num: 5, total: 5, title: 'Save to your library' },
  };
  const info = phaseInfo[phase];
  const progress = (info.num / info.total) * 100;
  const isWide = phase === 'preview';
  const accentColor = mode === 'solo' ? '#D4A847' : '#8B2635';
  const accentText = mode === 'solo' ? '#0F1B2D' : '#FAF7F2';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fade-up"
      style={{ backgroundColor: 'rgba(15,27,45,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`relative w-full ${isWide ? 'max-w-6xl' : 'max-w-2xl'} bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all`}
        style={{ maxHeight: '95vh' }}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#0F1B2D]/8 flex items-start justify-between flex-shrink-0">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: accentColor }}>
              {mode === 'solo' ? 'Solo Mode' : 'Group Mode'} · Step {info.num} of {info.total}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1B2D]">{info.title}</h3>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-[#0F1B2D]/8 transition-colors flex-shrink-0">
            <X className="w-5 h-5 text-[#0F1B2D]" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 sm:px-8 py-3 bg-white flex-shrink-0">
          <div className="h-1.5 bg-[#0F1B2D]/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#D4A847,#8B2635)' }} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">

          {/* PHASE: recipient – solo */}
          {phase === 'recipient' && mode === 'solo' && (
            <div className="space-y-3">
              {recipientOptions.map(opt => {
                const Icon = opt.icon;
                const active = recipientType === opt.id;
                return (
                  <button key={opt.id} onClick={() => setRecipientType(opt.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${active ? 'border-[#0F1B2D] bg-white shadow-md' : 'border-[#0F1B2D]/10 bg-white/50 hover:border-[#0F1B2D]/30'}`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${opt.color}18` }}>
                      <Icon className="w-6 h-6" style={{ color: opt.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0F1B2D]">{opt.label}</div>
                      <div className="text-sm text-[#0F1B2D]/60">{opt.desc}</div>
                    </div>
                    {active && <Check className="w-5 h-5 text-[#6B8F71]" />}
                  </button>
                );
              })}
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D]/60 uppercase tracking-wider mt-4 mb-2">Their name (optional)</label>
                <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g. Eleanor"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#D4A847] focus:outline-none" />
              </div>
            </div>
          )}

          {/* PHASE: recipient – group */}
          {phase === 'recipient' && mode === 'group' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F1B2D] mb-2">Recipient's name</label>
                <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g. Mrs. Thompson"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#8B2635] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F1B2D] mb-2">Occasion</label>
                <input value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="e.g. Retirement after 25 years of teaching"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#8B2635] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F1B2D] mb-2">Invitation message (optional)</label>
                <textarea value={invitation} onChange={e => setInvitation(e.target.value)} rows={3}
                  placeholder={`We're making a surprise book for ${recipientName || '[name]'}. Please contribute a memory!`}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#8B2635] focus:outline-none resize-none" />
              </div>
              <div className="p-4 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'rgba(139,38,53,0.06)', borderColor: 'rgba(139,38,53,0.2)' }}>
                <Users className="w-5 h-5 text-[#8B2635] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#0F1B2D]/80">
                  For this demo, you'll act as one contributor — the AI will weave your answers as if from a group. In production, you'd get a shareable link at <strong>chaptersbook.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* PHASE: questions */}
          {phase === 'questions' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white border border-[#0F1B2D]/8">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8B2635] mb-2">Question {currentQ + 1}</div>
                <p className="font-display text-xl italic text-[#0F1B2D] leading-snug">"{questions[currentQ]}"</p>
              </div>
              <textarea
                value={answers[currentQ] || ''}
                onChange={e => setAnswers(a => ({ ...a, [currentQ]: e.target.value }))}
                rows={6}
                placeholder="Take your time. Write freely. AI will polish your words later."
                className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#D4A847] focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between text-xs">
                <div className="text-[#0F1B2D]/50 italic">Tip: even a few honest sentences make a beautiful chapter.</div>
                <div className="font-semibold text-[#6B8F71]">{answeredCount}/{questions.length} answered</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((_, i) => (
                  <button key={i} onClick={() => setCurrentQ(i)}
                    className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all ${i === currentQ ? 'bg-[#0F1B2D] text-[#FAF7F2]' : answers[i] && answers[i].trim().length > 5 ? 'bg-[#6B8F71]/25 text-[#0F1B2D]' : 'bg-[#0F1B2D]/8 text-[#0F1B2D]/50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PHASE: tone & length */}
          {phase === 'tone' && (
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]/60 mb-3">Tone</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tones.map(t => {
                    const Icon = t.icon; const active = tone === t.id;
                    return (
                      <button key={t.id} onClick={() => setTone(t.id)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${active ? 'border-[#0F1B2D] bg-white shadow-md' : 'border-[#0F1B2D]/10 bg-white/60 hover:border-[#0F1B2D]/30'}`}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}18` }}>
                          <Icon className="w-4 h-4" style={{ color: t.color }} />
                        </div>
                        <span className="font-semibold text-[#0F1B2D] text-sm">{t.label}</span>
                        {active && <Check className="w-4 h-4 text-[#6B8F71] ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]/60 mb-3">Length</div>
                <div className="grid grid-cols-3 gap-3">
                  {lengths.map(l => (
                    <button key={l.id} onClick={() => setLength(l.id)}
                      className={`px-3 py-4 rounded-xl border-2 transition-all text-center ${length === l.id ? 'border-[#D4A847] bg-[#D4A847]/8' : 'border-[#0F1B2D]/10 bg-white/60 hover:border-[#0F1B2D]/30'}`}
                    >
                      <div className="font-display font-bold text-[#0F1B2D]">{l.label}</div>
                      <div className="text-[11px] text-[#0F1B2D]/60 mt-0.5 leading-tight">{l.pages}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl border flex items-start gap-3" style={{ background: 'linear-gradient(135deg,rgba(212,168,71,0.1),rgba(139,38,53,0.08))', borderColor: 'rgba(212,168,71,0.3)' }}>
                <Sparkles className="w-5 h-5 text-[#D4A847] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#0F1B2D]/85">
                  <div className="font-semibold mb-1">Ready to write</div>
                  AI will turn your {answeredCount} answer{answeredCount === 1 ? '' : 's'} into a fully formatted, multi-chapter book in seconds.
                </div>
              </div>
            </div>
          )}

          {/* PHASE: generating */}
          {phase === 'generating' && (
            <div className="py-12 text-center">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-[#D4A847]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D4A847] animate-spin" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[#0F1B2D] animate-page-turn" />
                </div>
              </div>
              <h4 className="font-display text-2xl font-bold text-[#0F1B2D] mb-2">Turning your memories into chapters…</h4>
              <p className="text-[#0F1B2D]/60 max-w-sm mx-auto">Our AI ghostwriter is reading your answers and crafting a beautifully written book.</p>
              <div className="mt-6 flex justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D4A847] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[#D4A847] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-[#D4A847] animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              {genError && (
                <div className="mt-8 max-w-md mx-auto p-4 rounded-xl flex items-start gap-3 text-left" style={{ backgroundColor: 'rgba(139,38,53,0.08)', border: '1px solid rgba(139,38,53,0.2)' }}>
                  <AlertCircle className="w-5 h-5 text-[#8B2635] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#0F1B2D]/80">{genError}</div>
                </div>
              )}
            </div>
          )}

          {/* PHASE: preview */}
          {phase === 'preview' && book && (
            <BookEditor book={book} onChange={setBook} />
          )}

          {/* PHASE: save */}
          {phase === 'save' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border text-center" style={{ background: 'linear-gradient(135deg,rgba(212,168,71,0.12),rgba(139,38,53,0.08))', borderColor: 'rgba(212,168,71,0.3)' }}>
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#D4A847]" />
                <h4 className="font-display text-xl font-bold text-[#0F1B2D] mb-1">"{book?.title}" is ready</h4>
                <p className="text-sm text-[#0F1B2D]/70">Save your email and we'll keep your book in your library — edit anytime.</p>
              </div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#0F1B2D]/10 bg-white focus:border-[#D4A847] focus:outline-none" />
              <p className="text-xs text-[#0F1B2D]/50 text-center">We'll never share your email. Unsubscribe anytime.</p>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-6 sm:px-8 py-4 bg-white border-t border-[#0F1B2D]/8 flex items-center justify-between flex-shrink-0 gap-3">
          <button
            onClick={() => {
              if (phase === 'recipient') handleClose();
              else if (phase === 'questions') prevQuestion();
              else if (phase === 'tone') setPhase('questions');
              else if (phase === 'preview') setPhase('tone');
              else if (phase === 'save') setPhase('preview');
              else if (phase === 'generating') setPhase('tone');
            }}
            className="px-4 sm:px-5 py-2.5 rounded-full text-[#0F1B2D] font-medium hover:bg-[#0F1B2D]/5 transition-colors text-sm"
          >
            {phase === 'recipient' ? 'Cancel' : '← Back'}
          </button>

          {phase === 'recipient' && (
            <button onClick={goToQuestions} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
              style={{ backgroundColor: accentColor, color: accentText }}>
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {phase === 'questions' && (
            <button onClick={nextQuestion} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
              style={{ backgroundColor: accentColor, color: accentText }}>
              {currentQ < questions.length - 1 ? 'Next question' : 'Choose tone & length'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {phase === 'tone' && (
            <button onClick={generate} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#0F1B2D] text-[#FAF7F2] font-semibold hover:bg-[#1a2b45] transition-colors text-sm">
              <Sparkles className="w-4 h-4" /> Ghostwrite My Book
            </button>
          )}
          {phase === 'generating' && genError && (
            <button onClick={generate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F1B2D] text-[#FAF7F2] font-semibold text-sm">
              Try Again
            </button>
          )}
          {phase === 'preview' && (
            <button onClick={() => setPhase('save')} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-sm transition-colors">
              Save to Library <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {phase === 'save' && (
            <button onClick={finish} disabled={submitting} className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#0F1B2D] text-[#FAF7F2] font-semibold hover:bg-[#1a2b45] disabled:opacity-60 transition-colors text-sm">
              {submitting ? 'Saving…' : 'Save Book'} <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartBookModal;
