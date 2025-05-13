import type { CurrencyEnum } from './currencySlice';

export type Currency = keyof typeof CurrencyEnum;

export interface WalletResponse {
  id: number;
  name: string;
  balanceCzk: string; // or number if backend returns it as number
  balanceEur: string;
}

export interface CreateWalletRequest {
  name: string;
}

export interface TransactionRequest {
  currency: Currency;
  amount: number;
  note?: string;
}

export const TransactionTypeEnum = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
} as const;

export type TransactionType = keyof typeof TransactionTypeEnum;

export interface TransactionResponse {
  id: number;
  currency: Currency;
  type: TransactionType;
  amount: number;
  createdAt: string;
  note?: string;
}
