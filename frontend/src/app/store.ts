import { configureStore } from '@reduxjs/toolkit';
import { walletApi } from '../api/walletApi';

export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(walletApi.middleware),
});
