package com.simple.wallet.dto;

import com.simple.wallet.enums.Currency;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record TransactionRequest(

        @NotNull(message = "Currency is required")
        Currency currency,

        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be greater than 0")
        BigDecimal amount,

        @Size(max = 255, message = "Note can be at most 255 characters")
        String note
) {
}