import React from 'react';
import { Menu, Sparkles, Terminal, BookOpen } from 'lucide-react';
import { ProgrammingLanguage, SkillLevel } from '../types';

interface HeaderProps {
  onOpenMobile: () => void;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (lang: ProgrammingLanguage) => void;
  selectedLevel: SkillLevel;
  onLevelChange: (level: SkillLevel) => void;
  onQuickAsk: () => void;
  currentTabTitle: string;
}

const LANGUAGES: ProgrammingLanguage[] = ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'];
const LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export const Header: React.FC<HeaderProps> = ({
  onOpenMobile,
  selectedLanguage,
  onLanguageChange,
  selectedLevel,
  onLevelChange,
  onQuickAsk,
  currentTabTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-md lg:hidden border border-slate-800"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>{currentTabTitle}</span>
              <span className="hidden sm:inline-block text-xs font-normal text-slate-500 font-mono">
                · CIE-3 Challenge
              </span>
            </h1>
            <p className="hidden md:block text-[11px] text-slate-400 font-normal">
              Learn to code. Debug smarter. Build together.
            </p>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2 py-1">
            <Terminal className="w-3.5 h-3.5 text-purple-400 hidden sm:block" />
            <span className="text-[11px] text-slate-400 hidden sm:inline">Lang:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
              className="bg-transparent text-xs text-purple-300 font-mono focus:outline-hidden cursor-pointer"
              aria-label="Select default programming language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-900 text-slate-200">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Level Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2 py-1">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400 hidden sm:block" />
            <span className="text-[11px] text-slate-400 hidden sm:inline">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value as SkillLevel)}
              className="bg-transparent text-xs text-cyan-300 font-medium focus:outline-hidden cursor-pointer"
              aria-label="Select explanation level"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-900 text-slate-200">
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Ask Mentor CTA Button */}
          <button
            onClick={onQuickAsk}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Ask Mentor</span>
            <span className="sm:hidden">Ask</span>
          </button>
        </div>
      </div>
    </header>
  );
};
