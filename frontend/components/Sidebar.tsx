"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "ダッシュボード", icon: "📊" },
    { href: "/expenses", label: "支出一覧", icon: "📋" },
    { href: "/expenses/new", label: "新規登録", icon: "✏️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
            {/* Logo */}
            <div className="px-6 h-16 flex items-center border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        ¥
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                        家計簿
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
                    <span className="text-lg">⚙️</span>
                    設定
                </div>
            </div>
        </aside>
    );
}
