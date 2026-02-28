import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Loader2, BookOpen, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { LANGUAGES } from '../constants';
import { generateCourseStep } from '../services/gemini';
import { Lesson } from '../types';
import Simulator from '../components/Simulator';

export default function Course() {
  const { langId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(() => {
    const saved = localStorage.getItem(`course_progress_${langId}`);
    return saved ? parseInt(saved) : 1;
  });
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [code, setCode] = React.useState('');

  const language = LANGUAGES.find(l => l.id === langId);

  React.useEffect(() => {
    if (step) {
      localStorage.setItem(`course_progress_${langId}`, step.toString());
    }
  }, [step, langId]);

  React.useEffect(() => {
    if (!language) {
      navigate('/languages');
      return;
    }

    const fetchStep = async () => {
      setLoading(true);
      try {
        const data = await generateCourseStep(language.name, step);
        setLesson(data);
        setCode(data.codeTemplate);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStep();
  }, [langId, step, language, navigate]);

  if (!language) return null;

  return (
    <div className="max-w-none min-h-[calc(100vh-12rem)] flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/languages')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">{language.name} Masterclass</h1>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>Step {step} of 100</span>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300" 
                  style={{ width: `${(step / 100) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset your progress for this course?')) {
                setStep(1);
                localStorage.removeItem(`course_progress_${langId}`);
              }
            }}
            className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Reset Progress
          </button>
          <button
            disabled={step === 1 || loading}
            onClick={() => setStep(s => s - 1)}
            className="p-2 disabled:opacity-30 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            disabled={step === 100 || loading}
            onClick={() => setStep(s => s + 1)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-500 disabled:opacity-30 transition-all"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Tutorial Content */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-900">Lesson Guide</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center space-y-4 text-slate-400"
                >
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-sm font-medium">Generating your next lesson...</p>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="markdown-body"
                >
                  <h1 className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 text-sm font-bold">
                      {step}
                    </span>
                    <span>{lesson?.title}</span>
                  </h1>
                  <Markdown>{lesson?.content}</Markdown>
                  
                  {step === 100 && (
                    <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-900">Course Completed!</h3>
                      <p className="text-emerald-700">
                        Congratulations! You've mastered the basics of {language.name}. 
                        Ready for another challenge?
                      </p>
                      <button
                        onClick={() => navigate('/languages')}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all"
                      >
                        Back to Languages
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Simulator */}
        <div className="h-full min-h-[500px]">
          <Simulator
            code={code}
            language={language.id}
            expectedOutput={lesson?.expectedOutput}
            onCodeChange={setCode}
          />
        </div>
      </div>
    </div>
  );
}
