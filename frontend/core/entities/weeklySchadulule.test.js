import { describe, it, expect } from "vitest";
import { WeeklySchedule } from "./weeklySchadule.js";

describe("WeeklySchedule entity", () => {
    it("initializes with the provided values", () => {
        const scheduleData = {
            mounth: 12,
            inicialDay: 25,
            daysOfWeek: {
                Monday: [{ task: "restock" }],
            },
        };

        const schedule = new WeeklySchedule(scheduleData);

        expect(schedule.mounth).toBe(12);
        expect(schedule.inicialDay).toBe(25);
        expect(schedule.daysOfWeek).toEqual({
            Monday: [{ task: "restock" }],
        });
    });

    it("throws an error when daysOfWeek is omitted", () => {
        expect(
            () =>
                new WeeklySchedule({
                    mounth: 8,
                    inicialDay: 2,
                }),
        ).toThrow(
            "Error in create Weekly Schadule: Empty data in weekly schadule",
        );
    });
});
