import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  Clock,
  Circle,
  Search,
  Sparkles,
  Terminal,
  ChevronRight,
  Eye,
  EyeOff,
  Lightbulb,
  ExternalLink,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import { Problem, ProblemDifficulty, ProblemStatus, ProgrammingLanguage } from '../types';
import { CodeBlock } from './CodeBlock';

interface PracticeViewProps {
  problems: Problem[];
  onUpdateProblemStatus: (problemId: string, status: ProblemStatus) => void;
  onOpenInPlayground: (code: string, lang: ProgrammingLanguage) => void;
  onAskMentor: (prompt: string) => void;
  selectedLanguage: ProgrammingLanguage;
  activeProblemId?: string | null;
  onClearActiveProblemId?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  problems,
  onUpdateProblemStatus,
  onOpenInPlayground,
  onAskMentor,
  selectedLanguage,
  activeProblemId,
  onClearActiveProblemId,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | ProblemDifficulty>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProblemStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(() => {
    if (activeProblemId) {
      return problems.find((p) => p.id === activeProblemId) || problems[0];
    }
    return problems[0] || null;
  });

  // Hints progressive reveal state
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  // Solution code reveal state
  const [showSolution, setShowSolution] = useState(false);
  // Language for the problem viewer
  const [problemLang, setProblemLang] = useState<ProgrammingLanguage>(selectedLanguage);

  // Sync if activeProblemId changes from outside
  React.useEffect(() => {
    if (activeProblemId) {
      const found = problems.find((p) => p.id === activeProblemId);
      if (found) {
        setSelectedProblem(found);
        setRevealedHints([]);
        setShowSolution(false);
      }
      if (onClearActiveProblemId) onClearActiveProblemId();
    }
  }, [activeProblemId, problems, onClearActiveProblemId]);

  const filteredProblems = problems.filter((prob) => {
    const matchesDiff = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'All' || prob.status === selectedStatus;
    const matchesSearch =
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesStatus && matchesSearch;
  });

  const handleSelectProblem = (prob: Problem) => {
    setSelectedProblem(prob);
    setRevealedHints([]);
    setShowSolution(false);
  };

