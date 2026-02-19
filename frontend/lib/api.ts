import { Expense, ExpenseFormData } from "@/types/expense";

const API_URL = "http://localhost:8080/api/expenses";

const AUTH_HEADER = "Basic " + btoa("admin:password123");

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const message = await res
            .text()
            .catch(() => "不明なエラーが発生しました");
        throw new Error(`エラー (${res.status}): ${message}`);
    }

    if (res.status === 204 || res.headers.get("content-length") === "0") {
        return undefined as T;
    }

    return res.json();
}

export async function fetchExpenses(): Promise<Expense[]> {
    return request<Expense[]>(API_URL);
}

export async function fetchExpensesByMonth(
    year: number,
    month: number,
): Promise<Expense[]> {
    return request<Expense[]>(`${API_URL}/monthly/${year}/${month}`);
}

export async function fetchExpenseById(id: number): Promise<Expense> {
    return request<Expense>(`${API_URL}/${id}`);
}

export async function createExpense(data: ExpenseFormData): Promise<Expense> {
    return request<Expense>(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateExpense(
    id: number,
    data: ExpenseFormData,
): Promise<Expense> {
    return request<Expense>(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteExpense(id: number): Promise<void> {
    return request<void>(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}
