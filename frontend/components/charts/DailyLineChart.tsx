"use client";

import { ReactNode } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Expense } from "@/types/expense";

type DailyLineChartProps = {
    expenses: Expense[];
};

function getDailyData(expenses: Expense[]) {
    const dayMap = new Map<string, number>();

    for (const e of expenses) {
        dayMap.set(e.date, (dayMap.get(e.date) ?? 0) + e.amount);
    }

    return Array.from(dayMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-30)
        .map(([date, amount]) => {
            const d = new Date(date);
            return {
                name: `${d.getMonth() + 1}/${d.getDate()}`,
                amount,
                fullDate: date,
            };
        });
}

export default function DailyLineChart({ expenses }: DailyLineChartProps) {
    const data = getDailyData(expenses);

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                データがありません
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient
                        id="colorAmount"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#7c3aed"
                            stopOpacity={0.15}
                        />
                        <stop
                            offset="95%"
                            stopColor="#7c3aed"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    interval="preserveStartEnd"
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(v: number) => `¥${v.toLocaleString()}`}
                />
                <Tooltip
                    formatter={(value: number | undefined) => [
                        `¥${(value ?? 0).toLocaleString()}`,
                        "支出",
                    ]}
                    labelFormatter={(
                        _label: ReactNode,
                        payload: ReadonlyArray<{
                            payload?: { fullDate?: string };
                        }>,
                    ) => {
                        if (payload && payload[0]?.payload?.fullDate) {
                            return payload[0].payload.fullDate;
                        }
                        return String(_label);
                    }}
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    fill="url(#colorAmount)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
