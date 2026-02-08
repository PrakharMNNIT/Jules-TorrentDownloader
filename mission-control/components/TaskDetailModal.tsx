import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Save, Trash2, Calendar, Zap, AlertTriangle, Clock, Link as LinkIcon } from "lucide-react";
import { useStore, type Task } from "@/lib/store";
import { cn } from "@/lib/utils";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  energyLevel: z.enum(["low", "medium", "high"]),
  estimatedTime: z.number().min(0, "Estimate must be positive"),
  status: z.enum(["pending", "in_progress", "completed"]),
  blockedBy: z.array(z.string()).optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export function TaskDetailModal() {
  const { selectedTaskId, tasks, setSelectedTask, updateTaskDetails } = useStore();
  const task = tasks.find((t) => t.id === selectedTaskId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      energyLevel: "medium",
      estimatedTime: 30,
      status: "pending",
      blockedBy: [],
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        energyLevel: task.energyLevel,
        estimatedTime: task.estimatedTime,
        status: task.status,
        blockedBy: task.blockedBy || [],
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: TaskFormData) => {
    if (task) {
      await updateTaskDetails(task.id, data);
      setSelectedTask(null);
    }
  };

  if (!selectedTaskId || !task) return null;

  const priorityColor = {
    low: "bg-slate-500",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-[#101622] border border-[#282e39] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#282e39] bg-[#1b212d]">
            <div className="flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded-full", priorityColor[watch("priority")])} />
              <h2 className="text-white font-bold text-lg tracking-wide uppercase">
                Task Details // {task.id.slice(0, 4)}
              </h2>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-primary uppercase tracking-wider">Directive Title</label>
              <input
                {...register("title")}
                className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold text-lg"
                placeholder="Enter task title..."
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Briefing</label>
              <textarea
                {...register("description")}
                className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px]"
                placeholder="Add detailed description..."
              />
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> Priority Level
                </label>
                <select
                  {...register("priority")}
                  className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-white focus:border-primary outline-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">CRITICAL</option>
                </select>
              </div>

              {/* Energy */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Energy Cost
                </label>
                <select
                  {...register("energyLevel")}
                  className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-white focus:border-primary outline-none"
                >
                  <option value="low">Low Energy</option>
                  <option value="medium">Medium Energy</option>
                  <option value="high">High Energy</option>
                </select>
              </div>

              {/* Estimate */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Time Estimate (Min)
                </label>
                <input
                  type="number"
                  {...register("estimatedTime", { valueAsNumber: true })}
                  className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-white focus:border-primary outline-none"
                />
                {errors.estimatedTime && <p className="text-red-500 text-xs">{errors.estimatedTime.message}</p>}
              </div>

               {/* Status */}
               <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Current Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#1b212d] border border-[#282e39] rounded-lg p-3 text-white focus:border-primary outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Dependencies */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" /> Blocked By (Dependencies)
                </label>
                <div className="bg-[#1b212d] border border-[#282e39] rounded-lg p-3 max-h-40 overflow-y-auto">
                    {tasks.filter(t => t.id !== task.id).map(t => (
                        <label key={t.id} className="flex items-center gap-3 mb-2 last:mb-0 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
                            <input
                                type="checkbox"
                                value={t.id}
                                {...register("blockedBy")}
                                className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-200">{t.title}</span>
                                <span className="text-[10px] text-slate-500 uppercase">{t.status}</span>
                            </div>
                        </label>
                    ))}
                    {tasks.length <= 1 && (
                        <p className="text-xs text-slate-500 italic">No other tasks available to link.</p>
                    )}
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-[#282e39] bg-[#1b212d] flex justify-between items-center">
             <button
              type="button"
              className="text-red-500 hover:text-red-400 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty}
                className={cn(
                    "flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(37,106,244,0.4)] transition-all",
                    !isDirty ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(37,106,244,0.6)]"
                )}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
