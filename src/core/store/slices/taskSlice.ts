import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialTaskState } from '../constants';
import { RootState } from '../store';
import { SubtaskType, TaskType } from '../types';

import { deleteBoard } from './boardSlice';
import { deleteList } from './listSlice';

const initialState: TaskType[] = initialTaskState;

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * TASK
     */
    addTask: (state, action: PayloadAction<Pick<TaskType, 'id' | 'listId' | 'boardId' | 'name'>>) => {
      const { id, listId, boardId, name } = action.payload;

      state.push({ id, listId, boardId, name, checked: false, subtasks: [] });
    },
    updateTask: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const { id, newName } = action.payload;

      const taskIndex = state.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        state[taskIndex].name = newName;
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: string; listId: string }>) => {
      const { id: taskId } = action.payload;

      return state.filter((task) => task.id !== taskId);
    },
    checkTask: (state, action: PayloadAction<{ id: string; checked: boolean; listId: string }>) => {
      const { id, checked } = action.payload;

      const taskIndex = state.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        state[taskIndex].checked = checked;
      }
    },

    /**
     * SUBTASK
     */
    addSubtask: (state, action: PayloadAction<Pick<SubtaskType, 'id' | 'taskId' | 'boardId' | 'name'>>) => {
      const { id: subtaskId, taskId, name, boardId } = action.payload;

      const task = state.find((task) => task.id === taskId);

      if (task) {
        task.subtasks.push({
          id: subtaskId,
          name,
          checked: false,
          boardId,
          taskId,
        });
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
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard, (state, action: PayloadAction<string>) => {
        const boardId = action.payload;

        return state.filter((list) => list.boardId !== boardId);
      })
      .addCase(deleteList, (state, action: PayloadAction<string>) => {
        const listId = action.payload;

        return state.filter((task) => task.listId !== listId);
      });
  },
});

export const { addTask, updateTask, deleteTask, checkTask, addSubtask, updateSubtask, deleteSubtask } =
  taskSlice.actions;

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
