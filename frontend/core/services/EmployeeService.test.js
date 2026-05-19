import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../infra/repositories/APIemployeeRepository.js", () => ({
    APIemployeeRepository: vi.fn().mockImplementation(function () {
        return {
            create: vi.fn(),
            listAll: vi.fn(),
        };
    }),
}));

import { EmployeeService } from "./EmployeeService.js";
import { APIemployeeRepository } from "../../infra/repositories/APIemployeeRepository.js";
import { Employee } from "../entities/Employee.js";

describe("EmployeeService", () => {
    let service;
    let repositoryMock;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new EmployeeService();
        repositoryMock = APIemployeeRepository.mock.results[0].value;
    });

    it("should create an employee and call repository.create", async () => {
        repositoryMock.create.mockResolvedValueOnce({ success: true });

        await service.create({
            name: "Alice",
            role: "admin",
            skills: ["manage"],
        });

        expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        const createdEmployee = repositoryMock.create.mock.calls[0][0];
        expect(createdEmployee).toBeInstanceOf(Employee);
        expect(createdEmployee.name).toBe("Alice");
        expect(createdEmployee.role).toBe("admin");
        expect(createdEmployee.skills).toEqual(["manage"]);
        expect(createdEmployee.isActive).toBe(true);
    });

    it("should throw when repository.create rejects", async () => {
        repositoryMock.create.mockRejectedValueOnce(new Error("API error"));

        await expect(
            service.create({ name: "Bob", role: "user", skills: [] }),
        ).rejects.toThrow("Error in create Employee: API error");
    });

    it("should throw when employee data is invalid", async () => {
        await expect(
            service.create({ name: "Al", role: "ad", skills: [] }),
        ).rejects.toThrow(
            "Error in create Employee: O nome do funcionário deve ter pelo menos 3 caracteres",
        );
    });

    it("should return employees from repository.listAll", async () => {
        const employeeList = [new Employee({ name: "Alice", role: "admin" })];
        repositoryMock.listAll.mockResolvedValueOnce(employeeList);

        const result = await service.getAllData();

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1);
        expect(result).toBe(employeeList);
    });

    it("should return 'No data found' when repository returns an empty array", async () => {
        repositoryMock.listAll.mockResolvedValueOnce([]);

        const result = await service.getAllData();

        expect(result).toBe("No data found");
    });

    it("should throw when repository.listAll rejects", async () => {
        repositoryMock.listAll.mockRejectedValueOnce(new Error("Fetch error"));

        await expect(service.getAllData()).rejects.toThrow(
            "Error in get Employees: Fetch error",
        );
    });
});
