import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, useMotionValue, useTransform, useVelocity, useSpring } from "framer-motion";
import { GripVertical, Zap, Clock, Activity, Flag } from "lucide-react";
import { Task } from "@/types";
import { clsx } from "clsx";
import { useEffect } from "react";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  // Physics Simulation for Drag Tilt
  const x = useMotionValue(0);
  // Sync DndKit transform to Motion Value
  useEffect(() => {
    if (transform) {
        x.set(transform.x);
    }
  }, [transform, x]);

  const xVelocity = useVelocity(x);
  const rotate = useTransform(xVelocity, [-1000, 1000], [-15, 15]); // Tilt based on speed
  const rotateSpring = useSpring(rotate, { stiffness: 400, damping: 15 });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 bg-vk-primary/5 border-2 border-vk-primary border-dashed rounded-2xl h-[160px] animate-pulse"
      />
    );
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        rotate: isDragging ? rotateSpring : 0, // Only tilt when dragging (simulated via Overlay usually, but here applied to item if needed)
      }}
      {...attributes}
      {...listeners}
      layoutId={task.id}
      initial={{ scale: 1, boxShadow: "none" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(var(--vk-primary), 0.15)",
        borderColor: "rgba(var(--vk-primary), 0.5)"
      }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "bg-vk-surface border border-vk-border p-5 rounded-2xl relative group cursor-grab active:cursor-grabbing touch-none select-none transition-colors duration-300",
        // Glassmorphism feel
        "backdrop-blur-sm shadow-sm hover:shadow-lg"
      )}
    >
      {/* Decorative Gradient Blob on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-vk-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

      {/* Header: Title & Grip */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="font-heading font-semibold text-sm text-vk-text leading-snug line-clamp-3">
          {task.title}
        </h3>
        <div className="text-vk-border group-hover:text-vk-primary transition-colors">
          <GripVertical size={16} />
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-vk-text-muted mb-5 line-clamp-2 font-body relative z-10 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Bento Grid Metadata Footer */}
      <div className="grid grid-cols-2 gap-2 mt-auto relative z-10">
        {/* Priority Chip */}
        <div className={clsx(
            "flex items-center gap-2 px-2 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider",
            task.priority === 'high'
                ? "bg-vk-danger/10 border-vk-danger/20 text-vk-danger"
                : "bg-vk-surface border-vk-border text-vk-text-muted"
        )}>
            <Flag size={12} className={task.priority === 'high' ? "fill-current" : ""} />
            <span>{task.priority}</span>
        </div>

        {/* Energy Chip */}
        <div className={clsx(
            "flex items-center gap-2 px-2 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider",
            task.energy === 'high'
                ? "bg-vk-accent/10 border-vk-accent/20 text-vk-accent"
                : "bg-vk-surface border-vk-border text-vk-text-muted"
        )}>
            <Zap size={12} className={task.energy === 'high' ? "fill-current" : ""} />
            <span>{task.energy}</span>
        </div>
      </div>

      {/* Hover Glow Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-vk-primary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
