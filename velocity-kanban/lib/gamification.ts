import { db } from "@/lib/db";
import { type Task } from "@/types";

export interface GamificationState {
  streak: number;
  xp: number;
  level: number;
  lastCompletion: number;
}

export const BASE_XP_TASK = 50;
export const STREAK_BONUS_MULTIPLIER = 0.1;

export async function awardCompletionXP(task: Task) {
  // In a real implementation this would be persisted in a user profile table
  // For MVP we just calculate it and return the delta for the UI celebration

  let xpGain = BASE_XP_TASK;
  if (task.priority === 'high') xpGain *= 1.5;
  if (task.energy === 'high') xpGain *= 1.2;

  return Math.round(xpGain);
}
