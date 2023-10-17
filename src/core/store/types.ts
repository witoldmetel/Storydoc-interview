export type BoardSliceType = {
  activeBoardId: string | null;
  boards: BoardType[];
};

export type BoardType = {
  id: string;
  name: string;
  initials: string;

  logo?: string;
};

export type ListType = {
  id: string;
  name: string;
  boardId: BoardType['id'];
  tasksIncluded: Pick<TaskType, 'id' | 'checked'>[];
};

export type TaskType = {
  id: string;
  name: string;
  checked: boolean;
  boardId: BoardType['id'];
  listId: ListType['id'];
  subtasks: SubtaskType[];
};

export type SubtaskType = Omit<TaskType, 'listId' | 'subtasks'> & { taskId: string };

export const DRAGGABLE_TYPE = {
  BOARD: 'BOARD',
  LIST: 'LIST',
  TASK: 'TASK',
} as const;

export type DraggableType = keyof typeof DRAGGABLE_TYPE;
