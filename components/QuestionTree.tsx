import React, { useState } from 'react';
import { Baby, Heart, Clock, GraduationCap, Users, MessageSquare } from 'lucide-react';

const trees = {
  child: {
    label: 'For a Child', icon: Baby, color: '#D4A847',
    questions: [
      'What is the most important lesson you want them to know?',
      'Describe the moment you first held them',
      'What dreams do you have for their future?',
      'What family traditions do you hope they carry on?',
      'What makes you most proud of them?',
      'Tell a funny memory that captures their personality',
      'What do you want them to know about your own childhood?',
      'What advice would you give them for hard days?',
    ],
  },
  grandchild: {
    label: 'For a Grandchild', icon: Heart, color: '#8B2635',
    questions: [
      'What was life like when you were their age?',
      'What is the greatest adventure of your life?',
      'Describe your parents and grandparents',
      'What values have shaped who you are?',
      'What is the funniest family story you remember?',
    ],
  },
  future: {
    label: 'For Future Self', icon: Clock, color: '#6B8F71',
    questions: [
      'What is your biggest goal right now?',
      'What are you most afraid of?',
      'What brings you the most joy today?',
      'Who are the most important people in your life?',
      'What do you hope has changed in 10 years?',
    ],
  },
  teacher: {
    label: 'For a Teacher', icon: GraduationCap, color: '#0F1B2D',
    questions: [
      'What teaching moment changed you forever?',
      'Describe a student who inspired you',
      'What do you wish students knew about teachers?',
      'What advice would you give a first-year teacher?',
    ],
  },
  group: {
    label: 'Group Mode (Universal)', icon: Users, color: '#8B2635',
    questions: [
      'How long have you known [recipient name]?',
      'Share your favorite memory with [name]',
      "What's one word that describes [name]?",
      'What has [name] taught you?',
      'What do you admire most about [name]?',
      "Finish this sentence: '[Name] always...'",
      'What will you miss most about working/being with [name]?',
      'What do you wish for [name] in this next chapter?',
    ],
  },
} as const;

type TreeKey = keyof typeof trees;

const QuestionTree: React.FC = () => {
  const [active, setActive] = useState<TreeKey>('child');
  const tree = trees[active];
  const Icon = tree.icon;

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-3">Question Library</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D] leading-tight">
            The <span className="italic">right questions</span>, always
          </h2>
          <p className="mt-5 text-lg text-[#0F1B2D]/70">
            Our AI selects from hundreds of curated prompts — tailored to your recipient.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2">
            {(Object.keys(trees) as TreeKey[]).map(key => {
              const t = trees[key];
              const TabIcon = t.icon;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all border-2 ${isActive ? 'bg-white border-[#0F1B2D]/15 shadow-md' : 'bg-transparent border-transparent hover:bg-white/60'}`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${t.color}18` }}>
                    <TabIcon className="w-5 h-5" style={{ color: t.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#0F1B2D]">{t.label}</div>
                    <div className="text-xs text-[#0F1B2D]/60">{t.questions.length} sample questions</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-10 border border-[#0F1B2D]/8 book-shadow">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#0F1B2D]/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tree.color}18` }}>
                <Icon className="w-6 h-6" style={{ color: tree.color }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#0F1B2D]/50">Question Tree</div>
                <h3 className="font-display text-2xl font-bold text-[#0F1B2D]">{tree.label}</h3>
              </div>
            </div>

            <div className="space-y-3">
              {tree.questions.map((q, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-default">
                  <div className="font-display font-bold text-2xl w-8 flex-shrink-0" style={{ color: tree.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[#0F1B2D] font-medium italic font-display text-lg leading-snug">"{q}"</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#0F1B2D]/10 flex items-center gap-2 text-sm text-[#0F1B2D]/60">
              <MessageSquare className="w-4 h-4" />
              AI dynamically expands these based on your answers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionTree;
