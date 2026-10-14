import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Wand2,
  Terminal,
  Code2,
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  PlusCircle,
  BookOpen
} from 'lucide-react';
import { Problem, ProgrammingLanguage, SkillLevel } from '../types';
import { CodeBlock } from './CodeBlock';

interface ChallengeGeneratorViewProps {
  onAddGeneratedProblem: (problem: Problem) => void;
  onOpenInPlayground: (code: string, lang: ProgrammingLanguage) => void;
  selectedLanguage: ProgrammingLanguage;
}

export const ChallengeGeneratorView: React.FC<ChallengeGeneratorViewProps> = ({
  onAddGeneratedProblem,
  onOpenInPlayground,
  selectedLanguage,
}) => {
  const [language, setLanguage] = useState<ProgrammingLanguage>(selectedLanguage);
  const [topic, setTopic] = useState('Sliding Window & Subarrays');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [objective, setObjective] = useState('Campus Placement DSA Round');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState<Problem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Progressive reveal states for the generated question
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [addedToPractice, setAddedToPractice] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);
    setRevealedHints([]);
    setShowSolution(false);
    setAddedToPractice(false);

    try {
      const res = await fetch('/api/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          topic,
          difficulty,
          objective,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned error ${res.status}`);
      }

      const data = await res.json();
      if (data.id && data.title && data.problemStatement) {
        // Adapt to Problem type
        const newProb: Problem = {
          id: data.id || `gen-${Date.now()}`,
          title: data.title,
          difficulty: (data.difficulty as any) || difficulty,
          topic: data.topic || topic,
          problemStatement: data.problemStatement,
          inputFormat: data.inputFormat || 'Standard input',
          outputFormat: data.outputFormat || 'Standard output',
          constraints: data.constraints || ['1 <= N <= 10^5'],
          sampleCases: data.sampleCases || [{ input: '4', output: '2' }],
          hints: data.hints || ['Consider using a hash map or two pointers.'],
          starterCode: {
            Python: data.starterCode || '# Starter code\n',
            C: data.starterCode || '// Starter code\n',
            'C++': data.starterCode || '// Starter code\n',
            Java: data.starterCode || '// Starter code\n',
            JavaScript: data.starterCode || '// Starter code\n',
            SQL: data.starterCode || '-- Starter code\n',
          },
          solutionCode: {
            Python: data.solutionCode || '# Solution code\n',
            C: data.solutionCode || '// Solution code\n',
            'C++': data.solutionCode || '// Solution code\n',
            Java: data.solutionCode || '// Solution code\n',
            JavaScript: data.solutionCode || '// Solution code\n',
            SQL: data.solutionCode || '-- Solution code\n',
          },
          complexity: data.complexity || { time: 'O(N)', space: 'O(1)' },
          suggestedTestCases: data.suggestedTestCases || [],
          status: 'not-started',
        };
        setGeneratedProblem(newProb);
      } else {
        throw new Error('Received incomplete response from AI generator.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to generate problem.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddProblem = () => {
    if (generatedProblem) {
      onAddGeneratedProblem(generatedProblem);
      setAddedToPractice(true);
    }
  };

  const toggleHint = (idx: number) => {
    if (revealedHints.includes(idx)) {
      setRevealedHints(revealedHints.filter((i) => i !== idx));
    } else {
      setRevealedHints([...revealedHints, idx]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 rounded-xl bg-linear-to-r from-fuchsia-950/40 via-purple-950/40 to-slate-900 border border-fuchsia-900/40 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Wand2 className="w-5 h-5 text-fuchsia-400" />
          <h2 className="text-base font-semibold text-white">
            AI Coding Challenge Generator
          </h2>
        </div>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Create novel, solvable algorithmic challenges with test cases, progressive hints, and time/space complexity estimates on demand using Gemini 3.8 Flash.
        </p>
      </div>

      {/* Generator Configuration Form */}
      <form onSubmit={handleGenerate} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Challenge Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Language */}
          <div>
            <label className="text-slate-300 block mb-1 font-medium">Programming Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-purple-300 font-mono"
            >
              {['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'].map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="text-slate-300 block mb-1 font-medium">Algorithmic Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Dynamic Programming, Two Pointers, BST"
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-slate-300 block mb-1 font-medium">Difficulty Level:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Learning Objective */}
          <div>
            <label className="text-slate-300 block mb-1 font-medium">Learning Objective / Target:</label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g. CIE-3 Exam, Hackathon, Placement"
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-fuchsia-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-cyan-300" />}
            <span>{isGenerating ? 'Synthesizing Verified Problem...' : 'Generate Coding Challenge'}</span>
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
          {errorMsg}
        </div>
      )}

      {/* Generated Problem Card */}
      {generatedProblem && (
        <div className="rounded-xl bg-slate-900 border border-fuchsia-800/50 overflow-hidden shadow-2xl space-y-4 p-5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span className="font-mono text-fuchsia-400 font-semibold">{generatedProblem.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span>{generatedProblem.topic}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-400">Target: {generatedProblem.complexity.time}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {generatedProblem.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddProblem}
                disabled={addedToPractice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs transition-colors cursor-pointer"
              >
                {addedToPractice ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <PlusCircle className="w-3.5 h-3.5" />}
                <span>{addedToPractice ? 'Added to Practice List' : 'Save to Practice List'}</span>
              </button>

              <button
                onClick={() => onOpenInPlayground(generatedProblem.starterCode[language] || generatedProblem.starterCode.Python, language)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Playground</span>
              </button>
            </div>
          </div>

          {/* Statement */}
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {generatedProblem.problemStatement}
          </div>

          {/* Input & Output format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-400 block mb-1">Input Format:</span>
              <span className="text-slate-200 font-mono">{generatedProblem.inputFormat}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-400 block mb-1">Output Format:</span>
              <span className="text-slate-200 font-mono">{generatedProblem.outputFormat}</span>
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Constraints:
            </h5>
            <ul className="list-disc list-inside text-xs text-slate-300 font-mono space-y-1">
              {generatedProblem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Sample Cases */}
          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Sample Cases:
            </h5>
            <div className="space-y-2">
              {generatedProblem.sampleCases.map((sc, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Input:</span>
                      <span className="text-slate-200">{sc.input}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Output:</span>
                      <span className="text-emerald-400">{sc.output}</span>
                    </div>
                  </div>
                  {sc.explanation && (
                    <p className="mt-2 text-slate-400 text-[11px] font-sans">
                      <strong>Explanation:</strong> {sc.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progressive Hints */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Progressive Hints ({generatedProblem.hints.length})</span>
            </div>
            {generatedProblem.hints.map((hint, idx) => {
              const isRevealed = revealedHints.includes(idx);
              return (
                <div key={idx} className="rounded border border-slate-800 overflow-hidden text-xs">
                  <button
                    onClick={() => toggleHint(idx)}
                    className="w-full flex items-center justify-between p-2 bg-slate-900/60 text-slate-300 hover:bg-slate-900 transition-colors"
                  >
                    <span>Hint {idx + 1}</span>
                    <span className="text-[11px] text-slate-500">{isRevealed ? 'Hide' : 'Reveal'}</span>
                  </button>
                  {isRevealed && (
                    <div className="p-3 bg-slate-950 text-slate-300 border-t border-slate-800">
                      {hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Solution Code Toggle */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Model Solution ({language}):</span>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 text-xs text-fuchsia-400 hover:text-fuchsia-300"
              >
                {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
              </button>
            </div>
            {showSolution && (
              <CodeBlock
                code={generatedProblem.solutionCode[language] || generatedProblem.solutionCode.Python}
                language={language}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
