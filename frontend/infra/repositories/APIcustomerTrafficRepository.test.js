import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../api/client.js", () => ({
    client: vi.fn(),
}));

import { client } from "../api/client.js";
import { APIcustomerTrafficRepository } from "./APIcustomerTrafficRepository.js";
import { CustomerTraffic } from "../../core/entities/CustomerTraffic.js";

describe("APIcustomerTrafficRepository", () => {
    let repository;

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new APIcustomerTrafficRepository();
    });

    describe("create", () => {
        it("sends POST request with JSON body for a single customer traffic item", async () => {
            const mockResponse = { success: true };
            client.mockResolvedValueOnce(mockResponse);

            const payload = { day: 1, hour: 8, customerVolume: 15 };
            const result = await repository.create(payload);

            expect(client).toHaveBeenCalledTimes(1);
            expect(client).toHaveBeenCalledWith("/createCustomerTraffic", {
                method: "POST",
                body: JSON.stringify([payload]),
            });
            expect(result).toEqual(mockResponse);
        });

        it("sends POST request with JSON body for an array of items", async () => {
            const mockResponse = { success: true };
            client.mockResolvedValueOnce(mockResponse);

            const payload = [
                { day: 0, hour: 7, customerVolume: 5 },
                { day: 1, hour: 9, customerVolume: 10 },
            ];
            const result = await repository.create(payload);

            expect(client).toHaveBeenCalledWith("/createCustomerTraffic", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            expect(result).toEqual(mockResponse);
        });

        it("propagates client errors as repository errors", async () => {
            client.mockRejectedValueOnce(new Error("network failure"));

            await expect(
                repository.create({ day: 1, hour: 8, customerVolume: 15 }),
            ).rejects.toThrow(
                "Error in customer traffic repository -> network failure",
            );
        });
    });

    describe("listAll", () => {
        it("maps raw response array to CustomerTraffic instances", async () => {
            const raw = [{ id: 1, dayOfWeek: 2, hour: 10, customerVolume: 20 }];
            client.mockResolvedValueOnce(raw);

            const result = await repository.listAll();

            expect(client).toHaveBeenCalledWith("/getCustomerTraffic");
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBeInstanceOf(CustomerTraffic);
            expect(result[0].day).toBe(2);
            expect(result[0].customerVolume).toBe(20);
        });

        it("maps response payload object to CustomerTraffic instances", async () => {
            const raw = {
                payload: [
                    { id: 2, dayOfWeek: 3, hour: 12, customerVolume: 25 },
                ],
            };
            client.mockResolvedValueOnce(raw);

            const result = await repository.listAll();

            expect(result[0]).toBeInstanceOf(CustomerTraffic);
            expect(result[0].day).toBe(3);
        });

        it("throws when response success is false", async () => {
            client.mockResolvedValueOnce({
                success: false,
                message: "No data",
            });

            await expect(repository.listAll()).rejects.toThrow(
                "Error in customer traffic repository -> No data",
            );
        });

        it("throws when client returns an Error instance", async () => {
            client.mockResolvedValueOnce(new Error("fetch fail"));

            await expect(repository.listAll()).rejects.toThrow(
                "Error in customer traffic repository -> fetch fail",
            );
        });
    });
});
