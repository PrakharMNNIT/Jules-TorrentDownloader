import { create } from 'zustand';
import { supabase, isMockMode } from './supabase';

// Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  is_critical?: boolean;
  tags?: string[];
}

export interface Phase {
  id: string;
  title: string;
  status: 'locked' | 'active' | 'completed';
  progress: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  level: number;
  bio: {
    mood: number;
    energy: number;
    confidence: number;
  };
}

interface MissionState {
  userStats: UserStats;
  phases: Phase[];
  tasks: Task[];
  badDayProtocol: boolean;

  // Actions
  init: () => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  setBadDayProtocol: (active: boolean) => void;
  updateBio: (metric: keyof UserStats['bio'], value: number) => Promise<void>;
}

// Initial Mock Data (Fallback)
const MOCK_DATA = {
  userStats: {
    xp: 12450,
    streak: 12,
    level: 7,
    bio: { mood: 85, energy: 62, confidence: 94 },
  },
  phases: [
    { id: 'p0', title: 'Recon', status: 'completed', progress: 100 },
    { id: 'p1', title: 'Mobilization', status: 'active', progress: 45 },
    { id: 'p2', title: 'Data Structs', status: 'locked', progress: 0 },
    { id: 'p3', title: 'Algorithms', status: 'locked', progress: 0 },
    { id: 'p4', title: 'Capstone', status: 'locked', progress: 0 },
  ] as Phase[],
  tasks: [
    { id: 't1', title: 'Complete Python Data Structures module', description: 'Review hash maps and linked lists implementation.', status: 'completed', tags: ['Deployed'] },
    { id: 't2', title: 'Study Pointers in C++', description: 'Focus on memory allocation and pointer arithmetic.', status: 'in_progress', tags: ['In Progress'] },
    { id: 't3', title: "Deploy 'Hello World' to server", description: 'SSH configuration and basic Linux commands.', status: 'pending', tags: ['Pending'] },
    { id: 't4', title: 'Review Git Branching Strategy', description: 'Feature branches vs Trunk based development.', status: 'pending', tags: ['Pending'] },
  ] as Task[]
};

export const useStore = create<MissionState>((set, get) => ({
  userStats: MOCK_DATA.userStats,
  phases: MOCK_DATA.phases,
  tasks: MOCK_DATA.tasks,
  badDayProtocol: false,

  init: async () => {
    if (isMockMode()) {
      console.log('BackendPE: Mock Mode Active - Using local simulation');
      return;
    }

    // Real Supabase Fetch
    const { data: profile } = await supabase.from('profiles').select('*').single();
    const { data: phases } = await supabase.from('phases').select('*').order('order_index');
    const { data: tasks } = await supabase.from('tasks').select('*');

    if (profile && phases && tasks) {
      set({
        userStats: {
          xp: profile.xp,
          streak: profile.streak,
          level: profile.level,
          bio: { mood: profile.bio_mood, energy: profile.bio_energy, confidence: profile.bio_confidence }
        },
        phases: phases as Phase[],
        tasks: tasks as Task[]
      });
    }
  },

  toggleTask: async (id) => {
    // 1. Optimistic Update
    const currentTasks = get().tasks;
    const task = currentTasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    set({
      tasks: currentTasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
    });

    // 2. Database Sync
    if (!isMockMode()) {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        // Revert on failure
        console.error('Sync failed:', error);
        set({ tasks: currentTasks });
      }
    }
  },

  setBadDayProtocol: (active) => set({ badDayProtocol: active }),

  updateBio: async (metric, value) => {
    // Optimistic
    set((state) => ({
      userStats: {
        ...state.userStats,
        bio: { ...state.userStats.bio, [metric]: value }
      }
    }));

    // DB Sync
    if (!isMockMode()) {
      const field = `bio_${metric}`;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({ [field]: value }).eq('id', user.id);
      }
    }
  },
}));
