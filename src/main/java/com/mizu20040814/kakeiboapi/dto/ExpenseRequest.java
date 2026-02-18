package com.mizu20040814.kakeiboapi.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseRequest {
    private LocalDate date;
    private Integer amount;
    private String category;
    private String memo;
}