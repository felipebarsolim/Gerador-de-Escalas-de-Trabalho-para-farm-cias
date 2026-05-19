import React from "react";
import { Home, Users, Settings, LogOut } from "lucide-react";

export function Sidebar({ currentTab, setCurrentTab }) {
    return (
        <aside className="sidebar">
            <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-gray-200">
                <Home className="text-blue-600" size={24} />
                <span className="font-bold text-lg tracking-wide">
                    FarmaEscala
                </span>
            </div>

            <nav className="flex flex-col gap-1">
                <a
                    href="#dashboard"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("dashboard");
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        currentTab === "dashboard"
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <Home size={20} />
                    Escala Semanal
                </a>
                <a
                    href="#employees"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("employees");
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        currentTab === "employees"
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <Users size={20} />
                    Funcionários
                </a>

                <a
                    href="#settings"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("settings");
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        currentTab === "settings"
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <Settings size={20} />
                    Configurações
                </a>
            </nav>

            <button className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-lg mt-auto text-sm font-medium hover:bg-gray-50">
                <LogOut size={18} />
                Sair do Sistema
            </button>
        </aside>
    );
}
