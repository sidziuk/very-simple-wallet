package com.simple.wallet.entity;

import com.simple.wallet.enums.Currency;
import com.simple.wallet.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private BigDecimal amount;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String note;

    public Transaction(Wallet wallet, Currency currency, TransactionType type,
                       BigDecimal amount, String note) {
        this.wallet = wallet;
        this.currency = currency;
        this.type = type;
        this.amount = amount;
        this.note = note;
        this.createdAt = LocalDateTime.now();
    }
}
