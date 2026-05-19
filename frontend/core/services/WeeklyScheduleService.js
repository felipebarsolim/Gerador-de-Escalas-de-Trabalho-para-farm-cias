import { success } from "zod";
import { APIweeklyScheduleRepository } from "../../infra/repositories/APIweeklyScheduleRepository.js";
import { WeeklySchedule } from "../entities/weeklySchadule.js";

export class WeeklyScheduleService {
    constructor() {
        this.weeklySchaduleRepository = new APIweeklyScheduleRepository();
    }

    /**
     * * Retorna um Array do tipo WeeklySchedule
     * @returns {Array<WeeklySchedule>}
     * @throws {Error}
     */
    async getAllData() {
        try {
            const weeklySchedule =
                await this.weeklySchaduleRepository.listAll();
            if (weeklySchedule instanceof Error)
                throw new Error(weeklySchedule.message);
            return weeklySchedule;
        } catch (error) {
            console.error(
                `Error in get all data weekly schedule service -> ${error.message}`,
            );
        }
    }

    /**
     * * Cria uma escala de trabalho
     * @param {{mounth: number, inicialDay: number, daysOfWeek: object}} weeklySchedule
     * @returns {{success: boolean}}
     */
    async create(weeklySchedule) {
        try {
            const newWeeklySchedule = new WeeklySchedule({
                id: weeklySchedule.id,
                mounth: weeklySchedule.mounth,
                inicialDay: weeklySchedule.inicialDay,
                daysOfWeek: weeklySchedule.daysOfWeek,
            });

            const response =
                await this.weeklySchaduleRepository.create(newWeeklySchedule);

            if (response instanceof Error) throw new Error(response.message);

            return { success: true };
        } catch (error) {
            console.error(
                `Error in create weekly schedule service -> ${error.message}`,
            );
        }
    }
}
