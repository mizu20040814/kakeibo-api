"use client";

import { ReactNode } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Expense } from "@/types/expense";

type MonthlyBarChartProps = {
    expenses: Expense[];
};

function getMonthlyData(expenses: Expense[]) {
    const monthMap = new Map<string, number>();

    for (const e of expenses) {
        const key = e.date.substring(0, 7); // "YYYY-MM"
        monthMap.set(key, (monthMap.get(key) ?? 0) + e.amount);
    }

    const sorted = Array.from(monthMap.entries()).sort(([a], [b]) =>
        a.localeCompare(b),
    );

    return sorted.slice(-6).map(([month, amount]) => {
        const [y, m] = month.split("-");
        return {
            name: `${Number(m)}月`,
            amount,
            fullMonth: `${y}年${Number(m)}月`,
        };
    });
}

export default function MonthlyBarChart({ expenses }: MonthlyBarChartProps) {
    const data = getMonthlyData(expenses);

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                データがありません
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barSize={32}>
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(v: number) => `¥${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                    formatter={(value: number | undefined) => [
                        `¥${(value ?? 0).toLocaleString()}`,
                        "支出",
                    ]}
                    labelFormatter={(
                        label: ReactNode,
                        payload: ReadonlyArray<{
                            payload?: { fullMonth?: string };
                        }>,
                    ) => {
                        if (payload && payload[0]?.payload?.fullMonth) {
                            return payload[0].payload.fullMonth;
                        }
                        return String(label);
                    }}
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                />
                <Bar dataKey="amount" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
