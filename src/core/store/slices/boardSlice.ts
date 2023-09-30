import { createSlice } from '@reduxjs/toolkit';

import { BoardInterface } from '../types';

const initialState: BoardInterface | Record<string, never> = {};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

// @todo: Fix it
// eslint-disable-next-line no-empty-pattern
export const {} = boardSlice.actions;
