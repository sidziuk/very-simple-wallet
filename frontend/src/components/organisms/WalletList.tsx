import { useEffect, useState, useCallback } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllWalletsQuery, useCreateWalletMutation } from '../../api/walletApi';
import WalletCreateDialog from '../molecules/WalletCreateDialog';
import type { RootState } from '../../app/store';
import { setCurrentWallet } from '../../api/walletSlice';

export default function WalletList() {
  const dispatch = useDispatch();
  const currentWallet = useSelector((state: RootState) => state.wallet.currentWallet);
  const { data: wallets = [] } = useGetAllWalletsQuery();
  const [createWallet] = useCreateWalletMutation();
  const [open, setOpen] = useState(false);

  // Auto-select first wallet if none is selected
  useEffect(() => {
    if (!currentWallet && wallets.length > 0) {
      dispatch(setCurrentWallet(wallets[0]));
    }
  }, [currentWallet, wallets, dispatch]);

  const handleWalletChange = useCallback(
    (walletId: number) => {
      if (walletId !== currentWallet?.id) {
        const wallet = wallets.find((w) => w.id === walletId);
        if (wallet) {
          dispatch(setCurrentWallet(wallet));
        }
      }
    },
    [wallets, dispatch, currentWallet?.id],
  );

  const handleCreate = useCallback(
    async (name: string) => {
      await createWallet({ name }).unwrap();
      setOpen(false);
    },
    [createWallet],
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl size="small" sx={{ width: '70%' }}>
          <InputLabel id="wallet-select-label">Select Wallet</InputLabel>
          <Select
            labelId="wallet-select-label"
            label="Select Wallet"
            value={currentWallet?.id ?? ''}
            onChange={(e) => handleWalletChange(Number(e.target.value))}
            sx={{ fontWeight: 'bold' }}
          >
            {wallets.map((wallet) => (
              <MenuItem key={wallet.id} value={wallet.id} sx={{ fontWeight: 'bold' }}>
                {wallet.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={() => setOpen(true)} variant="outlined" sx={{ width: '28%' }}>
          Create Wallet
        </Button>
      </Box>

      <WalletCreateDialog open={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </>
  );
}
