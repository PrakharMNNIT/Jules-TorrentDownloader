import Dexie, { Table } from 'dexie';
import { Board, Task } from '@/types';

export class VelocityDatabase extends Dexie {
  boards!: Table<Board>;
  tasks!: Table<Task>;

  constructor() {
    super('VelocityKanbanDB');
    this.version(1).stores({
      boards: 'id, ownerId, updatedAt',
      tasks: 'id, boardId, columnId, position, updatedAt'
    });
  }
}

export const db = new VelocityDatabase();

// Initial seed helper
export async function seedDatabase() {
  const boardCount = await db.boards.count();
  if (boardCount === 0) {
    const defaultBoardId = 'board-1';
    await db.boards.add({
      id: defaultBoardId,
      ownerId: 'local-user',
      title: 'Demo Board',
      columns: [
        { id: 'col-todo', title: 'To Do', order: 0 },
        { id: 'col-doing', title: 'In Progress', order: 1 },
        { id: 'col-done', title: 'Done', order: 2 }
      ],
      theme: {
        accentColor: '#0D9488',
        mode: 'system',
        particleEffects: true
      },
      version: 1,
      updatedAt: Date.now()
    });

    await db.tasks.bulkAdd([
      {
        id: 'task-1',
        boardId: defaultBoardId,
        columnId: 'col-todo',
        position: 0,
        title: 'Review Physics Engine',
        description: 'Check spring damping values.',
        priority: 'high',
        energy: 'high',
        aiContext: {},
        updatedAt: Date.now()
      },
      {
        id: 'task-2',
        boardId: defaultBoardId,
        columnId: 'col-doing',
        position: 0,
        title: 'Optimize Assets',
        description: 'Compress textures for mobile.',
        priority: 'medium',
        energy: 'low',
        aiContext: {},
        updatedAt: Date.now()
      }
    ]);
  }
}
