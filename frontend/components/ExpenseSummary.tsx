import { Category } from "@/types/expense";

type CategoryTotal = {
    category: Category;
    amount: number;
    icon: string;
};

type ExpenseSummaryProps = {
    total: number;
    categoryTotals: CategoryTotal[];
};

export default function ExpenseSummary({
    total,
    categoryTotals,
}: ExpenseSummaryProps) {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-600 font-medium">合計支出</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">
                    ¥{total.toLocaleString()}
                </p>
            </div>

            {categoryTotals.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categoryTotals.map(({ category, amount, icon }) => (
                        <div
                            key={category}
                            className="bg-white border border-gray-200 rounded-lg p-3"
                        >
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-base">{icon}</span>
                                <span className="text-xs font-medium text-gray-500">
                                    {category}
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                                ¥{amount.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
