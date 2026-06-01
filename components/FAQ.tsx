import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How do I create a personalized story book with AI?",
    a: "Just click 'Start My Book', choose your recipient (a child, grandchild, teacher, or future self), and answer a few guided questions about your story. ChaptersBook's AI ghostwriter crafts a full, print-ready narrative in under 90 seconds — no writing skills needed.",
  },
  {
    q: "Can multiple people contribute to one book?",
    a: "Yes — that's exactly what Group Mode is for. You create a book, invite contributors via email, and each person answers their own set of questions. The AI weaves all contributions into a single cohesive narrative with chapters. Perfect for retirement gifts, class memory books, and family histories.",
  },
  {
    q: "What makes ChaptersBook different from other book creators?",
    a: "Most tools give you a blank canvas and a template. Chapters gives you an AI co-author. Instead of figuring out what to write, you answer thoughtful, story-specific questions — and Chapters writes the book for you. The result reads like a real book, not a fill-in-the-blank card.",
  },
  {
    q: "What file formats will I get?",
    a: "Depending on your plan, you'll receive a PDF (all plans), a Microsoft Word .docx for editing (Standard+), or a KDP-ready .epub/.mobi and print-ready files with bleed margins (Premium). We also integrate with print-on-demand partners so you can order a physical hardcover or softcover.",
  },
  {
    q: "Can I edit the book after the AI generates it?",
    a: "Absolutely. After generation you get a full inline editor — chapter by chapter, sentence by sentence. You can rewrite, add sections, change the tone, or simply leave it as-is. The AI draft is your starting point, not your ceiling.",
  },
  {
    q: "Is my story private and secure?",
    a: "Yes. Your answers and the generated book are private to your account. We don't use your personal stories to train AI models, and we never share your data with third parties. You own your story — completely.",
  },
  {
    q: "How long does it take to make a book?",
    a: "Most people complete the question flow in 5–10 minutes. The AI generates the full manuscript in under 90 seconds. From first click to downloadable PDF, you're typically done in under 15 minutes.",
  },
  {
    q: "What's the best gift book to create for a child?",
    a: "The most popular options are 'A book about the year you were born', 'A letter to my child about our first year together', and 'Stories from grandma/grandpa'. Our Solo Mode walks you through any of these with age-appropriate question prompts.",
  },
  {
    q: "Do I need to write anything myself?",
    a: "No writing required. You answer questions — some are one sentence, others invite a short paragraph. The AI handles all the prose. If you enjoy writing, you can edit the output; if not, you don't have to touch a word.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! You can create a full Solo Mode book up to 10 pages and download a PDF for free — no credit card required. Upgrade to Standard ($9.99/book) or Premium ($24.99/book) for longer books, Group Mode, and print-ready formats.",
  },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(o => o === i ? null : i);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Questions, <span className="italic">answered.</span>
          </h2>
          <p className="mt-4 text-lg text-[#0F1B2D]/60">
            Everything you need to know about creating your book on ChaptersBook.com
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all ${open === i ? 'border-[#D4A847]/40 bg-[#0F1B2D]/5' : 'border-[#0F1B2D]/10 bg-white hover:border-[#0F1B2D]/20'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                onClick={() => toggle(i)}
              >
                <span className="font-semibold text-[#0F1B2D] text-base leading-snug">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 text-[#0F1B2D]/50 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-[#0F1B2D]/70 leading-relaxed text-sm md:text-base">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-[#0F1B2D]/50">
          Still have questions?{' '}
          <a href="mailto:hello@chaptersbook.com" className="text-[#D4A847] hover:underline font-medium">
            Email us at hello@chaptersbook.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
