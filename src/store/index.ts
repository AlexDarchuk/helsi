import { configureStore } from '@reduxjs/toolkit';
import languagesSlice from './slices/languagesSlice';

export const store = configureStore({
  reducer: {
    language: languagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
