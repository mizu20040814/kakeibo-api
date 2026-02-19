"use client";

import { useState, useEffect, use } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchExpenseById, updateExpense } from "@/lib/api";
import { Expense, ExpenseFormData } from "@/types/expense";

type EditExpensePageProps = {
    params: Promise<{ id: string }>;
};

export default function EditExpensePage({ params }: EditExpensePageProps) {
    const { id } = use(params);
    const [expense, setExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchExpenseById(Number(id));
                setExpense(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "データの取得に失敗しました",
                );
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleSubmit = async (data: ExpenseFormData) => {
        await updateExpense(Number(id), data);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!expense) return <ErrorMessage message="支出が見つかりません" />;

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">支出を編集</h1>
                <p className="text-sm text-gray-500 mt-1">
                    支出内容を修正します
                </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <ExpenseForm initialData={expense} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
