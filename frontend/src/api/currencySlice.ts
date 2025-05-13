import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Currency } from './types';

export const CurrencyEnum = {
  CZK: 'CZK',
  EUR: 'EUR',
} as const;

interface CurrencyState {
  selectedCurrency: Currency;
}

const initialState: CurrencyState = {
  selectedCurrency: CurrencyEnum.CZK,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
