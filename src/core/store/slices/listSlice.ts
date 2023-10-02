import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { ListType } from '../types';

const initialState = [
  { id: 0, name: 'Working on', boardId: 0, cards: [] },
  { id: 1, name: 'Review', boardId: 0, cards: [] },
];

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ListType>) => {
      const { boardId, name } = action.payload;

      state.push({ id: state.length, boardId, name, cards: [] });
    },
    updateList: (state, action: PayloadAction<{ id: number; newName: string }>) => {
      const { id, newName } = action.payload;

      const listIndex = state.findIndex((list) => list.id === id);

      if (listIndex !== -1) {
        state[listIndex].name = newName;
      }
    },
    deleteList: (state, action: PayloadAction<number>) => {
      const listIdToDelete = action.payload;

      return state.filter((list) => list.id !== listIdToDelete);
    },
  },
});

export const { addList, updateList, deleteList } = listSlice.actions;

export default listSlice.reducer;

/**
 * SELECTORS
 */
const selectActiveBoardId = (state: RootState) => {
  return state.board.find((item) => item.isActive)?.id;
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
