import { describe, it, expect } from "vitest";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

describe("CreateEmployeeUseCase", () => {
    let employeeRepository;
    let data;
    it("Deveria retornar true caso todos os parametros estejam corretos", async () => {
        data = {
            id: 1,
            name: "felipe",
            role: "supervisor",
            skills: ["bater cofre"],
            weeklySchedule: [
                { day: 0, entry: 13, exit: 23 },
                { day: 1, entry: 13, exit: 23 },
                { day: 3, entry: 13, exit: 23 },
            ],
            isPharmacist: false,
        };

        const createEmployee = new CreateEmployeeUseCase(data);
        const result = await createEmployee.execute();

        expect(result).toBe(true);
    });

    it("Deveria retornar erro quando a escala semanal não estiver em formato de array", async () => {
        data = {
            id: 1,
            name: 2,
            role: "supervisor",
            skills: "bater cofre",
            weeklySchedule: [
                { day: 0, entry: 13, exit: 23 },
                { day: 1, entry: 13, exit: 23 },
                { day: 3, entry: 13, exit: 23 },
            ],
            isPharmacist: false,
        };

        const createEmployee = new CreateEmployeeUseCase({
            ...data,
            weeklyScheduleRepository: {
                getDaysOfWeekOfEmployee: () => null,
            },
        });
        const result = await createEmployee.execute();

        expect(result).toBe("Internal error: weekly schedule is not array");
    });
});
