import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  WalletResponse,
  CreateWalletRequest,
  TransactionRequest,
  TransactionResponse,
} from './types';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/wallets' }),
  tagTypes: ['Wallet', 'Transaction'],

  endpoints: (builder) => ({
    getAllWallets: builder.query<WalletResponse[], void>({
      query: () => '/',
      providesTags: ['Wallet'],
    }),

    createWallet: builder.mutation<WalletResponse, CreateWalletRequest>({
      query: (wallet) => ({
        url: '/',
        method: 'POST',
        body: wallet,
      }),
      invalidatesTags: ['Wallet'],
    }),

    deposit: builder.mutation<TransactionResponse, { walletId: number; data: TransactionRequest }>({
      query: ({ walletId, data }) => ({
        url: `/${walletId}/deposit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet', 'Transaction'],
    }),

    withdraw: builder.mutation<TransactionResponse, { walletId: number; data: TransactionRequest }>({
      query: ({ walletId, data }) => ({
        url: `/${walletId}/withdraw`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet', 'Transaction'],
    }),

    getTransactionsByCurrency: builder.query<
      TransactionResponse[],
      { walletId: number; currency: string }
    >({
      query: ({ walletId, currency }) => `/${walletId}/transactions?currency=${currency}`,
      providesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetAllWalletsQuery,
  useCreateWalletMutation,
  useDepositMutation,
  useWithdrawMutation,
  useGetTransactionsByCurrencyQuery,
} = walletApi;
