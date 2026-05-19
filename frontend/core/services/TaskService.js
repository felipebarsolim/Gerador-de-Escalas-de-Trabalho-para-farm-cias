import { client } from "../../infra/api/client.js";
import { APItaskRepository } from "../../infra/repositories/APItaskRepository.js";
import { Task } from "../entities/Task.js";

export class TaskService {
    constructor() {
        this.repository = new APItaskRepository();
    }

    /**
     *
     * @param {Array} data
     * @returns {{success: boolean}}
     */
    async create(data) {
        try {
            data = Array.isArray(data) ? data : [data];

            if (data.length === 0) throw new Error("Invalid input data Task");

            const tasks = data.map((task) => {
                return new Task({
                    name: task.name,
                    category: task.category,
                    requiredRole: task.requiredRole,
                    expectedDuration: task.expectedDuration,
                    urgency: task.urgency,
                });
            });

            const response = await this.repository.create(tasks);

            return { success: true };
        } catch (error) {
            console.error(`\nError in task service -> ${error.message}`);
        }
    }

    async getAllData() {
        try {
            let tasks = await this.repository.listAll();

            if (tasks.unSuccess) return tasks.unSuccess;

            if (tasks instanceof Error) throw new Error(tasks.message);

            return tasks.map((t) => {
                return new Task({
                    name: t.name,
                    category: t.category,
                    requiredRole: t.requiredRole,
                    expectedDuration: t.expectedDuration,
                    urgency: t.urgency,
                });
            });
        } catch (error) {
            console.error(`\nError in task service -> ${error.message}`);
        }
    }
}
