import React from "react";
import { ScheduleRow } from "./ScheduleRow.jsx";

export function ScheduleTable({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 bg-white shadow rounded-lg border">
                Nenhuma escala gerada para este período.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Funcionário
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dia da Semana
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Horário de Entrada
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Horário de Saída
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((item) => (
                        <ScheduleRow
                            key={item.employee}
                            employee={item.employee}
                            schedules={item.schedules}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
