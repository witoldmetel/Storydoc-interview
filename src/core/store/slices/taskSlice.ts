import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialTaskState } from '../constants';
import { RootState } from '../store';
import { TaskType } from '../types';

const initialState: TaskType[] = initialTaskState;

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Pick<TaskType, 'listId' | 'name'>>) => {
      const { listId, name } = action.payload;

      const date = new Date();
      const taskId = date.getTime();

      state.push({ id: taskId, listId, name, subtasks: [] });
    },
    updateTask: (state, action: PayloadAction<{ id: number; newName: string }>) => {
      const { id, newName } = action.payload;

      const taskIndex = state.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        state[taskIndex].name = newName;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskIdToDelete = action.payload;

      return state.filter((task) => task.id !== taskIdToDelete);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;

/**
 * SELECTORS
 */
const selectTasks = (state: RootState) => {
  return state.task;
};

export const selectTasksFromList = createSelector([selectTasks, (_, listId: number) => listId], (tasks, listId) =>
  tasks.filter((task) => task.listId === listId)
);
