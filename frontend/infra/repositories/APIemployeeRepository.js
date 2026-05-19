import { Employee } from "../../core/entities/Employee.js";
import { APIendpoint } from "../../shared/constants/APIendpoints.js";
import { client } from "../api/client.js";

export class APIemployeeRepository {
    constructor() {
        this.client = client;
    }

    /**
     * cria uma requisição para a api na rota /getEmployees
     * @returns {Promise<Array<Employee>>}
     */
    async listAll() {
        const response = await this.client(APIendpoint.getEmployees);

        if (response instanceof Error)
            throw new Error(`Error in fetch employees: ${response.message}`);

        let payload;
        if (Array.isArray(response)) {
            payload = response;
        } else if (
            response &&
            Object.prototype.hasOwnProperty.call(response, "payload")
        ) {
            payload = response.payload;
        } else {
            payload = response;
        }

        payload = Array.isArray(payload) ? payload : [payload];

        return payload.map((emp) => {
            return new Employee({
                id: emp.id,
                name: emp.name,
                role: emp.role,
                skills: emp.skills,
                weeklySchedule: emp.weeklySchedule,
                isActive: emp.isActive,
            });
        });
    }

    /**
     * cria uma requisição para a api na rota /createEmployee
     * @param {Object<Employee>} employee
     * @returns {Promise}
     */
    async create(employee) {
        return await this.client(APIendpoint.createEmployees, {
            method: "POST",
            body: JSON.stringify(employee),
        });
    }
}
