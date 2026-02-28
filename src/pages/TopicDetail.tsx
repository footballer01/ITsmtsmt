import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Loader2, BookOpen, Share2, Bookmark } from 'lucide-react';
import Markdown from 'react-markdown';
import { explainITTopic } from '../services/gemini';

export default function TopicDetail() {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [explanation, setExplanation] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!topicName) {
      navigate('/knowledge');
      return;
    }

    const fetchExplanation = async () => {
      setLoading(true);
      try {
        const text = await explainITTopic(topicName);
        setExplanation(text);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, [topicName, navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-indigo-200 shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Knowledge Base</span>
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            <Bookmark className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            <Share2 className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-slate-500 font-medium text-lg">Consulting the digital archives...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="markdown-body"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-8 border-b border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 !mb-0">{topicName}</h1>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Verified Guide</span>
                      <span>•</span>
                      <span>3 min read</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                    Beginner Friendly
                  </span>
                </div>
              </div>
              <Markdown>{explanation || ''}</Markdown>
            </motion.div>
          )}
        </div>
      </div>

      {/* Related Topics / Footer */}
      {!loading && (
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Want to learn more?</h3>
              <p className="text-slate-400 mt-1">Explore related coding languages or deeper IT concepts.</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/languages')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all"
              >
                Start Coding
              </button>
              <button
                onClick={() => navigate('/knowledge')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                More Topics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
