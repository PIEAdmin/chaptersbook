import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Gift } from 'lucide-react';

interface EmailCaptureProps {
  onStartBook?: () => void;
}

const PERKS = [
  'Free book creation — no credit card',
  'Launch Week pricing locked in',
  'Early access to Group Mode templates',
];

const EmailCapture: React.FC<EmailCaptureProps> = ({ onStartBook }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F5EFE3] relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4A847]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8B2635]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#D4A847]/15 text-[#0F1B2D] border border-[#D4A847]/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Gift className="w-4 h-4 text-[#D4A847]" />
          Start your first book free
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight mb-4">
          Your story is waiting <br />
          <span className="italic text-[#8B2635]">to be written.</span>
        </h2>
        <p className="text-lg text-[#0F1B2D]/60 mb-10">
          Join 12,847 storytellers who turned their memories into beautiful books — no writing experience needed.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <label className="flex-1 flex items-center gap-2 bg-white border border-[#0F1B2D]/15 rounded-full px-4 py-3 focus-within:border-[#D4A847] transition-colors shadow-sm">
              <Mail className="w-4 h-4 text-[#0F1B2D]/30 flex-shrink-0" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-[#0F1B2D] placeholder-[#0F1B2D]/30 text-sm outline-none"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-sm transition-all disabled:opacity-70 whitespace-nowrap shadow-lg"
            >
              {loading ? 'Joining…' : <>Get Started Free <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-[#6B8F71]/10 border border-[#6B8F71]/30 rounded-full px-6 py-3 max-w-sm mx-auto mb-8">
            <Check className="w-5 h-5 text-[#6B8F71]" />
            <span className="text-[#0F1B2D] font-medium text-sm">You're in! Check your inbox for your free access link.</span>
          </div>
        )}

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {PERKS.map(p => (
            <li key={p} className="flex items-center gap-1.5 text-sm text-[#0F1B2D]/60">
              <Check className="w-3.5 h-3.5 text-[#6B8F71]" />
              {p}
            </li>
          ))}
        </ul>

        {onStartBook && (
          <button
            onClick={onStartBook}
            className="mt-8 text-sm text-[#0F1B2D]/50 hover:text-[#0F1B2D] underline underline-offset-2 transition-colors"
          >
            Or start your book right now — no email needed
          </button>
        )}
      </div>
    </section>
  );
};

export default EmailCapture;
