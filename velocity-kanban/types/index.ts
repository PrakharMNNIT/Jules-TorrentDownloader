// Matching PRD Data Model (Section 12)
export interface Board {
  id: string;
  ownerId: string;
  title: string;
  columns: Column[];
  theme: {
    accentColor: string;
    mode: "dark" | "light" | "system";
    particleEffects: boolean;
  };
  version: number;
  updatedAt: number;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface Task {
  id: string;
  boardId: string;
  columnId: string;
  position: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  energy: 'low' | 'medium' | 'high';
  estimatedTime?: number; // minutes
  aiContext: {
    complexity?: "low" | "medium" | "high";
    lastDiscussed?: number;
  };
  updatedAt: number;
}
