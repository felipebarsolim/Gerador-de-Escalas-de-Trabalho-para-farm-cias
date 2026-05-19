import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../api/client.js", () => ({
    client: vi.fn(),
}));

import { client } from "../api/client.js";
import { APItaskRepository } from "./APItaskRepository.js";
import { Task } from "../../core/entities/Task.js";

describe("APItaskRepository", () => {
    let repository;

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new APItaskRepository();
    });

    describe("create", () => {
        it("sends POST request with JSON body for a single task", async () => {
            const mockResponse = { success: true };
            client.mockResolvedValueOnce(mockResponse);

            const payload = {
                id: 1,
                name: "Task One",
                category: "cat",
                requiredRole: "role",
                expectedDuration: 2,
                urgency: 3,
            };
            const result = await repository.create(payload);

            expect(client).toHaveBeenCalledWith("/createTasks", {
                method: "POST",
                body: JSON.stringify([payload]),
            });
            expect(result).toEqual(mockResponse);
        });

        it("sends POST request with JSON body for multiple tasks", async () => {
            const mockResponse = { success: true };
            client.mockResolvedValueOnce(mockResponse);

            const payload = [
                {
                    id: 1,
                    name: "Task 1",
                    category: "cat",
                    requiredRole: "role",
                    expectedDuration: 2,
                    urgency: 2,
                },
                {
                    id: 2,
                    name: "Task 2",
                    category: "cat",
                    requiredRole: "role",
                    expectedDuration: 3,
                    urgency: 4,
                },
            ];

            const result = await repository.create(payload);

            expect(client).toHaveBeenCalledWith("/createTasks", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            expect(result).toEqual(mockResponse);
        });

        it("throws when passed an empty task array", async () => {
            await expect(repository.create([])).rejects.toThrow(
                "No data in tasks",
            );
        });

        it("propagates client errors", async () => {
            client.mockRejectedValueOnce(new Error("Server unavailable"));

            await expect(
                repository.create({
                    name: "Task",
                    category: "cat",
                    requiredRole: "role",
                    expectedDuration: 2,
                    urgency: 1,
                }),
            ).rejects.toThrow("Error in create tasks -> Server unavailable");
        });
    });

    describe("listAll", () => {
        it("maps raw response array to Task instances", async () => {
            const raw = [
                {
                    id: 1,
                    name: "Task 1",
                    category: "cat",
                    requiredRole: "role",
                    urgency: 2,
                    isEnded: false,
                },
            ];
            client.mockResolvedValueOnce(raw);

            const result = await repository.listAll();

            expect(client).toHaveBeenCalledWith("/getTasks");
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(Task);
            expect(result[0].name).toBe("Task 1");
        });

        it("maps response payload object to Task instances", async () => {
            const raw = {
                payload: [
                    {
                        id: 2,
                        name: "Task 2",
                        category: "cat",
                        requiredRole: "role",
                        urgency: 3,
                        isEnded: true,
                    },
                ],
            };
            client.mockResolvedValueOnce(raw);

            const result = await repository.listAll();

            expect(result[0]).toBeInstanceOf(Task);
            expect(result[0].isEnded).toBe(true);
        });

        it("returns noSucess object when payload is empty", async () => {
            client.mockResolvedValueOnce({ payload: [] });

            const result = await repository.listAll();
            expect(result).toEqual({ noSucess: "no data found" });
        });

        it("throws when response contains an error property", async () => {
            client.mockResolvedValueOnce({ error: true, message: "Bad API" });

            await expect(repository.listAll()).rejects.toThrow(
                "Error in list all tasks -> API error in get tasks",
            );
        });

        it("throws when client returns Error instance", async () => {
            client.mockResolvedValueOnce(new Error("Task fetch failed"));

            await expect(repository.listAll()).rejects.toThrow(
                "Error in list all tasks -> Task fetch failed",
            );
        });
    });
});
