"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor, closestCorners, defaultDropAnimationSideEffects, DropAnimation } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "../Card/TaskCard";
import { Task } from "@/types";
import { db, seedDatabase } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import confetti from "canvas-confetti";

interface BoardCanvasProps {
  boardId: string;
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export function BoardCanvas({ boardId }: BoardCanvasProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const board = useLiveQuery(() => db.boards.get(boardId), [boardId]);
  const tasks = useLiveQuery(() =>
    db.tasks.where('boardId').equals(boardId).toArray()
  , [boardId]);

  useEffect(() => {
    seedDatabase();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks?.find(t => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks?.find(t => t.id === activeId);
    if (!activeTask) return;

    // Detect if dropped in "Done" column (assuming title includes 'Done' or known ID)
    const overColumn = board?.columns.find(col => col.id === overId);
    const overTask = tasks?.find(t => t.id === overId);

    let targetColumnId = null;

    if (overColumn) {
        targetColumnId = overId;
    } else if (overTask) {
        targetColumnId = overTask.columnId;
    }

    if (targetColumnId) {
        // Trigger Confetti if moving to Done
        const targetCol = board?.columns.find(c => c.id === targetColumnId);
        if (targetCol?.title.toLowerCase().includes('done') && activeTask.columnId !== targetColumnId) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0D9488', '#F97316', '#FFFFFF']
            });
        }

        // Persistence Logic
        if (overColumn && activeTask.columnId !== overId) {
             await db.tasks.update(activeId, { columnId: overId, position: 0 });
        } else if (overTask) {
             if (activeTask.columnId !== overTask.columnId) {
                await db.tasks.update(activeId, { columnId: overTask.columnId, position: overTask.position });
             } else {
                await db.tasks.update(activeId, { position: overTask.position });
                await db.tasks.update(overId, { position: activeTask.position });
             }
        }
    }
  };

  if (!board || !tasks) return (
    <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-vk-primary/30 border-t-vk-primary rounded-full animate-spin" />
            <p className="font-mono text-xs text-vk-text-muted animate-pulse">IGNITING ENGINE...</p>
        </div>
    </div>
  );

  return (
    <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-8 p-12 overflow-x-auto items-start snap-x scroll-smooth">
        {board.columns.sort((a: any, b: any) => a.order - b.order).map((col: any) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={tasks.filter(t => t.columnId === col.id).sort((a,b) => a.position - b.position)}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
            <div className="rotate-3 scale-105 cursor-grabbing pointer-events-none">
                <TaskCard task={activeTask} />
            </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
