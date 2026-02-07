import { useStore } from "@/lib/store";
import { TaskItem } from "./TaskItem";
import { ListTodo } from "lucide-react";

export function WeeklyBattlePlan() {
  const { tasks, toggleTask } = useStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
          <ListTodo className="text-primary w-6 h-6" />
          WEEKLY BATTLE PLAN
        </h2>
        <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20">
            WEEK 1
        </div>
      </div>

      <div className="bg-surface-dark border border-[#282e39] rounded-xl overflow-hidden flex flex-col">
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
            />
        ))}
      </div>
    </div>
  );
}
