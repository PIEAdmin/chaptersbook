import { useEffect } from 'react';

export default function SEOMeta() {
  useEffect(() => {
    // Title
    document.title = 'ChaptersBook.com — Turn Your Stories Into Beautiful AI-Powered Books';

    const setMeta = (name: string, content: string, prop?: boolean) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Core SEO
    setMeta('description', 'ChaptersBook.com — The easiest way to create personalized story books with AI. Write solo or invite your whole family. Instant download as PDF, Word, or print-ready format. Start free today.');
    setMeta('keywords', 'AI story book creator, personalized book maker, family memory book, group story book, AI ghostwriter, custom children\'s book, memoir creator, gift book maker, ChaptersBook');
    setMeta('robots', 'index, follow');
    setMeta('author', 'ChaptersBook.com');

    // Open Graph (Facebook, LinkedIn, iMessage, etc.)
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://chaptersbook.com', true);
    setMeta('og:title', 'ChaptersBook.com — Your Story. Beautifully Written.', true);
    setMeta('og:description', 'Turn your memories into a beautiful, AI-powered book in minutes. Solo or with your whole family. Start free.', true);
    setMeta('og:image', 'https://chaptersbook.com/og-image.png', true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:site_name', 'ChaptersBook', true);
    setMeta('og:locale', 'en_US', true);

    // Twitter / X Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@ChaptersBook');
    setMeta('twitter:creator', '@ChaptersBook');
    setMeta('twitter:title', 'ChaptersBook.com — Your Story. Beautifully Written.');
    setMeta('twitter:description', 'AI-powered personalized books. Write solo or invite your family. Start free — pay only when you download.');
    setMeta('twitter:image', 'https://chaptersbook.com/og-image.png');

    // Canonical
    setLink('canonical', 'https://chaptersbook.com');

    // Structured Data (JSON-LD)
    const existing = document.getElementById('chapters-jsonld');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'chapters-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://chaptersbook.com/#website",
          "url": "https://chaptersbook.com",
          "name": "ChaptersBook",
          "description": "AI-powered personalized story book creator",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://chaptersbook.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://chaptersbook.com/#organization",
          "name": "ChaptersBook",
          "url": "https://chaptersbook.com",
          "logo": "https://chaptersbook.com/logo.png",
          "sameAs": [
            "https://twitter.com/ChaptersBook",
            "https://instagram.com/ChaptersBook",
            "https://www.facebook.com/ChaptersBook"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@chaptersbook.com"
          }
        },
        {
          "@type": "SoftwareApplication",
          "name": "ChaptersBook",
          "operatingSystem": "Web, iOS, Android",
          "applicationCategory": "LifestyleApplication",
          "offers": [
            {
              "@type": "Offer",
              "name": "Free",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Create and preview your book for free"
            },
            {
              "@type": "Offer",
              "name": "Standard",
              "price": "19",
              "priceCurrency": "USD",
              "description": "Download your finished book as PDF or Word"
            },
            {
              "@type": "Offer",
              "name": "Premium",
              "price": "39",
              "priceCurrency": "USD",
              "description": "Full manuscript with unlimited edits and print-ready KDP format"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2847"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does ChaptersBook work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You answer a short series of AI-guided questions about your story. Our AI then ghost-writes a complete, beautifully structured book from your answers. You edit it, then download it as a PDF, Word doc, or print-ready file."
              }
            },
            {
              "@type": "Question",
              "name": "Is ChaptersBook free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Creating and previewing your book is completely free. You only pay ($19 Standard or $39 Premium) when you're ready to download your finished book."
              }
            },
            {
              "@type": "Question",
              "name": "Can multiple people contribute to one book?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Our Group Mode lets you invite family members, friends, or colleagues to submit their own stories, memories, and messages. The AI weaves them into a single beautifully formatted book."
              }
            },
            {
              "@type": "Question",
              "name": "What formats can I download my book in?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ChaptersBook supports PDF, Microsoft Word (.docx), KDP (Amazon Kindle Direct Publishing print format), and print-ready PDFs for professional printing."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
  }, []);

  return null;
}
