import { Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import type { WalletResponse, Currency } from '../../api/types';
import { CurrencyEnum } from '../../api/currencySlice';

interface WalletBalanceCardProps {
  wallet: WalletResponse | null;
  currency: Currency;
}

function WalletBalanceCardComponent({ wallet, currency }: WalletBalanceCardProps) {
  const content = useMemo(() => {
    if (!wallet) {
      return (
        <Typography variant="h6" color="text.secondary">
          No Wallet Selected
        </Typography>
      );
    }

    const balance =
      currency === CurrencyEnum.CZK ? Number(wallet.balanceCzk) : Number(wallet.balanceEur);

    const formatted = balance.toLocaleString('cs-CZ', {
      style: 'currency',
      currency,
    });

    return (
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {formatted}
      </Typography>
    );
  }, [wallet, currency]);

  return content;
}

export default memo(WalletBalanceCardComponent);
