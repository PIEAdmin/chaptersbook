import React from 'react';
import { Download, Edit, Package, Eye, Plus, Users, Feather } from 'lucide-react';

const books = [
  { title: 'For My Daughter, Eleanor', mode: 'Solo',  status: 'completed',   date: 'Mar 12, 2024', cover: 'https://d64gsuwffb70l.cloudfront.net/6a063b22925759ea0a87c270_1778793423526_70cd8c61.jpg' },
  { title: "Mrs. Thompson Tribute",    mode: 'Group', status: 'in-progress', date: 'Active · 8/20', cover: 'https://d64gsuwffb70l.cloudfront.net/6a063b22925759ea0a87c270_1778793423597_2f334091.jpg' },
  { title: 'Letter to Future Me',      mode: 'Solo',  status: 'draft',       date: 'Mar 5, 2024',  cover: 'https://d64gsuwffb70l.cloudfront.net/6a063b22925759ea0a87c270_1778793425118_adbc5454.jpg' },
  { title: "Dad's 70th Birthday",      mode: 'Group', status: 'completed',   date: 'Feb 28, 2024', cover: 'https://d64gsuwffb70l.cloudfront.net/6a063b22925759ea0a87c270_1778793428141_5a6d2867.jpg' },
];

interface DashboardProps { onCreate: () => void; }

const Dashboard: React.FC<DashboardProps> = ({ onCreate }) => (
  <section className="py-20 lg:py-28 bg-[#FAF7F2]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-sm font-semibold text-[#8B2635] uppercase tracking-[0.2em] mb-2">Your Library</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F1B2D]">My Books</h2>
        </div>
        <button onClick={onCreate} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2] font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Create New Book
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((b, i) => (
          <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-[#0F1B2D]/8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="aspect-[3/4] relative overflow-hidden bg-[#0F1B2D]">
              <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-xs font-semibold text-[#0F1B2D]">
                {b.mode === 'Solo' ? <Feather className="w-3 h-3 text-[#D4A847]" /> : <Users className="w-3 h-3 text-[#8B2635]" />}
                {b.mode}
              </div>
              <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'completed' ? 'bg-[#6B8F71] text-white' : b.status === 'in-progress' ? 'bg-[#D4A847] text-[#0F1B2D]' : 'bg-[#FAF7F2] text-[#0F1B2D]/70'}`}>
                {b.status === 'completed' ? 'Ready' : b.status === 'in-progress' ? 'In progress' : 'Draft'}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-[#0F1B2D] mb-1 line-clamp-1">{b.title}</h3>
              <p className="text-xs text-[#0F1B2D]/60 mb-4">{b.date}</p>
              <div className="flex gap-2">
                {b.status === 'completed' && (
                  <>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#D4A847] hover:bg-[#b8902f] text-[#0F1B2D] text-xs font-semibold transition-colors">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-[#FAF7F2] hover:bg-[#0F1B2D]/5 text-[#0F1B2D] transition-colors" title="Order print">
                      <Package className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                {b.status === 'in-progress' && (
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B2635] hover:bg-[#6f1d2a] text-white text-xs font-semibold transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View Contributors
                  </button>
                )}
                {b.status === 'draft' && (
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F1B2D] hover:bg-[#1a2b45] text-[#FAF7F2] text-xs font-semibold transition-colors">
                    <Edit className="w-3.5 h-3.5" /> Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Dashboard;
