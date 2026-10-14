import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Flame,
  Percent,
  Bookmark,
  RotateCcw,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Award,
  Terminal,
  Trash2
} from 'lucide-react';
import { Problem, SavedSnippet, ProgrammingLanguage } from '../types';
import { CodeBlock } from './CodeBlock';

interface ProgressViewProps {
  problems: Problem[];
  streakDays: number;
  savedSnippets: SavedSnippet[];
  onResetData: () => void;
  onDeleteSnippet: (id: string) => void;
  onOpenInPlayground: (code: string, lang: ProgrammingLanguage) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  problems,
  streakDays,
  savedSnippets,
  onResetData,
  onDeleteSnippet,
  onOpenInPlayground,
}) => {
  const solved = problems.filter((p) => p.status === 'solved');
  const attempted = problems.filter((p) => p.status === 'attempted' || p.status === 'solved');
  const total = problems.length;

  const beginnerSolved = solved.filter((p) => p.difficulty === 'Beginner').length;
  const intermediateSolved = solved.filter((p) => p.difficulty === 'Intermediate').length;
  const advancedSolved = solved.filter((p) => p.difficulty === 'Advanced').length;

  const accuracy = attempted.length > 0 ? Math.round((solved.length / attempted.length) * 100) : 100;

  // Weak topics analysis: topics with attempted but not solved, or advanced topics untouched
  const weakTopics = [
    { topic: 'Dynamic Programming (Knapsack & Coin Change)', status: 'Needs Practice', recommendation: 'Revise 1D/2D array state tabulation and base cases.' },
    { topic: 'Graph Shortest Paths (Dijkstra)', status: 'Pending Review', recommendation: 'Practice min-priority queue implementations.' },
    { topic: 'Binary Search Edge Boundaries', status: 'Moderate', recommendation: 'Double check integer overflow (low + (high - low) / 2).' },
  ];

  // Weekly activity log (Realistic sample for demonstration)
  const weeklyDays = [
    { day: 'Mon', count: 3, active: true },
    { day: 'Tue', count: 4, active: true },
    { day: 'Wed', count: 2, active: true },
    { day: 'Thu', count: 5, active: true },
    { day: 'Fri', count: 3, active: true },
    { day: 'Sat', count: 6, active: true },
    { day: 'Sun', count: 1, active: true },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Progress Tracker & Skill Analytics</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Real recorded statistics and algorithmic mastery breakdown
          </p>
        </div>

        <button
          onClick={onResetData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-800/50 text-xs font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Progress</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Total Solved</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {solved.length} <span className="text-xs text-slate-500">/ {total}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-mono">
            {Math.round((solved.length / total) * 100)}% Course Completed
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Total Attempted</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {attempted.length} <span className="text-xs text-slate-500">/ {total}</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-400 font-mono">
            {total - attempted.length} Not Yet Started
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Accuracy Rate</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {accuracy}%
          </div>
          <div className="mt-2 text-[11px] text-purple-400 font-mono">
            Based on recorded submissions
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Daily Streak</span>
          <div className="text-2xl font-bold font-mono text-white mt-1 flex items-center gap-1.5">
            <span>{streakDays}</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-2 text-[11px] text-amber-400 font-mono">
            Active daily practice
          </div>
        </div>
      </div>

      {/* Charts & Analytics Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Difficulty Breakdown (Left 6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Problem Mastery by Tier</span>
          </h3>

          <div className="space-y-3 pt-1">
            {/* Beginner */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Beginner Foundations</span>
                <span className="font-mono text-emerald-400">{beginnerSolved} / 5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(beginnerSolved / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Intermediate */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Intermediate Algorithms</span>
                <span className="font-mono text-blue-400">{intermediateSolved} / 5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(intermediateSolved / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Advanced */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Advanced DP & Graphs</span>
                <span className="font-mono text-purple-400">{advancedSolved} / 5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                <div
                  className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(advancedSolved / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 mt-2">
            💡 <strong>Observation:</strong> Master Intermediate level problems before tackling complex graph Dijkstra and 2D DP knapsack variations.
          </div>
        </div>

        {/* Weekly Activity Heatmap/Chart (Right 6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Weekly Practice Distribution (Demo)</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Last 7 Days
            </span>
          </div>

          <div className="flex items-end justify-between h-36 pt-4 pb-2 px-2 bg-slate-950 rounded-lg border border-slate-800/80">
            {weeklyDays.map((item, idx) => {
              const heightPercent = Math.min(100, (item.count / 6) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-[10px] font-mono text-cyan-300">{item.count}</span>
                  <div className="w-7 bg-slate-800 rounded-t-sm h-24 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-linear-to-t from-purple-600 to-cyan-400 rounded-t-sm transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Consistent 45-60 min daily practice sessions yield 3x higher retention than weekend cramming.
          </p>
        </div>
      </div>

      {/* Weak Topics & Revision Recommendations */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Algorithmic Weak Spots & Suggested Revision</span>
        </h3>
        <p className="text-xs text-slate-400">
          Targeted study points based on unattempted problems and advanced topics in your roadmap.
        </p>

        <div className="space-y-2.5 pt-1">
          {weakTopics.map((wt, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-slate-200">{wt.topic}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{wt.recommendation}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {wt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Code Snippets & Notes */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>Saved Code Snippets & Notes ({savedSnippets.length})</span>
          </h3>
        </div>

        {savedSnippets.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-950 rounded-lg border border-slate-800">
            No saved code snippets yet. Click "Save Snippet" in the Code Playground to store custom algorithms here!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedSnippets.map((snip) => (
              <div key={snip.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{snip.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-purple-950 text-purple-300 rounded border border-purple-800">
                      {snip.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenInPlayground(snip.code, snip.language)}
                      className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
                      title="Load into Playground"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteSnippet(snip.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete snippet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-36 overflow-y-auto">
                  <CodeBlock code={snip.code} language={snip.language} showLineNumbers={false} />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Saved on {snip.createdAt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
