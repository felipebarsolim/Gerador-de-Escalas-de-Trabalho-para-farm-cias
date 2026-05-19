import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../infra/repositories/APIcustomerTrafficRepository.js", () => ({
    APIcustomerTrafficRepository: vi.fn().mockImplementation(function () {
        return {
            create: vi.fn(),
            listAll: vi.fn(),
        };
    }),
}));

import { CustomerTrafficService } from "./CustomerTrafficService.js";
import { APIcustomerTrafficRepository } from "../../infra/repositories/APIcustomerTrafficRepository.js";
import { CustomerTraffic } from "../entities/CustomerTraffic.js";

describe("CustomerTrafficService", () => {
    let service;
    let repositoryMock;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new CustomerTrafficService();
        repositoryMock = APIcustomerTrafficRepository.mock.results[0].value;
    });

    it("should send a single customer traffic item to the repository", async () => {
        repositoryMock.create.mockResolvedValueOnce({ success: true });

        const payload = { day: 1, hour: 8, customerVolume: 15 };
        const result = await service.create(payload);

        expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        const createdData = repositoryMock.create.mock.calls[0][0];
        expect(Array.isArray(createdData)).toBe(true);
        expect(createdData[0]).toBeInstanceOf(CustomerTraffic);
        expect(createdData[0].day).toBe(1);
        expect(createdData[0].hour).toBe(8);
        expect(createdData[0].customerVolume).toBe(15);
        expect(result).toEqual({ success: true });
    });

    it("should send an array of customer traffic items to the repository", async () => {
        repositoryMock.create.mockResolvedValueOnce({ success: true });

        const payload = [
            { day: 2, hour: 10, customerVolume: 20 },
            { day: 3, hour: 12, customerVolume: 25 },
        ];

        const result = await service.create(payload);

        expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        const createdData = repositoryMock.create.mock.calls[0][0];
        expect(createdData).toHaveLength(2);
        expect(createdData[0]).toBeInstanceOf(CustomerTraffic);
        expect(createdData[1]).toBeInstanceOf(CustomerTraffic);
        expect(result).toEqual({ success: true });
    });

    it("should return undefined when repository.create rejects", async () => {
        repositoryMock.create.mockRejectedValueOnce(new Error("create failed"));

        const result = await service.create({
            day: 1,
            hour: 9,
            customerVolume: 12,
        });
        expect(result).toBeUndefined();
    });

    it("should return undefined when customer traffic input is invalid", async () => {
        const result = await service.create({
            day: 10,
            hour: 9,
            customerVolume: 12,
        });
        expect(result).toBeUndefined();
    });

    it("should return repository listAll response", async () => {
        const payload = [
            { id: 42, dayOfWeek: 4, hour: 14, customerVolume: 30 },
        ];
        repositoryMock.listAll.mockResolvedValueOnce(payload);

        const result = await service.getAllData();

        expect(repositoryMock.listAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(payload);
    });

    it("should return undefined when repository.listAll returns an Error instance", async () => {
        repositoryMock.listAll.mockResolvedValueOnce(new Error("fetch failed"));

        const result = await service.getAllData();
        expect(result).toBeUndefined();
    });

    it("should return undefined when repository.listAll rejects", async () => {
        repositoryMock.listAll.mockRejectedValueOnce(
            new Error("network failed"),
        );

        const result = await service.getAllData();
        expect(result).toBeUndefined();
    });
});
