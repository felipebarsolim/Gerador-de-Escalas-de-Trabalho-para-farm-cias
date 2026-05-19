import { ServiceSchedule } from "../../core/entities/ServiceSchedule.js";
import { APIendpoint } from "../../shared/constants/APIendpoints.js";
import { client } from "../api/client.js";

export class APIscheduleServiceRepository {
    constructor() {
        this.client = client;
    }

    async create({ day, satisfactionScore }) {
        try {
            const response = await this.client(
                APIendpoint.createServiceSchedule,
                {
                    method: "POST",
                    body: JSON.stringify({ day, satisfactionScore }),
                },
            );

            if (response instanceof Error) throw new Error(response.message);

            return { success: true };
        } catch (error) {
            throw new Error(
                `Error in API service schedule repository -> ${error.message}`,
            );
        }
    }

    /**
     * * lista o histórico de agenda de trabalho geradas
     * @returns {Array<ServiceSchedule> | []}
     * @throws {Error}
     */
    async getAllData() {
        try {
            const response = await this.client(APIendpoint.getScheduleService);

            if (response instanceof Error) throw new Error(response.message);

            const { payload } = response;

            if (payload.length === 0) return [];

            return payload.map((ss) => {
                return new ServiceSchedule({
                    id: ss.id,
                    day: ss.day,
                    data: ss.data,
                });
            });
        } catch (error) {
            throw new Error(
                `Error in API service schedule repository -> ${error.message}`,
            );
        }
    }
}
