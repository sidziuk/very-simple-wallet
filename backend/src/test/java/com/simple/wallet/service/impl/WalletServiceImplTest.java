package com.simple.wallet.service.impl;

import com.simple.wallet.entity.Transaction;
import com.simple.wallet.entity.Wallet;
import com.simple.wallet.enums.Currency;
import com.simple.wallet.enums.TransactionType;
import com.simple.wallet.exception.WalletNotFoundException;
import com.simple.wallet.repository.TransactionRepository;
import com.simple.wallet.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@Execution(ExecutionMode.CONCURRENT)
class WalletServiceImplTest {

    @Mock
    private WalletRepository walletRepo;

    @Mock
    private TransactionRepository transactionRepo;

    @InjectMocks
    private WalletServiceImpl walletService;

    private Wallet wallet;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        wallet = new Wallet("Test Wallet");
        wallet.setId(1L);
        wallet.setBalanceCzk(BigDecimal.valueOf(1000));
        wallet.setBalanceEur(BigDecimal.valueOf(500));
    }

    @Test
    void testDepositCzkSuccess() {
        when(walletRepo.findByIdForUpdate(1L)).thenReturn(Optional.of(wallet));
        when(walletRepo.save(wallet)).thenReturn(wallet);
        when(transactionRepo.save(any(Transaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Transaction tx = walletService.deposit(1L, Currency.CZK, BigDecimal.valueOf(200), "Deposit CZK");

        assertEquals(Currency.CZK, tx.getCurrency());
        assertEquals(TransactionType.DEPOSIT, tx.getType());
        assertEquals(BigDecimal.valueOf(1200), wallet.getBalanceCzk());
    }

    @Test
    void testWithdrawEurSuccess() {
        when(walletRepo.findByIdForUpdate(1L)).thenReturn(Optional.of(wallet));
        when(walletRepo.save(wallet)).thenReturn(wallet);
        when(transactionRepo.save(any(Transaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Transaction tx = walletService.withdraw(1L, Currency.EUR, BigDecimal.valueOf(300), "Withdraw EUR");

        assertEquals(Currency.EUR, tx.getCurrency());
        assertEquals(TransactionType.WITHDRAWAL, tx.getType());
        assertEquals(BigDecimal.valueOf(200), wallet.getBalanceEur());
    }

    @Test
    void testWithdrawFailsForInsufficientFunds() {
        when(walletRepo.findByIdForUpdate(1L)).thenReturn(Optional.of(wallet));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> walletService.withdraw(1L, Currency.EUR, BigDecimal.valueOf(1000), "Too much"));

        assertEquals("Insufficient EUR funds", ex.getMessage());
    }

    @Test
    void testDepositFailsIfWalletNotFound() {
        when(walletRepo.findByIdForUpdate(2L)).thenReturn(Optional.empty());

        assertThrows(WalletNotFoundException.class,
                () -> walletService.deposit(2L, Currency.CZK, BigDecimal.TEN, "Invalid wallet"));
    }
}

