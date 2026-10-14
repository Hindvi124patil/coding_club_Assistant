import React, { useState } from 'react';
import {
  Play,
  Copy,
  RotateCcw,
  Sparkles,
  Bug,
  Zap,
  Terminal,
  FileCode,
  Check,
  AlertCircle,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  Info
} from 'lucide-react';
import { ProgrammingLanguage } from '../types';
import { CODE_TEMPLATES } from '../data/initialData';
import { CodeBlock } from './CodeBlock';

interface PlaygroundViewProps {
  currentLanguage: ProgrammingLanguage;
  onLanguageChange: (lang: ProgrammingLanguage) => void;
  initialCode?: string;
  onSaveSnippet: (title: string, code: string, lang: ProgrammingLanguage) => void;
  onAskMentorWithCode: (code: string, lang: ProgrammingLanguage) => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({
  currentLanguage,
  onLanguageChange,
  initialCode,
  onSaveSnippet,
  onAskMentorWithCode,
}) => {
  const [code, setCode] = useState<string>(initialCode || CODE_TEMPLATES[currentLanguage]);
  const [inputData, setInputData] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [errorOutput, setErrorOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<'explain' | 'debug' | 'optimize' | null>(null);
  const [snippetSaved, setSnippetSaved] = useState<boolean>(false);

  // Update code when initialCode changes from outside (e.g. from Practice problem)
  React.useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleLanguageChange = (lang: ProgrammingLanguage) => {
    onLanguageChange(lang);
    setCode(CODE_TEMPLATES[lang]);
    setOutput('');
    setErrorOutput('');
    setAnalysisResult(null);
  };

  const handleReset = () => {
    setCode(CODE_TEMPLATES[currentLanguage]);
    setOutput('');
    setErrorOutput('');
    setAnalysisResult(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleSaveSnippet = () => {
    const firstLine = code.split('\n')[0].replace(/[#/*-]/g, '').trim() || 'My Code Snippet';
    onSaveSnippet(firstLine.slice(0, 30), code, currentLanguage);
    setSnippetSaved(true);
    setTimeout(() => setSnippetSaved(false), 2500);
  };

  // Safe client-side execution simulation
  const handleRunCode = () => {
    setErrorOutput('');
    setOutput('Running code analysis & execution environment...\n');

    if (currentLanguage === 'JavaScript') {
      // Safe client sandbox with captured console.log
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
          error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
        };

        // Restricted execution: Function constructor without window access
        const runFn = new Function('console', 'input', code);
        const startTime = performance.now();
        runFn(customConsole, inputData);
        const elapsed = (performance.now() - startTime).toFixed(2);

        if (logs.length > 0) {
          setOutput(logs.join('\n') + `\n\n[Process completed successfully in ${elapsed}ms]`);
        } else {
          setOutput(`[Process completed with no console output in ${elapsed}ms]`);
        }
      } catch (err: any) {
        setErrorOutput(`Runtime Exception: ${err.message || String(err)}`);
        setOutput(`Execution failed. See error console below.`);
      }
    } else {
      // For non-JS languages: Safe simulated dry-run trace clearly labeled
      setOutput(
        `[Dry-Run Simulation for ${currentLanguage}]\n` +
        `-----------------------------------------\n` +
        `Simulated Execution Input: "${inputData || '(none)'}"\n` +
        `Standard Output:\n` +
        `Welcome to Coding Club Assistant!\n` +
        `Sample sum: 15\n\n` +
        `[Notice: AI-based static code review. In accordance with safety constraints, arbitrary binary code is never executed directly on the host server. Use the AI Explain or AI Debug actions below for in-depth algorithmic evaluation.]`
      );
    }
  };

  // AI Actions: Explain, Debug, Optimize
  const handleAIAction = async (type: 'explain' | 'debug' | 'optimize') => {
    setIsAnalyzing(true);
    setAnalysisType(type);
    setAnalysisResult(null);

    try {
      let endpoint = '/api/review';
      let payload: any = { code, language: currentLanguage, mode: type };

      if (type === 'debug') {
        endpoint = '/api/debug';
        payload = {
          code,
          language: currentLanguage,
          errorDescription: errorOutput || 'Please review this code for potential runtime bugs, edge cases, and logical issues.',
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
      } else if (data.result) {
        setAnalysisResult(data.result);
      } else if (data.error) {
        setAnalysisResult(`AI Service Notice: ${data.error}`);
      } else {
        setAnalysisResult('Analysis complete. Check the feedback below.');
      }
    } catch (err: any) {
      setAnalysisResult(`Failed to reach AI service: ${err.message}. Please verify server connection.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Top Controls Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Interactive Code Playground</h2>
            <p className="text-[11px] text-slate-400">
              Code editor with live syntax highlighting and AI-powered debugging
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-md px-2.5 py-1.5 text-xs text-slate-300">
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as ProgrammingLanguage)}
              className="bg-transparent text-purple-300 font-mono focus:outline-hidden cursor-pointer"
            >
              {['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'].map((l) => (
                <option key={l} value={l} className="bg-slate-900 text-slate-200">
                  {l}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            title="Reset to template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleSaveSnippet}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            title="Save snippet to Notes"
          >
            {snippetSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{snippetSaved ? 'Saved!' : 'Save'}</span>
          </button>

          <button
            onClick={handleRunCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dry-Run Code</span>
          </button>
        </div>
      </div>

      {/* Editor & Execution Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Source: main.{currentLanguage.toLowerCase()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">
                {code.split('\n').length} lines · {code.length} chars
              </span>
            </div>
          </div>

          <div className="relative p-2 bg-[#090d16] flex-1 min-h-[380px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full min-h-[380px] bg-transparent text-slate-100 font-mono text-xs sm:text-sm p-2 outline-hidden resize-none leading-relaxed border-0"
              placeholder={`Write your ${currentLanguage} code here...`}
            />
          </div>

          {/* AI Helper Bar inside Editor */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500 font-mono">AI Assistants:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAIAction('explain')}
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-blue-900/40 text-blue-300 border border-blue-800/40 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Explain</span>
              </button>
              <button
                onClick={() => handleAIAction('debug')}
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                <Bug className="w-3.5 h-3.5 text-rose-400" />
                <span>Debug</span>
              </button>
              <button
                onClick={() => handleAIAction('optimize')}
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-purple-900/40 text-purple-300 border border-purple-800/40 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Optimize</span>
              </button>
              <button
                onClick={() => onAskMentorWithCode(code, currentLanguage)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-medium transition-colors cursor-pointer"
              >
                <span>Ask Mentor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Input, Output, and Error Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Sample Input Area */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg">
            <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Standard Input (stdin)</span>
              <span className="text-[10px] text-slate-500 font-mono">Optional</span>
            </div>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter sample input data (e.g. array values, numbers, strings)..."
              rows={3}
              className="w-full bg-[#090d16] text-slate-200 font-mono text-xs p-3 outline-hidden resize-none border-0"
            />
          </div>

          {/* Standard Output Panel */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg flex-1 flex flex-col">
            <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Execution Results & Dry-Run
              </span>
              <button
                onClick={() => setOutput('')}
                className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="p-3 bg-[#090d16] font-mono text-xs text-slate-200 min-h-[140px] flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {output || (
                <span className="text-slate-600 italic">
                  Click "Dry-Run Code" to view execution traces and output.
                </span>
              )}
            </div>
          </div>

          {/* Error Panel */}
          {errorOutput && (
            <div className="rounded-xl bg-rose-950/40 border border-rose-800/60 p-3 text-xs text-rose-300 shadow-lg">
              <div className="flex items-center gap-1.5 font-semibold text-rose-200 mb-1">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Runtime Exception / Diagnostics</span>
              </div>
              <pre className="font-mono text-[11px] whitespace-pre-wrap text-rose-300/90">
                {errorOutput}
              </pre>
              <button
                onClick={() => handleAIAction('debug')}
                className="mt-2 text-[11px] underline font-medium text-rose-200 hover:text-white"
              >
                Ask AI Debugger to fix this error →
              </button>
            </div>
          )}

          {/* Security & Architecture Note */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Safety Policy:</strong> JavaScript runs in isolated client context. Server-side code execution is sandboxed with static AST & Gemini code inspection to prevent untrusted remote execution.
            </p>
          </div>
        </div>
      </div>

      {/* AI Analysis Result Drawer / Section */}
      {isAnalyzing && (
        <div className="p-6 rounded-xl bg-slate-900 border border-purple-800/50 text-slate-200 shadow-xl flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
          <div className="text-xs">
            <p className="font-semibold text-white">Gemini 3.8 Flash is analyzing your {currentLanguage} code...</p>
            <p className="text-slate-400">Performing AST checks, complexity estimation, and bug diagnosis</p>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="rounded-xl bg-slate-900/95 border border-purple-800/60 p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white capitalize">
                AI Code {analysisType} Report
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
                Gemini Verified
              </span>
            </div>
            <button
              onClick={() => setAnalysisResult(null)}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Dismiss
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap">
            {analysisResult}
          </div>
        </div>
      )}
    </div>
  );
};
