import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}