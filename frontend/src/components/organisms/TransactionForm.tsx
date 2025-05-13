import { useState, useCallback, useMemo } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  type SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  TransactionTypeEnum,
  type TransactionRequest,
  type TransactionType,
} from '../../api/types';
import { useDepositMutation, useWithdrawMutation, walletApi } from '../../api/walletApi';

export default function TransactionForm() {
  const dispatch = useDispatch();
  const currentWallet = useSelector((state: RootState) => state.wallet.currentWallet);
  const currency = useSelector((state: RootState) => state.currency.selectedCurrency);

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionTypeEnum.DEPOSIT,
  );
  const [amount, setAmount] = useState('');

  const [deposit] = useDepositMutation();
  const [withdraw] = useWithdrawMutation();

  const parsedAmount = useMemo(() => parseFloat(amount), [amount]);

  const isAmountValid = useMemo(() => {
    return !isNaN(parsedAmount) && parsedAmount > 0;
  }, [parsedAmount]);

  const handleTransaction = useCallback(() => {
    if (!currentWallet || !isAmountValid) return;

    const payload: TransactionRequest = {
      currency,
      amount: parsedAmount,
      note: '',
    };

    const mutation = transactionType === TransactionTypeEnum.DEPOSIT ? deposit : withdraw;
    mutation({ walletId: currentWallet.id, data: payload });

    dispatch(walletApi.util.invalidateTags(['Wallet', 'Transaction']));
    setAmount('');
  }, [
    currentWallet,
    currency,
    transactionType,
    parsedAmount,
    isAmountValid,
    deposit,
    withdraw,
    dispatch,
  ]);

  const handleTypeChange = useCallback((e: SelectChangeEvent) => {
    setTransactionType(e.target.value as TransactionType);
  }, []);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  return (
    <Box border={1} borderRadius={2} p={2} mb={3}>
      <FormControl fullWidth margin="dense">
        <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
        <Select
          labelId="transaction-type-label"
          label="Transaction Type"
          value={transactionType}
          onChange={handleTypeChange}
        >
          {Object.entries(TransactionTypeEnum).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="number"
        inputProps={{ min: 0 }}
        label="Amount"
        value={amount}
        margin="dense"
        onChange={handleAmountChange}
        error={!isAmountValid && amount !== ''}
        helperText={!isAmountValid && amount !== '' ? 'Amount must be a positive number' : ' '}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleTransaction}
        disabled={!isAmountValid || !currentWallet}
      >
        Add Transaction
      </Button>
    </Box>
  );
}
