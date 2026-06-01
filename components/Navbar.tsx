import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#solo-mode',    label: 'Solo Mode' },
    { href: '#group-mode',   label: 'Group Mode' },
    { href: '#formats',      label: 'Formats' },
    { href: '#pricing',      label: 'Pricing' },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,247,242,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(15,27,45,0.07)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollTo('#top'); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0F1B2D] flex items-center justify-center group-hover:bg-[#8B2635] transition-colors">
            <BookOpen className="w-5 h-5 text-[#D4A847]" />
          </div>
          <span className="font-display text-2xl font-bold text-[#0F1B2D] tracking-tight">Chapters</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[#0F1B2D]/80 hover:text-[#8B2635] text-sm font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-sm shadow-sm hover:shadow-md transition-all"
          >
            Get Started Free
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[#0F1B2D]">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#0F1B2D]/10 px-6 py-4 space-y-3">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left text-[#0F1B2D] font-medium py-2"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setOpen(false); onGetStarted(); }}
            className="w-full px-5 py-3 rounded-full bg-[#D4A847] text-[#0F1B2D] font-semibold"
          >
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
