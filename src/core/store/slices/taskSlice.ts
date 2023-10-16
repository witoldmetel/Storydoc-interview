import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { initialTaskState } from '../constants';
import { RootState } from '../store';
import { SubtaskType, TaskType } from '../types';

const initialState: TaskType[] = initialTaskState;

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * TASK
     */
    addTask: (state, action: PayloadAction<Pick<TaskType, 'listId' | 'name'>>) => {
      const { listId, name } = action.payload;

      // generate unique id for board
      const taskId = nanoid();

      state.push({ id: taskId, listId, name, subtasks: [] });
    },
    updateTask: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const { id, newName } = action.payload;

      const taskIndex = state.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        state[taskIndex].name = newName;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskIdToDelete = action.payload;

      return state.filter((task) => task.id !== taskIdToDelete);
    },

    /**
     * SUBTASK
     */
    addSubtask: (state, action: PayloadAction<{ taskId: string; name: string }>) => {
      const { taskId, name } = action.payload;

      // generate unique id for board
      const subtaskId = nanoid();

      const task = state.find((task) => task.id === taskId);

      if (task) {
        task.subtasks.push({ id: subtaskId, name });
      }
    },
    updateSubtask: (
      state,
      action: PayloadAction<{ taskId: string; subtaskId: string; updatedSubtask: SubtaskType }>
    ) => {
      const { taskId, subtaskId, updatedSubtask } = action.payload;

      const task = state.find((task) => task.id === taskId);

      if (task) {
        const subtaskIndex = task.subtasks.findIndex((subtask) => subtask.id === subtaskId);

        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex] = updatedSubtask;
        }
      }
    },
    deleteSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string }>) => {
      const { taskId, subtaskId } = action.payload;

      const task = state.find((task) => task.id === taskId);

      if (task) {
        task.subtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask } = taskSlice.actions;

export default taskSlice.reducer;

/**
 * SELECTORS
 */
const selectTasks = (state: RootState) => {
  return state.task;
};

export const selectTasksFromList = createSelector([selectTasks, (_, listId: string) => listId], (tasks, listId) =>
  tasks.filter((task) => task.listId === listId)
);
