package com.simple.wallet.mapper;

import com.simple.wallet.dto.WalletResponse;
import com.simple.wallet.entity.Wallet;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WalletMapper {
    WalletResponse toDto(Wallet wallet);

    List<WalletResponse> toDtoList(List<Wallet> wallets);
}