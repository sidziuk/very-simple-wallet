package com.simple.wallet.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateWalletRequest(

        @NotBlank(message = "Wallet name must not be blank")
        @Size(min = 3, max = 50, message = "Wallet name must be between 3 and 50 characters")
        @Pattern(regexp = "^[\\w\\s-]+$", message = "Wallet name must contain only letters, numbers, spaces, hyphens or underscores")
        String name
) {
}
