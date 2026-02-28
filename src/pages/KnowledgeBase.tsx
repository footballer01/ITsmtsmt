import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Loader2, Cpu, Globe, Shield, Database, Cloud, Network, ArrowRight } from 'lucide-react';
import { searchTopics } from '../services/gemini';
import { IT_CATEGORIES } from '../constants';

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await searchTopics(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (title: string) => {
    navigate(`/knowledge/${encodeURIComponent(title)}`);
  };

  const categoryIcons: Record<string, any> = {
    'Hardware': Cpu,
    'Networking': Network,
    'Security': Shield,
    'Cloud Computing': Cloud,
    'Databases': Database,
    'Web Technologies': Globe,
    'AI & Machine Learning': Cpu,
    'Software Engineering': BookOpen,
    'Data Science': Database,
    'DevOps': Cloud,
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">IT Knowledge Base</h1>
        <p className="text-slate-600">
          Explore over 1000 topics across the entire IT landscape. 
          Search for anything from "How a CPU works" to "Blockchain fundamentals".
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Search topics (e.g., 'Virtualization', 'TCP/IP', 'Neural Networks')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-14 pr-32 py-4 bg-white border border-slate-200 rounded-[2rem] shadow-lg shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-[1.5rem] font-bold hover:bg-indigo-500 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
        </button>
      </form>

      <div className="space-y-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleTopicClick(r.title)}
                className="group text-left p-6 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 transition-all flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    {r.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{r.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">{r.summary}</p>
                <div className="flex items-center text-indigo-600 text-sm font-bold">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 text-center">Popular Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {IT_CATEGORIES.map((cat, i) => {
                const Icon = categoryIcons[cat] || BookOpen;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(cat);
                      handleSearch();
                    }}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <span className="font-bold text-slate-700 text-center text-sm group-hover:text-indigo-600 transition-colors">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
