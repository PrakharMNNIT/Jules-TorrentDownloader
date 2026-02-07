import { type Task } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';
  const isPending = task.status === 'pending';

  return (
    <label className={cn(
      "group flex gap-x-4 p-5 border-b border-[#282e39] transition-colors cursor-pointer select-none",
      isInProgress ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-surface-hover"
    )}>
      {/* Checkbox */}
      <div className="relative flex items-start pt-0.5">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
          className="peer sr-only"
        />
        <div className={cn(
          "h-6 w-6 rounded border-2 transition-all flex items-center justify-center",
          isCompleted
            ? "bg-primary border-primary text-white"
            : "bg-transparent border-[#3b4354] text-transparent group-hover:border-primary/50"
        )}>
           <Check className="w-4 h-4" />
        </div>
        {/* Glow effect on checked */}
        <div className={cn(
            "absolute inset-0 bg-primary/20 rounded blur-sm transition-all duration-300",
            isCompleted ? "scale-150 opacity-100" : "scale-0 opacity-0"
        )} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
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
    </label>
  );
}
