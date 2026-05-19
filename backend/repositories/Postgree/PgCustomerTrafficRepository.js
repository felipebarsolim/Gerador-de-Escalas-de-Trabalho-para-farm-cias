import CustomerTraffic from "../../entities/performance/CustomerTraffic.js";
import Task from "../../entities/performance/Task.js";
import { database } from "./Connection/ConnectionPostgree.js";

export class PgCustomerTrafficRepository {
    constructor() {
        this.repository = database;
    }

    async save(customerTraffic) {
        try {
            if (!customerTraffic) throw new Error("Empty Data");

            const query = `
            INSERT INTO "customer_traffic" (id, day_of_week, hour, customer_volume)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;

            const values = [
                customerTraffic.id,
                customerTraffic.dayOfWeek,
                customerTraffic.hour,
                customerTraffic.customerVolume,
            ];

            const res = await this.repository.query(query, values);
            return res;
        } catch (error) {
            throw new Error(
                `Customer Traffic Database Error: ${error.message}`,
            );
        }
    }

    async getAllData() {
        try {
            const query = `
            SELECT * FROM "customer_traffic"`;

            const res = await this.repository.query(query);

            return res.rows.map((row) => {
                return new CustomerTraffic({
                    id: row.id,
                    dayOfWeek: row.day_of_week,
                    hour: row.hour,
                    customerVolume: row.customer_volume,
                });
            });
        } catch (error) {
            throw new Error(
                `Customer Traffic DataBase Error: ${error.message}`,
            );
        }
    }
}
