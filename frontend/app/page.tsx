"use client";

import Link from "next/link";
import { useExpenses } from "@/hooks/useExpenses";
import StatCard from "@/components/StatCard";
import ExpenseTable from "@/components/ExpenseTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import DailyLineChart from "@/components/charts/DailyLineChart";

export default function DashboardPage() {
    const { expenses, loading, error, total, remove, reload } = useExpenses();

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const thisMonthTotal = expenses
        .filter((e) => e.date.startsWith(currentMonth))
        .reduce((sum, e) => sum + e.amount, 0);
    const count = expenses.length;
    const average = count > 0 ? Math.round(total / count) : 0;
    const recentExpenses = expenses.slice(0, 5);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        ダッシュボード
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        支出の概要を確認できます
                    </p>
                </div>
                <Link
                    href="/expenses/new"
                    className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                    <span>+</span> 新規登録
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard
                    icon="💰"
                    label="合計支出"
                    value={`¥${total.toLocaleString()}`}
                    color="purple"
                />
                <StatCard
                    icon="📅"
                    label="今月の支出"
                    value={`¥${thisMonthTotal.toLocaleString()}`}
                    color="blue"
                />
                <StatCard
                    icon="📝"
                    label="登録件数"
                    value={`${count}件`}
                    color="green"
                />
                <StatCard
                    icon="📊"
                    label="平均支出"
                    value={`¥${average.toLocaleString()}`}
                    color="orange"
                />
            </div>

            {/* Charts Row 1: Monthly Bar + Category Pie */}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-gray-900">
                            月別支出推移
                        </h2>
                    </div>
                    <MonthlyBarChart expenses={expenses} />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                        カテゴリ別内訳
                    </h2>
                    <CategoryPieChart expenses={expenses} />
                </div>
            </div>

            {/* Charts Row 2: Daily Line + Recent Table */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                        日別支出推移
                    </h2>
                    <DailyLineChart expenses={expenses} />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-gray-900">
                            最近の支出
                        </h2>
                        <Link
                            href="/expenses"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            すべて見る →
                        </Link>
                    </div>
                    <ExpenseTable expenses={recentExpenses} onDelete={remove} />
                </div>
            </div>
        </div>
    );
}
