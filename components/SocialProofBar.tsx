import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Globe, Gift } from 'lucide-react';

const SocialProofBar: React.FC = () => {
  const [books, setBooks] = useState(14238);

  useEffect(() => {
    const t = setInterval(() => {
      setBooks(b => b + Math.floor(Math.random() * 3));
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { icon: <BookOpen className="w-5 h-5" />, value: books.toLocaleString() + '+', label: 'stories created' },
    { icon: <Star className="w-5 h-5" />, value: '4.9 / 5', label: 'average rating' },
    { icon: <Globe className="w-5 h-5" />, value: '80+', label: 'countries' },
    { icon: <Gift className="w-5 h-5" />, value: '20+', label: 'gift occasions' },
  ];

  return (
    <section className="py-12 bg-[#FAF7F2] border-b border-[#0F1B2D]/8">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-[#0F1B2D]/10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center px-4">
              <div className="text-[#D4A847]">{s.icon}</div>
              <div className="font-display text-3xl font-bold text-[#0F1B2D] tabular-nums">{s.value}</div>
              <div className="text-sm text-[#0F1B2D]/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
