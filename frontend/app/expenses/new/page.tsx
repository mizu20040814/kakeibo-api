"use client";

import ExpenseForm from "@/components/ExpenseForm";
import { createExpense } from "@/lib/api";
import { ExpenseFormData } from "@/types/expense";

export default function NewExpensePage() {
    const handleSubmit = async (data: ExpenseFormData) => {
        await createExpense(data);
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">新規登録</h1>
                <p className="text-sm text-gray-500 mt-1">
                    新しい支出を登録します
                </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <ExpenseForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
