import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../infra/repositories/APItaskRepository.js", () => ({
    APItaskRepository: vi.fn().mockImplementation(function () {
        return {
            create: vi.fn(),
            listAll: vi.fn(),
        };
    }),
}));

import { TaskService } from "./TaskService.js";
import { APItaskRepository } from "../../infra/repositories/APItaskRepository.js";
import { Task } from "../entities/Task.js";

describe("TaskService", () => {
    let service;
    let repositoryMock;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new TaskService();
        repositoryMock = APItaskRepository.mock.results[0].value;
    });

    it("should create a single task and return success", async () => {
        repositoryMock.create.mockResolvedValueOnce({});

        const payload = {
            name: "T1",
            category: "cat",
            requiredRole: "role",
            expectedDuration: 2,
            urgency: 1,
        };

        const result = await service.create(payload);

        expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        const createdTasks = repositoryMock.create.mock.calls[0][0];
        expect(Array.isArray(createdTasks)).toBe(true);
        expect(createdTasks[0]).toBeInstanceOf(Task);
        expect(result).toEqual({ success: true });
    });

    it("should create multiple tasks when array input is provided", async () => {
        repositoryMock.create.mockResolvedValueOnce({});

        const payload = [
            {
                name: "T1",
                category: "cat",
                requiredRole: "role",
                expectedDuration: 2,
                urgency: 1,
            },
            {
                name: "T2",
                category: "cat",
                requiredRole: "role",
                expectedDuration: 4,
                urgency: 2,
            },
        ];

        const result = await service.create(payload);

        expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        const createdTasks = repositoryMock.create.mock.calls[0][0];
        expect(createdTasks).toHaveLength(2);
        expect(createdTasks[0]).toBeInstanceOf(Task);
        expect(createdTasks[1]).toBeInstanceOf(Task);
        expect(result).toEqual({ success: true });
    });

    it("should return undefined when input data is invalid", async () => {
        const result = await service.create([]);

        expect(result).toBeUndefined();
    });

    it("should return undefined when repository.create fails", async () => {
        repositoryMock.create.mockRejectedValueOnce(new Error("create failed"));

        const result = await service.create({
            name: "T2",
            category: "cat",
            requiredRole: "role",
            expectedDuration: 2,
            urgency: 1,
        });

        expect(result).toBeUndefined();
    });

    it("should map repository listAll results to Task instances", async () => {
        const raw = [
            {
                name: "T1",
                category: "c",
                requiredRole: "role",
                expectedDuration: 1,
                urgency: 2,
            },
        ];
        repositoryMock.listAll.mockResolvedValueOnce(raw);

        const result = await service.getAllData();

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1);
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toBeInstanceOf(Task);
        expect(result[0].name).toBe("T1");
    });

    it("should return unSuccess value when repository returns { unSuccess }", async () => {
        repositoryMock.listAll.mockResolvedValueOnce({ unSuccess: "No data" });

        const result = await service.getAllData();
        expect(result).toBe("No data");
    });

    it("should return undefined when repository.listAll returns an Error instance", async () => {
        repositoryMock.listAll.mockResolvedValueOnce(new Error("fetch failed"));

        const result = await service.getAllData();
        expect(result).toBeUndefined();
    });
});
