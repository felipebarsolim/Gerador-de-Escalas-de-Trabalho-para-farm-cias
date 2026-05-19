import { Task } from "../../core/entities/Task.js";
import { APIendpoint } from "../../shared/constants/APIendpoints.js";
import { client } from "../api/client.js";

export class APItaskRepository {
    constructor() {
        this.client = client;
    }

    async create(task) {
        try {
            task = Array.isArray(task) ? task : [task];

            if (task.length === 0) throw new Error("No data in tasks");

            const result = await this.client(APIendpoint.createTasks, {
                method: "POST",
                body: JSON.stringify(task),
            });

            return result;
        } catch (error) {
            throw new Error(`Error in create tasks -> ${error.message}`);
        }
    }

    /**
     * Manda uma requisição GET para o endpoint /getTasks
     * @returns {Promise<Array<Task>> || Error || noSucess: 'no data found'}
     */
    async listAll() {
        try {
            const response = await this.client(APIendpoint.getTasks);

            if (response instanceof Error) throw new Error(response.message);

            if (!Array.isArray(response) && response && response.error)
                throw new Error("API error in get tasks");

            let payload;
            if (Array.isArray(response)) {
                payload = response;
            } else if (
                response &&
                Object.prototype.hasOwnProperty.call(response, "payload")
            ) {
                payload = response.payload;
            } else {
                payload = response;
            }

            payload = Array.isArray(payload) ? payload : [payload];

            if (payload.length === 0) return [];

            return payload.map((t) => {
                return new Task({
                    id: t.id,
                    name: t.name,
                    category: t.category,
                    requiredRole: t.requiredRole,
                    urgency: t.urgency,
                    isEnded: t.isEnded,
                });
            });
        } catch (error) {
            throw new Error(`Error in list all tasks -> ${error.message}`);
        }
    }
}
