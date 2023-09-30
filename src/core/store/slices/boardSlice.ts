import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Images from '../../../assets/images';
import { WorkspaceType } from '../types';

const initialState: WorkspaceType[] = [
  { name: 'Acme Corp workspace', initials: 'A', logo: Images.PredefinedLogo, createdAt: 0 },
];

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<WorkspaceType>) => {
      const { name, initials, createdAt, logo } = action.payload;

      state.push({ name, initials, createdAt, logo: logo || '' });
    },
  },
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;
