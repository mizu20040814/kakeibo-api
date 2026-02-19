"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    Expense,
    ExpenseFormData,
    CATEGORIES,
    CATEGORY_ICONS,
    Category,
} from "@/types/expense";
import * as api from "@/lib/api";

type MonthFilter = {
    year: number;
    month: number;
} | null;

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<MonthFilter>(null);

    const loadExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = selectedMonth
                ? await api.fetchExpensesByMonth(
                      selectedMonth.year,
                      selectedMonth.month,
                  )
                : await api.fetchExpenses();
            setExpenses(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "データの取得に失敗しました",
            );
        } finally {
            setLoading(false);
        }
    }, [selectedMonth]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const add = useCallback(
        async (data: ExpenseFormData) => {
            await api.createExpense(data);
            await loadExpenses();
        },
        [loadExpenses],
    );

    const update = useCallback(
        async (id: number, data: ExpenseFormData) => {
            await api.updateExpense(id, data);
            await loadExpenses();
        },
        [loadExpenses],
    );

    const remove = useCallback(
        async (id: number) => {
            await api.deleteExpense(id);
            await loadExpenses();
        },
        [loadExpenses],
    );

    const total = useMemo(
        () => expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses],
    );

    const categoryTotals = useMemo(() => {
        const totals: { category: Category; amount: number; icon: string }[] =
            [];
        for (const cat of CATEGORIES) {
            const amount = expenses
                .filter((e) => e.category === cat)
                .reduce((sum, e) => sum + e.amount, 0);
            if (amount > 0) {
                totals.push({
                    category: cat,
                    amount,
                    icon: CATEGORY_ICONS[cat],
                });
            }
        }
        return totals;
    }, [expenses]);

    return {
        expenses,
        loading,
        error,
        selectedMonth,
        setSelectedMonth,
        add,
        update,
        remove,
        reload: loadExpenses,
        total,
        categoryTotals,
    };
}
