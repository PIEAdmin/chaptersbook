import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps { onSelect: (tier: string) => void; }

const tiers = [
  {
    id: 'free', name: 'Free', price: '$0', desc: 'Try Chapters with a starter book.',
    features: ['Solo Mode only', 'PDF download', 'Up to 10 pages', '5 photo uploads', 'Standard AI processing'],
    cta: 'Start Free', accent: '#0F1B2D', bg: 'white', text: '#0F1B2D', featured: false,
  },
  {
    id: 'standard', name: 'Standard', price: '$9.99', suffix: '/ book', desc: 'Everything most people need.',
    features: ['Solo + Group Mode', 'PDF + Word download', 'Up to 50 pages', 'Unlimited photos', 'Custom tone & length', 'Email support'],
    cta: 'Create Your Book', accent: '#D4A847', bg: '#0F1B2D', text: '#FAF7F2', featured: true,
  },
  {
    id: 'premium', name: 'Premium', price: '$24.99', suffix: '/ book', desc: 'For publishing & printed gifts.',
    features: ['Everything in Standard', 'KDP export (.epub/.mobi)', 'Print-ready bleed margins', 'Print partner integration', 'Priority AI processing', 'White-glove support'],
    cta: 'Go Premium', accent: '#8B2635', bg: 'white', text: '#0F1B2D', featured: false,
  },
];

const Pricing: React.FC<PricingProps> = ({ onSelect }) => (
  <section id="pricing" className="py-20 lg:py-28 bg-[#FAF7F2]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Pricing</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
          Pay once. Keep <span className="italic">forever</span>.
        </h2>
        <p className="mt-5 text-lg text-[#0F1B2D]/70">
          No subscriptions. No surprise fees. Just one beautiful book at a time.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-[#8B2635]/8 border border-[#8B2635]/20 rounded-full px-4 py-2 text-sm text-[#8B2635] font-medium">
          ⏰ Launch Week pricing — ends soon. Lock it in now.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {tiers.map(t => (
          <div
            key={t.id}
            className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${t.featured ? 'border-[#D4A847] book-shadow scale-[1.02]' : 'border-[#0F1B2D]/10 shadow-sm'}`}
            style={{ backgroundColor: t.bg, color: t.text }}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A847] text-[#0F1B2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="font-display text-2xl font-bold mb-1">{t.name}</div>
            <p className="text-sm mb-6" style={{ opacity: 0.6 }}>{t.desc}</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-display text-5xl font-bold">{t.price}</span>
              {t.suffix && <span className="text-sm" style={{ opacity: 0.6 }}>{t.suffix}</span>}
            </div>
            <ul className="space-y-3 mb-8">
              {t.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${t.accent}25` }}>
                    <Check className="w-3 h-3" style={{ color: t.accent }} />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect(t.id)}
              className={`w-full px-6 py-3.5 rounded-full font-semibold transition-all ${t.featured ? 'bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D]' : 'bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2]'}`}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>
      {/* Trust strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#0F1B2D]/50">
        <div className="flex items-center gap-1.5">
          <span>🔒</span> Secure checkout
        </div>
        <div className="flex items-center gap-1.5">
          <span>💳</span> Pay once, keep forever
        </div>
        <div className="flex items-center gap-1.5">
          <span>🔄</span> 30-day money-back guarantee
        </div>
        <div className="flex items-center gap-1.5">
          <span>📧</span> Instant download after payment
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
