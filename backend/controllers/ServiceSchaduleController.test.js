import { describe, it, expect, vi, beforeEach } from "vitest";

let getAllDataScheduleMock;
let employeeGetAllDataMock;
let taskGetAllDataMock;
let customerTrafficGetAllDataMock;
let generateDailyScheduleMock;
let scheduleSaveMock;

vi.mock("../services/GetServiceScheduleUseCase.js", () => ({
    GetServiceScheduleUseCase: class {
        execute() {
            return getAllDataScheduleMock();
        }
    },
}));

vi.mock("../repositories/mkEmployeeRepository.js", () => ({
    default: class {
        getAllData() {
            return employeeGetAllDataMock();
        }
    },
}));

vi.mock("../repositories/MkTaskRepository.js", () => ({
    MkTaskRepository: class {
        getAllData() {
            return taskGetAllDataMock();
        }
    },
}));

vi.mock("../repositories/MkCutomerTraffic.js", () => ({
    MkCustomerTraffic: class {
        getAllData() {
            return customerTrafficGetAllDataMock();
        }
    },
}));

vi.mock("../services/SchedulerService.js", () => ({
    ScheduleService: class {
        constructor(satisfactionScore, customerTraffic) {
            this.satisfactionScore = satisfactionScore;
            this.customerTraffic = customerTraffic;
        }

        generateDailySchedule() {
            return generateDailyScheduleMock();
        }
    },
}));

vi.mock("../repositories/MkScheduleRepository.js", () => ({
    MkScheduleRpository: class {
        save(schedule) {
            return scheduleSaveMock(schedule);
        }
    },
}));

import { ServiceSchaduleController } from "./ServiceSchaduleController.js";

describe("ServiceSchaduleController", () => {
    let controller;
    let req;
    let res;

    beforeEach(() => {
        getAllDataScheduleMock = vi.fn();
        employeeGetAllDataMock = vi.fn();
        taskGetAllDataMock = vi.fn();
        customerTrafficGetAllDataMock = vi.fn();
        generateDailyScheduleMock = vi.fn();
        scheduleSaveMock = vi.fn();

        controller = new ServiceSchaduleController();
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    it("should return success when getAllData succeeds", async () => {
        getAllDataScheduleMock.mockResolvedValue("[]");

        await controller.getAllData({}, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: "OK",
            payload: "[]",
        });
    });

    it("should return error when getAllData fails", async () => {
        getAllDataScheduleMock.mockRejectedValue(new Error("fetch error"));

        await controller.getAllData({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "fetch error" });
    });

    it("should return success when create succeeds", async () => {
        employeeGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        taskGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        customerTrafficGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        generateDailyScheduleMock.mockReturnValue({ hour: 7 });
        scheduleSaveMock.mockResolvedValue(true);

        req = {
            body: {
                day: 1,
                satifactionScore: 10,
            },
        };

        await controller.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: "OK",
        });
    });

    it("should return error when create fails", async () => {
        employeeGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        taskGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        customerTrafficGetAllDataMock.mockResolvedValue([{ id: 1 }]);
        generateDailyScheduleMock.mockReturnValue(new Error("save failed"));

        req = {
            body: {
                day: 1,
                satifactionScore: 10,
            },
        };

        await controller.create(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Service Schedule Controller Error -> save failed",
        });
    });
});
