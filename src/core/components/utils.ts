import { SubtaskType, TaskType } from '../store/types';

export function getBoardInitials(boardName: string) {
  return boardName ? boardName.charAt(0).toUpperCase() : '';
}

export function isTask(task: TaskType | SubtaskType): task is TaskType {
  return (task as TaskType).subtasks !== undefined;
}
