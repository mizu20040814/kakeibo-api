export type Expense = {
    id: number;
    date: string;
    amount: number;
    category: string;
    memo: string;
};

export type ExpenseFormData = {
    date: string;
    amount: number;
    category: string;
    memo: string;
};

export const CATEGORIES = [
    "食費",
    "交通費",
    "日用品",
    "娯楽",
    "その他",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<Category, string> = {
    食費: "🍽️",
    交通費: "🚃",
    日用品: "🧴",
    娯楽: "🎮",
    その他: "📦",
};
