import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WalletResponse } from './types';

interface WalletState {
  currentWallet: WalletResponse | null;
}

const initialState: WalletState = {
  currentWallet: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setCurrentWallet(state, action: PayloadAction<WalletResponse>) {
      state.currentWallet = action.payload;
    },
  },
});

export const { setCurrentWallet } = walletSlice.actions;
export default walletSlice.reducer;
