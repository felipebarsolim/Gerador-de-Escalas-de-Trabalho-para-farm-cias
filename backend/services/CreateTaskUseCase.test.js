import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateTaskUseCase } from "./CreateTaskUseCase.js";
import { MkTaskRepository } from "../repositories/MkTaskRepository.js";
import Task from "../entities/performance/Task.js";

/**
 * Aqui eu estou considerando que os dados já estão vindo corretos do controller
 */

describe("CreateTaskUseCase", () => {
    let taskData;
    let taskRepository = new MkTaskRepository();

    beforeEach(() => {
        taskRepository.removeAll();
        taskData = new Task({
            id: 1,
            name: "Organizar caixas",
            category: "execucao",
            expectedDuration: 1,
            urgency: 3,
        });
        taskData.repository = taskRepository;
    });

    it("deve retornar true quando a task é gerada e salva com sucesso", async () => {
        const service = new CreateTaskUseCase(taskData);
        const result = await service.execute();

        expect(result).toBe(true);
    });

    it("Deve retornar um erro se os parametros estiverem errados", async () => {
        taskData.urgency = -3;
        taskData.id = "w";

        const service = new CreateTaskUseCase(taskData);

        await expect(service.execute()).rejects.toThrow(
            "Error Use Case: Error in task params",
        );
    });
});
