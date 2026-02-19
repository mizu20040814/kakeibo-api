"use client";

import Link from "next/link";
import { Expense } from "@/types/expense";

type ExpenseTableProps = {
    expenses: Expense[];
    onDelete: (id: number) => Promise<void>;
};

export default function ExpenseTable({
    expenses,
    onDelete,
}: ExpenseTableProps) {
    const handleDelete = async (id: number) => {
        if (window.confirm("この支出を削除しますか？")) {
            await onDelete(id);
        }
    };

    if (expenses.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-sm">データがありません</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                            日付
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                            カテゴリ
                        </th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">
                            金額
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                            メモ
                        </th>
                        <th className="py-3 px-4 w-28"></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr
                            key={expense.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <td className="py-3 px-4 text-gray-900">
                                {expense.date}
                            </td>
                            <td className="py-3 px-4">
                                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                    {expense.category}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-right font-medium text-gray-900">
                                ¥{expense.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                                {expense.memo || "—"}
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex gap-2 justify-end">
                                    <Link
                                        href={`/expenses/${expense.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                    >
                                        編集
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                                    >
                                        削除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
