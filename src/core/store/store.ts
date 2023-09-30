import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './slices/boardSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
