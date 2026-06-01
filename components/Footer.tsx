import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';

interface Props {
  onPrivacy: () => void;
  onTerms: () => void;
}

const Footer: React.FC<Props> = ({ onPrivacy, onTerms }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { toast.error('Please enter a valid email'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("You're on the list. Welcome to Chapters.");
    setEmail('');
    setLoading(false);
  };

  const linkGroups = [
    { title: 'Product',   links: ['How It Works', 'Solo Mode', 'Group Mode', 'Formats', 'Pricing'] },
    { title: 'Company',   links: ['About', 'Stories', 'Press', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Help Center', 'Print Partners', 'Gift Cards'] },
  ];

  return (
    <footer className="bg-[#0F1B2D] text-[#FAF7F2] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4A847] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#0F1B2D]" />
              </div>
              <span className="font-display text-2xl font-bold">Chapters</span>
            </div>
            <p className="font-display italic text-xl text-[#FAF7F2]/80 mb-6 max-w-md">
              "One voice. Many voices. Your story."
            </p>
            <form onSubmit={subscribe} className="flex gap-2 max-w-md">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/15 text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:border-[#D4A847] text-sm"
              />
              <button type="submit" disabled={loading}
                className="px-5 py-3 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-sm inline-flex items-center gap-1.5 transition-colors disabled:opacity-60"
              >
                {loading ? 'Joining…' : 'Join'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-xs text-[#FAF7F2]/40 mt-3">Story prompts, sample chapters & launches. Unsubscribe anytime.</p>
          </div>

          {linkGroups.map(group => (
            <div key={group.title} className="lg:col-span-2">
              <div className="text-sm font-semibold text-[#D4A847] mb-4 uppercase tracking-wider">{group.title}</div>
              <ul className="space-y-3">
                {group.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="text-sm font-semibold text-[#D4A847] mb-4 uppercase tracking-wider">Legal</div>
            <ul className="space-y-3">
              <li><button onClick={onPrivacy} className="text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">Privacy Policy</button></li>
              <li><button onClick={onTerms} className="text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">Terms of Service</button></li>
              <li><a href="#" className="text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#FAF7F2]/10 flex flex-wrap items-center justify-between gap-4 text-sm text-[#FAF7F2]/50">
          <p>© {new Date().getFullYear()} Chapters · ChaptersBook.com · Built with love for every story worth telling.</p>
          <div className="flex gap-5">
            <button onClick={onPrivacy} className="hover:text-[#FAF7F2] transition-colors">Privacy</button>
            <button onClick={onTerms} className="hover:text-[#FAF7F2] transition-colors">Terms</button>
            <a href="#" className="hover:text-[#FAF7F2] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
