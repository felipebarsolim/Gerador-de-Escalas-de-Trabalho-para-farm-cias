import { ServiceSchedule } from "../../entities/performance/ServiceSchedule.js";
import { database } from "./Connection/ConnectionPostgree.js";

export class PgServiceSchedule {
    constructor() {
        this.repository = database;
    }

    async save(serviceSchedule) {
        try {
            if (serviceSchedule.length === 0) throw new Error("Empty Data");

            const query = `
            INSERT INTO "service_schedule" (id, day, data)
            VALUES ($1, $2, $3)
            RETURNING *`;

            const values = [
                serviceSchedule.id,
                serviceSchedule.day,
                JSON.stringify(serviceSchedule.data),
            ];

            const res = await this.repository.query(query, values);

            if (res.rowCount === 0) throw new Error("No lines added");

            return res;
        } catch (error) {
            throw new Error(`DataBase Error: ${error.message}`);
        }
    }

    async getAllData() {
        try {
            const query = `
            SELECT * FROM "service_schedule"`;

            const res = await this.repository.query(query);

            if (res.rowCount === 0) return "No lines found";

            return res.rows.map((row) => {
                return new ServiceSchedule({
                    id: row.id,
                    day: row.day,
                    data: row.data,
                });
            });
        } catch (error) {
            throw new Error(`Schedule DataBase Error: ${error.message}`);
        }
    }
}
