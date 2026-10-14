/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AIMentorView } from './components/AIMentorView';
import { PlaygroundView } from './components/PlaygroundView';
import { PracticeView } from './components/PracticeView';
import { RoadmapView } from './components/RoadmapView';
import { CodingClubEventsView } from './components/CodingClubEventsView';
import { ChallengeGeneratorView } from './components/ChallengeGeneratorView';
import { ProgressView } from './components/ProgressView';
import { CIEProjectDemoView } from './components/CIEProjectDemoView';

import {
  Problem,
  ClubActivity,
  LearningRoadmap,
  ChatMessage,
  SavedSnippet,
  ProgrammingLanguage,
  SkillLevel,
  ProblemStatus,
} from './types';

import {
  INITIAL_PROBLEMS,
  INITIAL_ACTIVITIES,
  INITIAL_ROADMAP,
  CODE_TEMPLATES,
} from './data/initialData';

const LOCAL_STORAGE_KEYS = {
  PROBLEMS: 'cca_problems_v1',
  ACTIVITIES: 'cca_activities_v1',
  ROADMAP: 'cca_roadmap_v1',
  CHAT: 'cca_chat_v1',
  SNIPPETS: 'cca_snippets_v1',
  LANG: 'cca_lang_v1',
  LEVEL: 'cca_level_v1',
  STREAK: 'cca_streak_v1',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Settings
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.LANG) as ProgrammingLanguage) || 'Python';
  });
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.LEVEL) as SkillLevel) || 'Beginner';
  });
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.STREAK);
    return saved ? parseInt(saved, 10) : 5;
  });

  // State: Problems
  const [problems, setProblems] = useState<Problem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROBLEMS);
      return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
    } catch {
      return INITIAL_PROBLEMS;
    }
  });

  // State: Activities
  const [activities, setActivities] = useState<ClubActivity[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  // State: Roadmap
  const [roadmap, setRoadmap] = useState<LearningRoadmap>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ROADMAP);
      return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
    } catch {
      return INITIAL_ROADMAP;
    }
  });

  // State: Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: `Hello and welcome to Coding Club Assistant! 🚀

I am your personalized AI programming mentor for the Computer Engineering CIE-3 Challenge. Whether you need step-by-step explanations for complex data structures, debugging assistance for troublesome compiler errors, progressive hints for DSA challenges, or placement interview coaching—I am here to help you learn deeply.

