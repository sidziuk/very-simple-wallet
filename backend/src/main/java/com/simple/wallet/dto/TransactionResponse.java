package com.simple.wallet.dto;

import com.simple.wallet.enums.Currency;
import com.simple.wallet.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponse(
        Long id,
        Currency currency,
        TransactionType type,
        BigDecimal amount,
        LocalDateTime createdAt,
        String note
) {
}
