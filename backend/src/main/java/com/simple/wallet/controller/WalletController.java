package com.simple.wallet.controller;

import com.simple.wallet.dto.CreateWalletRequest;
import com.simple.wallet.dto.TransactionRequest;
import com.simple.wallet.dto.TransactionResponse;
import com.simple.wallet.dto.WalletResponse;
import com.simple.wallet.enums.Currency;
import com.simple.wallet.mapper.TransactionMapper;
import com.simple.wallet.mapper.WalletMapper;
import com.simple.wallet.service.WalletService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
@Validated
public class WalletController {
    private final WalletService walletService;
    private final WalletMapper walletMapper;
    private final TransactionMapper transactionMapper;

    @GetMapping
    public List<WalletResponse> getAllWallets() {
        return walletMapper.toDtoList(
                walletService.getAllWallets()
        );
    }

    @PostMapping
    public WalletResponse createWallet(@Valid @RequestBody CreateWalletRequest request) {
        return walletMapper.toDto(
                walletService.createWallet(request.name())
        );
    }

    @PostMapping("/{walletId}/deposit")
    public TransactionResponse deposit(
            @PathVariable Long walletId,
            @Valid @RequestBody TransactionRequest request
    ) {
        return transactionMapper.toDto(
                walletService.deposit(walletId, request.currency(), request.amount(), request.note())
        );
    }

    @PostMapping("/{walletId}/withdraw")
    public TransactionResponse withdraw(
            @PathVariable Long walletId,
            @Valid @RequestBody TransactionRequest request
    ) {
        return transactionMapper.toDto(
                walletService.withdraw(walletId, request.currency(), request.amount(), request.note())
        );
    }

    @GetMapping("/{walletId}/transactions")
    public List<TransactionResponse> getTransactionsByCurrency(
            @PathVariable Long walletId,
            @RequestParam String currency
    ) {
        Currency convertedCurrency;
        try {
            convertedCurrency = Currency.valueOf(currency.toUpperCase());
            return transactionMapper.toDtoList(walletService.getTransactionsByCurrency(walletId, convertedCurrency));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid currency: " + currency);
        }

    }
}

