package com.mizu20040814.kakeiboapi.service;

import com.mizu20040814.kakeiboapi.dto.ExpenseRequest;
import com.mizu20040814.kakeiboapi.entity.Expense;
import com.mizu20040814.kakeiboapi.repository.ExpenseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    private ExpenseRequest validRequest;

    @BeforeEach
    void setUp() {
        validRequest = new ExpenseRequest();
        validRequest.setDate(LocalDate.of(2026, 2, 19));
        validRequest.setAmount(850);
        validRequest.setCategory("食費");
        validRequest.setMemo("ランチ");
    }

    @Test
    @DisplayName("正常なリクエストで支出を登録できる")
    void createSuccess() {
        Expense saved = new Expense();
        saved.setId(1L);
        saved.setDate(validRequest.getDate());
        saved.setAmount(validRequest.getAmount());
        saved.setCategory(validRequest.getCategory());
        saved.setMemo(validRequest.getMemo());

        when(expenseRepository.save(any(Expense.class))).thenReturn(saved);

        Expense result = expenseService.create(validRequest);

        assertEquals(1L, result.getId());
        assertEquals(850, result.getAmount());
        assertEquals("食費", result.getCategory());
        verify(expenseRepository, times(1)).save(any(Expense.class));
    }

    @Test
    @DisplayName("金額が0以下の場合エラーになる")
    void createFailsWithInvalidAmount() {
        validRequest.setAmount(-100);

        assertThrows(IllegalArgumentException.class, () -> {
            expenseService.create(validRequest);
        });

        verify(expenseRepository, never()).save(any());
    }

    @Test
    @DisplayName("カテゴリが空の場合エラーになる")
    void createFailsWithBlankCategory() {
        validRequest.setCategory("");

        assertThrows(IllegalArgumentException.class, () -> {
            expenseService.create(validRequest);
        });
    }

    @Test
    @DisplayName("全件取得できる")
    void findAllSuccess() {
        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(500);

        when(expenseRepository.findAll()).thenReturn(List.of(expense));

        List<Expense> results = expenseService.findAll();

        assertEquals(1, results.size());
        assertEquals(500, results.get(0).getAmount());
    }

    @Test
    @DisplayName("IDで1件取得できる")
    void findByIdSuccess() {
        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(850);

        when(expenseRepository.findById(1L)).thenReturn(Optional.of(expense));

        Expense result = expenseService.findById(1L);

        assertEquals(850, result.getAmount());
    }

    @Test
    @DisplayName("存在しないIDの場合エラーになる")
    void findByIdNotFound() {
        when(expenseRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> {
            expenseService.findById(999L);
        });
    }
}