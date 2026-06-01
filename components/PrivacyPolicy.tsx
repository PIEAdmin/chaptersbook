import React from 'react';

interface Props { onClose: () => void; }

export default function PrivacyPolicy({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#FAF7F2] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onClose} className="mb-8 flex items-center gap-2 text-[#0F1B2D]/50 hover:text-[#0F1B2D] transition-colors text-sm font-medium">
          ← Back to ChaptersBook.com
        </button>
        <h1 className="font-display text-4xl font-bold text-[#0F1B2D] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#0F1B2D]/50 mb-10">Last updated: May 2025 · ChaptersBook.com</p>

        {[
          {
            title: "1. Information We Collect",
            body: `We collect information you provide directly to us, such as your name, email address, and any story content you submit through our platform. We also collect usage data including pages visited, features used, and device information to improve our services.`
          },
          {
            title: "2. How We Use Your Information",
            body: `We use your information to: (a) provide, maintain, and improve ChaptersBook.com; (b) process your payments and deliver your finished books; (c) send you transactional emails such as order confirmations and download links; (d) send you marketing communications if you have opted in; (e) comply with legal obligations.`
          },
          {
            title: "3. Story Content & AI Processing",
            body: `Story content you submit is processed by our AI system solely to generate your book. We do not use your personal stories to train AI models, sell your content to third parties, or share your stories with other users. Your stories belong to you.`
          },
          {
            title: "4. Sharing Your Information",
            body: `We do not sell your personal information. We may share information with: (a) service providers who help us operate ChaptersBook.com (e.g., Stripe for payments, AWS for hosting); (b) law enforcement when required by law; (c) a successor entity in the event of a merger or acquisition.`
          },
          {
            title: "5. Cookies & Tracking",
            body: `We use cookies and similar technologies to remember your preferences, analyze site traffic, and personalize your experience. You may disable cookies in your browser settings, though some features may not function correctly without them. We use Google Analytics and may use retargeting pixels for advertising purposes.`
          },
          {
            title: "6. Data Retention",
            body: `We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by emailing privacy@chaptersbook.com. Story content is retained for 12 months after your last session unless you request earlier deletion.`
          },
          {
            title: "7. Security",
            body: `We implement industry-standard security measures including SSL/TLS encryption, encrypted storage for payment data, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
          },
          {
            title: "8. Children's Privacy",
            body: `ChaptersBook.com is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately at privacy@chaptersbook.com.`
          },
          {
            title: "9. Your Rights",
            body: `Depending on your location, you may have rights to: access, correct, or delete your personal data; opt out of marketing communications; data portability; lodge a complaint with a supervisory authority. To exercise these rights, email privacy@chaptersbook.com.`
          },
          {
            title: "10. Changes to This Policy",
            body: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice on our website. Your continued use of ChaptersBook.com after changes take effect constitutes your acceptance of the new policy.`
          },
          {
            title: "11. Contact Us",
            body: `If you have questions about this Privacy Policy, please contact us at:\n\nChaptersBook.com\nEmail: privacy@chaptersbook.com`
          }
        ].map(({ title, body }) => (
          <div key={title} className="mb-8">
            <h2 className="font-display text-xl font-semibold text-[#0F1B2D] mb-3">{title}</h2>
            <p className="text-[#0F1B2D]/70 leading-relaxed whitespace-pre-line">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
