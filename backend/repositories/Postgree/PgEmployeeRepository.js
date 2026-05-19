import Employee from "../../entities/RH/Employee.js";
import { database } from "./Connection/ConnectionPostgree.js";

export class PgEmployeeRepository {
    constructor() {
        this.repository = database;
    }

    /**
     *Salva um novo funcionário da tabela Employees
     * @param {Object<Employee>} data
     * @returns {Object}
     */
    async save(employee) {
        try {
            if (!employee) throw new Error("Empty data");

            const query = `
            INSERT INTO "employees" (id, name, role, skills, weekly_schedule, is_pharmacist)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;

            const values = [
                Number(employee.id),
                employee.name,
                employee.role,
                JSON.stringify(employee.skills),
                JSON.stringify(employee.weeklySchedule),
                employee.isPharmacist,
            ];

            const res = await this.repository.query(query, values);

            return res;
        } catch (error) {
            throw new Error(`Database Error -> ${error.message}`);
        }
    }

    /**
     * Altera uma coluna da tabela Employees
     * @param {string} employeeName
     * @param {string} param
     * @param {Array} data
     * @returns {Object}
     */
    async update(employeeName, param, data) {
        try {
            if (!employeeName || !param) throw new Error("Empty data");

            const query = `
            UPDATE "employees"
            SET ${param} = $1
            WHERE name = $2
            RETURNING *`;

            const values = [data, employeeName];

            const res = await this.repository.query(query, values);

            if (res.rowCount === 0)
                throw new Error(`${employeeName} not found in database`);

            return res;
        } catch (error) {
            throw new Error(`Employee Database Error -> ${error.message}`);
        }
    }

    async getAllData() {
        try {
            const query = `
            SELECT * FROM "employees"`;

            const res = await this.repository.query(query);

            if (res.rowCount === 0) return "No Data";

            return res.rows.map((row) => {
                return new Employee({
                    id: row.id,
                    name: row.name,
                    role: row.role,
                    skills: row.skills,
                    weeklySchedule: row.weekly_schedule,
                    isPharmacist: row.is_pharmacist,
                });
            });
        } catch (error) {
            throw new Error(`Employee DataBase Error -> ${error.message}`);
        }
    }
}
