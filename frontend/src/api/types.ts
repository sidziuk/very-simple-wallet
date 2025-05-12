export type Currency = 'CZK' | 'EUR';

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

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL';

export interface TransactionResponse {
  id: number;
  currency: Currency;
  type: TransactionType;
  amount: number;
  createdAt: string;
  note?: string;
}
