import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
  TableSortLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetTransactionsByCurrencyQuery } from '../../api/walletApi';
import type { RootState } from '../../app/store';
import { formatAmount } from './utils';
import { useMemo, useState } from 'react';

type SortKey = 'date' | 'type' | 'amount' | null;
type SortDirection = 'asc' | 'desc' | null;

export default function TransactionHistory() {
  const currentWallet = useSelector((state: RootState) => state.wallet.currentWallet);
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const walletId = currentWallet?.id;

  const {
    data: transactions = [],
    isFetching,
    isError,
  } = useGetTransactionsByCurrencyQuery(
    { walletId: walletId ?? 0, currency: selectedCurrency },
    { skip: !walletId },
  );

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: Exclude<SortKey, null>) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortKey(null); // disable sorting
      setSortDirection(null);
    } else {
      setSortDirection('asc');
    }
  };

  const sortedTransactions = useMemo(() => {
    if (!sortKey || !sortDirection) return transactions;

    const sorted = [...transactions];
    sorted.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortKey) {
        case 'date':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'amount':
          aVal = a.amount;
          bVal = b.amount;
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [transactions, sortKey, sortDirection]);

  if (!walletId) {
    return <Typography>Select a wallet to view transactions.</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to load transactions.</Typography>;
  }

  return (
    <Box border={1} borderRadius={2} p={2} mb={3}>
      {isFetching ? (
        <Typography>Loading transactions...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {(['date', 'type', 'amount'] as const).map((key) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortKey === key && sortDirection ? sortDirection : 'asc'}
                      onClick={() => handleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{new Date(tx.createdAt).toLocaleDateString('cs-CZ')}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{formatAmount(tx.amount, selectedCurrency)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No transactions found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
