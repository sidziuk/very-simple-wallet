package com.simple.wallet.exception;

public class WalletNotFoundException extends RuntimeException {
    public WalletNotFoundException(String message) {
        super(message);
    }
}
