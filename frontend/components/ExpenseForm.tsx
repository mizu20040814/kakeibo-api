"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Expense, ExpenseFormData, CATEGORIES } from "@/types/expense";

type ExpenseFormProps = {
    initialData?: Expense;
    onSubmit: (data: ExpenseFormData) => Promise<void>;
};

type FormErrors = Partial<Record<keyof ExpenseFormData, string>>;

function validate(data: ExpenseFormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.date) errors.date = "日付は必須です";
    if (!data.amount || data.amount < 1)
        errors.amount = "金額は1円以上で入力してください";
    if (!data.category) errors.category = "カテゴリは必須です";
    if (data.memo && data.memo.length > 200)
        errors.memo = "メモは200文字以内で入力してください";
    return errors;
}

export default function ExpenseForm({
    initialData,
    onSubmit,
}: ExpenseFormProps) {
    const router = useRouter();
    const isEditing = !!initialData;

    const [date, setDate] = useState(initialData?.date ?? "");
    const [amount, setAmount] = useState(
        initialData ? String(initialData.amount) : "",
    );
    const [category, setCategory] = useState(
        initialData?.category ?? CATEGORIES[0],
    );
    const [memo, setMemo] = useState(initialData?.memo ?? "");
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        const formData: ExpenseFormData = {
            date,
            amount: Number(amount),
            category,
            memo,
        };

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        setSubmitting(true);
        try {
            await onSubmit(formData);
            router.push("/expenses");
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "保存に失敗しました",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    {submitError}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    日付 <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.date ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.date && (
                    <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    金額 <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.amount ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.amount && (
                    <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ <span className="text-red-500">*</span>
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.category ? "border-red-400" : "border-gray-300"
                    }`}
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="mt-1 text-xs text-red-600">
                        {errors.category}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    メモ
                </label>
                <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="メモを入力（任意）"
                    maxLength={200}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.memo ? "border-red-400" : "border-gray-300"
                    }`}
                />
                {errors.memo && (
                    <p className="mt-1 text-xs text-red-600">{errors.memo}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">{memo.length}/200</p>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {submitting
                        ? "保存中..."
                        : isEditing
                          ? "更新する"
                          : "登録する"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    キャンセル
                </button>
            </div>
        </form>
    );
}
