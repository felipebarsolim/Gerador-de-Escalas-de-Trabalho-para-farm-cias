import { describe, it, expect, vi, beforeEach } from "vitest";

let executeMock;
vi.mock("../services/CreateEmployeeUseCase.js", () => ({
    CreateEmployeeUseCase: class {
        constructor() {
            this.execute = executeMock;
        }
    },
}));

import { EmployeeController } from "./EmployeeController.js";

describe("EmployeeController", () => {
    let controller;
    let req;
    let res;

    beforeEach(() => {
        executeMock = vi.fn();

        controller = new EmployeeController();
        req = {
            body: {
                id: 1,
                name: "Felipe",
                role: "Pharmacist",
                skills: "dispensing",
                isPharmacist: true,
            },
        };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    it("should return success when employee is created successfully", async () => {
        executeMock.mockResolvedValue(true);

        await controller.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "OK" });
    });

    it("should return error when createEmployee.execute returns an error message", async () => {
        executeMock.mockResolvedValue("Invalid params");

        await controller.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid params" });
    });

    it("should return error when createEmployee.execute rejects", async () => {
        executeMock.mockRejectedValue(new Error("Unexpected failure"));

        await controller.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ error: "Unexpected failure" });
    });
});
