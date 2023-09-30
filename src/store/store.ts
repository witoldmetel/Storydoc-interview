import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices';

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;