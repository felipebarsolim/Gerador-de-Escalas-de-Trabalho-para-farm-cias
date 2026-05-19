import { APIscheduleServiceRepository } from "../../infra/repositories/APIserviceScheduleRepository.js";

export class ServiceSchedule {
    constructor() {
        this.repository = new APIscheduleServiceRepository();
    }

    /**
     *
     * @param {{day: number, satisfactionScore: number}} info
     * @returns {{success: boolen}}
     * @throws {error}
     */
    async create({ day, satisfactionScore }) {
        try {
            const response = await this.repository.create({
                day,
                satisfactionScore,
            });

            if (response instanceof Error) throw new Error(response.message);

            return response;
        } catch (error) {
            console.error(`Error in Service Schedule -> ${error.message}`);
            throw error;
        }
    }

    /**
     *
     * @returns {Array<ServiceSchedule>}
     * @throws {error}
     */
    async getAllData() {
        try {
            const response = await this.repository.getAllData();

            if (response instanceof Error) throw new Error(response.message);

            return response;
        } catch (error) {
            console.error(`Error in Service Schedule -> ${error.message}`);
            throw error;
        }
    }
}

const ss = new ServiceSchedule();
const result = await ss.create({ day: 0, satisfactionScore: 96 });
console.log(JSON.stringify(result));
