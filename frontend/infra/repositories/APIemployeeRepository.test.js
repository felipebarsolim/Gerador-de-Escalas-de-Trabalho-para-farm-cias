import { describe, it, expect, vi, beforeEach } from "vitest";
import { APIemployeeRepository } from "./APIemployeeRepository.js";
import { Employee } from "../../core/entities/Employee.js";

vi.mock("../api/client.js", () => ({
    client: vi.fn(),
}));

import { client } from "../api/client.js";

describe("APIemployeeRepository", () => {
    let repository;

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new APIemployeeRepository();
    });

    describe("listAll", () => {
        it("returns an array of Employee instances from /getEmployees endpoint", async () => {
            const mockEmployeesData = [
                {
                    id: 1,
                    name: "John Doe",
                    role: "developer",
                    skills: ["JavaScript", "React"],
                    weeklySchedule: [],
                    isActive: true,
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    role: "designer",
                    skills: ["Figma", "UI"],
                    weeklySchedule: [],
                    isActive: true,
                },
            ];

            client.mockResolvedValueOnce(mockEmployeesData);

            const result = await repository.listAll();

            expect(client).toHaveBeenCalledWith("/getEmployees");
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(Employee);
            expect(result[1]).toBeInstanceOf(Employee);
        });

        it("throws error when client returns error object", async () => {
            const errorData = new Error("Network error");
            client.mockResolvedValueOnce(errorData);

            await expect(repository.listAll()).rejects.toThrow(
                "Error in fetch employees: Network error",
            );
        });

        it("returns array of Employee instances even with single employee", async () => {
            const mockEmployeeData = [
                {
                    id: 1,
                    name: "Solo Dev",
                    role: "fullstack",
                    skills: ["Node", "Vue"],
                    weeklySchedule: [],
                    isActive: true,
                },
            ];

            client.mockResolvedValueOnce(mockEmployeeData);

            const result = await repository.listAll();

            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(Employee);
        });
    });

    describe("create", () => {
        it("sends POST request to /createEmployees with employee data", async () => {
            const mockResponse = { success: true, id: 1 };
            client.mockResolvedValueOnce(mockResponse);

            const newEmployee = new Employee({
                id: 1,
                name: "New Employee",
                role: "junior",
                skills: ["Learning"],
                weeklySchedule: [],
                isActive: true,
            });

            const result = await repository.create(newEmployee);

            expect(client).toHaveBeenCalledWith("/createEmployees", {
                method: "POST",
                body: JSON.stringify(newEmployee),
            });
            expect(result).toEqual(mockResponse);
        });

        it("returns Promise that resolves with API response", async () => {
            const mockResponse = { success: true, message: "Employee created" };
            client.mockResolvedValueOnce(mockResponse);

            const employee = new Employee({
                name: "Test User",
                role: "intern",
            });

            const result = await repository.create(employee);

            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });

        it("propagates errors from client", async () => {
            client.mockRejectedValueOnce(new Error("API error"));

            const employee = new Employee({
                name: "Error Test",
                role: "admin",
            });

            await expect(repository.create(employee)).rejects.toThrow(
                "API error",
            );
        });
    });
});
