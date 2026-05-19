import { describe, it, expect } from "vitest";
import { CustomerTraffic } from "./CustomerTraffic.js";

describe("CustomerTraffic entity", () => {
    describe("constructor", () => {
        it("creates a valid instance with the provided values", () => {
            const traffic = new CustomerTraffic({
                id: 1,
                day: 3,
                hour: 14,
                customerVolume: 20,
            });

            expect(traffic.id).toBe(1);
            expect(traffic.day).toBe(3);
            expect(traffic.hour).toBe(14);
            expect(traffic.customerVolume).toBe(20);
        });

        it("generates a numeric id when none is provided", () => {
            const traffic = new CustomerTraffic({
                day: 1,
                hour: 10,
                customerVolume: 5,
            });

            expect(traffic.id).toBeTypeOf("number");
            expect(traffic.id).toBeGreaterThan(0);
        });

        it("throws when required fields are missing", () => {
            expect(
                () =>
                    new CustomerTraffic({
                        hour: 14,
                        customerVolume: 20,
                    }),
            ).toThrow("Invalid input data");
        });

        it("throws when fields are invalid", () => {
            expect(
                () =>
                    new CustomerTraffic({
                        day: 2,
                        hour: "14",
                        customerVolume: 20,
                    }),
            ).toThrow("Invalid input data");

            expect(
                () =>
                    new CustomerTraffic({
                        day: 2,
                        hour: 14,
                        customerVolume: 20.5,
                    }),
            ).toThrow("Invalid input data");
        });
    });

    describe("peakHourColor", () => {
        it("returns yellow for customer volume between 36 and 44", () => {
            const traffic = new CustomerTraffic({
                id: 2,
                day: 5,
                hour: 18,
                customerVolume: 40,
            });

            expect(traffic.peakHourColor()).toBe("yellow");
        });

        it("returns orange for customer volume between 46 and 59", () => {
            const traffic = new CustomerTraffic({
                id: 3,
                day: 5,
                hour: 18,
                customerVolume: 50,
            });

            expect(traffic.peakHourColor()).toBe("orange");
        });

        it("returns red for customer volume above 60", () => {
            const traffic = new CustomerTraffic({
                id: 4,
                day: 5,
                hour: 18,
                customerVolume: 65,
            });

            expect(traffic.peakHourColor()).toBe("red");
        });
    });
});
