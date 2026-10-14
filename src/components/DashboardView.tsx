import React from 'react';
import {
  CheckCircle2,
  Clock,
  Flame,
  Percent,
  Sparkles,
  ArrowRight,
  Calendar,
  BookOpen,
  ChevronRight,
  Code2
} from 'lucide-react';
import { Problem, ClubActivity, LearningRoadmap, ProgrammingLanguage, SkillLevel } from '../types';

interface DashboardViewProps {
  problems: Problem[];
  activities: ClubActivity[];
  roadmap: LearningRoadmap;
  streakDays: number;
  selectedLanguage: ProgrammingLanguage;
  selectedLevel: SkillLevel;
  onNavigateTab: (tab: any) => void;
  onOpenProblem: (problemId: string) => void;
  onOpenPlaygroundWithCode: (code: string, language: ProgrammingLanguage) => void;
  onSendToMentor: (query: string) => void;
}

const QUICK_PROMPTS = [
  'Explain loops in Python with simple examples.',
  'What is the difference between an array and a linked list?',
  'Help me understand recursion.',
  'Explain binary search step by step.',
  'Why am I getting an index out of range error?',
  'Optimize this code and explain the changes.',
  'Explain object-oriented programming with a real-life example.',
  'Give me a beginner-friendly introduction to dynamic programming.',
  'Help me prepare for a coding interview.',
  'Explain time and space complexity of my algorithm.',
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  problems,
  activities,
  roadmap,
  streakDays,
  selectedLanguage,
  onNavigateTab,
  onOpenProblem,
  onSendToMentor,
}) => {
  const solvedProblems = problems.filter((p) => p.status === 'solved');
  const attemptedProblems = problems.filter((p) => p.status === 'attempted' || p.status === 'solved');
  const totalProblems = problems.length;
  const accuracy = attemptedProblems.length > 0
    ? Math.round((solvedProblems.length / attemptedProblems.length) * 100)
    : 100;

  const completedMilestones = roadmap.milestones.filter((m) => m.completed).length;
  const roadmapPercent = Math.round((completedMilestones / roadmap.milestones.length) * 100);

  // Recommendations: 3 problems that are not yet solved
  const recommendedProblems = problems.filter((p) => p.status !== 'solved').slice(0, 3);

  // Recent attempts
  const recentAttempts = problems.filter((p) => p.status !== 'not-started').slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl border border-purple-900/40 bg-linear-to-r from-[#0d1326] via-[#131c36] to-[#11192e] p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CIE-3 Engineering AI Agent · Active Term</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome to <span className="bg-linear-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Coding Club Assistant</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Your personal AI programming mentor powered by Gemini. Ask algorithmic questions, debug runtime errors, conquer curated college DSA challenges, and track your engineering roadmap.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('mentor')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Launch AI Coding Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('practice')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition-colors cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Browse Practice Problems</span>
            </button>
            <button
              onClick={() => onNavigateTab('cie3')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-950/30 hover:bg-yellow-950/50 text-yellow-300 border border-yellow-800/40 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>View CIE-3 Project Dossier (20 Marks)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Solved */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Problems Solved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">
              {solvedProblems.length} <span className="text-xs font-normal text-slate-500">/ {totalProblems}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(solvedProblems.length / totalProblems) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Attempted */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Problems Attempted</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">
              {attemptedProblems.length} <span className="text-xs font-normal text-slate-500">/ {totalProblems}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              {totalProblems - attemptedProblems.length} remaining
            </p>
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Learning Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-1">
              <span>{streakDays}</span>
              <span className="text-xs font-normal text-amber-400">Days</span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
              <span>● Daily activity logged</span>
            </p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Accuracy Rate</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Percent className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">
              {accuracy}%
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              {solvedProblems.length} of {attemptedProblems.length || 1} attempts
            </p>
          </div>
        </div>
      </div>

      {/* AI Quick Query Prompt Launchpad */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Coding Mentor — Frequently Explored Topics</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any question to immediately query Gemini with tailored {selectedLanguage} examples
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('mentor')}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors"
          >
            <span>Open Chat</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => onSendToMentor(promptText)}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/40 text-slate-300 hover:text-purple-200 border border-slate-700/60 hover:border-purple-600/40 text-xs text-left transition-all cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Recommended Challenges & Learning Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Challenges */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>Recommended Coding Challenges</span>
              </h3>
              <button
                onClick={() => onNavigateTab('practice')}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                View all ({totalProblems})
              </button>
            </div>

            <div className="space-y-2.5">
              {recommendedProblems.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => onOpenProblem(prob.id)}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-200 group-hover:text-purple-300 transition-colors">
                        {prob.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{prob.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span className={
                        prob.difficulty === 'Beginner' ? 'text-emerald-400' :
                        prob.difficulty === 'Intermediate' ? 'text-blue-400' : 'text-purple-400'
                      }>
                        {prob.difficulty}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{prob.complexity.time}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Solve in Python, C, C++, Java, JS, or SQL</span>
            <button
              onClick={() => onNavigateTab('practice')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Start Practicing →
            </button>
          </div>
        </div>

        {/* Learning Roadmap Widget */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Learning Roadmap Progress</span>
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {completedMilestones} / {roadmap.milestones.length} Completed ({roadmapPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${roadmapPercent}%` }}
              />
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Target: <span className="text-slate-200 font-medium">{roadmap.targetGoal}</span>
            </p>

            <div className="space-y-2">
              {roadmap.milestones.slice(0, 3).map((ms) => (
                <div
                  key={ms.id}
                  className="flex items-start gap-2.5 p-2 rounded-md bg-slate-950/40 border border-slate-800/60 text-xs"
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    ms.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {ms.completed ? '✓' : ms.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${ms.completed ? 'text-slate-300 line-through' : 'text-slate-200'}`}>
                      {ms.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {ms.coreTopics.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {ms.durationDays}d
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500">10 Structured Milestones</span>
            <button
              onClick={() => onNavigateTab('roadmap')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              View Full Roadmap →
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Upcoming Coding Club Events (Demo) & Recently Attempted Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coding Club Events */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Upcoming Coding Club Activities</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Demonstration records for college CIE-3 evaluation
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('events')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-200">
                      {act.title}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {act.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    Demo Record
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-500">
                  <span>📅 {act.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>⏰ {act.time}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-purple-400 font-medium">{act.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Attempted Problems */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Recently Attempted Problems</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pick up where you left off
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('practice')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Open Practice
            </button>
          </div>

          <div className="space-y-2.5">
            {recentAttempts.map((prob) => (
              <div
                key={prob.id}
                onClick={() => onOpenProblem(prob.id)}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-slate-200">
                    {prob.title}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{prob.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span className={prob.status === 'solved' ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                      {prob.status === 'solved' ? 'Solved' : 'Attempted'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {prob.complexity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
