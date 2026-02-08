import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Column, Task } from "@/types";
import { TaskCard } from "@/components/Card/TaskCard";
import { clsx } from "clsx";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "Column", column },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: column.order * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="flex flex-col w-[340px] shrink-0 h-full max-h-full snap-center"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2 select-none group">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-2 h-2 rounded-full transition-colors duration-500",
            isOver ? "bg-vk-accent shadow-[0_0_10px_var(--vk-accent)]" : "bg-vk-border"
          )} />
          <h2 className="font-heading font-bold text-sm text-vk-text-muted uppercase tracking-[0.2em] group-hover:text-vk-primary transition-colors">
            {column.title}
          </h2>
          <span className="bg-vk-surface px-2 py-0.5 rounded text-[10px] font-mono text-vk-text-muted border border-vk-border">
            {tasks.length}
          </span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-vk-surface text-vk-text-muted transition-all opacity-0 group-hover:opacity-100 hover:text-vk-primary">
          <Plus size={18} />
        </button>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={clsx(
            "flex-1 rounded-2xl p-3 flex flex-col gap-4 overflow-y-auto min-h-[150px] transition-all duration-300",
            // Glassmorphism
            "bg-vk-surface/30 backdrop-blur-md border border-white/5",
            // Drop State
            isOver ? "bg-vk-primary/5 border-vk-primary/30 shadow-[inset_0_0_20px_rgba(var(--vk-primary),0.1)]" : "hover:bg-vk-surface/40"
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </SortableContext>
      </div>
    </motion.div>
  );
}
