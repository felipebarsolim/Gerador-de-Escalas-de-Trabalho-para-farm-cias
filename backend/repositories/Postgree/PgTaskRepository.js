import Task from "../../entities/performance/Task.js";
import { database } from "./Connection/ConnectionPostgree.js";

export class PgTaskRepository {
    constructor() {
        this.repository = database;
    }

    async save(task) {
        try {
            if (!task) throw new Error("Empty Data");

            const query = `
            INSERT INTO "tasks" (id, name, category, required_role, expected_duration, urgency, is_ended)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;

            const values = [
                task.id,
                task.name,
                task.category,
                task.requiredRole,
                task.expectedDuration,
                task.urgency,
                task.isEnded,
            ];

            const res = await this.repository.query(query, values);

            return res;
        } catch (error) {
            throw new Error(`Task Database error: ${error.message}`);
        }
    }

    /**
     *
     * @returns {Promise<Array<Task>>}
     */
    async getAllData() {
        try {
            const query = `
                SELECT * FROM "tasks"`;

            const res = await this.repository.query(query);

            if (res.rowCount === 0) throw new Error("No data");

            return res.rows.map((row) => {
                return new Task({
                    id: row.id,
                    name: row.name,
                    category: row.category,
                    requiredRole: row.required_role,
                    expectedDuration: row.expected_duration,
                    urgency: row.urgency,
                    isEnded: row.is_ended,
                });
            });
        } catch (error) {
            throw new Error(`Task DataBase Error: ${error.message}`);
        }
    }
}
