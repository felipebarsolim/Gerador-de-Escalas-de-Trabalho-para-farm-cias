import React from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeTable } from "../components/EmployeeTable";
import { RefreshCw, Users, Plus } from "lucide-react";

export function EmployeesScreen() {
    const { employees, loading, error, refetch } = useEmployees();

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 w-full">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Users className="text-blue-600" size={32} />
                            Equipe e Funcionários
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Visualização e gerenciamento de colaboradores da
                            farmácia.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={refetch}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                        >
                            <RefreshCw
                                className={loading ? "animate-spin" : ""}
                                size={18}
                            />
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
                            <Plus size={18} />
                            Novo Funcionário
                        </button>
                    </div>
                </header>

                {/* Conteúdo */}
                <main>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-gray-300">
                            <RefreshCw
                                className="animate-spin text-blue-500 mb-4"
                                size={40}
                            />
                            <p className="text-gray-500 font-medium">
                                Buscando colaboradores...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-red-800">
                            <h3 className="font-bold">
                                Erro ao carregar equipe
                            </h3>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    ) : (
                        <EmployeeTable employees={employees} />
                    )}
                </main>
            </div>
        </div>
    );
}
