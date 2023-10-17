import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { initialListState } from '../constants';
import { RootState } from '../store';
import { ListType } from '../types';

import { deleteBoard } from './boardSlice';
import { addTask, checkTask, deleteTask } from './taskSlice';

const initialState: ListType[] = initialListState;

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Pick<ListType, 'boardId' | 'name'>>) => {
      const { boardId, name } = action.payload;

      // generate unique id for board
      const listId = nanoid();

      state.push({ id: listId, boardId, name, tasksIncluded: [] });
    },
    updateList: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const { id, newName } = action.payload;

      const listIndex = state.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        state[listIndex].name = newName;
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const listIdToDelete = action.payload;

      return state.filter((list) => list.id !== listIdToDelete);
    },
    reorderLists: (_, action: PayloadAction<ListType[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard, (state, action: PayloadAction<string>) => {
        const boardId = action.payload;

        return state.filter((list) => list.boardId !== boardId);
      })
      .addCase(addTask, (state, action) => {
        const { id: taskId, listId } = action.payload;

        const listIndex = state.findIndex((list) => list.id === listId);

        if (listIndex !== -1) {
          state[listIndex].tasksIncluded = [...state[listIndex].tasksIncluded, { id: taskId, checked: false }];
        }
      })
      .addCase(checkTask, (state, action) => {
        const { id: taskId, checked, listId } = action.payload;

        const listIndex = state.findIndex((list) => list.id === listId);

        if (listIndex !== -1) {
          const taskIndex = state[listIndex].tasksIncluded.findIndex((task) => task.id === taskId);

          state[listIndex].tasksIncluded[taskIndex] = {
            id: taskId,
            checked,
          };
        }
      })
      .addCase(deleteTask, (state, action) => {
        const { id: taskId, listId } = action.payload;

        const listIndex = state.findIndex((list) => list.id === listId);

        if (listIndex !== -1) {
          state[listIndex].tasksIncluded = state[listIndex].tasksIncluded.filter((task) => task.id !== taskId);
        }
      });
  },
});

export const { addList, updateList, deleteList, reorderLists } = listSlice.actions;

export default listSlice.reducer;

/**
 * SELECTORS
 */
const selectActiveBoardId = (state: RootState) => {
  return state.board.activeBoardId;
};

const selectLists = (state: RootState) => {
  return state.list;
};

export const selectListsFromActiveBoard = createSelector([selectActiveBoardId, selectLists], (activeBoardId, lists) => {
  if (activeBoardId === undefined) {
    return [];
  }

  return lists.filter((list) => list.boardId === activeBoardId);
});

export const selectListTasksInfo = createSelector(
  [selectListsFromActiveBoard, (_, listId: string) => listId],
  (lists, listId) => {
    const selectedList = lists.find((list) => list.id === listId);

    if (!selectedList) {
      return { tasksCount: 0, checkedTasksCount: 0 };
    }

    const tasksCount = selectedList.tasksIncluded.length;
    const checkedTasksCount = selectedList.tasksIncluded.filter((task) => task.checked).length;

    return { tasksCount, checkedTasksCount };
  }
);
