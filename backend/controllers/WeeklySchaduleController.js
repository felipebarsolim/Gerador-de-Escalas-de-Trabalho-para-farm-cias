import WeeklySchedule from "../entities/RH/WeeklySchadule.js";
import { PgWeeklyScheduleRepository } from "../repositories/Postgree/PgWeeklyScheduleRepository.js";
import { CreateWeeklyScheduleUseCase } from "../services/CreateWeeklyScheduleUseCase.js";
import { GetWeeklyScheduleUseCase } from "../services/GetWeeklySchaduleUseCase.js";

export class WeeklyScheduleController {
    constructor() {
        this.repository = new PgWeeklyScheduleRepository();
    }
    async create(req, res) {
        try {
            const { id, mounth, inicialDay, daysOfWeek } = req.body;

            if (typeof daysOfWeek !== "object") throw new Error("Invalid data");

            const createWeeklySchedule = new CreateWeeklyScheduleUseCase({
                id,
                mounth,
                inicialDay,
                daysOfWeek,
                CreateWeeklyScheduleRepository: this.repository,
            });

            const isCreatedWeeklySchedule =
                await createWeeklySchedule.execute();

            if (isCreatedWeeklySchedule instanceof Error)
                throw new Error(isCreatedWeeklySchedule.message);

            res.status(202).json({ sucess: true });
        } catch (error) {
            console.error(
                `Error in weekly schedule controller -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }

    async getAllData(req, res) {
        try {
            const getWeeklySchedule = new GetWeeklyScheduleUseCase(
                this.repository,
            );
            const payload = await getWeeklySchedule.execute();
            if (payload instanceof Error)
                throw new Error(weeklySchadule.message);

            res.status(200).json({
                success: true,
                payload,
            });
        } catch (error) {
            console.error(
                `Error in weekly schedule controller -> ${error.message}`,
            );
            res.status(500).json("Internal Error");
        }
    }
}
