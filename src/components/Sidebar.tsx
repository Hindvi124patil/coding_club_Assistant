import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Code2,
  Terminal,
  MapPin,
  Calendar,
  Sparkles,
  BarChart3,
  Award,
  Flame,
  X,
  GraduationCap
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'mentor'
  | 'practice'
  | 'playground'
  | 'roadmap'
  | 'events'
  | 'generator'
  | 'progress'
  | 'cie3';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  streakDays: number;
  solvedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  streakDays,
  solvedCount,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'mentor', label: 'AI Coding Mentor', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'Gemini' },
    { id: 'practice', label: 'Practice Problems', icon: <Code2 className="w-4 h-4 text-purple-400" />, badge: `${solvedCount}/15` },
    { id: 'playground', label: 'Code Playground', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    { id: 'roadmap', label: 'Learning Roadmap', icon: <MapPin className="w-4 h-4 text-blue-400" /> },
    { id: 'events', label: 'Coding Club Events', icon: <Calendar className="w-4 h-4 text-amber-400" />, badge: '7 Demo' },
    { id: 'generator', label: 'Challenge Generator', icon: <Sparkles className="w-4 h-4 text-fuchsia-400" /> },
    { id: 'progress', label: 'Progress & Analytics', icon: <BarChart3 className="w-4 h-4 text-indigo-400" /> },
    { id: 'cie3', label: 'CIE-3 Project Demo', icon: <Award className="w-4 h-4 text-yellow-400" />, badge: '20 M' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#080d1a] border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>Coding Club</span>
                <span className="text-[10px] font-mono px-1 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Assistant & Mentor</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-md lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenge / CIE-3 Tag Banner */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-md bg-purple-950/40 border border-purple-800/40 text-xs">
          <div className="flex items-center justify-between text-purple-300 font-medium">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              CIE-3 Challenge
            </span>
            <span className="text-[10px] font-mono bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded">
              20 Marks
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            Computer Engineering AI Agent
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-purple-500/30 text-purple-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom User Streak & Quick Info */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between p-2 rounded-md bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {streakDays} Day Streak
                </p>
                <p className="text-[10px] text-slate-500">Active Learner</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {Math.round((solvedCount / 15) * 100)}%
              </span>
              <p className="text-[9px] text-slate-500">Mastery</p>
            </div>
          </div>
          <div className="mt-2 text-center text-[10px] text-slate-500">
            Tagline: <span className="text-slate-400 italic">Learn. Debug. Build.</span>
          </div>
        </div>
      </aside>
    </>
  );
};
