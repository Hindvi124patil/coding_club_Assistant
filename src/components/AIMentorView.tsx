import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  Copy,
  Check,
  Code2,
  Trash2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { ProgrammingLanguage, SkillLevel, ChatMessage } from '../types';
import { CodeBlock } from './CodeBlock';

interface AIMentorViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (lang: ProgrammingLanguage) => void;
  selectedLevel: SkillLevel;
  onLevelChange: (lvl: SkillLevel) => void;
  onClearHistory: () => void;
  onSaveMessage: (msgId: string) => void;
  onOpenInPlayground: (code: string, lang: ProgrammingLanguage) => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

const MENTOR_PROMPTS = [
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

export const AIMentorView: React.FC<AIMentorViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  selectedLanguage,
  onLanguageChange,
  selectedLevel,
  onLevelChange,
  onClearHistory,
  onSaveMessage,
  onOpenInPlayground,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery, onClearInitialQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput('');
    await onSendMessage(userText);
  };

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore
    }
  };

  // Helper to parse message text into markdown sections (text vs code blocks)
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const firstLineEnd = part.indexOf('\n');
        const lang = firstLineEnd !== -1 ? part.slice(3, firstLineEnd).trim() : selectedLanguage.toLowerCase();
        const code = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3);

        return (
          <div key={index} className="my-2">
            <CodeBlock code={code.trim()} language={lang || selectedLanguage} />
            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={() => onOpenInPlayground(code.trim(), selectedLanguage)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 hover:text-purple-200 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                <Code2 className="w-3 h-3" />
                <span>Open in Playground</span>
              </button>
            </div>
          </div>
        );
      }

      // Format simple bold markdown and paragraphs
      return (
        <div key={index} className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap my-1.5">
          {part}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Mentor Header Bar */}
      <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-900/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Coding Club AI Mentor</h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Gemini 3.8 Flash Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized coding instruction · Safe dry-run analysis · Algorithm explanations
            </p>
          </div>
        </div>

        {/* Level & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300">
            <span className="text-slate-500">Target:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
              className="bg-transparent text-purple-300 font-mono focus:outline-hidden cursor-pointer"
            >
              {['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'].map((l) => (
                <option key={l} value={l} className="bg-slate-900 text-slate-200">
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300">
            <span className="text-slate-500">Depth:</span>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value as SkillLevel)}
              className="bg-transparent text-cyan-300 font-medium focus:outline-hidden cursor-pointer"
            >
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-900 text-slate-200">
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onClearHistory}
            className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
            aria-label="Clear chat history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-white">How can I assist your coding today?</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Ask about algorithms, debug confusing compiler errors, explore time complexity, or get hints without spoiling the full solution.
            </p>

            <div className="mt-6 w-full text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                Recommended Prompts for {selectedLanguage}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MENTOR_PROMPTS.slice(0, 4).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(prompt)}
                    className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-purple-500/40 hover:bg-purple-950/20 text-xs text-slate-300 hover:text-purple-200 text-left transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-semibold ${
                    isUser
                      ? 'bg-purple-600 text-white'
                      : 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div
                  className={`relative rounded-xl p-4 max-w-[88%] sm:max-w-[80%] border ${
                    isUser
                      ? 'bg-purple-950/50 border-purple-800/60 text-slate-100'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 shadow-lg'
                  }`}
                >
                  {/* Sender & Timestamp Header */}
                  <div className="flex items-center justify-between gap-3 pb-1.5 mb-1.5 border-b border-slate-800/60 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-400">
                      {isUser ? 'You' : 'Coding Club Assistant'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <>
                          <button
                            onClick={() => onSaveMessage(msg.id)}
                            className="p-1 hover:text-amber-400 text-slate-500 transition-colors"
                            title={msg.isSaved ? 'Saved in Notes' : 'Save to Notes'}
                          >
                            {msg.isSaved ? (
                              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="p-1 hover:text-slate-200 text-slate-500 transition-colors"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>{renderMessageContent(msg.text)}</div>
                </div>
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="rounded-xl p-4 bg-slate-950 border border-slate-800 text-slate-300 text-xs flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              <div className="space-y-0.5">
                <p className="font-medium text-slate-200">Analyzing your question with Gemini 3.8 Flash...</p>
                <p className="text-[11px] text-slate-500">Formulating step-by-step guidance for {selectedLanguage}</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {MENTOR_PROMPTS.slice(0, 6).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setInput(prompt)}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-purple-900/30 border border-slate-800 hover:border-purple-600/40 text-[11px] text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 shrink-0">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask a question or paste an error in ${selectedLanguage} (e.g. "Explain binary search step by step")...`}
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm text-slate-100 placeholder-slate-500 rounded-lg px-4 py-2.5 transition-all outline-hidden"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>AI mentor enforces safe coding practices & progressive hints.</span>
          <span>Never executes untrusted code on the backend.</span>
        </div>
      </form>
    </div>
  );
};
