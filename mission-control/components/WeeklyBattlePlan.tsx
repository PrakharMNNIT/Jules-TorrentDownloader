import { useStore, type Project, type Task } from "@/lib/store";
import { TaskItem } from "./TaskItem";
import { ListTodo, ChevronRight, FolderOpen, Folder, Plus, PlusCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function WeeklyBattlePlan() {
  const { tasks, projects, toggleTask, adminMode } = useStore();

  // Helper to build hierarchy
  const getProjectTasks = (projectId: string) => tasks.filter(t => t.projectId === projectId);
  const getSubProjects = (projectId: string) => projects.filter(p => p.parentId === projectId);
  const rootProjects = projects.filter(p => !p.parentId);
  const looseTasks = tasks.filter(t => !t.projectId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
          <ListTodo className="text-primary w-6 h-6" />
          WEEKLY BATTLE PLAN
        </h2>

        <div className="flex items-center gap-2">
            {adminMode && (
                <button className="text-xs font-mono text-white bg-primary hover:bg-blue-600 px-3 py-1 rounded transition-colors flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> ADD TASK
                </button>
            )}
            <div className={cn(
                "text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20 flex items-center gap-1",
                adminMode && "hover:border-primary/50 cursor-pointer"
            )}>
                WEEK 1
                {adminMode && <ChevronDown className="w-3 h-3" />}
            </div>
        </div>
      </div>

      <div className="bg-surface-dark border border-[#282e39] rounded-xl overflow-hidden flex flex-col">
        {/* Root Projects */}
        {rootProjects.map(project => (
            <ProjectGroup
                key={project.id}
                project={project}
                allProjects={projects}
                allTasks={tasks}
                onToggleTask={toggleTask}
            />
        ))}

        {/* Loose Tasks */}
        {looseTasks.length > 0 && (
            <div className="border-t border-[#282e39]">
                 <div className="bg-[#1b212d] px-4 py-2 text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <ListTodo className="w-3 h-3" /> Miscellaneous Directives
                 </div>
                 {looseTasks.map(task => {
                    const isBlocked = task.blockedBy?.some(blockerId => {
                        const blocker = tasks.find(t => t.id === blockerId);
                        return blocker && blocker.status !== 'completed';
                    });
                    return <TaskItem key={task.id} task={task} onToggle={toggleTask} isBlocked={isBlocked} />
                 })}
            </div>
        )}

        {/* Admin Add Task Placeholder */}
        {adminMode && (
             <div className="edit-border p-4 m-2 rounded-lg flex items-center justify-center cursor-pointer group border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                <span className="text-primary/70 group-hover:text-primary font-mono text-sm flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Click to add new task...
                </span>
            </div>
        )}
      </div>
    </div>
  );
}

function ProjectGroup({
    project,
    allProjects,
    allTasks,
    onToggleTask
}: {
    project: Project,
    allProjects: Project[],
    allTasks: Task[],
    onToggleTask: (id: string) => void
}) {
    const [isOpen, setIsOpen] = useState(true);
    const tasks = allTasks.filter(t => t.projectId === project.id);
    const subProjects = allProjects.filter(p => p.parentId === project.id);

    return (
        <div className="border-b border-[#282e39] last:border-b-0">
            {/* Project Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-[#161b26] hover:bg-[#1f242e] cursor-pointer transition-colors"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                </motion.div>

                {isOpen ? <FolderOpen className="w-4 h-4 text-primary" /> : <Folder className="w-4 h-4 text-primary/70" />}

                <span className="text-sm font-bold text-slate-200">{project.title}</span>
                <span className="text-xs text-slate-500 ml-auto font-mono">
                    {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
                </span>
            </div>

            {/* Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {/* Subprojects */}
                        {subProjects.map(sub => (
                             <div key={sub.id} className="pl-4 border-l border-[#282e39] ml-4">
                                <ProjectGroup
                                    project={sub}
                                    allProjects={allProjects}
                                    allTasks={allTasks}
                                    onToggleTask={onToggleTask}
                                />
                             </div>
                        ))}

                        {/* Tasks */}
                        {tasks.map(task => {
                            const isBlocked = task.blockedBy?.some(blockerId => {
                                const blocker = allTasks.find(t => t.id === blockerId);
                                return blocker && blocker.status !== 'completed';
                            });

                            return (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={onToggleTask}
                                    isBlocked={isBlocked}
                                />
                            );
                        })}

                        {tasks.length === 0 && subProjects.length === 0 && (
                            <div className="p-4 text-xs text-slate-600 font-mono italic pl-10">
                                No active directives in this sector.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
