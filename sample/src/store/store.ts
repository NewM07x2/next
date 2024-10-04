// store.ts
import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from './slices/counterSlice';
import counterAPIReducer from './slices/counterApiSlice';

export const store = configureStore({
  reducer: {
    counter: reducerSlice,
    counterAPI: counterAPIReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;