package com.mizu20040814.kakeiboapi.service;

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

    public Expense create(Expense expense){
        if(expense.getAmount() == null || expense.getAmount() <= 0){
            throw new IllegalArgumentException("金額は1円以上で入力してください");
        }
        if (expense.getCategory() == null || expense.getCategory().isBlank()){
            throw new IllegalArgumentException("カテゴリは必須です");
        }
        if(expense.getDate() == null){
            throw new IllegalArgumentException("日付は必須です");
        }
        return expenseRepository.save(expense);
    }

    public Expense update(Long id,Expense expense){
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDの支出が見つかりません: " + id));

        if(expense.getAmount() == null || expense.getAmount() <= 0){
            throw new IllegalArgumentException("金額は1円以上で入力してください");
        }
        if (expense.getCategory() == null || expense.getCategory().isBlank()){
            throw new IllegalArgumentException("カテゴリは必須です");
        }
        if(expense.getDate() == null){
            throw new IllegalArgumentException("日付は必須です");
        }

        existing.setDate(expense.getDate());
        existing.setAmount(expense.getAmount());
        existing.setMemo(expense.getMemo());
        existing.setCategory(expense.getCategory());

        return expenseRepository.save(existing);
    }

    public void delete(Long id){
        if(!expenseRepository.existsById(id)){
            throw new IllegalArgumentException("指定されたIDの支出が見つかりません: " + id);
        }
        expenseRepository.deleteById(id);
    }

    public List<Expense> findByCategory(String category){
        return expenseRepository.findByCategory(category);
    }

    public List<Expense> findByYearAndMonth(int year, int month){
        return expenseRepository.findByYearAndMonth(year,month);
    }

}
