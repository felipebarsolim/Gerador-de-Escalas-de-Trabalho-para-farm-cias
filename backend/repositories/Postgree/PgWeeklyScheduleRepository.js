import { database } from "./Connection/ConnectionPostgree.js";

export class PgWeeklyScheduleRepository {
    constructor() {
        this.repository = database;
    }

    async save(weeklySchedule) {
        try {
            if (!weeklySchedule) throw new Error("Empty Data");

            const query = `
            INSERT INTO "weekly_schedule" (id, mounth, inicial_day, days_of_week)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;

            const values = [
                weeklySchedule.id,
                weeklySchedule.mounth,
                weeklySchedule.inicialDay,
                JSON.stringify(weeklySchedule.daysOfWeek),
            ];

            const res = await this.repository.query(query, values);

            return res.row;
        } catch (error) {
            throw new Error(`Error Database: ${error.message}`);
        }
    }

    async getAllData() {
        try {
            const query = `SELECT * FROM "weekly_schedule"`;

            const res = await this.repository.query(query);

            return res.rows;
        } catch (error) {
            throw new Error(`Error DataBase: ${error.message}`);
        }
    }
}
