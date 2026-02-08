import { create } from 'zustand';
import { supabase, isMockMode } from './supabase';

// Types
export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'archived' | 'completed';
  parentId?: string;
  // UI Helper
  children?: Project[];
}

export interface Task {
  id: string;
  projectId?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  energyLevel: 'low' | 'medium' | 'high';
  estimatedTime: number; // minutes
  dueDate?: string;
  tags?: string[];
  // Dependency Graph
  blockedBy?: string[]; // IDs of tasks blocking this one
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
  projects: Project[];
  tasks: Task[];
  selectedTaskId: string | null;
  badDayProtocol: boolean;

  // Actions
  init: () => Promise<void>;

  // Task Management
  setSelectedTask: (id: string | null) => void;
  toggleTask: (id: string) => Promise<void>;
  updateTaskDetails: (id: string, updates: Partial<Task>) => Promise<void>;

  // Gamification
  addXP: (amount: number) => Promise<void>;
  updateBio: (metric: keyof UserStats['bio'], value: number) => Promise<void>;

  // UI State
  setBadDayProtocol: (active: boolean) => void;
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
  projects: [
    { id: 'proj1', title: 'Core Foundations', status: 'active' },
    { id: 'proj2', title: 'System Design', status: 'active', parentId: 'proj1' },
  ] as Project[],
  tasks: [
    {
      id: 't1',
      projectId: 'proj1',
      title: 'Complete Python Data Structures module',
      description: 'Review hash maps and linked lists implementation.',
      status: 'completed',
      priority: 'high',
      energyLevel: 'high',
      estimatedTime: 120,
      tags: ['Deployed']
    },
    {
      id: 't2',
      projectId: 'proj1',
      title: 'Study Pointers in C++',
      description: 'Focus on memory allocation and pointer arithmetic.',
      status: 'in_progress',
      priority: 'critical',
      energyLevel: 'high',
      estimatedTime: 180,
      tags: ['In Progress']
    },
    {
      id: 't3',
      projectId: 'proj2',
      title: "Deploy 'Hello World' to server",
      description: 'SSH configuration and basic Linux commands.',
      status: 'pending',
      priority: 'medium',
      energyLevel: 'medium',
      estimatedTime: 60,
      tags: ['Pending']
    },
    {
      id: 't4',
      projectId: 'proj2',
      title: 'Review Git Branching Strategy',
      description: 'Feature branches vs Trunk based development.',
      status: 'pending',
      priority: 'low',
      energyLevel: 'low',
      estimatedTime: 30,
      tags: ['Pending']
    },
  ] as Task[]
};

export const useStore = create<MissionState>((set, get) => ({
  userStats: MOCK_DATA.userStats,
  phases: MOCK_DATA.phases,
  projects: MOCK_DATA.projects,
  tasks: MOCK_DATA.tasks,
  selectedTaskId: null,
  badDayProtocol: false,

  setSelectedTask: (id) => set({ selectedTaskId: id }),

  init: async () => {
    if (isMockMode()) {
      console.log('BackendPE: Mock Mode Active - Using local simulation');
      return;
    }

    // Real Supabase Fetch
    const { data: profile } = await supabase.from('profiles').select('*').single();
    const { data: phasesData } = await supabase.from('phases').select('*').order('order_index');
    const { data: projectsData } = await supabase.from('projects').select('*');
    const { data: tasksData } = await supabase.from('tasks').select('*');
    const { data: depsData } = await supabase.from('task_dependencies').select('*');

    if (profile && phasesData && projectsData && tasksData) {
      // Transform tasks to include blockedBy
      const tasksWithDeps = tasksData.map((t: any) => ({
        id: t.id,
        projectId: t.project_id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        energyLevel: t.energy_level,
        estimatedTime: t.estimated_time,
        dueDate: t.due_date,
        tags: t.properties?.tags || [],
        blockedBy: depsData?.filter((d: any) => d.blocked_id === t.id).map((d: any) => d.blocker_id) || []
      }));

      set({
        userStats: {
          xp: profile.xp,
          streak: profile.streak_count,
          level: profile.level,
          bio: { mood: profile.bio_mood, energy: profile.bio_energy, confidence: profile.bio_confidence }
        },
        phases: phasesData as Phase[],
        projects: projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            status: p.status,
            parentId: p.parent_id
        })),
        tasks: tasksWithDeps as Task[]
      });
    }
  },

  toggleTask: async (id) => {
    const currentTasks = get().tasks;
    const task = currentTasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    // Gamification Logic
    const baseXP = 10;
    const priorityBonus = { low: 0, medium: 5, high: 15, critical: 30 };
    const xpAmount = baseXP + (priorityBonus[task.priority] || 0);

    if (newStatus === 'completed') {
        await get().addXP(xpAmount);
    } else if (task.status === 'completed') {
        await get().addXP(-xpAmount);
    }

    set({
      tasks: currentTasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
    });

    if (!isMockMode()) {
      await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    }
  },

  updateTaskDetails: async (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));

    if (!isMockMode()) {
        // Handle standard fields
        const dbUpdates: any = {};
        if (updates.priority) dbUpdates.priority = updates.priority;
        if (updates.energyLevel) dbUpdates.energy_level = updates.energyLevel;
        if (updates.estimatedTime) dbUpdates.estimated_time = updates.estimatedTime;
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.description) dbUpdates.description = updates.description;
        if (updates.status) dbUpdates.status = updates.status;

        if (Object.keys(dbUpdates).length > 0) {
            await supabase.from('tasks').update(dbUpdates).eq('id', id);
        }

        // Handle dependencies (blockedBy)
        if (updates.blockedBy) {
            // Clear existing
            await supabase.from('task_dependencies').delete().eq('blocked_id', id);

            // Insert new
            if (updates.blockedBy.length > 0) {
                const depRows = updates.blockedBy.map(blockerId => ({
                    blocker_id: blockerId,
                    blocked_id: id
                }));
                await supabase.from('task_dependencies').insert(depRows);
            }
        }
    }
  },

  addXP: async (amount) => {
      set((state) => ({
          userStats: {
              ...state.userStats,
              xp: state.userStats.xp + amount
          }
      }));
      // DB Sync logic would go here
  },

  setBadDayProtocol: (active) => set({ badDayProtocol: active }),

  updateBio: async (metric, value) => {
    set((state) => ({
      userStats: {
        ...state.userStats,
        bio: { ...state.userStats.bio, [metric]: value }
      }
    }));
  },
}));
