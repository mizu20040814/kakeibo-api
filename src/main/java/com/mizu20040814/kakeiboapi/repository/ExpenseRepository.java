package com.mizu20040814.kakeiboapi.repository;

import com.mizu20040814.kakeiboapi.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
}
