import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBoardInitials } from '../../components/utils';
import { initialBoardState } from '../constants';
import { RootState } from '../store';
import { BoardSliceType, BoardType } from '../types';

const initialState: BoardSliceType = initialBoardState;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<Pick<BoardType, 'name' | 'logo'>>) => {
      const { name, logo } = action.payload;

      // generate unique id for board
      const date = new Date();
      const boardId = date.getTime();

      state.activeBoardId = boardId;

      state.boards.push({
        id: boardId,
        name,
        initials: getBoardInitials(name),
        logo: logo || '',
        listIds: [],
      });
    },
    updateBoard: (state, action: PayloadAction<{ id: number; newName: string }>) => {
      const { id, newName } = action.payload;

      const boardIndex = state.boards.findIndex((board) => board.id === id);

      if (boardIndex !== -1) {
        state.boards[boardIndex].name = newName;
        state.boards[boardIndex].initials = getBoardInitials(newName);
      }
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      const boardId = action.payload;

      return {
        activeBoardId: state.activeBoardId === boardId ? null : state.activeBoardId,
        boards: state.boards.filter((board) => board.id !== boardId),
      };
    },
    setActiveBoard: (state, action: PayloadAction<number | null>) => {
      state.activeBoardId = action.payload;
    },
    reorderBoards: (state, action) => {
      return {
        ...state,
        boards: action.payload,
      };
    },
  },
});

export const { createBoard, updateBoard, deleteBoard, setActiveBoard, reorderBoards } = boardSlice.actions;

export default boardSlice.reducer;

/**
 * SELECTORS
 */
export const selectActiveBoardId = (state: RootState) => {
  return state.board.activeBoardId;
};
