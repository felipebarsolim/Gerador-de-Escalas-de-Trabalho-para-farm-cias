import { describe, it, expect, afterAll } from "vitest";
import { PgTaskRepository } from "./PgTaskRepository.js";
import { database } from "./Connection/ConnectionPostgree.js";

const repository = new PgTaskRepository();
const taskTestData = {
    id: Date.now(), // ID único baseado em timestamp
    name: "Teste Inserção Task",
    category: "Execução",
    requiredRole: "Pharmacist",
    expectedDuration: 30,
    urgency: 3,
    isEnded: false,
};

let insertedRow = null;

describe("PgTaskRepository", () => {
    it("deve inserir uma tarefa no banco de dados", async () => {
        const result = await repository.save(taskTestData);

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
        expect(result.rows[0]).toMatchObject({
            id: taskTestData.id.toString(),
            name: taskTestData.name,
            category: taskTestData.category,
            required_role: taskTestData.requiredRole,
            expected_duration: taskTestData.expectedDuration,
            urgency: taskTestData.urgency,
        });

        insertedRow = result.rows[0];
    });
});

afterAll(async () => {
    if (insertedRow) {
        await database.query('DELETE FROM "tasks" WHERE id = $1', [
            taskTestData.id,
        ]);
    }
});
