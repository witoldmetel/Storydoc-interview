export type BoardType = {
  id: number;
  name: string;
  initials: string;
  isActive: boolean;
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
  subtasks: Omit<TaskType, 'listId' | 'subtasks'>[];
};
