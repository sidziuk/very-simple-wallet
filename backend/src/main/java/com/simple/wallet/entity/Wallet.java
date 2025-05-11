package com.simple.wallet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @Column(name = "balance_czk")
    private BigDecimal balanceCzk = BigDecimal.ZERO;

    @Column(name = "balance_eur")
    private BigDecimal balanceEur = BigDecimal.ZERO;
}