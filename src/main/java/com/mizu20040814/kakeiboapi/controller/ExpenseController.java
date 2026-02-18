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

    @GetMapping("/category/{category}")
    public List<Expense> getByCategory(@PathVariable String category) {
        return expenseService.findByCategory(category);
    }

    @GetMapping("/monthly/{year}/{month}")
    public List<Expense> getByMonth(@PathVariable int year, @PathVariable int month) {
        return expenseService.findByYearAndMonth(year, month);
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense){
        return expenseService.create(expense);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody Expense expense){
        return expenseService.update(id,expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        expenseService.delete(id);
    }

}
