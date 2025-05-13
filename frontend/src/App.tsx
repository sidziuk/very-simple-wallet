import { Container, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store';
import WalletList from './components/organisms/WalletList';
import TransactionHistory from './components/organisms/TransactionHistory';
import { ToastContainer } from 'react-toastify';
import WalletSummary from './components/organisms/WalletSummary';
import TransactionForm from './components/organisms/TransactionForm';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Simple Wallet
        </Typography>
        <WalletList />
        <WalletSummary />
        <TransactionForm />
        <TransactionHistory />
        <ToastContainer position="bottom-center" autoClose={3000} />
      </Container>
    </Provider>
  );
}

export default App;
