import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
// Import core and common languages in specific order to avoid 'tokenizePlaceholders' errors
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import { Play, RotateCcw, CheckCircle2, Copy, Check } from 'lucide-react';

interface SimulatorProps {
  code: string;
  language: string;
  expectedOutput?: string;
  onCodeChange: (code: string) => void;
}

export default function Simulator({ code, language, expectedOutput, onCodeChange }: SimulatorProps) {
  const [output, setOutput] = React.useState<string>('');
  const [isRunning, setIsRunning] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const runCode = () => {
    setIsRunning(true);
    setIsSuccess(false);
    
    // Simulate code execution
    setTimeout(() => {
      let result = '';
      const lowerCode = code.toLowerCase();
      
      // Enhanced mock execution logic
      if (lowerCode.includes('print') || lowerCode.includes('console.log') || lowerCode.includes('echo') || lowerCode.includes('puts')) {
        const match = code.match(/(?:print|console\.log|echo|puts)\s*\(?["'](.*?)["']\)?/);
        result = match ? match[1] : 'Code executed. (Output captured)';
      } else if (lowerCode.includes('select') && lowerCode.includes('from')) {
        result = 'Query executed. 5 rows returned.';
      } else if (lowerCode.includes('<html>')) {
        result = 'HTML Rendered successfully.';
      } else {
        result = 'Program finished with exit code 0.';
      }

      setOutput(result);
      setIsRunning(false);

      if (expectedOutput && result.toLowerCase().includes(expectedOutput.toLowerCase())) {
        setIsSuccess(true);
      }
    }, 800);
  };

  const resetCode = () => {
    setOutput('');
    setIsSuccess(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map our language IDs to Prism languages safely
  const getPrismLanguage = (lang: string) => {
    const l = lang.toLowerCase();
    
    const map: Record<string, any> = {
      javascript: Prism.languages.javascript,
      js: Prism.languages.javascript,
      typescript: Prism.languages.typescript || Prism.languages.javascript,
      ts: Prism.languages.typescript || Prism.languages.javascript,
      python: Prism.languages.python,
      py: Prism.languages.python,
      html: Prism.languages.markup,
      xml: Prism.languages.markup,
      css: Prism.languages.css,
      cpp: Prism.languages.cpp,
      c: Prism.languages.c,
      java: Prism.languages.java,
      sql: Prism.languages.sql,
      csharp: Prism.languages.csharp,
      cs: Prism.languages.csharp,
      php: Prism.languages.php,
      ruby: Prism.languages.ruby,
      rb: Prism.languages.ruby,
      swift: Prism.languages.swift,
      go: Prism.languages.go,
      rust: Prism.languages.rust,
      bash: Prism.languages.bash,
      shell: Prism.languages.bash,
      json: Prism.languages.json,
    };
    
    // Fallback chain
    return map[l] || Prism.languages[l] || Prism.languages.javascript || Prism.languages.clike || Prism.languages.markup;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-xs font-mono text-slate-400 uppercase tracking-widest">{language} Simulator</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              isRunning ? 'bg-slate-700 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative overflow-auto min-h-[300px]">
        <Editor
          value={code}
          onValueChange={onCodeChange}
          highlight={(code) => {
            const grammar = getPrismLanguage(language);
            // Final safety check: if grammar is still not an object, return plain text
            if (!grammar || typeof grammar !== 'object') return code;
            try {
              return Prism.highlight(code, grammar, language);
            } catch (e) {
              return code;
            }
          }}
          padding={20}
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            minHeight: '100%',
            backgroundColor: 'transparent',
            color: '#e2e8f0',
          }}
          className="simulator-editor"
        />
      </div>

      {/* Output Area */}
      <div className="h-32 bg-slate-950 border-t border-slate-800 p-4 font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Output</span>
          {isSuccess && (
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>STEP COMPLETE</span>
            </div>
          )}
        </div>
        <div className={`whitespace-pre-wrap ${isSuccess ? 'text-emerald-400' : 'text-slate-300'}`}>
          {output || <span className="text-slate-600 italic">No output yet. Run your code to see results.</span>}
        </div>
      </div>
    </div>
  );
}
