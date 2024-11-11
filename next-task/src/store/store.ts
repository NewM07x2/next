// store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import reducerSlice from './slices/counterSlice';
import counterAPIReducer from './slices/counterApiSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    // counter: reducerSlice,
    // counterAPI: counterAPIReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

