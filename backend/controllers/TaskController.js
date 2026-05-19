import { PgTaskRepository } from "../repositories/Postgree/PgTaskRepository.js";
import { CreateTaskUseCase } from "../services/CreateTaskUseCase.js";
import { GetTaskUseCase } from "../services/GetTaskUseCase.js";

export class TaskController {
    constructor() {
        this.repository = new PgTaskRepository();
    }

    async create(req, res) {
        try {
            if (Object.keys(req.body).length === 0)
                throw new Error("Empty data");

            const data = Array.isArray(req.body) ? req.body : [req.body];

            for (const task of data) {
                const {
                    id,
                    name,
                    requiredRole,
                    expectedDuration,
                    urgency,
                    category,
                } = task;

                const createTask = new CreateTaskUseCase({
                    id,
                    name,
                    category,
                    expectedDuration,
                    requiredRole,
                    urgency,
                    repository: this.repository,
                });

                const result = await createTask.execute();

                if (result !== true)
                    throw new Error(`Error in create task ${name}`);
            }

            res.status(200).json({
                success: "OK",
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json("Internal Error");
        }
    }

    async getAllData(req, res) {
        try {
            const getTasks = new GetTaskUseCase(this.repository);

            const tasks = await getTasks.execute();

            res.status(200).json({
                success: "OK",
                payload: tasks,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json("Internal Error");
        }
    }
}
