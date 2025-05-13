import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, CurrencyEnum } from '../../api/currencySlice';
import WalletBalanceCard from '../molecules/WalletBalanceCard';
import type { RootState } from '../../app/store';
import type { Currency } from '../../api/types';
import { useCallback } from 'react';
import { useGetAllWalletsQuery } from '../../api/walletApi';

export default function WalletSummary() {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const currentWalletId = useSelector((state: RootState) => state.wallet.currentWallet?.id);

  const { wallet: currentWallet } = useGetAllWalletsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      wallet: data?.find((w) => w.id === currentWalletId) ?? null,
    }),
  });

  const handleCurrencyChange = useCallback(
    (e: SelectChangeEvent) => {
      dispatch(setCurrency(e.target.value as Currency));
    },
    [dispatch],
  );

  return (
    <Box border={1} borderRadius={2} p={2} mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <WalletBalanceCard wallet={currentWallet} currency={selectedCurrency} />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            value={selectedCurrency}
            label="Currency"
            onChange={handleCurrencyChange}
          >
            {Object.entries(CurrencyEnum).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
