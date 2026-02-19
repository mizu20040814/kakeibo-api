"use client";

import Link from "next/link";
import { useExpenses } from "@/hooks/useExpenses";
import MonthFilter from "@/components/MonthFilter";
import ExpenseTable from "@/components/ExpenseTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function ExpensesPage() {
    const {
        expenses,
        loading,
        error,
        total,
        selectedMonth,
        setSelectedMonth,
        remove,
        reload,
    } = useExpenses();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        支出一覧
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        すべての支出を確認・管理できます
                    </p>
                </div>
                <Link
                    href="/expenses/new"
                    className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                    <span>+</span> 新規登録
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <MonthFilter
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                    />
                    <p className="text-lg font-bold text-gray-900">
                        合計:{" "}
                        <span className="text-primary-600">
                            ¥{total.toLocaleString()}
                        </span>
                    </p>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={reload} />
                ) : (
                    <ExpenseTable expenses={expenses} onDelete={remove} />
                )}
            </div>
        </div>
    );
}
