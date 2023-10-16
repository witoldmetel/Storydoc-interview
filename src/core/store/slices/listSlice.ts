import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { initialListState } from '../constants';
import { RootState } from '../store';
import { ListType } from '../types';

const initialState: ListType[] = initialListState;

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Pick<ListType, 'boardId' | 'name'>>) => {
      const { boardId, name } = action.payload;

      // generate unique id for board
      const listId = nanoid();

      state.push({ id: listId, boardId, name, tasksIds: [] });
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
  extraReducers: {
    ['board/deleteBoard']: (state, action) => {
      const boardId = action.payload;

      return state.filter((list) => list.boardId !== boardId);
    },
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
