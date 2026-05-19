import { APIemployeeRepository } from "../../infra/repositories/APIemployeeRepository.js";
import { Employee } from "../entities/Employee.js";

export class EmployeeService {
    constructor() {
        this.repository = new APIemployeeRepository();
    }

    async create({ name, role, skills }) {
        try {
            const employee = new Employee({
                name,
                role,
                skills,
                isActive: true,
            });

            await this.repository.create(employee);
        } catch (error) {
            throw new Error(`Error in create Employee: ${error.message}`);
        }
    }

    async getAllData() {
        try {
            const employees = await this.repository.listAll();

            return employees.length > 0 ? employees : "No data found";
        } catch (error) {
            throw new Error(`Error in get Employees: ${error.message}`);
        }
    }
}
