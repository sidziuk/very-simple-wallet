package com.simple.wallet.mapper;

import com.simple.wallet.dto.TransactionResponse;
import com.simple.wallet.entity.Transaction;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    TransactionResponse toDto(Transaction transaction);

    List<TransactionResponse> toDtoList(List<Transaction> transactions);
}
