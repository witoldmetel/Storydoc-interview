export type BoardSliceType = {
  activeBoardId: number | null;
  boards: BoardType[];
};

export type BoardType = {
  id: number;
  name: string;
  initials: string;
  listIds: ListType['id'][];

  logo?: string;
};

export type ListType = {
  id: number;
  name: string;
  boardId: BoardType['id'];
  tasksIds: TaskType['id'][];
};

export type TaskType = {
  id: number;
  name: string;
  listId: ListType['id'];
  subtasks: SubtaskType[];
};

export type SubtaskType = Omit<TaskType, 'listId' | 'subtasks'>;

export const DRAGGABLE_TYPE = {
  BOARD: 'BOARD',
  LIST: 'LIST',
  TASK: 'TASK',
} as const;

export type DraggableType = keyof typeof DRAGGABLE_TYPE;
