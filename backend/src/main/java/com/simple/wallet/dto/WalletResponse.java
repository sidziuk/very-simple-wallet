package com.simple.wallet.dto;

import java.math.BigDecimal;

public record WalletResponse(
        Long id,
        String name,
        BigDecimal balanceCzk,
        BigDecimal balanceEur
) {
}
