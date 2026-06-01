import React, { useState, useEffect } from 'react';
import { BookOpen, X } from 'lucide-react';

interface Notif {
  name: string;
  action: string;
  location: string;
  time: string;
}

const NOTIFS: Notif[] = [
  { name: 'Emily R.', action: 'just created a birthday book for her daughter', location: 'Portland, OR', time: '2 min ago' },
  { name: 'Carlos M.', action: 'just downloaded their group retirement book', location: 'Madrid, Spain', time: '4 min ago' },
  { name: 'Yuki T.', action: 'just started a family history book', location: 'Tokyo, Japan', time: '1 min ago' },
  { name: 'Sarah K.', action: 'just sent invites for a group memory book', location: 'London, UK', time: '3 min ago' },
  { name: 'James O.', action: 'just published their memoir to KDP', location: 'Lagos, Nigeria', time: '6 min ago' },
  { name: 'Priya N.', action: 'just created a book for their teacher', location: 'Mumbai, India', time: '2 min ago' },
  { name: 'Mike T.', action: 'just ordered a printed hardcover', location: 'Chicago, IL', time: '5 min ago' },
];

const LiveNotification: React.FC = () => {
  const [current, setCurrent] = useState<Notif | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 8 seconds
    const initial = setTimeout(() => show(0), 8000);
    return () => clearTimeout(initial);
  }, []);

  const show = (idx: number) => {
    setCurrent(NOTIFS[idx % NOTIFS.length]);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => show(idx + 1), 12000);
    }, 5000);
  };

  if (!current || !visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs animate-fade-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#0F1B2D]/8 p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#D4A847]/15 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-[#D4A847]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#0F1B2D] leading-snug">
            <span className="font-semibold">{current.name}</span> from {current.location}{' '}
            <span className="text-[#0F1B2D]/70">{current.action}</span>
          </p>
          <p className="text-xs text-[#0F1B2D]/40 mt-0.5">{current.time}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[#0F1B2D]/30 hover:text-[#0F1B2D]/60 transition-colors flex-shrink-0 mt-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default LiveNotification;
