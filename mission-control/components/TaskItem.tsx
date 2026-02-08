import { type Task, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  isBlocked?: boolean;
}

export function TaskItem({ task, onToggle, isBlocked = false }: TaskItemProps) {
  const { setSelectedTask } = useStore();
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';
  const isPending = task.status === 'pending';

  return (
    <div className={cn(
      "group flex gap-x-4 p-5 border-b border-[#282e39] transition-colors select-none relative",
      isInProgress ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-surface-hover",
      isBlocked && "opacity-50 cursor-not-allowed bg-red-500/5"
    )}>
      {/* Blocked Overlay */}
      {isBlocked && (
        <div className="absolute top-2 right-2 text-red-500 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider border border-red-500/20 bg-red-500/10 px-2 py-0.5 rounded pointer-events-none">
            <Lock className="w-3 h-3" /> Blocked
        </div>
      )}

      {/* Checkbox */}
      <div
        className={cn("relative flex items-start pt-0.5 cursor-pointer", isBlocked && "pointer-events-none")}
        onClick={(e) => {
            e.stopPropagation();
            if (!isBlocked) onToggle(task.id);
        }}
      >
        <div className={cn(
          "h-6 w-6 rounded border-2 transition-all flex items-center justify-center",
          isCompleted
            ? "bg-primary border-primary text-white"
            : isBlocked ? "border-red-500/30 bg-red-500/10" : "bg-transparent border-[#3b4354] text-transparent group-hover:border-primary/50"
        )}>
           {isBlocked ? <Lock className="w-3 h-3 text-red-500" /> : <Check className="w-4 h-4" />}
        </div>

        {/* Glow effect on checked */}
        <div className={cn(
            "absolute inset-0 bg-primary/20 rounded blur-sm transition-all duration-300",
            isCompleted ? "scale-150 opacity-100" : "scale-0 opacity-0"
        )} />
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1 cursor-pointer"
        onClick={() => setSelectedTask(task.id)}
      >
        <div className="flex justify-between w-full items-start">
          <p className={cn(
            "text-base font-medium leading-normal transition-colors",
            isCompleted ? "text-slate-400 line-through group-hover:text-slate-300" : "text-white"
          )}>
            {task.title}
          </p>

          {/* Tags */}
          <div className="flex gap-2">
            {isCompleted && (
                 <span className="text-[10px] font-mono uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Done
                 </span>
            )}
            {isInProgress && (
                <span className="text-[10px] font-mono uppercase text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    In Progress
                </span>
            )}
            {isPending && (
                <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    Pending
                </span>
            )}
          </div>
        </div>

        {task.description && (
          <p className="text-slate-400 text-sm mt-1 group-hover:text-slate-300 transition-colors">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
}
