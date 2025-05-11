package com.simple.wallet.repository;

import com.simple.wallet.entity.Transaction;
import com.simple.wallet.enums.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByWalletIdAndCurrencyOrderByCreatedAtDesc(Long walletId, Currency currency);

}
