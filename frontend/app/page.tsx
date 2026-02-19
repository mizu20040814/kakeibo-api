"use client";

import { useState, useEffect } from "react";

type Expense = {
    id: number;
    date: string;
    amount: number;
    category: string;
    memo: string;
};

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("食費");
    const [memo, setMemo] = useState("");

    const API_URL = "http://localhost:8080/api/expenses";

    const fetchExpenses = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa("admin:password123"),
            },
            body: JSON.stringify({
                date,
                amount: Number(amount),
                category,
                memo,
            }),
        });
        setDate("");
        setAmount("");
        setCategory("食費");
        setMemo("");
        fetchExpenses();
    };

    const handleDelete = async (id: number) => {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Basic " + btoa("admin:password123"),
            },
        });
        fetchExpenses();
    };

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">家計簿</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-4 rounded-lg mb-6"
            >
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="金額"
                        required
                        min="1"
                        className="border rounded px-3 py-2"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option>食費</option>
                        <option>交通費</option>
                        <option>日用品</option>
                        <option>娯楽</option>
                        <option>その他</option>
                    </select>
                    <input
                        type="text"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="メモ"
                        className="border rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    登録
                </button>
            </form>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">支出一覧</h2>
                <p className="text-lg font-bold">
                    合計: {total.toLocaleString()}円
                </p>
            </div>

            {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    データがありません
                </p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">日付</th>
                            <th className="border p-2 text-left">カテゴリ</th>
                            <th className="border p-2 text-right">金額</th>
                            <th className="border p-2 text-left">メモ</th>
                            <th className="border p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-gray-50">
                                <td className="border p-2">{expense.date}</td>
                                <td className="border p-2">
                                    {expense.category}
                                </td>
                                <td className="border p-2 text-right">
                                    {expense.amount.toLocaleString()}円
                                </td>
                                <td className="border p-2">{expense.memo}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}
