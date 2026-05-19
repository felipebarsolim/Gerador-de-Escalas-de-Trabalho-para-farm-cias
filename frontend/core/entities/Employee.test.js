import { describe, it, expect } from "vitest";
import { Employee } from "./Employee.js";

describe("Employee entity", () => {
    it("returns a formatted name with the first letter capitalized", () => {
        const employee = new Employee({
            id: 1,
            name: "john doe",
            role: "developer",
        });

        expect(employee.FormatedName).toBe("John doe");
    });

    it("returns the correct status color for active/working states", () => {
        const activeWorking = new Employee({
            id: 2,
            name: "Ana",
            role: "tester",
            isActive: true,
            isWorking: true,
        });
        const activeNotWorking = new Employee({
            id: 3,
            name: "Maria",
            role: "designer",
            isActive: true,
            isWorking: false,
        });
        const inactive = new Employee({
            id: 4,
            name: "Carlos",
            role: "manager",
            isActive: false,
            isWorking: false,
        });

        expect(activeWorking.statusColor).toBe("orange");
        expect(activeNotWorking.statusColor).toBe("green");
        expect(inactive.statusColor).toBe("gray");
    });

    it("returns an error if name or role have not 3 caractere", () => {
        expect(() => {
            new Employee({ name: "Ab", role: "dev" });
        }).toThrow(Error);
    });
});
