import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { ToastProvider, useToast } from './components/Toast';
import SEOMeta from './components/SEOMeta';
import UrgencyBanner from './components/UrgencyBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PressBar from './components/PressBar';
import SocialProofBar from './components/SocialProofBar';
import HowItWorks from './components/HowItWorks';
import TwoModes from './components/TwoModes';
import Workflows from './components/Workflows';
import QuestionTree from './components/QuestionTree';
import ToneLengthDemo from './components/ToneLengthDemo';
import GroupTracker from './components/GroupTracker';
import Testimonials from './components/Testimonials';
import Formats from './components/Formats';
import ProblemSolution from './components/ProblemSolution';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';
import StartBookModal from './components/StartBookModal';
import LiveNotification from './components/LiveNotification';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

// Live Stripe payment links — ChaptersBook.com
const STRIPE_LINKS: Record<string, string> = {
  standard: 'https://buy.stripe.com/5kQ7sF5C4cgO7MmcYpejK0h',
  premium:  'https://buy.stripe.com/bJe00d2pS0y6giS7E5ejK0i',
};

const AppLayout: React.FC = () => {
  const { toast } = useToast();
  const [modal, setModal] = useState<{ open: boolean; mode: 'solo' | 'group' }>({ open: false, mode: 'solo' });
  const [page, setPage] = useState<'home' | 'privacy' | 'terms'>('home');

  const openSolo  = () => setModal({ open: true, mode: 'solo' });
  const openGroup = () => setModal({ open: true, mode: 'group' });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handlePricingSelect = (tier: string) => {
    if (tier === 'free') {
      toast.success("Free plan — let's create your book!");
      setTimeout(openSolo, 600);
      return;
    }
    const link = STRIPE_LINKS[tier];
    if (link && !link.includes('placeholder')) {
      window.location.href = link;
    } else {
      // Demo mode — open book creator with toast
      const name = tier.charAt(0).toUpperCase() + tier.slice(1);
      toast.success(`${name} plan selected — redirecting to checkout…`);
      setTimeout(openSolo, 800);
    }
  };

  if (page === 'privacy') return <PrivacyPolicy onClose={() => setPage('home')} />;
  if (page === 'terms')   return <TermsOfService onClose={() => setPage('home')} />;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F1B2D]">

      {/* Urgency banner (top) */}
      <UrgencyBanner />

      <Navbar onGetStarted={openSolo} />
      <Hero onStartSolo={openSolo} onStartGroup={openGroup} />

      {/* Trust & authority */}
      <PressBar />
      <SocialProofBar />

      <HowItWorks />
      <TwoModes onStartSolo={openSolo} onStartGroup={openGroup} />
      <Workflows />
      <QuestionTree />
      <ToneLengthDemo />
      <GroupTracker />

      {/* Social proof */}
      <Testimonials />

      <Formats />
      <ProblemSolution />

      {/* SEO — FAQ with JSON-LD */}
      <FAQ />

      <Dashboard onCreate={openSolo} />
      <Pricing onSelect={handlePricingSelect} />

      {/* Email capture */}
      <EmailCapture onStartBook={openSolo} />

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-[#0F1B2D] text-[#FAF7F2] relative overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4A847]/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Every story <span className="italic text-[#D4A847]">deserves</span> a beautiful book.
          </h2>
          <p className="text-lg text-[#FAF7F2]/70 mb-10 max-w-xl mx-auto">
            Start free today. Pay only when you download. Keep your story forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openSolo}
              className="px-8 py-4 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold transition-all"
              style={{ boxShadow: '0 8px 30px rgba(212,168,71,0.25)' }}
            >
              Start My Book — Free
            </button>
            <button
              onClick={openGroup}
              className="px-8 py-4 rounded-full bg-transparent border-2 border-[#FAF7F2]/30 hover:border-[#FAF7F2] text-[#FAF7F2] font-semibold transition-all"
            >
              Create a Group Book
            </button>
          </div>
          <p className="mt-6 text-sm text-[#FAF7F2]/40">ChaptersBook.com · Free to start · 30-day money-back guarantee</p>
        </div>
      </section>

      <Footer onPrivacy={() => setPage('privacy')} onTerms={() => setPage('terms')} />

      {/* Modals & notifications */}
      <StartBookModal open={modal.open} mode={modal.mode} onClose={closeModal} />
      <LiveNotification />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <ToastProvider>
    <AppLayout />
  </ToastProvider>
);
