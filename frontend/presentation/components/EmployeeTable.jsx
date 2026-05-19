import React from "react";

export function EmployeeTable({ employees }) {
    if (!employees || employees.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 bg-white shadow rounded-lg border">
                Nenhum funcionário cadastrado no sistema.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cargo / Função
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {employees.map((emp, index) => (
                        <tr
                            key={emp.id || index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {emp.name}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {emp.role || "Funcionário"}
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded">
                                    Ativo
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
