import React from 'react';

const occasions = [
  {
    emoji: '🎓',
    title: 'Retirement',
    desc: 'Honor a career full of impact with a tribute that will be treasured forever.',
    example: '"A Legend in Every Chapter"',
    color: '#D4A847',
  },
  {
    emoji: '🍼',
    title: 'Baby Shower',
    desc: 'A heartfelt story written before the baby arrives — a gift unlike any other.',
    example: '"Before You Were Born"',
    color: '#8B2635',
  },
  {
    emoji: '🤰',
    title: 'Pregnancy Journey',
    desc: 'Capture the anticipation, the love, and every emotion of the wait.',
    example: '"The Story of How We Waited for You"',
    color: '#6B8F71',
  },
  {
    emoji: '⛪',
    title: "Pastor's Anniversary",
    desc: 'Let the congregation share their stories of faith, impact and gratitude.',
    example: '"The Shepherd Who Changed Our Lives"',
    color: '#D4A847',
  },
  {
    emoji: '🎂',
    title: 'Birthday Milestone',
    desc: 'From 1st birthdays to 100th — every year of life deserves a story.',
    example: '"50 Years of [Name]: An Adventure Story"',
    color: '#8B2635',
  },
  {
    emoji: '💍',
    title: 'Wedding Gift',
    desc: 'Tell the love story of two people — from meeting to forever.',
    example: '"How Two Stories Became One"',
    color: '#6B8F71',
  },
  {
    emoji: '🏆',
    title: 'Work Anniversary',
    desc: 'Celebrate loyalty, growth and all the memories made at work.',
    example: '"10 Years of [Name]: A Workplace Legend"',
    color: '#D4A847',
  },
  {
    emoji: '🧓',
    title: 'Family History',
    desc: 'Preserve grandparents\' stories before they fade — for generations to come.',
    example: '"Grandma\'s Big Adventure Book"',
    color: '#8B2635',
  },
  {
    emoji: '📚',
    title: 'School & Faculty',
    desc: 'Yearbook tributes, teacher appreciations, student achievement books.',
    example: '"Class of 2025: Our Year in Stories"',
    color: '#6B8F71',
  },
  {
    emoji: '🏢',
    title: 'Corporate Gift',
    desc: 'Employee of the month, team milestones, and onboarding welcome books.',
    example: '"Welcome to the Team, [Name]"',
    color: '#D4A847',
  },
  {
    emoji: '🕊️',
    title: 'Memorial Tribute',
    desc: 'Honor a life lived fully with stories gathered from everyone who loved them.',
    example: '"The Life of [Name]: A Story Worth Telling"',
    color: '#8B2635',
  },
  {
    emoji: '🎄',
    title: 'Holiday Gift',
    desc: 'The most personal gift under the tree — a book that\'s only about them.',
    example: '"A Family Christmas Story, 2025"',
    color: '#6B8F71',
  },
];

const Occasions: React.FC = () => (
  <section id="occasions" className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Every Milestone</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
          A book for every <span className="italic">moment that matters</span>
        </h2>
        <p className="mt-5 text-lg text-[#0F1B2D]/70">
          Chapters isn't just for children's stories. It's for retirement parties, baby showers, church anniversaries, corporate milestones — any occasion that deserves a story.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {occasions.map((o, i) => (
          <div
            key={i}
            className="group bg-[#FAF7F2] rounded-2xl p-6 border border-[#0F1B2D]/8 hover:border-[#D4A847]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{o.emoji}</div>
            <h3 className="font-display text-lg font-bold text-[#0F1B2D] mb-2">{o.title}</h3>
            <p className="text-sm text-[#0F1B2D]/60 leading-relaxed mb-4">{o.desc}</p>
            <div
              className="text-xs font-medium italic px-3 py-2 rounded-lg"
              style={{ backgroundColor: `${o.color}12`, color: o.color }}
            >
              {o.example}
            </div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="mt-14 text-center">
        <p className="text-[#0F1B2D]/50 text-sm mb-4">Don't see your occasion? Chapters works for any story.</p>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] font-semibold text-base shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Start Any Book — Free
        </a>
      </div>
    </div>
  </section>
);

export default Occasions;
