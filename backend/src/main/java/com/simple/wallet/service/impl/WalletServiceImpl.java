package com.simple.wallet.service.impl;

import com.simple.wallet.entity.Transaction;
import com.simple.wallet.entity.Wallet;
import com.simple.wallet.enums.Currency;
import com.simple.wallet.enums.TransactionType;
import com.simple.wallet.exception.WalletNotFoundException;
import com.simple.wallet.repository.TransactionRepository;
import com.simple.wallet.repository.WalletRepository;
import com.simple.wallet.service.WalletService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private static final Logger logger = LoggerFactory.getLogger(WalletServiceImpl.class);

    private final WalletRepository walletRepo;
    private final TransactionRepository transactionRepo;

    @Override
    public Wallet createWallet(String name) {
        logger.info("Creating new wallet with name='{}'", name);
        Wallet wallet = new Wallet(name);
        Wallet saved = walletRepo.save(wallet);
        logger.info("Wallet created successfully with ID={}", saved.getId());
        return saved;
    }

    @Transactional
    public Transaction deposit(Long walletId, Currency currency, BigDecimal amount, String note) {
        logger.info("Starting deposit: walletId={}, currency={}, amount={}", walletId, currency, amount);

        Wallet wallet = walletRepo.findByIdForUpdate(walletId)
                .orElseThrow(() -> {
                    logger.warn("Deposit failed: Wallet ID {} not found", walletId);
                    return new WalletNotFoundException("Wallet not found");
                });

        switch (currency) {
            case CZK -> wallet.setBalanceCzk(wallet.getBalanceCzk().add(amount));
            case EUR -> wallet.setBalanceEur(wallet.getBalanceEur().add(amount));
        }

        walletRepo.save(wallet);

        Transaction tx = new Transaction(wallet, currency, TransactionType.DEPOSIT, amount, note);
        Transaction savedTx = transactionRepo.save(tx);

        logger.info("Deposit completed: transactionId={}, walletId={}, amount={}, currency={}",
                savedTx.getId(), walletId, amount, currency);

        return savedTx;
    }

    @Transactional
    public Transaction withdraw(Long walletId, Currency currency, BigDecimal amount, String note) {
        logger.info("Starting withdrawal: walletId={}, currency={}, amount={}", walletId, currency, amount);

        Wallet wallet = walletRepo.findByIdForUpdate(walletId)
                .orElseThrow(() -> {
                    logger.warn("Withdrawal failed: Wallet ID {} not found", walletId);
                    return new WalletNotFoundException("Wallet not found");
                });

        switch (currency) {
            case CZK -> {
                if (wallet.getBalanceCzk().compareTo(amount) < 0) {
                    logger.warn("Withdrawal failed: Insufficient CZK funds in walletId={} (requested={}, available={})",
                            walletId, amount, wallet.getBalanceCzk());
                    throw new IllegalArgumentException("Insufficient CZK funds");
                }
                wallet.setBalanceCzk(wallet.getBalanceCzk().subtract(amount));
            }
            case EUR -> {
                if (wallet.getBalanceEur().compareTo(amount) < 0) {
                    logger.warn("Withdrawal failed: Insufficient EUR funds in walletId={} (requested={}, available={})",
                            walletId, amount, wallet.getBalanceEur());
                    throw new IllegalArgumentException("Insufficient EUR funds");
                }
                wallet.setBalanceEur(wallet.getBalanceEur().subtract(amount));
            }
        }

        walletRepo.save(wallet);

        Transaction tx = new Transaction(wallet, currency, TransactionType.WITHDRAWAL, amount, note);
        Transaction savedTx = transactionRepo.save(tx);

        logger.info("Withdrawal completed: transactionId={}, walletId={}, amount={}, currency={}",
                savedTx.getId(), walletId, amount, currency);

        return savedTx;
    }

    @Override
    public List<Wallet> getAllWallets() {
        logger.info("Fetching all wallets");
        List<Wallet> wallets = walletRepo.findAll();
        logger.info("Retrieved {} wallets", wallets.size());
        return wallets;
    }

    @Override
    public List<Transaction> getTransactionsByCurrency(Long walletId, Currency currency) {
        logger.info("Fetching transactions for walletId={}, currency={}", walletId, currency);
        List<Transaction> txs = transactionRepo.findByWalletIdAndCurrencyOrderByCreatedAtDesc(walletId, currency);
        logger.info("Found {} transactions for walletId={}, currency={}", txs.size(), walletId, currency);
        return txs;
    }
}
