package com.simple.wallet.service;

import com.simple.wallet.entity.Transaction;
import com.simple.wallet.entity.Wallet;
import com.simple.wallet.enums.Currency;

import java.math.BigDecimal;
import java.util.List;

public interface WalletService {

    Wallet createWallet(String name);

    Transaction deposit(Long walletId, Currency currency, BigDecimal amount, String note);

    Transaction withdraw(Long walletId, Currency currency, BigDecimal amount, String note);

    List<Wallet> getAllWallets();

    List<Transaction> getTransactionsByCurrency(Long walletId, Currency currency);

}