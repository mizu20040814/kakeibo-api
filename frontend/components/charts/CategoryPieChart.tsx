"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Expense, CATEGORIES, CATEGORY_ICONS, Category } from "@/types/expense";

type CategoryPieChartProps = {
    expenses: Expense[];
};

const COLORS = ["#7c3aed", "#06b6d4", "#f59e0b", "#10b981", "#f43f5e"];

function getCategoryData(expenses: Expense[]) {
    return CATEGORIES.map((cat, i) => {
        const amount = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
        return {
            name: cat,
            value: amount,
            icon: CATEGORY_ICONS[cat as Category],
            color: COLORS[i % COLORS.length],
        };
    }).filter((d) => d.value > 0);
}

export default function CategoryPieChart({ expenses }: CategoryPieChartProps) {
    const data = getCategoryData(expenses);
    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                データがありません
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className="w-44 h-44 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number | undefined) => [
                                `¥${(value ?? 0).toLocaleString()}`,
                                "",
                            ]}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                fontSize: "12px",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
                {data.map((d) => (
                    <div
                        key={d.name}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: d.color }}
                            />
                            <span className="text-gray-600">
                                {d.icon} {d.name}
                            </span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {total > 0
                                ? Math.round((d.value / total) * 100)
                                : 0}
                            %
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
