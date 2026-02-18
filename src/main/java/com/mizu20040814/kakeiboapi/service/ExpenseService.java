package com.mizu20040814.kakeiboapi.service;

import com.mizu20040814.kakeiboapi.dto.ExpenseRequest;
import com.mizu20040814.kakeiboapi.entity.Expense;
import com.mizu20040814.kakeiboapi.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> findAll(){
        return expenseRepository.findAll();
    }

    public Expense create(ExpenseRequest request) {
        validateRequest(request);
        Expense expense = new Expense();
        expense.setDate(request.getDate());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setMemo(request.getMemo());
        return expenseRepository.save(expense);
    }

    public Expense update(Long id, ExpenseRequest request) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDの支出が見つかりません: " + id));
        validateRequest(request);
        existing.setDate(request.getDate());
        existing.setAmount(request.getAmount());
        existing.setCategory(request.getCategory());
        existing.setMemo(request.getMemo());
        return expenseRepository.save(existing);
    }

    public void delete(Long id){
        if(!expenseRepository.existsById(id)){
            throw new IllegalArgumentException("指定されたIDの支出が見つかりません: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public Expense findById(Long id){
        return expenseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDの支出が見つかりません: " + id));
    }

    public List<Expense> findByCategory(String category){
        return expenseRepository.findByCategory(category);
    }

    public List<Expense> findByYearAndMonth(int year, int month){
        return expenseRepository.findByYearAndMonth(year,month);
    }

    private void validateRequest(ExpenseRequest request) {
        if (request.getAmount() == null || request.getAmount() <= 0) {
            throw new IllegalArgumentException("金額は1円以上で入力してください");
        }
        if (request.getCategory() == null || request.getCategory().isBlank()) {
            throw new IllegalArgumentException("カテゴリは必須です");
        }
        if (request.getDate() == null) {
            throw new IllegalArgumentException("日付は必須です");
        }
    }
}