  const handleToggleHint = (index: number) => {
    if (revealedHints.includes(index)) {
      setRevealedHints(revealedHints.filter((i) => i !== index));
    } else {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const getStatusIcon = (status: ProblemStatus) => {
    switch (status) {
      case 'solved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'attempted':
        return <Clock className="w-4 h-4 text-blue-400" />;
      default:
        return <Circle className="w-4 h-4 text-slate-600" />;
    }
  };

  const getDifficultyColor = (diff: ProblemDifficulty) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400';
      case 'Intermediate':
        return 'text-blue-400';
      case 'Advanced':
        return 'text-purple-400';
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Search and Filters Header */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>Coding Practice Module</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              (15 Core College Problems)
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Algorithmic challenges with progressive hints, solution walkthroughs, and Big-O breakdown
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems or topics..."
              className="bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-purple-500 w-44 sm:w-56"
            />
          </div>

          {/* Difficulty Segmented Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-md">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-transparent text-slate-300 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Status</option>
              <option value="solved" className="bg-slate-900">Solved</option>
              <option value="attempted" className="bg-slate-900">Attempted</option>
              <option value="not-started" className="bg-slate-900">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Problem List (Left 4 cols) & Detail View (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Problem Catalog */}
        <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-500">
              No problems match your current search and filters.
            </div>
          ) : (
            filteredProblems.map((prob) => {
              const isSelected = selectedProblem?.id === prob.id;
              return (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-950/50'
                      : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">{getStatusIcon(prob.status)}</div>
                      <div>
                        <h4 className={`text-xs font-semibold leading-snug ${isSelected ? 'text-purple-200' : 'text-slate-200'}`}>
                          {prob.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-mono">
                          <span>{prob.topic}</span>
                          <span aria-hidden="true">·</span>
                          <span className={getDifficultyColor(prob.difficulty)}>
                            {prob.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {prob.complexity.time}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Selected Problem Detailed Workspace */}
        {selectedProblem ? (
          <div className="lg:col-span-7 rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            {/* Problem Top Header & Status Controls */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className={getDifficultyColor(selectedProblem.difficulty)}>
                    {selectedProblem.difficulty}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProblem.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">Time: {selectedProblem.complexity.time}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">Space: {selectedProblem.complexity.space}</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {selectedProblem.title}
                </h3>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateProblemStatus(selectedProblem.id, 'solved')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    selectedProblem.status === 'solved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-300 border border-slate-800'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Solved</span>
                </button>
                <button
                  onClick={() => onUpdateProblemStatus(selectedProblem.id, 'attempted')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    selectedProblem.status === 'attempted'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-slate-900 hover:bg-blue-950/40 text-slate-400 hover:text-blue-300 border border-slate-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Attempted</span>
                </button>
              </div>
            </div>

            {/* Problem Body Content */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[620px]">
              {/* Problem Statement */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Problem Description
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedProblem.problemStatement}
                </p>
              </div>

              {/* Input & Output Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1">Input Format:</span>
                  <span className="text-slate-400 font-mono">{selectedProblem.inputFormat}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1">Output Format:</span>
                  <span className="text-slate-400 font-mono">{selectedProblem.outputFormat}</span>
                </div>
              </div>

              {/* Constraints */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Constraints
                </h5>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
                  {selectedProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Sample Cases */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Sample Cases
                </h5>
                <div className="space-y-2">
                  {selectedProblem.sampleCases.map((sc, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-400 font-mono mb-1">
                        <span>Sample {i + 1}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
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
                        <p className="mt-2 text-slate-400 text-[11px]">
                          <strong>Explanation:</strong> {sc.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Test Cases */}
              {selectedProblem.suggestedTestCases && selectedProblem.suggestedTestCases.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Edge Cases & Suggested Test Suite
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedProblem.suggestedTestCases.map((tc, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono">
                        <span className="text-purple-300 font-semibold block text-[11px]">{tc.testName}</span>
                        <div className="text-[11px] text-slate-400 mt-1">
                          In: <span className="text-slate-200">{tc.input}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Expected: <span className="text-emerald-400">{tc.expectedOutput}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progressive Hints Section */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h5 className="text-xs font-semibold text-white">
                    Progressive AI Hints ({selectedProblem.hints.length} available)
                  </h5>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Read hints sequentially to preserve the learning challenge before looking at code.
                </p>

                <div className="space-y-2">
                  {selectedProblem.hints.map((hint, idx) => {
                    const isRevealed = revealedHints.includes(idx);
                    return (
                      <div key={idx} className="rounded-md border border-slate-800/80 overflow-hidden">
                        <button
                          onClick={() => handleToggleHint(idx)}
                          className="w-full flex items-center justify-between p-2.5 bg-slate-900/60 hover:bg-slate-900 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-amber-400 font-mono">#{idx + 1}</span>
                            <span>Hint {idx + 1}</span>
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {isRevealed ? 'Hide' : 'Reveal'}
                          </span>
                        </button>
                        {isRevealed && (
                          <div className="p-3 bg-slate-950 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Solution Section (Protected by Toggle) */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="text-xs font-semibold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      <span>Verified Solution & Explanation</span>
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Understand algorithmic trade-offs before revealing
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                </div>

                {showSolution && (
                  <div className="mt-3 space-y-3">
                    {/* Language selector for solution */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>View in:</span>
                      <div className="flex gap-1">
                        {(['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => setProblemLang(l)}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                              problemLang === l
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <CodeBlock
                      code={selectedProblem.solutionCode[problemLang] || selectedProblem.solutionCode.Python}
                      language={problemLang}
                    />

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-purple-300 block mb-1">Complexity Analysis:</strong>
                      <p>
                        Time Complexity: <code className="text-emerald-400">{selectedProblem.complexity.time}</code> · Space Complexity: <code className="text-cyan-400">{selectedProblem.complexity.space}</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onAskMentor(`Help me understand the problem: "${selectedProblem.title}". Can you give me an intuitive explanation and a small walkthrough in ${problemLang}?`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask AI Mentor About This Problem</span>
              </button>

              <button
                onClick={() => onOpenInPlayground(selectedProblem.starterCode[problemLang] || selectedProblem.starterCode.Python, problemLang)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Code Playground</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 p-12 text-center bg-slate-900/50 rounded-xl border border-slate-800 text-slate-500 text-xs">
            Select a problem from the catalog to view details.
          </div>
        )}
      </div>
    </div>
  );
};
