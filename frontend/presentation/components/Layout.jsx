import React from "react";
import { Sidebar } from "../screens/SideBar.jsx";

export function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 pl-64 flex items-center justify-center">
                <main className="w-full max-w-5xl">{children}</main>
            </div>
        </div>
    );
}
