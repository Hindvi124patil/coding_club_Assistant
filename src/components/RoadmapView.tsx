import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Circle,
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Target,
  Flame,
  Award
} from 'lucide-react';
import { LearningRoadmap, ProgrammingLanguage, SkillLevel } from '../types';

interface RoadmapViewProps {
  roadmap: LearningRoadmap;
  onUpdateMilestone: (milestoneId: string, completed: boolean) => void;
  onRegenerateRoadmap: (params: {
    skillLevel: SkillLevel;
    language: ProgrammingLanguage;
    goal: string;
    studyTime: string;
    preferredTopics: string[];
  }) => Promise<void>;
  isGenerating: boolean;
  selectedLanguage: ProgrammingLanguage;
  selectedLevel: SkillLevel;
  onOpenProblemById: (problemId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  onUpdateMilestone,
  onRegenerateRoadmap,
  isGenerating,
  selectedLanguage,
  selectedLevel,
  onOpenProblemById,
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const [level, setLevel] = useState<SkillLevel>(selectedLevel);
  const [lang, setLang] = useState<ProgrammingLanguage>(selectedLanguage);
  const [goal, setGoal] = useState('College Exams & CIE-3 Prep');
  const [studyTime, setStudyTime] = useState('1 hour per day');
  const [topics, setTopics] = useState<string[]>(['Arrays', 'Recursion', 'Binary Search', 'Dynamic Programming']);

  const completedCount = roadmap.milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / roadmap.milestones.length) * 100);

  const handleToggleTopic = (t: string) => {
    if (topics.includes(t)) {
      setTopics(topics.filter((x) => x !== t));
    } else {
      setTopics([...topics, t]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegenerateRoadmap({
      skillLevel: level,
      language: lang,
      goal,
      studyTime,
      preferredTopics: topics,
    });
    setShowConfig(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-linear-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-900/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Personalized AI Learning Roadmap</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {roadmap.overview}
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Goal: <strong className="text-blue-300">{roadmap.targetGoal}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Estimated: <strong className="text-cyan-300">{roadmap.estimatedWeeks} Weeks</strong></span>
          </div>
        </div>

        {/* Progress & Customizer CTA */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-cyan-400">
              {progressPercent}%
            </div>
            <p className="text-[11px] text-slate-400">
              {completedCount} of {roadmap.milestones.length} Milestones
            </p>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Plan with AI</span>
          </button>
        </div>
      </div>

      {/* Interactive Questionnaire Modal/Drawer */}
      {showConfig && (
        <form onSubmit={handleGenerate} className="p-5 rounded-xl bg-slate-900 border border-blue-800/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Configure AI Learning Roadmap Parameters
            </h3>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Skill Level */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Current Skill Level:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as SkillLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
              >
                <option value="Beginner">Beginner (Starting syntax & logic)</option>
                <option value="Intermediate">Intermediate (Core DSA & problems)</option>
                <option value="Advanced">Advanced (Competitive & optimization)</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Target Language:</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as ProgrammingLanguage)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 font-mono"
              >
                {['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Primary Goal:</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
              >
                <option value="College Exams & CIE-3 Prep">College Exams & CIE-3 Assessment</option>
                <option value="Placements & FAANG Interviews">Placements & Technical Interviews</option>
                <option value="Hackathons & Real-World Projects">Hackathons & Rapid Prototyping</option>
                <option value="Competitive Programming Rating">Competitive Programming Contest Mastery</option>
              </select>
            </div>

            {/* Study Time */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Available Daily Study Time:</label>
              <select
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200"
              >
                <option value="30 minutes">30 minutes / day (Quick sprint)</option>
                <option value="1 hour per day">1 hour / day (Standard pace)</option>
                <option value="2 hours per day">2 hours / day (Intensive)</option>
                <option value="3+ hours per day">3+ hours / day (Immersion)</option>
              </select>
            </div>
          </div>

          {/* Topics Selector */}
          <div>
            <label className="text-slate-400 block mb-1.5 font-medium text-xs">
              Select Focus Areas (Click to toggle):
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Fundamentals & Bitwise',
                'Loops & Invariants',
                'Recursion & Stack',
                'Arrays',
                'Strings',
                'Binary Search',
                'Two Pointers',
                'Hash Maps',
                'Stacks & Queues',
                'Kadane Algorithm',
                'Dynamic Programming',
                'Graph BFS & DFS',
                'Dijkstra Algorithm',
                'Mock Interviews',
              ].map((topic) => {
                const isSelected = topics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleToggleTopic(topic)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border border-blue-500'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{topic}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isGenerating ? 'Gemini is Architecting Your Roadmap...' : 'Generate AI Roadmap'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-500 via-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Milestones Vertical Timeline */}
      <div className="space-y-4">
        {roadmap.milestones.map((ms, index) => (
          <div
            key={ms.id}
            className={`p-5 rounded-xl border transition-all ${
              ms.completed
                ? 'bg-slate-900/50 border-slate-800/80 text-slate-400'
                : 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-md'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => onUpdateMilestone(ms.id, !ms.completed)}
                  className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                  title={ms.completed ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {ms.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase">
                      Milestone {ms.order || index + 1}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      · {ms.durationDays} Days Duration
                    </span>
                  </div>
                  <h3 className={`text-sm font-semibold mt-0.5 ${ms.completed ? 'text-slate-300 line-through' : 'text-white'}`}>
                    {ms.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {ms.description}
                  </p>
                </div>
              </div>

              {/* Action Button for recommended challenge */}
              {ms.recommendedChallenge && (
                <button
                  onClick={() => onOpenProblemById(ms.recommendedChallenge!)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-950 hover:bg-purple-950/50 text-purple-300 hover:text-purple-200 border border-slate-800 hover:border-purple-600/40 text-xs font-mono transition-colors cursor-pointer"
                >
                  <span>Practice Exercise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Core Topics and Exercises Tags */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Core Theory & Concepts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ms.coreTopics.map((ct, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800/80 text-[11px]"
                    >
                      {ct}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Hands-On Exercises:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ms.practiceExercises.map((pe, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800/80 text-[11px]"
                    >
                      {pe}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revision Strategies Card */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Recommended Engineering Revision & Retention Rules</span>
        </h4>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
          {roadmap.revisionTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