To get started, select your preferred programming language and explanation depth above, or click one of the suggested topics below!`,
        timestamp: 'Just now',
      },
    ];
  });

  // State: Saved Code Snippets
  const [savedSnippets, setSavedSnippets] = useState<SavedSnippet[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SNIPPETS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cross-component coordination state
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<string | undefined>(undefined);
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [mentorInitialQuery, setMentorInitialQuery] = useState<string | undefined>(undefined);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SNIPPETS, JSON.stringify(savedSnippets));
  }, [savedSnippets]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEVEL, selectedLevel);
  }, [selectedLevel]);

  // Handlers
  const handleUpdateProblemStatus = (problemId: string, status: ProblemStatus) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, status } : p))
    );
  };

  const handleUpdateActivityRsvp = (activityId: string, status: 'attending' | 'interested' | 'none') => {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, rsvpStatus: status } : a))
    );
  };

  const handleUpdateMilestone = (milestoneId: string, completed: boolean) => {
    setRoadmap((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === milestoneId ? { ...m, completed } : m)),
    }));
  };

  const handleSendMessageToMentor = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedLanguage,
      skillLevel: selectedLevel,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: selectedLanguage,
          skillLevel: selectedLevel,
          history: chatMessages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || data.error || 'I am ready to assist. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedLanguage,
        skillLevel: selectedLevel,
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Notice: Could not communicate with Gemini API (${err.message}). Please check that the server is active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRegenerateRoadmap = async (params: {
    skillLevel: SkillLevel;
    language: ProgrammingLanguage;
    goal: string;
    studyTime: string;
    preferredTopics: string[];
  }) => {
    setIsRoadmapLoading(true);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.milestones && Array.isArray(data.milestones)) {
        const formatted: LearningRoadmap = {
          title: data.title || `${params.language} Mastery Roadmap`,
          targetGoal: data.targetGoal || params.goal,
          overview: data.overview || `Tailored learning curriculum for ${params.skillLevel} level in ${params.language}.`,
          estimatedWeeks: data.estimatedWeeks || 10,
          milestones: data.milestones.map((m: any, idx: number) => ({
            id: m.id || `ms-${idx}`,
            order: m.order || idx + 1,
            title: m.title,
            durationDays: m.durationDays || 7,
            description: m.description,
            coreTopics: m.coreTopics || [],
            practiceExercises: m.practiceExercises || [],
            recommendedChallenge: m.recommendedChallenge,
            completed: false,
          })),
          revisionTips: data.revisionTips || INITIAL_ROADMAP.revisionTips,
        };
        setRoadmap(formatted);
      }
    } catch (err) {
      console.error('Roadmap regeneration error:', err);
    } finally {
      setIsRoadmapLoading(false);
    }
  };

  const handleAddGeneratedProblem = (prob: Problem) => {
    setProblems((prev) => [prob, ...prev]);
  };

  const handleSaveSnippet = (title: string, code: string, lang: ProgrammingLanguage) => {
    const newSnippet: SavedSnippet = {
      id: `snip-${Date.now()}`,
      title,
      code,
      language: lang,
      createdAt: new Date().toLocaleDateString(),
    };
    setSavedSnippets((prev) => [newSnippet, ...prev]);
  };

  const handleDeleteSnippet = (id: string) => {
    setSavedSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo progress, problem statuses, and saved notes to initial CIE-3 state?')) {
      setProblems(INITIAL_PROBLEMS);
      setActivities(INITIAL_ACTIVITIES);
      setRoadmap(INITIAL_ROADMAP);
      setSavedSnippets([]);
      setStreakDays(5);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.PROBLEMS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACTIVITIES);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ROADMAP);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SNIPPETS);
    }
  };

  // Navigation helpers
  const handleOpenInPlayground = (code: string, lang: ProgrammingLanguage) => {
    setSelectedLanguage(lang);
    setPlaygroundInitialCode(code);
    setCurrentTab('playground');
  };

  const handleOpenProblemById = (problemId: string) => {
    setActiveProblemId(problemId);
    setCurrentTab('practice');
  };

  const handleSendToMentor = (query: string) => {
    setMentorInitialQuery(query);
    setCurrentTab('mentor');
  };

  const handleLoadConversationToMentor = (prompt: string, initialResponse?: string) => {
    const userMsg: ChatMessage = {
      id: `conv-user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (initialResponse) {
      const respMsg: ChatMessage = {
        id: `conv-resp-${Date.now() + 1}`,
        sender: 'assistant',
        text: initialResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, userMsg, respMsg]);
    } else {
      setChatMessages((prev) => [...prev, userMsg]);
      handleSendMessageToMentor(prompt);
    }
    setCurrentTab('mentor');
  };

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'mentor': return 'AI Coding Mentor';
      case 'practice': return 'Practice Problems';
      case 'playground': return 'Code Playground';
      case 'roadmap': return 'Learning Roadmap';
      case 'events': return 'Coding Club Events';
      case 'generator': return 'Challenge Generator';
      case 'progress': return 'Progress & Analytics';
      case 'cie3': return 'CIE-3 Project Demo (20 Marks)';
    }
  };

  const solvedCount = problems.filter((p) => p.status === 'solved').length;

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
        streakDays={streakDays}
        solvedCount={solvedCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onOpenMobile={() => setIsOpenMobile(true)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          onQuickAsk={() => setCurrentTab('mentor')}
          currentTabTitle={getTabTitle(currentTab)}
        />

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              problems={problems}
              activities={activities}
              roadmap={roadmap}
              streakDays={streakDays}
              selectedLanguage={selectedLanguage}
              selectedLevel={selectedLevel}
              onNavigateTab={setCurrentTab}
              onOpenProblem={handleOpenProblemById}
              onOpenPlaygroundWithCode={handleOpenInPlayground}
              onSendToMentor={handleSendToMentor}
            />
          )}

          {currentTab === 'mentor' && (
            <AIMentorView
              messages={chatMessages}
              onSendMessage={handleSendMessageToMentor}
              isLoading={isChatLoading}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              onClearHistory={() => setChatMessages([])}
              onSaveMessage={(id) => {
                setChatMessages((prev) =>
                  prev.map((m) => (m.id === id ? { ...m, isSaved: !m.isSaved } : m))
                );
              }}
              onOpenInPlayground={handleOpenInPlayground}
              initialQuery={mentorInitialQuery}
              onClearInitialQuery={() => setMentorInitialQuery(undefined)}
            />
          )}

          {currentTab === 'practice' && (
            <PracticeView
              problems={problems}
              onUpdateProblemStatus={handleUpdateProblemStatus}
              onOpenInPlayground={handleOpenInPlayground}
              onAskMentor={handleSendToMentor}
              selectedLanguage={selectedLanguage}
              activeProblemId={activeProblemId}
              onClearActiveProblemId={() => setActiveProblemId(null)}
            />
          )}

          {currentTab === 'playground' && (
            <PlaygroundView
              currentLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              initialCode={playgroundInitialCode}
              onSaveSnippet={handleSaveSnippet}
              onAskMentorWithCode={(c, l) => {
                handleSendToMentor(`Please review and explain this ${l} code:\n\`\`\`${l.toLowerCase()}\n${c}\n\`\`\``);
              }}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapView
              roadmap={roadmap}
              onUpdateMilestone={handleUpdateMilestone}
              onRegenerateRoadmap={handleRegenerateRoadmap}
              isGenerating={isRoadmapLoading}
              selectedLanguage={selectedLanguage}
              selectedLevel={selectedLevel}
              onOpenProblemById={handleOpenProblemById}
            />
          )}

          {currentTab === 'events' && (
            <CodingClubEventsView
              activities={activities}
              onUpdateRsvp={handleUpdateActivityRsvp}
            />
          )}

          {currentTab === 'generator' && (
            <ChallengeGeneratorView
              onAddGeneratedProblem={handleAddGeneratedProblem}
              onOpenInPlayground={handleOpenInPlayground}
              selectedLanguage={selectedLanguage}
            />
          )}

          {currentTab === 'progress' && (
            <ProgressView
              problems={problems}
              streakDays={streakDays}
              savedSnippets={savedSnippets}
              onResetData={handleResetData}
              onDeleteSnippet={handleDeleteSnippet}
              onOpenInPlayground={handleOpenInPlayground}
            />
          )}

          {currentTab === 'cie3' && (
            <CIEProjectDemoView
              onLoadConversationToMentor={handleLoadConversationToMentor}
              onNavigateTab={setCurrentTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
