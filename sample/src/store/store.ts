// store.ts
import { configureStore } from '@reduxjs/toolkit';

// 必要に応じてスライスをインポート
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  // reducer: {
  //   counter: counterReducer,
  // },
  reducer: {}, // 例として空のリデューサー
});

// 初期の TypeScript サポートのために以下を追加
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;