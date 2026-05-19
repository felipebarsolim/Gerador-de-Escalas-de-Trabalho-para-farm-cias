import { WeeklySchedule } from "../../core/entities/weeklySchadule.js";
import { APIendpoint } from "../../shared/constants/APIendpoints.js";
import { client } from "../api/client.js";

export class APIweeklyScheduleRepository {
    constructor() {
        this.client = client;
    }

    async create(weeklySchedule) {
        try {
            const response = await this.client(
                APIendpoint.createWeeklySchedule,
                {
                    method: "POST",
                    body: weeklySchedule,
                },
            );

            if (!response.success) throw new Error(response);
        } catch (error) {
            throw new Error(
                `Error in create weekly schadule repository -> ${error.message}`,
            );
        }
    }

    /**
     * * Retorna todas as escalas criadas
     * @returns {Array<WeeklySchedule>}
     * @throws {Error} Lança um erro se requisição falhar ou tiver erros de parâmetros
     */
    async listAll() {
        try {
            const response = await this.client(APIendpoint.getWeeklySchedule);
            if (!response.success) throw new Error(response);
            return response.payload.map((ws) => {
                return new WeeklySchedule({
                    id: ws.id,
                    mounth: ws.mounth,
                    inicialDay: ws.inicial_day,
                    daysOfWeek: ws.days_of_week,
                });
            });
        } catch (error) {
            throw new Error(
                `Error in list weeklySchedule repository -> ${error.message}`,
            );
        }
    }
}
