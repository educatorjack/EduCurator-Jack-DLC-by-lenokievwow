
export enum AppMode {
  ANALYSIS = 'ANALYSIS',
  ROLE = 'ROLE',
  QUIZ = 'QUIZ',
  FULL = 'FULL'
}

export interface QuizQuestion {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface LevelData {
  title: string;
  content: string;
  emoji: string;
}

export interface AnalysisData {
  introduction: string;
  levels: Record<string, LevelData>;
}

export interface RoleHint {
  roleName: string;
  content: string;
}
