import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Images from '../../../assets/images';
import { getWorkspaceInitials } from '../../components/utils';
import { WorkspaceType } from '../types';

const initialState: WorkspaceType[] = [
  { id: 0, name: 'Acme Corp workspace', initials: 'A', logo: Images.PredefinedLogo },
];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<WorkspaceType>) => {
      const { id, name, initials, logo } = action.payload;

      state.push({ id, name, initials, logo: logo || '' });
    },
    updateBoard: (state, action: PayloadAction<{ id: number; newName: string }>) => {
      const { id, newName } = action.payload;

      const boardIndex = state.findIndex((board) => board.id === id);

      if (boardIndex !== -1) {
        state[boardIndex].name = newName;
        state[boardIndex].initials = getWorkspaceInitials(newName);
      }
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      const boardId = action.payload;

      return state.filter((board) => board.id !== boardId);
    },
  },
});

export const { createBoard, updateBoard, deleteBoard } = boardSlice.actions;

export default boardSlice.reducer;
