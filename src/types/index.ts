export type ProgrammingLanguage = 'Python' | 'C' | 'C++' | 'Java' | 'JavaScript' | 'SQL';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProblemDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProblemStatus = 'not-started' | 'attempted' | 'solved';

export interface SampleCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface SuggestedTestCase {
  testName: string;
  input: string;
  expectedOutput: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  topic: string;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleCases: SampleCase[];
  hints: string[];
  starterCode: Record<ProgrammingLanguage, string>;
  solutionCode: Record<ProgrammingLanguage, string>;
  complexity: {
    time: string;
    space: string;
  };
  suggestedTestCases?: SuggestedTestCase[];
  status: ProblemStatus;
  saved?: boolean;
  notes?: string;
}

export interface ClubActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Challenge' | 'Competition' | 'Workshop' | 'Peer Review' | 'Showcase' | 'Practice';
  difficulty: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  location: string;
  participantsCount: number;
  rsvpStatus: 'attending' | 'interested' | 'none';
  isDemo: boolean;
}

export interface RoadmapMilestone {
  id: string;
  order: number;
  title: string;
  durationDays: number;
  description: string;
  coreTopics: string[];
  practiceExercises: string[];
  recommendedChallenge?: string;
  completed: boolean;
}

export interface LearningRoadmap {
  title: string;
  targetGoal: string;
  overview: string;
  estimatedWeeks: number;
  milestones: RoadmapMilestone[];
  revisionTips: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: ProgrammingLanguage;
  skillLevel?: SkillLevel;
  isError?: boolean;
  isSaved?: boolean;
}

export interface SavedSnippet {
  id: string;
  title: string;
  language: ProgrammingLanguage;
  code: string;
  createdAt: string;
  notes?: string;
}

export interface UserStats {
  totalSolved: number;
  totalAttempted: number;
  streakDays: number;
  accuracy: number;
  recentAttemptIds: string[];
  weakTopics: string[];
  savedSnippetCount: number;
}
