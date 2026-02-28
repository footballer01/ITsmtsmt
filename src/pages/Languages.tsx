import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LANGUAGES } from '../constants';
import { Code2, Search, Filter } from 'lucide-react';

export default function Languages() {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(LANGUAGES.map(l => l.category)))];

  const filteredLanguages = LANGUAGES.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || l.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Choose Your Language</h1>
        <p className="text-slate-600">
          We offer comprehensive 100-step courses for the top 50 programming languages. 
          Pick one to start your journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLanguages.map((lang, i) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
          >
            <Link
              to={`/course/${lang.id}`}
              className="block p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all group h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <Code2 className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {lang.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{lang.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{lang.description}</p>
              <div className="mt-6 flex items-center text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Start Course</span>
                <Code2 className="ml-2 w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 italic">No languages found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
