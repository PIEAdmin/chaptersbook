import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';

const UrgencyBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [spots, setSpots] = useState(347);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(s => s > 300 ? s - 1 : s);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-[#0F1B2D] text-[#FAF7F2] py-2.5 px-4 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Zap className="w-3.5 h-3.5 text-[#D4A847] flex-shrink-0" />
        <span>
          🎉 <strong>Launch Week Special:</strong> 50% off Standard &amp; Premium —
          only <strong className="text-[#D4A847]">{spots} spots</strong> remaining at this price.
        </span>
        <a
          href="#pricing"
          className="underline underline-offset-2 text-[#D4A847] hover:text-[#e6bc59] font-semibold whitespace-nowrap"
        >
          Claim yours →
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UrgencyBanner;
