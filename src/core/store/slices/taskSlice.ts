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
        state[taskIndex].subtasks.forEach((subtask) => (subtask.checked = checked));
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
    updateSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string; newName: string }>) => {
      const { taskId, subtaskId, newName } = action.payload;

      const task = state.find((task) => task.id === taskId);

      if (task) {
        const subtaskIndex = task.subtasks.findIndex((subtask) => subtask.id === subtaskId);

        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex].name = newName;
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
    checkSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string; checked: boolean }>) => {
      const { taskId, subtaskId, checked } = action.payload;

      const task = state.find((task) => task.id === taskId);

      if (task) {
        const subtaskIndex = task.subtasks.findIndex((subtask) => subtask.id === subtaskId);

        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex].checked = checked;
        }

        if (task.subtasks.every((subtask) => subtask.checked)) {
          task.checked = true;
        } else {
          task.checked = false;
        }
      }
    },
  },
  /**
   * EXTRA REDUCERS
   */
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

export const { addTask, updateTask, deleteTask, checkTask, addSubtask, updateSubtask, deleteSubtask, checkSubtask } =
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

export const selectSubtasksInfo = createSelector([selectTasks, (_, taskId: string) => taskId], (tasks, taskId) => {
  const selectedTask = tasks.find((task) => task.id === taskId);

  if (!selectedTask) {
    return { subtasksCount: 0, checkedSubtasksCount: 0 };
  }

  const subtasksCount = selectedTask.subtasks.length;
  const checkedSubtasksCount = selectedTask.subtasks.filter((subtask) => subtask.checked).length;

  return { subtasksCount, checkedSubtasksCount };
});
