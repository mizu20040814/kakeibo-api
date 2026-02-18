package com.mizu20040814.kakeiboapi.dto;

import com.mizu20040814.kakeiboapi.entity.Expense;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseResponse {
    private Long id;
    private LocalDate date;
    private Integer amount;
    private String category;
    private String memo;

    public static ExpenseResponse from(Expense expense) {
        ExpenseResponse response = new ExpenseResponse();
        response.id = expense.getId();
        response.date = expense.getDate();
        response.amount = expense.getAmount();
        response.category = expense.getCategory();
        response.memo = expense.getMemo();
        return response;
    }

}