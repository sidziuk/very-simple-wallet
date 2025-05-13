import { configureStore } from '@reduxjs/toolkit';
import { walletApi } from '../api/walletApi';
import walletReducer from '../api/walletSlice';
import currencyReducer from '../api/currencySlice';

export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    wallet: walletReducer,
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(walletApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
