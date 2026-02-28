import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Code2, BookOpen, Rocket, ArrowRight, Globe, Shield, Cpu } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Globe, title: '50+ Languages', desc: 'From Python to Rust, master the world\'s most popular coding languages.' },
    { icon: Rocket, title: 'Interactive Simulator', desc: 'Learn by doing with our built-in coding environment and real-time feedback.' },
    { icon: BookOpen, title: '1000+ IT Topics', desc: 'Deep dive into hardware, networking, security, AI, and more.' },
    { icon: Shield, title: 'Step-by-Step', desc: 'Structured 100-step courses designed for beginners and pros alike.' },
  ];

  const featuredTopics = [
    'Quantum Computing', 'Neural Networks', 'Cybersecurity Essentials', 'Cloud Native Architecture'
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold"
          >
            <Cpu className="w-4 h-4" />
            <span>The Future of IT Education</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900"
          >
            Master the Digital <span className="text-indigo-600">Universe</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Join thousands of students learning IT and coding through our immersive, 
            interactive platform. 50 languages. 1000 topics. One destination.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/languages"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2"
            >
              <span>Start Coding</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/knowledge"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore IT Topics</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Topics Marquee-like */}
      <section className="space-y-6">
        <h2 className="text-center text-sm font-bold uppercase tracking-widest text-slate-400">Featured Topics</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {featuredTopics.map((topic, i) => (
            <Link
              key={i}
              to={`/knowledge/${encodeURIComponent(topic)}`}
              className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-medium hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
              <f.icon className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Simple Explanations Section */}
      <section className="bg-indigo-50 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-100 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quantum Computing</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">The Big Picture</p>
                  <p className="text-slate-600">Imagine a library where you can read every book at the exact same time, instead of one by one.</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Traditional computers use bits (0 or 1). Quantum computers use qubits, which can be both at once, allowing them to solve complex problems in seconds that would take normal computers years.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Complex Topics, <span className="text-indigo-600">Simplified</span></h2>
            <p className="text-slate-600 text-lg">
              We believe anyone can understand high-level IT concepts. Our AI-powered knowledge base breaks down complex jargon into simple analogies and clear explanations.
            </p>
            <Link
              to="/knowledge"
              className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:translate-x-1 transition-transform"
            >
              <span>Explore Knowledge Base</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to write your first line of code?</h2>
            <p className="text-slate-400 text-lg">
              Our simultaneous tutorial and simulator makes learning natural. 
              No complex setup required. Just pick a language and start building.
            </p>
            <div className="flex space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/${i}/100/100`}
                    className="w-10 h-10 rounded-full border-2 border-slate-900"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-400 flex items-center">
                Joined by 50,000+ learners
              </p>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-2">hello_world.py</span>
            </div>
            <code className="block font-mono text-indigo-400">
              print("Hello, CodeMaster!")
            </code>
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs text-slate-500 uppercase tracking-widest">Output</span>
              <p className="text-emerald-400 font-mono mt-1">Hello, CodeMaster!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
