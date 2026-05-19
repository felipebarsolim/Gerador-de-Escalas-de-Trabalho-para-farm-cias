import { describe, it, expect } from "vitest";
import { Task } from "./Task.js";

describe("Task entity", () => {
    it("returns correct status color based on isEnded", () => {
        const taskEnded = new Task({
            id: 1,
            name: "Complete report",
            category: "execucao",
            requiredRole: "analyst",
            urgency: 3,
            isEnded: true,
        });

        const taskActive = new Task({
            id: 2,
            name: "Review code",
            category: "tecnico",
            requiredRole: "developer",
            urgency: 2,
            isEnded: false,
        });

        expect(taskEnded.statusColor()).toBe("green");
        expect(taskActive.statusColor()).toBe("orange");
    });

    it("returns correct urgency color based on urgency level", () => {
        const urgent1 = new Task({
            name: "Low priority",
            category: "financeiro",
            requiredRole: "accountant",
            urgency: 1,
        });

        const urgent2 = new Task({
            name: "Medium-low priority",
            category: "treinamento",
            requiredRole: "trainer",
            urgency: 2,
        });

        const urgent3 = new Task({
            name: "Medium priority",
            category: "execucao",
            requiredRole: "worker",
            urgency: 3,
        });

        const urgent4 = new Task({
            name: "High priority",
            category: "tecnico",
            requiredRole: "engineer",
            urgency: 4,
        });

        const urgent5 = new Task({
            name: "Critical priority",
            category: "financeiro",
            requiredRole: "manager",
            urgency: 5,
        });

        expect(urgent1.urgencyColor()).toBe("green");
        expect(urgent2.urgencyColor()).toBe("yellow");
        expect(urgent3.urgencyColor()).toBe("orange");
        expect(urgent4.urgencyColor()).toBe("red");
        expect(urgent5.urgencyColor()).toBe("black");
    });

    it("throws error when required fields are missing", () => {
        expect(
            () =>
                new Task({
                    name: "",
                    category: "execucao",
                    requiredRole: "worker",
                    urgency: 3,
                }),
        ).toThrow("Task entity Error:");

        expect(
            () =>
                new Task({
                    name: "Task",
                    category: "",
                    requiredRole: "worker",
                    urgency: 3,
                }),
        ).toThrow("Task entity Error:");

        expect(
            () =>
                new Task({
                    name: "Task",
                    category: "execucao",
                    requiredRole: "",
                    urgency: 3,
                }),
        ).toThrow("Task entity Error:");
    });

    it("throws error when urgency is not an integer", () => {
        expect(
            () =>
                new Task({
                    name: "Task",
                    category: "execucao",
                    requiredRole: "worker",
                    urgency: 3.5,
                }),
        ).toThrow("Task entity Error:");
    });
});
