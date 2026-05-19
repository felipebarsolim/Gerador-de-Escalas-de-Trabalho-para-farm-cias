import { describe, it, expect, afterAll } from "vitest";
import { PgEmployeeRepository } from "./PgEmployeeRepository.js";
import { database } from "./Connection/ConnectionPostgree.js";

const repository = new PgEmployeeRepository();
const employeeTestData = {
    id: Date.now(), // ID único baseado em timestamp
    name: "Teste Inserção",
    role: "Tester",
    skills: ["validar", "testar"],
    weeklySchedule: [
        { day: 1, entry: "09:00", exit: "17:00" },
        { day: 2, entry: "09:00", exit: "17:00" },
    ],
    isPharmacist: false,
};

let insertedRow = null;

describe("PgEmployeeRepository", () => {
    it("deve inserir um funcionário no banco de dados", async () => {
        const result = await repository.save(employeeTestData);

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
        expect(result.rows[0]).toMatchObject({
            id: employeeTestData.id.toString(),
            name: employeeTestData.name,
            role: employeeTestData.role,
            is_pharmacist: employeeTestData.isPharmacist,
        });

        insertedRow = result.rows[0];
    });
});

afterAll(async () => {
    if (insertedRow) {
        await database.query('DELETE FROM "employees" WHERE id = $1', [
            employeeTestData.id,
        ]);
    }
});
