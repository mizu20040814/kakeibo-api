package com.mizu20040814.kakeiboapi.controller;

import com.mizu20040814.kakeiboapi.entity.Expense;
import com.mizu20040814.kakeiboapi.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAll(){
        return expenseService.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense){
        return expenseService.create(expense);
    }
}
