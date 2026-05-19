import Employee from "../entities/RH/Employee.js";
import { PgEmployeeRepository } from "../repositories/Postgree/PgEmployeeRepository.js";
import { PgWeeklyScheduleRepository } from "../repositories/Postgree/PgWeeklyScheduleRepository.js";

export class CreateEmployeeUseCase {
    constructor({
        id,
        name,
        role,
        skills = [],
        isPharmacist,
        employeeRepository = new PgEmployeeRepository(),
    }) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.skills = skills;
        this.isPharmacist = isPharmacist;
        this.weeklyScheduleRepository = weeklyScheduleRepository;

        this.repository = employeeRepository;
    }

    isValid() {
        const checks = {
            name: typeof this.name === "string" && this.name.trim().length > 0,
            role: typeof this.role === "string" && this.role.trim().length > 0,
            skills: Array.isArray(this.skills),
            pharmacist: typeof this.isPharmacist === "boolean",
        };

        return Object.values(checks).every((check) => (check = true));
    }

    async execute() {
        try {
            if (!this.isValid()) throw new Error("Invalid params");

            const newEmployee = new Employee({
                id: this.id,
                name: this.name,
                role: this.role,
                skills: this.skills,
                weeklySchedule: this.weeklySchedule,
                isPharmacist: this.isPharmacist,
            });

            const isEmployeeSaved = await this.repository.save(newEmployee);

            if (!isEmployeeSaved)
                throw new Error("Error in save employee in repository");

            return true;
        } catch (error) {
            console.log(error.stack);
            return error.message;
        }
    }
}
