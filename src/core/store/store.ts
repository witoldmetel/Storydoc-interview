import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import boardReducer from './slices/boardSlice';
import listReducer from './slices/listSlice';
import taskReducer from './slices/taskSlice';

const reducer = combineReducers({
  board: boardReducer,
  list: listReducer,
  task: taskReducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
