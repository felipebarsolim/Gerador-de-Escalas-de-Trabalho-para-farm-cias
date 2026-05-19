import { useState, useEffect } from "react";
import { EmployeeService } from "../../core/services/EmployeeService.js";

export function useEmployees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchEmployees() {
        try {
            setLoading(true);
            setError(null);

            const service = new EmployeeService();
            const data = await service.getAllData();
            setEmployees(data || []);
        } catch (err) {
            console.error("Erro ao buscar funcionários:", err);
            setError(
                err.message ||
                    "Não foi possível carregar a lista de funcionários.",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return { employees, loading, error, refetch: fetchEmployees };
}
