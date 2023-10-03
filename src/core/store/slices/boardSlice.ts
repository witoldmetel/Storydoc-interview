import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBoardInitials } from '../../components/utils';
import { initialBoardState } from '../constants';
import { RootState } from '../store';
import { BoardType } from '../types';

const initialState: BoardType[] = initialBoardState;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<Pick<BoardType, 'name' | 'logo'>>) => {
      const { name, logo } = action.payload;

      // generate unique id for board
      const date = new Date();
      const boardId = date.getTime();

      // Deactivate all existing boards
      state.forEach((board) => {
        board.isActive = false;
      });

      state.push({
        id: boardId,
        name,
        initials: getBoardInitials(name),
        logo: logo || '',
        isActive: true,
        listIds: [],
      });
    },
    updateBoard: (state, action: PayloadAction<{ id: number; newName: string }>) => {
      const { id, newName } = action.payload;

      const boardIndex = state.findIndex((board) => board.id === id);

      if (boardIndex !== -1) {
        state[boardIndex].name = newName;
        state[boardIndex].initials = getBoardInitials(newName);
      }
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      const boardId = action.payload;

      setActiveBoard(null);

      return state.filter((board) => board.id !== boardId);
    },
    setActiveBoard: (state, action: PayloadAction<number | null>) => {
      const boardIdToSetActive = action.payload;

      state.forEach((board) => {
        board.isActive = board.id === boardIdToSetActive;
      });
    },
  },
});

export const { createBoard, updateBoard, deleteBoard, setActiveBoard } = boardSlice.actions;

export default boardSlice.reducer;

/**
 * SELECTORS
 */
const selectBoards = (state: RootState) => {
  return state.board;
};

export const selectActiveBoardId = createSelector([selectBoards], (boards) => {
  return boards.find((item) => item.isActive)?.id ?? null;
});
