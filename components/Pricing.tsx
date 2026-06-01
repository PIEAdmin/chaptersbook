import React, { useState } from 'react';
import { Check, Zap, Users, Building2, Upload } from 'lucide-react';

interface PricingProps { onSelect: (tier: string) => void; }

type Billing = 'once' | 'monthly' | 'annual';

const Pricing: React.FC<PricingProps> = ({ onSelect }) => {
  const [billing, setBilling] = useState<Billing>('once');

  const tiers = [
    {
      id: 'single',
      icon: <Zap className="w-5 h-5" />,
      name: 'Single Book',
      tag: null,
      price: '$9.99',
      suffix: 'one-time',
      desc: 'Perfect for one special gift or occasion.',
      features: [
        'AI-written personalized story',
        'Solo or Group contributions',
        'PDF download',
        'Up to 30 pages',
        '10 photo uploads',
        'Inline editor',
      ],
      cta: 'Create My Book',
      accent: '#0F1B2D',
      cardBg: 'bg-white',
      cardBorder: 'border-[#0F1B2D]/10',
      featured: false,
      ctaClass: 'bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2]',
      textColor: 'text-[#0F1B2D]',
      subColor: 'text-[#0F1B2D]/60',
    },
    {
      id: 'polish',
      icon: <Upload className="w-5 h-5" />,
      name: 'Upload & Polish',
      tag: null,
      price: '$14.99',
      suffix: 'one-time',
      desc: 'Already wrote it? We\'ll make it stunning.',
      features: [
        'Upload Word / Google Doc / PDF',
        'AI polishes & structures your draft',
        'Professional book layout',
        'PDF + Word export',
        'Up to 80 pages',
        'Inline editor + revision history',
      ],
      cta: 'Polish My Draft',
      accent: '#6B8F71',
      cardBg: 'bg-white',
      cardBorder: 'border-[#0F1B2D]/10',
      featured: false,
      ctaClass: 'bg-[#6B8F71] hover:bg-[#557a5b] text-white',
      textColor: 'text-[#0F1B2D]',
      subColor: 'text-[#0F1B2D]/60',
    },
    {
      id: 'family',
      icon: <Users className="w-5 h-5" />,
      name: 'Family',
      tag: 'Most Popular',
      price: billing === 'annual' ? '$7.99' : '$12.99',
      suffix: billing === 'annual' ? '/mo · billed annually' : '/month',
      desc: 'For families, parents & grandparents who create often.',
      features: [
        'Unlimited book creation',
        'Book library — save & revisit',
        'PDF + Word + ePub export',
        'AI illustration (DALL·E 3)',
        'Upload & Polish included',
        'Priority AI processing',
        'Email support',
      ],
      cta: 'Start Family Plan',
      accent: '#D4A847',
      cardBg: 'bg-[#0F1B2D]',
      cardBorder: 'border-[#D4A847]',
      featured: true,
      ctaClass: 'bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D]',
      textColor: 'text-[#FAF7F2]',
      subColor: 'text-[#FAF7F2]/60',
    },
    {
      id: 'annual',
      icon: <Zap className="w-5 h-5" />,
      name: 'Annual Unlimited',
      tag: 'Best Value',
      price: '$79',
      suffix: '/year',
      desc: 'Unlimited everything. One flat annual fee.',
      features: [
        'Everything in Family',
        'Print-ready bleed margins',
        'KDP / Amazon self-publish export',
        'Branded book covers',
        'Priority support + onboarding call',
        '30-day money-back guarantee',
      ],
      cta: 'Go Unlimited',
      accent: '#8B2635',
      cardBg: 'bg-white',
      cardBorder: 'border-[#0F1B2D]/10',
      featured: false,
      ctaClass: 'bg-[#8B2635] hover:bg-[#6d1e29] text-white',
      textColor: 'text-[#0F1B2D]',
      subColor: 'text-[#0F1B2D]/60',
    },
    {
      id: 'teams',
      icon: <Building2 className="w-5 h-5" />,
      name: 'Teams & Enterprise',
      tag: null,
      price: '$199',
      suffix: '/month',
      desc: 'For schools, companies, churches & large groups.',
      features: [
        'Unlimited books across your org',
        'Admin dashboard + bulk creation',
        'Branded templates & cover art',
        'Shared workspace & collaboration',
        'Staff recognition & tribute books',
        'Dedicated account manager',
        'Custom invoicing available',
      ],
      cta: 'Contact Us',
      accent: '#0F1B2D',
      cardBg: 'bg-white',
      cardBorder: 'border-[#0F1B2D]/10',
      featured: false,
      ctaClass: 'bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2]',
      textColor: 'text-[#0F1B2D]',
      subColor: 'text-[#0F1B2D]/60',
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Pricing</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            One gift. A story that lasts <span className="italic">forever.</span>
          </h2>
          <p className="mt-5 text-lg text-[#0F1B2D]/70">
            From a single keepsake to an entire organization — there's a plan for every occasion.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 bg-[#0F1B2D]/6 rounded-full p-1">
            {(['once', 'monthly', 'annual'] as Billing[]).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  billing === b
                    ? 'bg-white text-[#0F1B2D] shadow-sm'
                    : 'text-[#0F1B2D]/50 hover:text-[#0F1B2D]'
                }`}
              >
                {b === 'once' ? 'Pay Per Book' : b === 'monthly' ? 'Monthly' : 'Annual (Save 38%)'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {tiers.map(t => (
            <div
              key={t.id}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${t.cardBg} ${t.cardBorder} ${t.featured ? 'book-shadow scale-[1.02] lg:col-span-1' : 'shadow-sm'}`}
            >
              {t.tag && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${t.tag === 'Most Popular' ? 'bg-[#D4A847] text-[#0F1B2D]' : 'bg-[#8B2635] text-white'}`}>
                  {t.tag}
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-2 mb-1">
                <div className="opacity-70" style={{ color: t.accent }}>{t.icon}</div>
                <div className={`font-display text-xl font-bold ${t.textColor}`}>{t.name}</div>
              </div>
              <p className={`text-sm mb-6 ${t.subColor}`}>{t.desc}</p>

              {/* Price */}
              <div className={`flex items-baseline gap-1 mb-8 ${t.textColor}`}>
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className={`text-sm ${t.subColor}`}>{t.suffix}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {t.features.map(f => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${t.textColor}`}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${t.accent}25` }}>
                      <Check className="w-3 h-3" style={{ color: t.accent }} />
                    </div>
                    <span className={t.subColor.replace('/60', '/80')}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(t.id)}
                className={`w-full px-6 py-3.5 rounded-full font-semibold transition-all ${t.ctaClass}`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-[#0F1B2D]/50">
          <div className="flex items-center gap-1.5"><span>🔒</span> Secure Stripe checkout</div>
          <div className="flex items-center gap-1.5"><span>💳</span> Apple Pay &amp; Google Pay accepted</div>
          <div className="flex items-center gap-1.5"><span>🔄</span> 30-day money-back guarantee</div>
          <div className="flex items-center gap-1.5"><span>📧</span> Instant download after payment</div>
          <div className="flex items-center gap-1.5"><span>🏢</span> Teams? <a href="mailto:hello@chaptersbook.com" className="text-[#D4A847] hover:underline ml-1">Get a custom quote</a></div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
