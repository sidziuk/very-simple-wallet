import { useState, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface WalletCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function WalletCreateDialog({ open, onClose, onCreate }: WalletCreateDialogProps) {
  const [name, setName] = useState('');

  const error = useMemo(() => {
    if (!name.trim()) return 'Wallet name must not be blank';
    if (name.length < 3 || name.length > 50)
      return 'Wallet name must be between 3 and 50 characters';
    if (!/^[\w\s-]+$/.test(name))
      return 'Wallet name must contain only letters, numbers, spaces, hyphens or underscores';
    return '';
  }, [name]);

  const handleSubmit = useCallback(() => {
    if (error) return;
    onCreate(name.trim());
    setName('');
  }, [error, name, onCreate]);

  const handleClose = useCallback(() => {
    onClose();
    setName('');
  }, [onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create New Wallet</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Wallet Name"
          fullWidth
          value={name}
          onChange={handleChange}
          error={!!error}
          helperText={error || '3–50 chars, letters, numbers, hyphens, underscores'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!!error || !name.trim()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
