import React from "react";
import { useWeeklySchedule } from "../hooks/useWeeklySchedule.js";
import { ScheduleTable } from "../components/ScheduleTable.jsx";
import { Calendar, RefreshCw, AlertCircle } from "lucide-react";

export function Dashboard() {
    const { scheduleData, loading, error, refetch } = useWeeklySchedule();

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Calendar className="text-blue-600" size={32} />
                            Escala Semanal de Farmácia
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Gerenciamento inteligente de turnos e distribuição
                            de tarefas.
                        </p>
                    </div>

                    <button
                        onClick={refetch}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw
                            className={loading ? "animate-spin" : ""}
                            size={18}
                        />
                        Atualizar Dados
                    </button>
                </header>
                <main>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-gray-300">
                            <RefreshCw
                                className="animate-spin text-blue-500 mb-4"
                                size={40}
                            />
                            <p className="text-gray-500 font-medium">
                                Processando algoritmos de escala...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex items-start gap-4">
                            <AlertCircle
                                className="text-red-500 shrink-0"
                                size={24}
                            />
                            <div>
                                <h3 className="text-red-800 font-bold">
                                    Erro ao carregar escalas
                                </h3>
                                <p className="text-red-700 text-sm mt-1">
                                    {error}
                                </p>
                                <button
                                    onClick={refetch}
                                    className="mt-3 text-red-800 underline text-sm font-bold"
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    ) : (
                        <ScheduleTable data={scheduleData} />
                    )}
                </main>

                <footer className="mt-12 text-center text-gray-400 text-sm">
                    &copy; 2026 Gerador de Escalas Inteligente - Sistema de
                    Apoio à Gestão de Farmácias.
                </footer>
            </div>
        </div>
    );
}
