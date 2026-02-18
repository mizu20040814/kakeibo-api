package com.mizu20040814.kakeiboapi.controller;

import com.mizu20040814.kakeiboapi.dto.ExpenseRequest;
import com.mizu20040814.kakeiboapi.dto.ExpenseResponse;
import com.mizu20040814.kakeiboapi.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<ExpenseResponse> getAll() {
        return expenseService.findAll().stream()
                .map(ExpenseResponse::from)
                .toList();
    }

    @GetMapping("/{id}")
    public ExpenseResponse getById(@PathVariable Long id) {
        return ExpenseResponse.from(expenseService.findById(id));
    }

    @GetMapping("/category/{category}")
    public List<ExpenseResponse> getByCategory(@PathVariable String category) {
        return expenseService.findByCategory(category).stream()
                .map(ExpenseResponse::from)
                .toList();
    }

    @GetMapping("/monthly/{year}/{month}")
    public List<ExpenseResponse> getByMonth(@PathVariable int year, @PathVariable int month) {
        return expenseService.findByYearAndMonth(year, month).stream()
                .map(ExpenseResponse::from)
                .toList();
    }

    @PostMapping
    public ExpenseResponse create(@Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponse.from(expenseService.create(request));
    }

    @PutMapping("/{id}")
    public ExpenseResponse update(@PathVariable Long id, @Valid @RequestBody ExpenseRequest request) {
        return ExpenseResponse.from(expenseService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseService.delete(id);
    }
}