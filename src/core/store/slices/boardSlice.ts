import { createSlice } from '@reduxjs/toolkit';

import Images from '../../../assets/images';
import { BoardInterface } from '../types';

const initialState: BoardInterface[] = [{ name: 'Acme Corp workspace', logo: Images.PredefinedLogo }];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

// @todo: Fix it
// eslint-disable-next-line no-empty-pattern
export const {} = boardSlice.actions;
