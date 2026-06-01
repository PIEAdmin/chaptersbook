import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem { q: string; a: string; }

const faqs: FAQItem[] = [
  {
    q: "What kinds of books can I create with Chapters?",
    a: "Chapters is built for any life milestone — retirement tributes, baby shower gifts, pregnancy journey books, pastor's anniversaries, work anniversaries, birthdays, memorial tributes, family histories, school yearbooks, corporate onboarding books, and more. If it's a moment worth remembering, Chapters can help you tell that story.",
  },
  {
    q: "Can I upload a draft I already wrote?",
    a: "Yes! The Upload & Polish plan is made exactly for this. Upload your Word doc, Google Doc, PDF, or plain text. Our AI reads your draft, polishes the prose, organises it into chapters, applies beautiful formatting, and delivers a professional-quality book — all while keeping your words and voice intact.",
  },
  {
    q: "How does the AI writing work?",
    a: "You answer a set of guided questions tailored to your occasion and recipient. The AI uses your answers to ghostwrite a full, print-ready narrative in under 90 seconds. Every book is uniquely personalised — it reads like a real book written by someone who knows the person deeply.",
  },
  {
    q: "Can multiple people contribute stories to one book?",
    a: "Yes — Group Mode lets you invite contributors via email. Each person answers their own guided questions or shares their memories. The AI weaves all contributions into one cohesive narrative with named chapters. Perfect for retirement parties, pastor's anniversaries, memorial books, and class yearbooks.",
  },
  {
    q: "What is the Teams & Enterprise plan for?",
    a: "Companies, schools, and churches use Chapters for bulk book creation. Think: employee of the month tributes, staff retirement books, faculty appreciation gifts, student achievement stories, new hire welcome books, and annual class memory books. The Teams plan includes an admin dashboard, branded templates, shared workspace, and dedicated support. Custom invoicing is available.",
  },
  {
    q: "What formats will I receive?",
    a: "All plans include PDF download. Family and Annual plans add Word (.docx), ePub, and print-ready bleed margin files. Annual plan includes KDP export for Amazon self-publishing. Teams plan includes custom branded exports.",
  },
  {
    q: "Can I edit the book after generation?",
    a: "Absolutely. You get a full inline editor — chapter by chapter, sentence by sentence. Rewrite sections, adjust the tone, add photos, or leave it as-is. The AI draft is your starting point, not your ceiling.",
  },
  {
    q: "How long does it take?",
    a: "The question flow takes most people 5–10 minutes. AI generates the full manuscript in under 90 seconds. From first click to downloadable PDF — typically under 15 minutes. Upload & Polish is slightly longer (3–5 min) depending on document length.",
  },
  {
    q: "Is my story private?",
    a: "Yes. Your answers and generated books are private to your account. We do not use your personal stories to train AI models, and we never share your data with third parties. You own your story — completely.",
  },
  {
    q: "Is there a free option?",
    a: "Yes! The Single Book plan is just $9.99 one-time — and you can preview your AI-generated story before purchasing. Upload & Polish is $14.99 one-time. For unlimited creation, the Family Monthly plan is $12.99/month or $79/year.",
  },
  {
    q: "Can I order a physical printed book?",
    a: "Yes. Chapters integrates with print-on-demand partners so you can order a real hardcover or softcover. Premium and Annual plans include print-ready bleed margins, making your book press-ready. Delivery times vary by printer.",
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
            Everything you need to know about creating meaningful books on ChaptersBook.com
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
                <ChevronDown className={`w-5 h-5 flex-shrink-0 mt-0.5 text-[#0F1B2D]/50 transition-transform ${open === i ? 'rotate-180' : ''}`} />
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
