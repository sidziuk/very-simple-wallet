import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  WalletResponse,
  CreateWalletRequest,
  TransactionRequest,
  TransactionResponse,
  Currency,
} from './types';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Wallet', 'Transaction'],

  endpoints: (builder) => ({
    getAllWallets: builder.query<WalletResponse[], void>({
      query: () => '',
      providesTags: ['Wallet'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          const message = err?.error?.data?.message || 'Failed to load wallets';
          toast.error(message);
        }
      },
    }),

    createWallet: builder.mutation<WalletResponse, CreateWalletRequest>({
      query: (wallet) => ({
        url: '',
        method: 'POST',
        body: wallet,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Wallet created successfully');
        } catch (err: any) {
          const message = err?.error?.data?.message || 'Failed to create wallet';
          toast.error(message);
        }
      },
      invalidatesTags: ['Wallet'],
    }),

    deposit: builder.mutation<TransactionResponse, { walletId: number; data: TransactionRequest }>({
      query: ({ walletId, data }) => ({
        url: `/${walletId}/deposit`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Deposit successful');
        } catch (err: any) {
          const message = err?.error?.data?.message || 'Deposit failed';
          toast.error(message);
        }
      },
      invalidatesTags: ['Wallet', 'Transaction'],
    }),

    withdraw: builder.mutation<TransactionResponse, { walletId: number; data: TransactionRequest }>(
      {
        query: ({ walletId, data }) => ({
          url: `/${walletId}/withdraw`,
          method: 'POST',
          body: data,
        }),
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Withdrawal successful');
          } catch (err: any) {
            const message = err?.error?.data?.message || 'Withdrawal failed';
            toast.error(message);
          }
        },
        invalidatesTags: ['Wallet', 'Transaction'],
      },
    ),

    getTransactionsByCurrency: builder.query<
      TransactionResponse[],
      { walletId: number; currency: Currency }
    >({
      query: ({ walletId, currency }) => `/${walletId}/transactions?currency=${currency}`,
      providesTags: ['Transaction'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          const message = err?.error?.data?.message || 'Failed to load transaction history';
          toast.error(message);
        }
      },
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
