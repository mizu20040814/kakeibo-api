import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "家計簿",
    description: "シンプルな家計簿アプリケーション",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="app-layout">
                    <Sidebar />
                    <main className="main-content ml-[260px] p-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
